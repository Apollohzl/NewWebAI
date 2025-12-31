import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    console.log('LeanCloud初始化完成');
    
    const { username, email, password, verificationCode } = await request.json();
    console.log('收到注册请求:', { username, email });

    // 验证输入
    if (!username || !email || !password || !verificationCode) {
      return NextResponse.json(
        { error: '用户名、邮箱、密码和验证码都是必填的' },
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

    // 验证邮箱验证码
    console.log('验证邮箱验证码...');
    const verifyResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    const verifyData = await verifyResponse.json();
    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: verifyData.error || '邮箱验证码无效' },
        { status: 400 }
      );
    }
    console.log('邮箱验证码验证成功');

    // 检查邮箱是否已存在
    try {
      const existingUser = await LeanCloudUser.findUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { error: '该邮箱已被注册' },
          { status: 409 }
        );
      }
    } catch (error) {
      // 如果查询失败，继续执行注册
    }

    // 注册用户
    console.log('开始注册用户...');
    const registeredUser = await LeanCloudUser.register(username, email, password);
    console.log('用户注册成功:', registeredUser);
    
    // 生成JWT Token
    const token = jwt.sign(
      { userId: registeredUser.objectId, email: registeredUser.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // 返回用户信息
    return NextResponse.json({
      message: '注册成功',
      user: {
        id: registeredUser.objectId,
        username: registeredUser.username,
        email: registeredUser.email,
        createdAt: registeredUser.createdAt,
      },
      token,
    });
  } catch (error: any) {
    console.error('注册错误详情:', error);
    return NextResponse.json(
      { error: error.message || '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}