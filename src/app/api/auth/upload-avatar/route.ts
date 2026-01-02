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
    
    const fileData = {
      name: `avatar_${currentUserResponse.objectId}_${Date.now()}.${avatar.name.split('.').pop()}`,
      mime_type: avatar.type,
      base64: `data:${avatar.type};base64,${base64Data}`,
      metadata: {
        userId: currentUserResponse.objectId,
        type: 'avatar'
      }
    };

    // 上传到LeanCloud文件服务
    const fileUploadResponse = await leancloudRequest('/files', {
      method: 'POST',
      headers: {
        'X-LC-Session': sessionToken,
      },
      body: JSON.stringify(fileData),
    });

    console.log('LeanCloud文件上传响应:', fileUploadResponse);

    // LeanCloud文件上传响应可能包含不同的字段
    const avatarUrl = fileUploadResponse.url || fileUploadResponse.cdn || fileUploadResponse.location;
    
    if (!avatarUrl) {
      console.error('无法从LeanCloud响应中获取文件URL:', fileUploadResponse);
      return NextResponse.json(
        { error: '文件上传成功但无法获取文件URL' },
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