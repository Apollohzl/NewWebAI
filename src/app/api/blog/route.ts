import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts as getBlogPostsFromDB, createBlogPost } from '@/lib/blogDatabase';

export async function GET(request: NextRequest) {
  try {
    // 从URL获取查询参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const author = searchParams.get('author') || '';

    // 注意：MongoDB的完整文本搜索需要预先建立文本索引
    // 在实际应用中，您可能需要在数据库设置中创建相应的索引
    const skip = (page - 1) * limit;
    
    // 这里简化处理，实际应用中可能需要更复杂的搜索逻辑
    const db = await (await import('@/lib/mongodb')).connectToDatabase();
    let query: any = {};
    
    if (search) {
      query.$text = { $search: search }; // 需要在数据库中创建文本索引
    }
    if (category) {
      query.category = category;
    }
    if (author) {
      query.author = author;
    }

    // 计算总数
    const total = await db.collection('blog_posts').countDocuments(query);

    // 获取文章列表
    let postsQuery = db.collection('blog_posts').find(query);
    
    if (search) {
      // 如果有搜索词，使用文本搜索排序
      postsQuery = postsQuery.sort({ score: { $meta: 'textScore' } });
    } else {
      // 否则按创建时间排序
      postsQuery = postsQuery.sort({ createdAt: -1 });
    }
    
    const posts = await postsQuery
      .skip(skip)
      .limit(limit)
      .toArray();

    // 转换为前端需要的格式
    const formattedPosts = posts.map(post => ({
      ...post,
      id: post._id.toString(),
      objectId: post._id.toString(),
      _id: undefined // 避免返回内部ID
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

    const newPost = await createBlogPost(blogPost);

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