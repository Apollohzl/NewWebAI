import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    console.log('LeanCloud初始化完成');
    
    const { email, password } = await request.json();
    console.log('收到登录请求:', { email });

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码都是必填的' },
        { status: 400 }
      );
    }

    // 用户登录（使用邮箱作为用户名）
    console.log('开始登录用户...');
    const user = await LeanCloudUser.login(email, password);
    console.log('用户登录成功:', user);
    
    // 生成JWT Token
    const jwtToken = jwt.sign(
      { userId: user.objectId, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // 返回用户信息
    return NextResponse.json({
      message: '登录成功',
      user: {
        id: user.objectId,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      token: jwtToken,
      sessionToken: user.sessionToken, // LeanCloud session token
    });
  } catch (error: any) {
    console.error('登录错误详情:', error);
    return NextResponse.json(
      { error: error.message || '邮箱或密码错误' },
      { status: 401 }
    );
  }
}