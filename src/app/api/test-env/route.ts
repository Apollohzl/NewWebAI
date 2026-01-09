import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envData = {
      LEANCLOUD_APP_ID: process.env.LEANCLOUD_APP_ID ? '已设置' : '未设置',
      LEANCLOUD_APP_KEY: process.env.LEANCLOUD_APP_KEY ? '已设置' : '未设置',
      LEANCLOUD_SERVER_URL: process.env.LEANCLOUD_SERVER_URL ? '已设置' : '未设置',
      NEXT_PUBLIC_LEANCLOUD_APP_ID: process.env.NEXT_PUBLIC_LEANCLOUD_APP_ID ? '已设置' : '未设置',
      NEXT_PUBLIC_LEANCLOUD_SERVER_URL: process.env.NEXT_PUBLIC_LEANCLOUD_SERVER_URL ? '已设置' : '未设置',
    };

    return NextResponse.json({
      success: true,
      env: envData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '测试失败' },
      { status: 500 }
    );
  }
}