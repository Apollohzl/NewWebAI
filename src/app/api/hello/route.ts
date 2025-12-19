import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 获取查询参数
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') || 'World';
  const greeting = searchParams.get('greeting') || 'Hello';
  const lang = searchParams.get('lang') || 'zh';
  
  // 模拟一些处理时间
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 根据语言返回不同的问候语
  let greetingText = `${greeting} ${name}!`;
  if (lang === 'zh') {
    greetingText = `${greeting}，${name}！`;
  } else if (lang === 'en') {
    greetingText = `${greeting} ${name}!`;
  } else if (lang === 'ja') {
    greetingText = `${greeting}、${name}！`;
  }
  
  // 返回JSON响应
  return Response.json({
    message: greetingText,
    timestamp: new Date().toISOString(),
    params: {
      name,
      greeting,
      lang
    },
    api: 'hello',
    version: '1.0.0'
  });
}

// POST请求处理示例
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name = 'World', greeting = 'Hello', lang = 'zh' } = body;
    
    // 根据语言返回不同的问候语
    let greetingText = `${greeting} ${name}!`;
    if (lang === 'zh') {
      greetingText = `${greeting}，${name}！`;
    } else if (lang === 'en') {
      greetingText = `${greeting} ${name}!`;
    } else if (lang === 'ja') {
      greetingText = `${greeting}、${name}！`;
    }
    
    return Response.json({
      message: greetingText,
      timestamp: new Date().toISOString(),
      params: {
        name,
        greeting,
        lang
      },
      api: 'hello',
      version: '1.0.0',
      method: 'POST'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}