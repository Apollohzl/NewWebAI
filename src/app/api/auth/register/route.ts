import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码都是必填的' },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      );
    }

    // 注册用户
    const result = await registerUser({ username, email, password });
    
    if (!result) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 409 }
      );
    }

    // 返回用户信息（不包含密码）
    const { user, token } = result;
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: '注册成功',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}