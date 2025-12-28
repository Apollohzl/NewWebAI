import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B';
const BASE_URL = 'https://gen.pollinations.ai';

export async function GET() {
  try {
    // 获取可用的图像模型
    const response = await fetch(`${BASE_URL}/image/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        error: 'Failed to fetch image models',
        message: `请求失败，状态码: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    // 提取模型信息
    const models = data?.map((model: any) => ({
      id: model.name,
      name: model.name,
      description: model.description || '',
      pricing: model.pricing || {},
      input_modalities: model.input_modalities || [],
      output_modalities: model.output_modalities || [],
      context_window: model.context_window || 0
    })) || [];
    
    // 返回模型列表
    return NextResponse.json({
      success: true,
      data: models,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('AI Image Models API Error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}