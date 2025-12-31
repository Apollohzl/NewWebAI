import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    LEANCLOUD_APP_ID: process.env.LEANCLOUD_APP_ID ? '已设置' : '未设置',
    LEANCLOUD_APP_KEY: process.env.LEANCLOUD_APP_KEY ? '已设置' : '未设置',
    LEANCLOUD_SERVER_URL: process.env.LEANCLOUD_SERVER_URL ? '已设置' : '未设置',
    JWT_SECRET: process.env.JWT_SECRET ? '已设置' : '未设置',
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: '环境变量检查',
    envVars,
    fullConfig: {
      LEANCLOUD_APP_ID: process.env.LEANCLOUD_APP_ID?.substring(0, 10) + '...',
      LEANCLOUD_SERVER_URL: process.env.LEANCLOUD_SERVER_URL,
    }
  });
}