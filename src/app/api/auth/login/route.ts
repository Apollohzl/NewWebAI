import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码都是必填的' },
        { status: 400 }
      );
    }

    // 用户登录
    const result = await loginUser(email, password);
    
    if (!result) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 返回用户信息（不包含密码）
    const { user, token } = result;
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: '登录成功',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}