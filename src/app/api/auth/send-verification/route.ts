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

    // 保存验证码
    await leancloudRequest('/classes/EmailVerification', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });

    // 发送邮件
    const emailData = {
      recipients: [email],
      subject: 'NewWebAI - 邮箱验证码',
      text_body: `您的验证码是：${verificationCode}，有效期10分钟。请勿将验证码告诉他人。`,
      html_body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">NewWebAI - 邮箱验证码</h2>
          <p>您好！</p>
          <p>您的邮箱验证码是：</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
            ${verificationCode}
          </div>
          <p>验证码有效期为10分钟，请及时使用。</p>
          <p style="color: #6b7280; font-size: 14px;">如果这不是您的操作，请忽略此邮件。</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            此邮件由 NewWebAI 系统自动发送，请勿回复。<br>
            © 2025 小黄の数字宇宙工作室. 保留所有权利.
          </p>
        </div>
      `,
    };

    // 发送邮件
    await leancloudRequest('/requestEmailVerify', {
      method: 'POST',
      body: JSON.stringify(emailData),
    });

    return NextResponse.json({
      message: '验证码已发送到您的邮箱',
      // 开发环境下返回验证码，生产环境应该删除
      ...(process.env.NODE_ENV === 'development' && { verificationCode }),
    });
  } catch (error: any) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { error: error.message || '发送验证码失败，请稍后重试' },
      { status: 500 }
    );
  }
}