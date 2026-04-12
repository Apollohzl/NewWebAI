import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/sql';

export async function GET(request: NextRequest) {
  try {
    console.log('开始获取数据库数据...');

    // 获取博客文章
    let blogPosts: any[] = [];
    try {
      console.log('尝试获取博客文章...');
      const postsResult = await query('SELECT * FROM blog_posts ORDER BY id DESC LIMIT 100') as any[];
      const [posts] = postsResult.length > 0 ? [postsResult] : [[]];
      blogPosts = posts || [];
      console.log(`成功获取 ${blogPosts.length} 篇博客文章`);
    } catch (error) {
      console.error('获取博客文章失败:', error);
      blogPosts = [];
    }

    // 获取产品
    let products: any[] = [];
    try {
      console.log('尝试获取产品数据...');
      const productResult = await query('SELECT * FROM products') as any[];
      const [productData] = productResult.length > 0 ? [productResult] : [[]];
      products = productData || [];
      console.log(`成功获取 ${products.length} 个产品`);
    } catch (error) {
      console.error('获取产品数据失败:', error);
      products = [];
    }

    // 获取API配置
    let apis: any[] = [];
    try {
      console.log('尝试获取API配置...');
      const apiResult = await query('SELECT * FROM api_configs ORDER BY visits DESC') as any[];
      const [apiData] = apiResult.length > 0 ? [apiResult] : [[]];
      apis = apiData || [];
      console.log(`成功获取 ${apis.length} 个API配置`);
    } catch (error) {
      console.error('获取API配置失败:', error);
      apis = [];
    }

    // 获取今日新增用户
    let todayNewUsers = 0;
    // 注意：由于 created_at 字段由 SQLPub 自动管理，暂时无法统计今日新增用户
    // 如果需要此功能，请联系数据库管理员确认字段名称

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
    console.error('获取数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取数据失败' },
      { status: 500 }
    );
  }
}