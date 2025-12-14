// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { logger } from './services/logger';

export function middleware(request: NextRequest) {
  // 记录请求信息
  logger.info('Incoming request', {
    url: request.url,
    method: request.method,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
    timestamp: new Date().toISOString()
  });

  // 继续处理请求
  const response = NextResponse.next();
  
  // 可以在这里添加响应日志（在实际应用中可能需要更复杂的处理）
  return response;
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