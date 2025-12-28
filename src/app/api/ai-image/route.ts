import { NextRequest } from 'next/server';
import { translateToEnglish } from '@/services/translate';

const API_KEY = 'sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B';
const BASE_URL = 'https://gen.pollinations.ai';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prompt = searchParams.get('prompt');
  const model = searchParams.get('model') || 'flux';
  const width = searchParams.get('width') || '512';
  const height = searchParams.get('height') || '512';
  const seed = searchParams.get('seed');
  const nologo = searchParams.get('nologo') || 'true';
  
  // 检查必需参数
  if (!prompt) {
    return Response.json({
      error: 'Missing required parameter',
      message: 'prompt参数是必需的'
    }, { status: 400 });
  }
  
  try {
    // 自动翻译中文提示词为英文
    const translatedPrompt = await translateToEnglish(prompt);
    
    // 构建图像生成URL
    let imageUrl = `${BASE_URL}/image/${encodeURIComponent(translatedPrompt)}?model=${model}&width=${width}&height=${height}&nologo=${nologo}&key=${API_KEY}`;
    if (seed) {
      imageUrl += `&seed=${seed}`;
    }
    
    // 调用Pollinations AI生成图像
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({
        error: 'AI service error',
        message: `请求失败，状态码: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }
    
    // 获取图像数据
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/png';
    
    // 返回响应
    return Response.json({
      success: true,
      data: {
        imageUrl: imageUrl,
        imageData: `data:${mimeType};base64,${base64Image}`,
        prompt: prompt,
        translatedPrompt: translatedPrompt,
        model: model,
        width: parseInt(width),
        height: parseInt(height),
        seed: seed,
        mimeType: mimeType
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('AI Image API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      prompt, 
      model = 'flux', 
      width = 512, 
      height = 512, 
      seed,
      nologo = true,
      style,
      negative_prompt
    } = body;
    
    // 检查必需参数
    if (!prompt) {
      return Response.json({
        error: 'Missing required parameter',
        message: 'prompt参数是必需的'
      }, { status: 400 });
    }
    
    // 自动翻译中文提示词为英文
    const translatedPrompt = await translateToEnglish(prompt);
    const translatedNegativePrompt = negative_prompt ? await translateToEnglish(negative_prompt) : '';
    
    // 构建图像生成URL
    let imageUrl = `${BASE_URL}/image/${encodeURIComponent(translatedPrompt)}?model=${model}&width=${width}&height=${height}&nologo=${nologo}&key=${API_KEY}`;
    if (seed) {
      imageUrl += `&seed=${seed}`;
    }
    if (translatedNegativePrompt) {
      imageUrl += `&negative_prompt=${encodeURIComponent(translatedNegativePrompt)}`;
    }
    if (style) {
      imageUrl += `&style=${encodeURIComponent(style)}`;
    }
    
    // 调用Pollinations AI生成图像
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({
        error: 'AI service error',
        message: `请求失败，状态码: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }
    
    // 获取图像数据
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/png';
    
    // 返回响应
    return Response.json({
      success: true,
      data: {
        imageUrl: imageUrl,
        imageData: `data:${mimeType};base64,${base64Image}`,
        prompt: prompt,
        translatedPrompt: translatedPrompt,
        model: model,
        width: width,
        height: height,
        seed: seed,
        style: style,
        negative_prompt: negative_prompt,
        translatedNegativePrompt: translatedNegativePrompt,
        mimeType: mimeType
      },
      timestamp: new Date().toISOString(),
      method: 'POST'
    });
    
  } catch (error: any) {
    console.error('AI Image API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}