import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/sql';

export async function GET() {
  try {
    const result = await testConnection();
    return NextResponse.json({
      success: result.success,
      message: result.message,
      details: result.details
    });
  } catch (error: any) {
    console.error('测试SQL连接失败:', error);
    return NextResponse.json(
      { error: error.message || '测试连接失败' },
      { status: 500 }
    );
  }
}
