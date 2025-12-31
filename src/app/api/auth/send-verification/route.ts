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

    // 使用LeanCloud REST API发送邮件
    try {
      const emailData = {
        recipients: [email],
        subject: 'NewWebAI - 邮箱验证码',
        text_body: `您的验证码是：${verificationCode}，有效期10分钟。请勿将验证码告诉他人。`,
        html_body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">NewWebAI</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0;">邮箱验证码</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 15px 0; color: #333;">您好！</p>
              <p style="margin: 0 0 15px 0; color: #333;">您的邮箱验证码是：</p>
              <div style="background: #ffffff; padding: 20px; border-radius: 6px; text-align: center; border: 2px dashed #667eea;">
                <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>
              </div>
              <p style="margin: 15px 0 0 0; color: #666; font-size: 14px;">验证码有效期为10分钟，请及时使用。</p>
            </div>
            <div style="background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>安全提示：</strong>请勿将验证码告诉他人。如非本人操作，请忽略此邮件。
              </p>
            </div>
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            <p style="margin: 0; color: #6c757d; font-size: 12px; text-align: center;">
              此邮件由 NewWebAI 系统自动发送，请勿回复<br>
              © 2025 小黄の数字宇宙工作室. 保留所有权利.
            </p>
          </div>
        `,
      };

      // 发送邮件
      const emailResponse = await leancloudRequest('/requestMail', {
        method: 'POST',
        body: JSON.stringify(emailData),
      });

      console.log('邮件发送成功:', emailResponse);
    } catch (emailError) {
      console.error('邮件发送失败:', emailError);
      // 邮件发送失败不影响验证码保存
    }

    return NextResponse.json({
      message: '验证码已发送',
      // 开发环境返回验证码
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