import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const formData = await request.formData();
    const avatar = formData.get('avatar') as File;

    if (!avatar) {
      return NextResponse.json({ error: '请选择头像文件' }, { status: 400 });
    }

    // 验证文件类型和大小
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(avatar.type)) {
      return NextResponse.json({ error: '只支持 JPG、PNG、GIF、WebP 格式的图片' }, { status: 400 });
    }

    if (avatar.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '头像文件大小不能超过10MB' }, { status: 400 });
    }

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
    }

    // 获取session token
    const sessionToken = request.headers.get('X-LC-Session');
    if (!sessionToken) {
      return NextResponse.json({ error: '缺少session token' }, { status: 401 });
    }

    // 获取当前用户信息
    const currentUserResponse = await leancloudRequest('/users/me', {
      headers: {
        'X-LC-Session': sessionToken,
      },
    });

    if (!currentUserResponse || !currentUserResponse.objectId) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 上传文件到LeanCloud
    const fileBuffer = await avatar.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    
    // 生成唯一文件名
    const fileExtension = avatar.name.split('.').pop();
    const fileName = `avatar_${currentUserResponse.objectId}_${Date.now()}.${fileExtension}`;
    
    // LeanCloud文件上传的正确格式
    const fileData = {
      name: fileName,
      mime_type: avatar.type,
      base64: base64Data, // 直接使用base64数据，不带data:前缀
      __type: 'File'
    };

    console.log('准备上传文件到LeanCloud:', {
      fileName,
      mimeType: avatar.type,
      fileSize: avatar.size,
      sessionToken: sessionToken.substring(0, 10) + '...'
    });

    // 尝试多种LeanCloud文件上传方式
    let fileUploadResponse;
    
    try {
      // 方法1: 使用REST API上传
      fileUploadResponse = await leancloudRequest('/files/' + fileName, {
        method: 'POST',
        headers: {
          'X-LC-Session': sessionToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileData),
      });
    } catch (error1) {
      console.log('方法1失败，尝试方法2:', error1);
      
      try {
        // 方法2: 使用不同的端点
        fileUploadResponse = await leancloudRequest('/files', {
          method: 'POST',
          headers: {
            'X-LC-Session': sessionToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...fileData,
            name: fileName
          }),
        });
      } catch (error2) {
        console.log('方法2也失败，尝试方法3:', error2);
        
        // 方法3: 使用表单数据格式
        const formData = new FormData();
        const blob = new Blob([fileBuffer], { type: avatar.type });
        formData.append('file', blob, fileName);
        
        fileUploadResponse = await fetch(`${process.env.LEANCLOUD_API_URL}/files/${fileName}`, {
          method: 'POST',
          headers: {
            'X-LC-Id': process.env.LEANCLOUD_APP_ID || '',
            'X-LC-Key': process.env.LEANCLOUD_APP_KEY || '',
            'X-LC-Session': sessionToken,
          },
          body: formData,
        });
        
        if (!fileUploadResponse.ok) {
          throw new Error(`HTTP ${fileUploadResponse.status}: ${fileUploadResponse.statusText}`);
        }
        
        fileUploadResponse = await fileUploadResponse.json();
      }
    }

    console.log('LeanCloud文件上传完整响应:', JSON.stringify(fileUploadResponse, null, 2));

    // 检查响应是否包含错误
    if (fileUploadResponse.error) {
      console.error('LeanCloud文件上传错误:', fileUploadResponse.error);
      return NextResponse.json(
        { error: `LeanCloud上传失败: ${fileUploadResponse.error}` },
        { status: 500 }
      );
    }

    // LeanCloud文件上传响应格式检查
    let avatarUrl = null;
    
    if (fileUploadResponse.url) {
      avatarUrl = fileUploadResponse.url;
    } else if (fileUploadResponse.cdn) {
      avatarUrl = fileUploadResponse.cdn;
    } else if (fileUploadResponse.location) {
      avatarUrl = fileUploadResponse.location;
    } else if (typeof fileUploadResponse === 'string') {
      // 有些情况下LeanCloud可能直接返回URL字符串
      avatarUrl = fileUploadResponse;
    } else if (fileUploadResponse.__type === 'File' && fileUploadResponse.url) {
      // LeanCloud对象格式
      avatarUrl = fileUploadResponse.url;
    }
    
    console.log('提取的头像URL:', avatarUrl);
    
    if (!avatarUrl) {
      console.error('无法从LeanCloud响应中获取文件URL，响应结构:', Object.keys(fileUploadResponse));
      return NextResponse.json(
        { 
          error: '文件上传成功但无法获取文件URL',
          debug: {
            responseKeys: Object.keys(fileUploadResponse),
            responseType: typeof fileUploadResponse,
            fullResponse: fileUploadResponse
          }
        },
        { status: 500 }
      );
    }

    // 更新用户头像字段
    const updateResponse = await leancloudRequest(`/users/${currentUserResponse.objectId}`, {
      method: 'PUT',
      headers: {
        'X-LC-Session': sessionToken,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });

    return NextResponse.json({
      message: '头像上传成功',
      avatarUrl: avatarUrl,
      user: {
        id: updateResponse.objectId,
        username: updateResponse.username,
        email: updateResponse.email,
        avatar: avatarUrl,
        createdAt: updateResponse.createdAt,
      },
    });
  } catch (error: any) {
    console.error('头像上传失败:', error);
    return NextResponse.json(
      { error: error.message || '头像上传失败' },
      { status: 500 }
    );
  }
}