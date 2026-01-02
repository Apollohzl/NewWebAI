import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { username, email } = await request.json();

    if (!username || !email) {
      return NextResponse.json({ error: '用户名和邮箱不能为空' }, { status: 400 });
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

    // 获取用户信息
    const currentUserResponse = await leancloudRequest('/users/me', {
      headers: {
        'X-LC-Session': sessionToken,
      },
    });

    if (!currentUserResponse || !currentUserResponse.objectId) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 更新用户信息
    const updateData: any = {
      username: username.trim(),
    };

    // 如果邮箱有变化，需要特殊处理
    if (email !== currentUserResponse.email) {
      updateData.email = email.trim();
      updateData.emailVerified = false; // 新邮箱需要重新验证
    }

    const updateResponse = await leancloudRequest(`/users/${currentUserResponse.objectId}`, {
      method: 'PUT',
      headers: {
        'X-LC-Session': sessionToken,
      },
      body: JSON.stringify(updateData),
    });

    // 如果邮箱有变化，发送验证邮件
    if (email !== currentUserResponse.email) {
      try {
        await leancloudRequest('/requestEmailVerify', {
          method: 'POST',
          headers: {
            'X-LC-Session': sessionToken,
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        });
      } catch (emailError: any) {
        console.error('发送验证邮件失败:', emailError);
        // 不阻止更新流程，只记录错误
      }
    }

    return NextResponse.json({
      user: {
        id: updateResponse.objectId,
        username: updateResponse.username,
        email: updateResponse.email,
        emailVerified: updateResponse.emailVerified,
        createdAt: updateResponse.createdAt,
        avatar: updateResponse.avatar,
      },
    });
  } catch (error: any) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json(
      { error: error.message || '更新失败' },
      { status: 500 }
    );
  }
}