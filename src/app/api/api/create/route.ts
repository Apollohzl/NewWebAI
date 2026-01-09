import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const apiData = await request.json();

    if (!apiData.name || !apiData.endpoint) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 创建新API配置
    const response = await leancloudRequest('/classes/APIs', {
      method: 'POST',
      body: JSON.stringify({
        name: apiData.name,
        endpoint: apiData.endpoint,
        description: apiData.description || '',
        category: apiData.category || 'general',
        method: apiData.method || 'GET',
        status: '正常',
        tags: apiData.tags || [],
        visits: '0',
      }),
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('创建API配置失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建失败' },
      { status: 500 }
    );
  }
}