import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    // 获取用户数据
    let users: any[] = [];
    try {
      const usersResponse = await leancloudRequest('/users?limit=100');
      users = usersResponse.results || [];
    } catch (error) {
      console.error('获取用户数据失败:', error);
      users = [];
    }

    // 获取博客文章
    let blogPosts: any[] = [];
    try {
      const blogPostsResponse = await leancloudRequest('/classes/BlogPosts?limit=100');
      blogPosts = blogPostsResponse.results || [];
    } catch (error) {
      console.error('获取博客文章失败:', error);
      blogPosts = [];
    }

    // 获取产品
    let products: any[] = [];
    try {
      const productsResponse = await leancloudRequest('/classes/Products?limit=100');
      products = productsResponse.results || [];
    } catch (error) {
      console.error('获取产品数据失败:', error);
      products = [];
    }

    // 获取API配置
    let apis: any[] = [];
    try {
      const apisResponse = await leancloudRequest('/classes/APIs?limit=100');
      apis = apisResponse.results || [];
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('获取LeanCloud数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取数据失败' },
      { status: 500 }
    );
  }
}