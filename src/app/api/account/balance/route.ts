import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 直接使用硬编码的API密钥
    const apiKey = 'sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B';

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