import { NextRequest } from 'next/server';
import { translateToEnglish } from '@/services/translate';

const API_KEY = 'sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B';
const BASE_URL = 'https://image.pollinations.ai';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prompt = searchParams.get('prompt');
  const model = searchParams.get('model') || 'zimage';
  const width = searchParams.get('width') || '1024';
  const height = searchParams.get('height') || '1024';
  const seed = searchParams.get('seed');
  const enhance = searchParams.get('enhance') || 'false';
  const negative_prompt = searchParams.get('negative_prompt') || 'worst quality, blurry';
  const safe = searchParams.get('safe') || 'false';
  const quality = searchParams.get('quality') || 'medium';
  const transparent = searchParams.get('transparent') || 'false';
  const duration = searchParams.get('duration');
  const aspectRatio = searchParams.get('aspectRatio');
  const audio = searchParams.get('audio') || 'false';
  
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
    let imageUrl = `${BASE_URL}/image/${encodeURIComponent(translatedPrompt)}?key=${API_KEY}&model=${model}&width=${width}&height=${height}&enhance=${enhance}&negative_prompt=${encodeURIComponent(negative_prompt)}&safe=${safe}&quality=${quality}&transparent=${transparent}`;
    
    if (seed) {
      imageUrl += `&seed=${seed}`;
    }
    if (duration) {
      imageUrl += `&duration=${duration}`;
    }
    if (aspectRatio) {
      imageUrl += `&aspectRatio=${aspectRatio}`;
    }
    imageUrl += `&audio=${audio}`;
    
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
        enhance: enhance === 'true',
        negative_prompt: negative_prompt,
        safe: safe === 'true',
        quality: quality,
        transparent: transparent === 'true',
        duration: duration ? parseInt(duration) : undefined,
        aspectRatio: aspectRatio,
        audio: audio === 'true',
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
      model = 'zimage', 
      width = 1024, 
      height = 1024, 
      seed,
      enhance = false,
      negative_prompt = 'worst quality, blurry',
      safe = false,
      quality = 'medium',
      transparent = false,
      duration,
      aspectRatio,
      audio = false
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
    const translatedNegativePrompt = negative_prompt ? await translateToEnglish(negative_prompt) : 'worst quality, blurry';
    
    // 构建图像生成URL
    let imageUrl = `${BASE_URL}/image/${encodeURIComponent(translatedPrompt)}?model=${model}&width=${width}&height=${height}&enhance=${enhance}&negative_prompt=${encodeURIComponent(translatedNegativePrompt)}&safe=${safe}&quality=${quality}&transparent=${transparent}&key=${API_KEY}`;
    if (seed) {
      imageUrl += `&seed=${seed}`;
    }
    if (duration) {
      imageUrl += `&duration=${duration}`;
    }
    if (aspectRatio) {
      imageUrl += `&aspectRatio=${aspectRatio}`;
    }
    imageUrl += `&audio=${audio}`;
    
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
        enhance: enhance,
        negative_prompt: negative_prompt,
        translatedNegativePrompt: translatedNegativePrompt,
        safe: safe,
        quality: quality,
        transparent: transparent,
        duration: duration,
        aspectRatio: aspectRatio,
        audio: audio,
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