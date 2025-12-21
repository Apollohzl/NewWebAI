import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 获取查询参数中的url
  const searchParams = request.nextUrl.searchParams;
  const encodedUrl = searchParams.get('url');
  
  // 检查URL参数是否存在
  if (!encodedUrl) {
    return new Response(
      JSON.stringify({ 
        error: 'URL parameter is required', 
        message: '需要提供目标URL参数' 
      }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
  
  try {
    // 解码URL
    const targetUrl = decodeURIComponent(encodedUrl);
    
    // 验证URL格式
    new URL(targetUrl);
    
    // 从目标URL获取数据
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Target server returned error',
          status: response.status,
          statusText: response.statusText
        }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }
    
    // 读取响应数据
    const data = await response.arrayBuffer();
    
    // 复制原始响应的头部
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    // 返回原始响应的数据和头部
    return new Response(data, {
      status: response.status,
      headers: headers
    });
  } catch (error: any) {
    console.error('CORS Proxy Error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch data from target URL', 
        message: error.message,
        url: encodedUrl
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

// 只仅处理GET请求，拒绝其他方法
export async function POST() {
  return Response.json(
    { error: 'Method not allowed' }, 
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}

export async function PUT() {
  return Response.json(
    { error: 'Method not allowed' }, 
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}

export async function DELETE() {
  return Response.json(
    { error: 'Method not allowed' }, 
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}

export async function PATCH() {
  return Response.json(
    { error: 'Method not allowed' }, 
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}