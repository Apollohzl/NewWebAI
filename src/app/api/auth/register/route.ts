import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud, leancloudRequest } from '@/lib/leancloud';
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

    // 使用LeanCloud的邮箱验证注册
    try {
      // 先创建用户
      const userData = {
        username,
        email,
        password
      };

      // 使用LeanCloud REST API直接创建用户
      const response = await leancloudRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      console.log('用户创建成功:', response);
      
      // LeanCloud在注册用户时会自动发送验证邮件（如果在控制台配置了邮件模板）
      console.log('用户注册成功，LeanCloud应该会自动发送验证邮件');
      
      return NextResponse.json({
        message: '注册成功！请查看邮箱并点击验证链接完成验证',
        user: {
          id: response.objectId,
          username: response.username,
          email: response.email,
        },
        needEmailVerification: true
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