import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

// 初始化LeanCloud
initLeanCloud();

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

    // 用户登录（使用邮箱作为用户名）
    const user = await LeanCloudUser.login(email, password);
    
    // 生成JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.getEmail() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // 返回用户信息
    return NextResponse.json({
      message: '登录成功',
      user: {
        id: user.id,
        username: user.getUsername(),
        email: user.getEmail(),
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error: any) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: error.message || '邮箱或密码错误' },
      { status: 401 }
    );
  }
}