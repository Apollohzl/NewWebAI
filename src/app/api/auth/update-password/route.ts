import { NextRequest, NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/userDatabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { currentPassword, newPassword } = await request.json();

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
    }

    // 验证密码强度
    if (newPassword.length < 6) {
      return NextResponse.json({ error: '新密码长度至少为6位' }, { status: 400 });
    }

    // 根据token中的用户ID查找用户
    const user = await findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 验证当前密码
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: '当前密码错误' }, { status: 400 });
    }

    // 加密新密码
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    const updatedUser = await updateUser(user.id, { password: hashedNewPassword });
    if (!updatedUser) {
      return NextResponse.json({ error: '更新密码失败' }, { status: 500 });
    }

    return NextResponse.json({
      message: '密码更新成功',
    });
  } catch (error: any) {
    console.error('更新密码失败:', error);
    return NextResponse.json(
      { error: error.message || '更新密码失败' },
      { status: 500 }
    );
  }
}