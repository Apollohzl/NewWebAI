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

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: await response.json().catch(() => null)
  };
}

export async function GET(request: NextRequest) {
  const results: any[] = [];

  try {
    results.push({
      test: '环境变量检查',
      success: true,
      message: '环境变量正常',
      data: {
        LEANCLOUD_APP_ID: LEANCLOUD_APP_ID ? '已设置' : '未设置',
        LEANCLOUD_APP_KEY: LEANCLOUD_APP_KEY ? '已设置' : '未设置',
        LEANCLOUD_SERVER_URL: LEANCLOUD_SERVER_URL ? '已设置' : '未设置'
      }
    });

    // 测试1: 使用普通App Key查询用户
    try {
      const result = await leancloudRequest('/users?limit=5');
      results.push({
        test: '普通App Key查询用户',
        success: true,
        message: `获取到 ${result.results?.length || 0} 个用户`,
        data: {
          count: result.results?.length || 0,
          users: result.results?.map((u: any) => ({ username: u.username, email: u.email, objectId: u.objectId })) || []
        }
      });
    } catch (error: any) {
      results.push({
        test: '普通App Key查询用户',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 测试2: 使用Master Key查询用户
    try {
      const result = await leancloudRequestWithMasterKey('/users?limit=5');
      results.push({
        test: 'Master Key查询用户',
        success: result.ok,
        message: result.ok ? `获取到 ${result.data?.results?.length || 0} 个用户` : `失败: ${result.statusText}`,
        data: {
          status: result.status,
          count: result.data?.results?.length || 0,
          users: result.data?.results?.map((u: any) => ({ username: u.username, email: u.email, objectId: u.objectId })) || [],
          error: !result.ok ? result.data : null
        }
      });
    } catch (error: any) {
      results.push({
        test: 'Master Key查询用户',
        success: false,
        message: error.message,
        data: null
      });
    }

    // 测试3: 查询博客文章
    try {
      const result = await leancloudRequest('/classes/BlogPosts?limit=5');
      results.push({
        test: '查询博客文章',
        success: true,
        message: `获取到 ${result.results?.length || 0} 篇文章`,
        data: {
          count: result.results?.length || 0,
          posts: result.results?.map((p: any) => ({ title: p.title, author: p.author, objectId: p.objectId })) || []
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

    // 测试4: 查询产品
    try {
      const result = await leancloudRequest('/classes/Products?limit=5');
      results.push({
        test: '查询产品',
        success: true,
        message: `获取到 ${result.results?.length || 0} 个产品`,
        data: {
          count: result.results?.length || 0,
          products: result.results?.map((p: any) => ({ name: p.name, price: p.price, objectId: p.objectId })) || []
        }
      });
    } catch (error: any) {
      results.push({
        test: '查询产品',
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