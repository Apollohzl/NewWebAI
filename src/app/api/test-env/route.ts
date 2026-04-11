import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envData = {
      SQL_HOST: process.env.SQL_HOST ? '已设置' : '未设置',
      SQL_PORT: process.env.SQL_PORT ? '已设置' : '未设置',
      SQL_USER: process.env.SQL_USER ? '已设置' : '未设置',
      SQL_PASSWORD: process.env.SQL_PASSWORD ? '已设置' : '未设置',
      SQL_DATABASE: process.env.SQL_DATABASE ? '已设置' : '未设置',
      JWT_SECRET: process.env.JWT_SECRET ? '已设置' : '未设置',
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