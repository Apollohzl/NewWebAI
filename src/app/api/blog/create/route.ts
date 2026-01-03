import { NextRequest, NextResponse } from 'next/server';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_MASTER_KEY = process.env.LEANCLOUD_MASTER_KEY;

async function leancloudRequest(path: string, options: RequestInit = {}) {
  const url = `https://api.leancloud.cn/1.1${path}`;
  
  const headers = {
    'X-LC-Id': LEANCLOUD_APP_ID!,
    'X-LC-Key': LEANCLOUD_MASTER_KEY!,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, category, tags, author, readTime } = await request.json();

    // 验证必填字段
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: '标题、内容和作者不能为空' },
        { status: 400 }
      );
    }

    // 创建博客文章
    const blogPost = await leancloudRequest('/classes/BlogPosts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        category: category || '技术',
        tags: tags || [],
        author,
        readTime: readTime || '5 分钟阅读',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
    });

    return NextResponse.json({
      success: true,
      message: '博客文章发布成功',
      post: blogPost
    });
  } catch (error) {
    console.error('创建博客文章错误:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '发布失败，请重试' },
      { status: 500 }
    );
  }
}