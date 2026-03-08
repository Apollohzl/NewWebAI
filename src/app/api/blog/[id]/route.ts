import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById } from '@/lib/blogDatabase';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // 查询指定的博客文章
    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: '博客文章不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      post
    });
  } catch (error: any) {
    console.error('获取博客文章失败:', error);
    return NextResponse.json(
      { error: error.message || '获取博客文章失败' },
      { status: 500 }
    );
  }
}