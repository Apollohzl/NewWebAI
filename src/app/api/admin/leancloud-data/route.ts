import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    // 获取用户数据
    const usersResponse = await leancloudRequest('/users?limit=100');
    const users = usersResponse.results || [];

    // 获取博客文章
    const blogPostsResponse = await leancloudRequest('/classes/BlogPosts?limit=100');
    const blogPosts = blogPostsResponse.results || [];

    // 获取产品
    const productsResponse = await leancloudRequest('/classes/Products?limit=100');
    const products = productsResponse.results || [];

    // 获取API配置
    const apisResponse = await leancloudRequest('/classes/APIs?limit=100');
    const apis = apisResponse.results || [];

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

    return NextResponse.json(data);
  } catch (error) {
    console.error('获取LeanCloud数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取数据失败' },
      { status: 500 }
    );
  }
}