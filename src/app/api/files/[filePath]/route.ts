import { NextRequest } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filePath: string }> }
) {
  try {
    // 从URL参数获取文件路径
    const { filePath } = await params;
    
    // 防止路径遍历攻击
    if (filePath.includes('..') || filePath.startsWith('/')) {
      return new Response('Invalid path', { status: 400 });
    }
    
    // 构建完整路径 (在public目录下)
    const fullPath = join(process.cwd(), 'public', filePath);
    
    // 检查文件是否存在
    if (!existsSync(fullPath)) {
      return new Response('File not found', { status: 404 });
    }
    
    // 读取文件内容
    const fileContent = readFileSync(fullPath);
    
    // 根据文件扩展名确定Content-Type
    const ext = filePath.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
    }
    
    return new Response(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // 缓存1年
      },
    });
  } catch (error) {
    console.error('获取文件失败:', error);
    return new Response('Internal server error', { status: 500 });
  }
}