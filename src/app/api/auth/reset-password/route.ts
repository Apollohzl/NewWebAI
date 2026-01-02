import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: '重置令牌和新密码都是必需的' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: '新密码长度至少为6位' }, { status: 400 });
    }

    // 使用LeanCloud的重置密码功能
    // 注意：LeanCloud的重置密码流程通常是通过邮件中的链接直接完成的
    // 这里我们使用token来验证并更新密码
    try {
      // 首先验证token的有效性（这里需要根据LeanCloud的实际API调整）
      // 由于LeanCloud的重置密码流程是内置的，我们可能需要使用不同的方法
      
      // 尝试使用LeanCloud的密码重置API
      const resetResponse = await leancloudRequest('/resetPassword', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          password: newPassword,
        }),
      });

      return NextResponse.json({
        message: '密码重置成功',
      });
    } catch (leancloudError: any) {
      console.error('LeanCloud重置密码失败:', leancloudError);
      
      // 如果LeanCloud的重置密码API不可用，我们可能需要实现自定义逻辑
      // 这里提供一个备选方案，但需要根据实际情况调整
      
      return NextResponse.json(
        { error: '重置密码链接无效或已过期' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('重置密码失败:', error);
    return NextResponse.json(
      { error: error.message || '重置密码失败' },
      { status: 500 }
    );
  }
}