import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 400 });
    }

    // 向pollinations API请求余额
    const response = await fetch('https://gen.pollinations.ai/account/balance', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return Response.json({ 
      balance: data.balance 
    });
  } catch (error: any) {
    console.error('Error fetching balance:', error);
    return Response.json({ 
      error: error.message || 'Failed to fetch balance' 
    }, { status: 500 });
  }
}