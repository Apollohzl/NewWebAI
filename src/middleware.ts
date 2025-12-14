// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { logger } from './services/logger';

export async function middleware(request: NextRequest) {
  // 记录请求信息
  await logger.info('Incoming request', {
    url: request.url,
    method: request.method,
    userAgent: request.headers.get('user-agent') || 'unknown',
    ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    timestamp: new Date().toISOString()
  });

  // 继续处理请求
  return NextResponse.next();
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - 所有以 `/api/` 开头的路径
     * - 所有以 `/_next/` 开头的路径 (Next.js 内部文件)
     * - 所有以 `/favicon.ico` 结尾的路径
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-data' },
        { type: 'header', key: 'next-action' },
      ],
    },
  ],
};