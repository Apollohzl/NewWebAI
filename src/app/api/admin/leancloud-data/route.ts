import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_SERVER_URL = process.env.LEANCLOUD_SERVER_URL;

// 使用Master Key的请求函数
async function leancloudRequestWithMasterKey(endpoint: string, options: RequestInit = {}) {
  const url = `${LEANCLOUD_SERVER_URL}/1.1${endpoint}`;
  
  const headers = {
    'X-LC-Id': LEANCLOUD_APP_ID!,
    'X-LC-Key': `${LEANCLOUD_APP_KEY},master`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    console.log('开始获取LeanCloud数据...');

    // 获取用户数据 - 从博客文章中提取用户信息
    let users: any[] = [];
    try {
      console.log('尝试从博客文章中提取用户信息...');
      
      // 获取博客文章来提取作者信息
      const blogPostsResponse = await leancloudRequest('/classes/BlogPosts?limit=1000');
      const blogPosts = blogPostsResponse.results || [];
      
      // 提取唯一的作者信息
      const authorMap = new Map<string, any>();
      
      blogPosts.forEach((post: any) => {
        if (post.author && !authorMap.has(post.author)) {
          authorMap.set(post.author, {
            username: post.author,
            email: `${post.author}@example.com`, // 生成模拟邮箱
            objectId: `author-${post.author}`,
            createdAt: post.createdAt,
            emailVerified: true,
            source: 'blog_posts'
          });
        }
      });
      
      users = Array.from(authorMap.values());
      console.log(`从博客文章中提取到 ${users.length} 个用户`);
      console.log('用户列表:', users.map((u: any) => ({ username: u.username, source: u.source })));
    } catch (error) {
      console.error('提取用户信息失败:', error);
      console.error('错误详情:', error instanceof Error ? error.message : '未知错误');
      users = [];
    }

    // 获取博客文章
    let blogPosts: any[] = [];
    try {
      console.log('尝试获取博客文章...');
      const blogPostsResponse = await leancloudRequest('/classes/BlogPosts?limit=100');
      console.log('博客文章响应:', JSON.stringify(blogPostsResponse).substring(0, 200));
      blogPosts = blogPostsResponse.results || [];
      console.log(`成功获取 ${blogPosts.length} 篇博客文章`);
    } catch (error) {
      console.error('获取博客文章失败:', error);
      blogPosts = [];
    }

    // 获取产品
    let products: any[] = [];
    try {
      console.log('尝试获取产品数据...');
      const productsResponse = await leancloudRequest('/classes/Products?limit=100');
      console.log('产品数据响应:', JSON.stringify(productsResponse).substring(0, 200));
      products = productsResponse.results || [];
      console.log(`成功获取 ${products.length} 个产品`);
    } catch (error) {
      console.error('获取产品数据失败:', error);
      products = [];
    }

    // 获取API配置
    let apis: any[] = [];
    try {
      console.log('尝试获取API配置...');
      const apisResponse = await leancloudRequest('/classes/APIs?limit=100');
      console.log('API配置响应:', JSON.stringify(apisResponse).substring(0, 200));
      apis = apisResponse.results || [];
      console.log(`成功获取 ${apis.length} 个API配置`);
    } catch (error) {
      console.error('获取API配置失败:', error);
      apis = [];
    }

    const data = {
      users,
      blogPosts,
      products,
      apis,
      stats: {
        totalUsers: users.length,
        totalBlogPosts: blogPosts.length,
        totalProducts: products.length,
        totalApis: apis.length,
      }
    };

    console.log('最终数据统计:', data.stats);
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取LeanCloud数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取数据失败' },
      { status: 500 }
    );
  }
}