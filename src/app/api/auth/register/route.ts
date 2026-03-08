import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser } from '@/lib/userDatabase';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    console.log('收到注册请求:', { username, email });

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

    // 检查用户是否已存在
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 409 }
      );
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    try {
      const newUser = await addUser({
        username,
        email,
        password: hashedPassword,
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log('用户创建成功:', newUser.id);
      
      // 返回用户信息（移除密码）
      const { password: _, ...userWithoutPassword } = newUser;
      
      return NextResponse.json({
        message: '注册成功！',
        user: userWithoutPassword,
        needEmailVerification: false // 暂时不需要邮箱验证
      });
    } catch (error: any) {
      console.error('注册失败:', error);
      return NextResponse.json(
        { error: error.message || '注册失败，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: error.message || '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}