import { NextRequest, NextResponse } from 'next/server';
import { BlogQueries } from '@/lib/sqlDatabase';

export async function GET(request: NextRequest) {
  try {
    // 从URL获取查询参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const author = searchParams.get('author') || '';

    const skip = (page - 1) * limit;
    
    // 构建查询条件
    let whereClause = 'WHERE published = TRUE';
    const params: any[] = [];
    
    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }
    
    if (author) {
      whereClause += ' AND author = ?';
      params.push(author);
    }
    
    if (search && search.trim()) {
      // 全文搜索
      whereClause += ` AND (title LIKE ? OR content LIKE ?)`;
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm);
    }

    // 计算总数
    const countQuery = `SELECT COUNT(*) as count FROM blog_posts ${whereClause}`;
    const countResultArray = await (await import('@/lib/sql')).query(countQuery, params) as any[];
    const total = countResultArray[0]?.count || 0;

    // 获取文章列表
    const selectQuery = `
      SELECT * FROM blog_posts 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const postsResult = await (await import('@/lib/sql')).query(selectQuery, [...params, limit, skip]) as any[];
    const posts = postsResult.length > 0 ? postsResult : [];

    // 转换为前端需要的格式
    const formattedPosts = posts.map((post: any) => ({
      ...post,
      id: post.id.toString(),
      objectId: post.id.toString(),
      published: post.published === 1,
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString()
    }));

    return NextResponse.json({
      posts: formattedPosts,
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
      published: true, // 默认发布
      readTime: Math.ceil(content.length / 500) + ' 分钟阅读'
    };

    const newPost = await BlogQueries.create(blogPost);

    if (!newPost) {
      return NextResponse.json(
        { error: '创建博客文章失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '博客文章创建成功',
      post: newPost
    });
  } catch (error: any) {
    console.error('创建博客文章失败:', error);
    return NextResponse.json(
      { error: error.message || '创建博客文章失败' },
      { status: 500 }
    );
  }
}