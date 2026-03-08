import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/userDatabase';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();    
    if (!email) {
      return NextResponse.json({ error: '邮箱是必填项' }, { status: 400 });
    }

    // 查找用户
    const user = await findUserByEmail(email);
    if (!user) {
      // 为了安全，即使邮箱不存在也返回成功消息
      return NextResponse.json({
        message: '如果该邮箱存在于我们的系统中，密码重置邮件已发送',
      });
    }

    // 实现密码重置逻辑
    // 这里可以生成重置令牌并发送邮件
    // 由于实际邮件发送配置较复杂，这里提供基本结构
    console.log(`密码重置请求: ${email}`);
    
    // 在实际实现中，您需要:
    // 1. 生成一个带过期时间的重置令牌
    // 2. 将令牌保存到数据库
    // 3. 发送包含重置链接的邮件
    
    return NextResponse.json({
      message: '如果该邮箱存在于我们的系统中，密码重置邮件已发送',
    });
  } catch (error: any) {
    console.error('请求密码重置失败:', error);
    return NextResponse.json(
      { error: error.message || '请求密码重置失败' },
      { status: 500 }
    );
  }
}