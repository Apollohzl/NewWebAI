import { NextResponse } from 'next/server';

// 从Ezoic的ads.txt管理器获取内容
async function getAdsTxtContent() {
  try {
    const response = await fetch('https://srv.adstxtmanager.com/19390/ken520.top');
    if (!response.ok) {
      throw new Error(`Failed to fetch ads.txt: ${response.status}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching ads.txt:', error);
    // 如果获取失败，返回基本的ads.txt内容
    return `# Ads.txt for ken520.top
# Managed by Ezoic
ezoic.ai, ab13e99d27942ff50e85e3003632e2cc, DIRECT
google.com, pub-6644558441501035, DIRECT, f08c47fec0942fa0`;
  }
}

export async function GET() {
  const content = await getAdsTxtContent();
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}