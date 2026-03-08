import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/userDatabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log('收到登录请求:', { email });

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码都是必填的' },
        { status: 400 }
      );
    }

    // 查找用户
    console.log('开始查找用户...');
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    console.log('用户验证成功:', user.id);
    
    // 生成JWT Token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // 返回用户信息（移除密码）
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: '登录成功',
      user: userWithoutPassword,
      token: jwtToken,
    });
  } catch (error: any) {
    console.error('登录错误详情:', error);
    return NextResponse.json(
      { error: error.message || '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}