import { NextRequest, NextResponse } from 'next/server';

// 模拟的session存储（实际项目中应该使用数据库或Redis）
const sessions: Map<string, { userId: string; username: string; email: string; name?: string }> = new Map();

export async function GET(request: NextRequest) {
  try {
    // 获取session token
    const cookies = request.cookies;
    const sessionToken = cookies.get('session_token')?.value;

    if (!sessionToken || !sessions.has(sessionToken)) {
      return NextResponse.json({ 
        authenticated: false,
        message: '未登录或会话已过期' 
      });
    }

    const sessionData = sessions.get(sessionToken)!;
    
    return NextResponse.json({
      authenticated: true,
      user: {
        objectId: sessionData.userId,
        username: sessionData.username,
        email: sessionData.email,
        name: sessionData.name
      }
    });
  } catch (error) {
    console.error('检查登录状态错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}