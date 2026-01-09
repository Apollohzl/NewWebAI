import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 更新API状态
    await leancloudRequest(`/classes/APIs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新API状态失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '更新失败' },
      { status: 500 }
    );
  }
}