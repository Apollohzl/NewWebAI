import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    // 首先尝试从Authorization header获取session token
    const authHeader = request.headers.get('authorization');
    let sessionToken = authHeader?.replace('Bearer ', '');

    // 如果header中没有，尝试从cookie获取
    if (!sessionToken) {
      const cookies = request.cookies;
      sessionToken = cookies.get('session_token')?.value;
    }

    if (!sessionToken) {
      return NextResponse.json({ 
        authenticated: false,
        message: '未登录' 
      });
    }

    // 使用LeanCloud的session验证
    try {
      const response = await leancloudRequest('/users/me', {
        headers: {
          'X-LC-Session': sessionToken,
        },
      });

      return NextResponse.json({
        authenticated: true,
        user: {
          objectId: response.objectId,
          username: response.username,
          email: response.email,
          name: response.name || response.username
        }
      });
    } catch (error) {
      // LeanCloud session验证失败
      return NextResponse.json({ 
        authenticated: false,
        message: '会话已过期' 
      });
    }
  } catch (error) {
    console.error('检查登录状态错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}