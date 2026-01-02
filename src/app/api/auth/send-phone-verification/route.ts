import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: '手机号不能为空' }, { status: 400 });
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 });
    }

    // 发送短信验证码
    const response = await leancloudRequest('/requestSmsCode', {
      method: 'POST',
      body: JSON.stringify({
        mobilePhoneNumber: phone,
        name: 'register_code', // 短信模板名称
        ttl: 600, // 10分钟有效期
        sendInterval: 60, // 60秒发送间隔
      }),
    });

    console.log('短信验证码发送响应:', response);

    return NextResponse.json({
      message: '验证码已发送',
      phone: phone,
    });
  } catch (error: any) {
    console.error('发送短信验证码失败:', error);
    
    // 处理LeanCloud的错误信息
    let errorMessage = '发送验证码失败';
    
    if (error.message) {
      if (error.message.includes('frequently')) {
        errorMessage = '发送过于频繁，请稍后再试';
      } else if (error.message.includes('limit')) {
        errorMessage = '今日发送次数已达上限';
      } else if (error.message.includes('invalid')) {
        errorMessage = '手机号格式不正确';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}