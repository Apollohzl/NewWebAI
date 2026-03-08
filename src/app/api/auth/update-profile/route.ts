import { NextRequest, NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/userDatabase';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { username, email, avatar } = await request.json();

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
    }

    // 根据token中的用户ID查找用户
    const user = await findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 准备更新数据
    const updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar !== undefined) updateData.avatar = avatar; // avatar可能是null

    // 更新用户信息
    const updatedUser = await updateUser(user.id, updateData);
    if (!updatedUser) {
      return NextResponse.json({ error: '更新用户信息失败' }, { status: 500 });
    }

    // 返回用户信息（移除密码）
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: '用户信息更新成功',
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json(
      { error: error.message || '更新用户信息失败' },
      { status: 500 }
    );
  }
}