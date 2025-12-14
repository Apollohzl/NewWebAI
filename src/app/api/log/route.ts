// src/app/api/log/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '../../../services/logger';

export async function POST(request: NextRequest) {
  try {
    const { message, level = 'info', meta } = await request.json();
    
    // 根据级别记录日志
    switch (level) {
      case 'error':
        logger.error(message, meta);
        break;
      case 'warn':
        logger.warn(message, meta);
        break;
      case 'debug':
        logger.debug(message, meta);
        break;
      case 'info':
      default:
        logger.info(message, meta);
        break;
    }
    
    return NextResponse.json({ success: true, message: 'Log recorded successfully' });
  } catch (error) {
    logger.error('Error in log API', { error: (error as Error).message });
    return NextResponse.json({ success: false, error: 'Failed to record log' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Log API is running' });
}