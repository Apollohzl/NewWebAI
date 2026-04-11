import { NextRequest, NextResponse } from 'next/server';
import { BlogQueries } from '@/lib/sqlDatabase';
import { query } from '@/lib/sql';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '缺少博客文章ID' },
        { status: 400 }
      );
    }

    // 检查文章是否存在
    const post = await BlogQueries.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: '博客文章不存在' },
        { status: 404 }
      );
    }

    // 标记为未发布
    await query(
      'UPDATE blog_posts SET published = ? WHERE id = ?',
      [false, id]
    );

    return NextResponse.json({
      message: '博客文章已删除',
      success: true
    });
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '删除失败' },
      { status: 500 }
    );
  }
}