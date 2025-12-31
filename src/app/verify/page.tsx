import { NextRequest, NextResponse } from 'next/server';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">邮箱验证</h1>
        <p className="text-gray-600 text-center">正在验证您的邮箱...</p>
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect('/register?error=missing_token');
  }

  // 这里应该验证token的有效性
  // 暂时直接重定向到登录页面
  return NextResponse.redirect('/login?verified=true');
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: '缺少验证令牌' },
        { status: 400 }
      );
    }

    // 这里应该验证token并激活用户账户
    // 暂时返回成功
    return NextResponse.json({
      message: '邮箱验证成功',
      success: true
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: '验证失败' },
      { status: 500 }
    );
  }
}