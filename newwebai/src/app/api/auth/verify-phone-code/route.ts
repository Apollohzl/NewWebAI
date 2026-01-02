import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: '手机号和验证码不能为空' }, { status: 400 });
    }

    if (code.length !== 6) {
      return NextResponse.json({ error: '验证码格式不正确' }, { status: 400 });
    }

    // 验证短信验证码
    const response = await leancloudRequest('/verifySmsCode', {
      method: 'POST',
      body: JSON.stringify({
        mobilePhoneNumber: phone,
        code: code,
      }),
    });

    console.log('短信验证码验证响应:', response);

    return NextResponse.json({
      message: '手机号验证成功',
      verified: true,
      phone: phone,
    });
  } catch (error: any) {
    console.error('验证短信验证码失败:', error);
    
    // 处理LeanCloud的错误信息
    let errorMessage = '验证码验证失败';
    
    if (error.message) {
      if (error.message.includes('invalid') || error.message.includes('code')) {
        errorMessage = '验证码错误';
      } else if (error.message.includes('expired')) {
        errorMessage = '验证码已过期';
      } else if (error.message.includes('used')) {
        errorMessage = '验证码已使用';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}