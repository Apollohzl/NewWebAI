import { NextRequest, NextResponse } from 'next/server';
import { ProductQueries } from '@/lib/sqlDatabase';

export async function GET(request: NextRequest) {
  try {
    const products = await ProductQueries.getAll();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('获取产品数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}