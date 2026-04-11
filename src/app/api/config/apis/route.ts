import { NextResponse } from 'next/server';
import { ApiQueries } from '@/lib/sqlDatabase';

export async function GET() {
  try {
    const apis = await ApiQueries.getAll();
    return NextResponse.json({ success: true, data: apis });
  } catch (error) {
    console.error('获取API配置失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}