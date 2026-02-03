import { NextRequest } from 'next/server';

const API_KEY = 'sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B';
const BASE_URL = 'https://gen.pollinations.ai';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('message');
  const model = searchParams.get('model') || 'openai';
  const sessionId = searchParams.get('sessionId');
  const max_tokens = searchParams.get('max_tokens');
  
  // 检查必需参数
  if (!message) {
    return Response.json({
      error: 'Missing required parameter',
      message: 'message参数是必需的'
    }, { status: 400 });
  }
  
  try {
    // 构建消息数组
    const messages: any[] = [
      { role: 'user', content: message }
    ];
    
    // 如果有sessionId，可以在这里添加会话历史（实际应用中需要从数据库获取）
    
    // 调用Pollinations AI API
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: max_tokens
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({
        error: 'AI service error',
        message: `请求失败，状态码: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    // 返回响应
    return Response.json({
      success: true,
      data: {
        message: data.choices?.[0]?.message?.content || '抱歉，我无法回答这个问题。',
        model: model,
        sessionId: sessionId,
        usage: data.usage
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('AI Chat API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model = 'openai', sessionId, messages, temperature = 0.7, max_tokens = 2000 } = body;
    
    // 检查必需参数
    if (!message && !messages) {
      return Response.json({
        error: 'Missing required parameter',
        message: 'message或messages参数是必需的'
      }, { status: 400 });
    }
    
    // 构建消息数组
    let finalMessages: any[] = [];
    
    if (messages && Array.isArray(messages)) {
      // 使用提供的消息数组
      finalMessages = messages;
    } else if (message) {
      // 使用单个消息
      finalMessages = [
        { role: 'user', content: message }
      ];
    }
    
    // 调用Pollinations AI API
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: finalMessages,
        temperature: temperature,
        max_tokens: max_tokens,
        stream: false
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({
        error: 'AI service error',
        message: `请求失败，状态码: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    // 返回响应
    return Response.json({
      success: true,
      data: {
        message: data.choices?.[0]?.message?.content || '抱歉，我无法回答这个问题。',
        model: model,
        sessionId: sessionId,
        usage: data.usage,
        finishReason: data.choices?.[0]?.finish_reason
      },
      timestamp: new Date().toISOString(),
      method: 'POST'
    });
    
  } catch (error: any) {
    console.error('AI Chat API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}