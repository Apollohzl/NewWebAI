import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: '邮箱地址不能为空' }, { status: 400 });
    }

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
    }

    // 获取用户信息验证邮箱匹配
    const currentUserResponse = await leancloudRequest(`/users/${decoded.userId}`, {
      method: 'GET',
    });

    if (!currentUserResponse || !currentUserResponse.objectId) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    if (currentUserResponse.email !== email) {
      return NextResponse.json({ error: '邮箱地址不匹配' }, { status: 400 });
    }

    // 发送重置密码邮件
    try {
      const resetResponse = await leancloudRequest('/requestPasswordReset', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      console.log('重置密码邮件发送响应:', resetResponse);
      
      return NextResponse.json({
        message: '重置密码邮件已发送',
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