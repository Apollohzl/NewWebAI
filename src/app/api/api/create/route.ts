import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/sql';

export async function POST(request: NextRequest) {
  try {
    const apiData = await request.json();

    if (!apiData.name || !apiData.endpoint) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 创建新API配置到 SQL 数据库
    const now = new Date();
    const sql = `
      INSERT INTO api_configs (id, name, description, endpoint, method, category, status, tags, visits, icon, request_url, methods, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await query(sql, [
      Date.now().toString(),
      apiData.name,
      apiData.description || '',
      apiData.endpoint,
      'GET',
      apiData.category || 'general',
      '正常',
      JSON.stringify(apiData.tags || []),
      0,
      '',
      apiData.endpoint,
      JSON.stringify(['GET', 'POST']),
      now,
      now
    ]);

    return NextResponse.json({ success: true, data: { id: Date.now().toString() } });
  } catch (error) {
    console.error('创建API配置失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建失败' },
      { status: 500 }
    );
  }
}