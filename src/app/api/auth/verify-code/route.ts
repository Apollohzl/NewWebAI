import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest, initLeanCloud } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    
    const { email, code } = await request.json();
    console.log('收到验证码验证请求:', { email, code });

    // 验证输入
    if (!email || !code) {
      return NextResponse.json(
        { error: '邮箱和验证码都是必填的' },
        { status: 400 }
      );
    }

    // 查询未使用的验证码
    const where = {
      email,
      code,
      type: 'email_verification',
      isUsed: false,
      expiresAt: { $gt: { "__type": "Date", "iso": new Date().toISOString() } },
    };

    const queryString = encodeURIComponent(JSON.stringify(where));
    const response = await leancloudRequest(
      `/classes/EmailVerification?where=${queryString}&limit=1&order=-createdAt`
    );

    if (!response.results || response.results.length === 0) {
      return NextResponse.json(
        { error: '验证码无效或已过期' },
        { status: 400 }
      );
    }

    // 标记验证码为已使用
    const verificationId = response.results[0].objectId;
    await leancloudRequest(`/classes/EmailVerification/${verificationId}`, {
      method: 'PUT',
      body: JSON.stringify({ isUsed: true }),
    });

    return NextResponse.json({
      message: '验证码验证成功',
    });
  } catch (error: any) {
    console.error('验证码验证失败:', error);
    return NextResponse.json(
      { error: error.message || '验证失败，请稍后重试' },
      { status: 500 }
    );
  }
}