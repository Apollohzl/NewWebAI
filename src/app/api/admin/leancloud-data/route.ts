import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

export async function GET(request: NextRequest) {
  try {
    console.log('开始获取LeanCloud数据...');

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

    // 获取今日新增用户
    let todayNewUsers = 0;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // 使用LeanCloud的日期查询
      const whereClause = JSON.stringify({
        createdAt: {
          $gte: { __type: "Date", iso: today.toISOString() },
          $lt: { __type: "Date", iso: tomorrow.toISOString() }
        }
      });
      
      const usersResponse = await leancloudRequest(`/users?where=${encodeURIComponent(whereClause)}&count=1&limit=0`);
      
      if (usersResponse.count !== undefined) {
        todayNewUsers = usersResponse.count;
      }
    } catch (error) {
      console.error('获取今日新增用户失败:', error);
      // 失败时使用备用方案：从博客文章作者中获取
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayUsers = new Set<string>();
      blogPosts.forEach((post: any) => {
        if (post.createdAt) {
          const postDate = new Date(post.createdAt);
          if (postDate >= today) {
            todayUsers.add(post.author || 'unknown');
          }
        }
      });
      todayNewUsers = todayUsers.size;
    }

    const data = {
      blogPosts,
      products,
      apis,
      stats: {
        totalBlogPosts: blogPosts.length,
        totalProducts: products.length,
        totalApis: apis.length,
        todayNewUsers: todayNewUsers,
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