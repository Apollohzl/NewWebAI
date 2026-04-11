import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/lib/userDatabase';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  // 重置密码功能已禁用，等待后续改为 QQ 邮箱验证
  return NextResponse.json(
    { error: '重置密码功能暂时禁用，请稍后再试' },
    { status: 503 }
  );

  try {
    const { email, token, newPassword } = await request.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json({ error: '邮箱、重置令牌和新密码都是必填项' }, { status: 400 });
    }

    // 验证密码强度
    if (newPassword.length < 6) {
      return NextResponse.json({ error: '新密码长度至少为6位' }, { status: 400 });
    }

    // 查找用户
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 400 });
    }

    // 在实际应用中，您需要验证重置令牌的有效性
    // 这通常涉及检查令牌是否在数据库中存在且未过期
    // 由于这需要额外的数据库集合来存储重置令牌，这里简化处理
    
    // 加密新密码
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 更新用户密码
    const updatedUser = await updateUser(user.id, { password: hashedNewPassword });
    if (!updatedUser) {
      return NextResponse.json({ error: '重置密码失败' }, { status: 500 });
    }

    return NextResponse.json({
      message: '密码重置成功',
    });
  } catch (error: any) {
    console.error('重置密码失败:', error);
    return NextResponse.json(
      { error: error.message || '重置密码失败' },
      { status: 500 }
    );
  }
}