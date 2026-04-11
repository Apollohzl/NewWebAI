import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/sql';
import { ApiQueries } from '@/lib/sqlDatabase';

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    console.log('Update API Status - API ID:', id);
    console.log('Update API Status - New Status:', status);

    if (!id || !status) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 使用 SQL 数据库更新 API 状态
    const result = await query(
      'UPDATE api_configs SET status = ? WHERE id = ?',
      [status, id]
    );

    console.log('Update API Status - SQL Result:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新API状态失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '更新失败' },
      { status: 500 }
    );
  }
}