import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    console.log('LeanCloud初始化完成');
    
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
      { userId: registeredUser.id, email: registeredUser.getEmail() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // 返回用户信息
    return NextResponse.json({
      message: '注册成功',
      user: {
        id: registeredUser.id,
        username: registeredUser.getUsername(),
        email: registeredUser.getEmail(),
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