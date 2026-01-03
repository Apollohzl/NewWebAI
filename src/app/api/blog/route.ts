import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    // 从URL获取查询参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // 构建查询条件
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ]
      };
    }
    if (category) {
      query = { ...query, category };
    }

    // 构建查询参数
    const queryParams = new URLSearchParams({
      where: JSON.stringify(query),
      order: '-createdAt',
      limit: limit.toString(),
      skip: ((page - 1) * limit).toString(),
      count: '1'
    });

    // 查询LeanCloud
    const response = await leancloudRequest(`/classes/BlogPosts?${queryParams}`);
    
    // 获取总数和文章列表
    const total = response.count || 0;
    const posts = response.results || [];

    return NextResponse.json({
      posts: posts,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error: any) {
    console.error('获取博客数据失败:', error);
    return NextResponse.json(
      { error: error.message || '获取博客数据失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, category, tags, author } = await request.json();

    // 验证必填字段
    if (!title || !content) {
      return NextResponse.json(
        { error: '标题和内容是必填的' },
        { status: 400 }
      );
    }

    // 创建博客文章
    const blogPost = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      category: category || '技术',
      tags: tags || [],
      author: author || 'NewWebAI团队',
      status: 'published',
      readTime: Math.ceil(content.length / 500) + ' 分钟阅读'
    };

    const response = await leancloudRequest('/classes/BlogPosts', {
      method: 'POST',
      body: JSON.stringify(blogPost),
    });

    return NextResponse.json({
      message: '博客文章创建成功',
      post: response
    });
  } catch (error: any) {
    console.error('创建博客文章失败:', error);
    return NextResponse.json(
      { error: error.message || '创建博客文章失败' },
      { status: 500 }
    );
  }
}