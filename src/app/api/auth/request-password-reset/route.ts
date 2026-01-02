import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: '邮箱地址不能为空' }, { status: 400 });
    }

    // 直接发送重置密码邮件，不需要用户登录
    try {
      const resetResponse = await leancloudRequest('/requestPasswordReset', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      console.log('重置密码邮件发送响应:', resetResponse);
      
      return NextResponse.json({
        message: '重置密码邮件已发送，请查收邮件',
        email: email,
      });
    } catch (emailError: any) {
      console.error('发送重置密码邮件失败:', emailError);
      return NextResponse.json(
        { error: '发送重置密码邮件失败，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('请求重置密码失败:', error);
    return NextResponse.json(
      { error: error.message || '请求失败' },
      { status: 500 }
    );
  }
}