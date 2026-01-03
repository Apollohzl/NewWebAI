import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // 查询指定的博客文章
    const response = await leancloudRequest(`/classes/BlogPosts/${id}`);
    
    if (!response.objectId) {
      return NextResponse.json(
        { error: '博客文章不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      post: response
    });
  } catch (error: any) {
    console.error('获取博客文章失败:', error);
    return NextResponse.json(
      { error: error.message || '获取博客文章失败' },
      { status: 500 }
    );
  }
}