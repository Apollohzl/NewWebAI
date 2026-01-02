import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: '当前密码和新密码不能为空' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: '新密码长度至少为6位' }, { status: 400 });
    }

    // 验证当前密码
    const loginResponse = await leancloudRequest('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: '', // 这里需要从token获取用户名
        password: currentPassword,
      }),
    });

    // 获取当前用户信息
    const currentUserResponse = await leancloudRequest('/users/me', {
      headers: {
        'X-LC-Session': token,
      },
    });

    // 使用用户名和当前密码验证
    const verifyResponse = await leancloudRequest('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: currentUserResponse.username,
        password: currentPassword,
      }),
    });

    if (!verifyResponse || !verifyResponse.sessionToken) {
      return NextResponse.json({ error: '当前密码不正确' }, { status: 400 });
    }

    // 更新密码
    const updateResponse = await leancloudRequest(`/users/${currentUserResponse.objectId}`, {
      method: 'PUT',
      headers: {
        'X-LC-Session': token,
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });

    return NextResponse.json({
      message: '密码修改成功',
      user: {
        id: updateResponse.objectId,
        username: updateResponse.username,
        email: updateResponse.email,
        createdAt: updateResponse.createdAt,
        avatar: updateResponse.avatar,
      },
    });
  } catch (error: any) {
    console.error('修改密码失败:', error);
    
    if (error.message?.includes('password') || error.message?.includes('密码')) {
      return NextResponse.json({ error: '当前密码不正确' }, { status: 400 });
    }
    
    return NextResponse.json(
      { error: error.message || '密码修改失败' },
      { status: 500 }
    );
  }
}