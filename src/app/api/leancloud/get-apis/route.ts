import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    const response = await leancloudRequest('/classes/APIs');
    
    return NextResponse.json({
      apis: response.results || []
    });
  } catch (error: any) {
    console.error('获取API数据失败:', error);
    return NextResponse.json(
      { error: error.message || '获取API数据失败' },
      { status: 500 }
    );
  }
}