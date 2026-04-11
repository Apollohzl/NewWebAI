import { NextRequest, NextResponse } from 'next/server';
import { query, testConnection, getDatabaseInfo } from '@/lib/sql';

export async function GET(request: NextRequest) {
  const results: any[] = [];

  try {
    results.push({
      test: '环境变量检查',
      success: true,
      message: '环境变量正常',
      data: {
        SQL_HOST: process.env.SQL_HOST ? '已设置' : '未设置',
        SQL_PORT: process.env.SQL_PORT ? '已设置' : '未设置',
        SQL_USER: process.env.SQL_USER ? '已设置' : '未设置',
        SQL_DATABASE: process.env.SQL_DATABASE ? '已设置' : '未设置'
      }
    });

    // 测试数据库连接
    try {
      const isConnected = await testConnection();
      results.push({
        test: '数据库连接测试',
        success: isConnected,
        message: isConnected ? '数据库连接成功' : '数据库连接失败',
        data: {
          connected: isConnected
        }
      });
    } catch (error: any) {
      results.push({
        test: '数据库连接测试',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 测试查询用户
    try {
      const [users] = await query('SELECT COUNT(*) as count FROM users');
      results.push({
        test: '查询用户数据',
        success: true,
        message: `当前有 ${users[0]?.count || 0} 个用户`,
        data: {
          count: users[0]?.count || 0
        }
      });
    } catch (error: any) {
      results.push({
        test: '查询用户数据',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 测试查询博客文章
    try {
      const [posts] = await query('SELECT COUNT(*) as count FROM blog_posts');
      results.push({
        test: '查询博客文章',
        success: true,
        message: `当前有 ${posts[0]?.count || 0} 篇文章`,
        data: {
          count: posts[0]?.count || 0
        }
      });
    } catch (error: any) {
      results.push({
        test: '查询博客文章',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 测试查询产品
    try {
      const [products] = await query('SELECT COUNT(*) as count FROM products');
      results.push({
        test: '查询产品数据',
        success: true,
        message: `当前有 ${products[0]?.count || 0} 个产品`,
        data: {
          count: products[0]?.count || 0
        }
      });
    } catch (error: any) {
      results.push({
        test: '查询产品数据',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 获取数据库信息
    try {
      const dbInfo = await getDatabaseInfo();
      if (dbInfo) {
        results.push({
          test: '数据库信息',
          success: true,
          message: '数据库信息获取成功',
          data: dbInfo
        });
      }
    } catch (error: any) {
      results.push({
        test: '数据库信息',
        success: false,
        message: error.message,
        data: null
      });
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '测试失败',
        results 
      },
      { status: 500 }
    );
  }
}