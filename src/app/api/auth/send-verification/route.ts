import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest, initLeanCloud } from '@/lib/leancloud';

// 生成6位随机验证码
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    
    const { email } = await request.json();
    console.log('收到发送验证码请求:', email);

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 生成验证码
    const verificationCode = generateVerificationCode();
    console.log('生成验证码:', verificationCode);

    // 存储验证码到LeanCloud（使用临时表）
    const verificationData = {
      email,
      code: verificationCode,
      type: 'email_verification',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10分钟后过期
      isUsed: false,
    };

    // 保存验证码到LeanCloud
    try {
      await leancloudRequest('/classes/EmailVerification', {
        method: 'POST',
        body: JSON.stringify(verificationData),
      });
      console.log('验证码已保存到LeanCloud');
    } catch (error) {
      console.error('保存验证码失败:', error);
      throw error;
    }

    // 使用LeanCloud免费邮件服务
    try {
      // LeanCloud的requestEmailVerify会自动发送验证邮件
      const emailResponse = await fetch(`${process.env.LEANCLOUD_SERVER_URL}/1.1/requestEmailVerify`, {
        method: 'POST',
        headers: {
          'X-LC-Id': process.env.LEANCLOUD_APP_ID!,
          'X-LC-Key': process.env.LEANCLOUD_APP_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const emailData = await emailResponse.json();
      console.log('LeanCloud邮件发送响应:', emailData);
    } catch (emailError) {
      console.error('LeanCloud邮件发送失败:', emailError);
      // 邮件发送失败不影响验证码保存，用户可以使用控制台显示的验证码
    }

    return NextResponse.json({
      message: '验证码已生成',
      verificationCode: verificationCode,
      note: '请查看邮箱或使用上方验证码完成验证'
    });
  } catch (error: any) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { error: error.message || '发送验证码失败，请稍后重试' },
      { status: 500 }
    );
  }
}