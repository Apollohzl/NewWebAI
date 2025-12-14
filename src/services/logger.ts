// src/services/logger.ts
import { headers } from 'next/headers';
import { logUtils } from '../utils/logUtils';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  meta?: Record<string, any>;
  userAgent?: string;
  ip?: string;
}

export class Logger {
  async writeLog(entry: LogEntry): Promise<void> {
    // 在服务端环境中记录日志
    // 使用环境变量或外部服务来记录日志，而不是文件系统
    console.log(`[${entry.level.toUpperCase()}] ${entry.timestamp} - ${entry.message}`, {
      meta: entry.meta,
      userAgent: entry.userAgent,
      ip: entry.ip
    });
    
    // 如果需要更持久的日志记录，可以调用API端点
    try {
      // 记录到日志文件
      await logUtils.updateChangelog(
        `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`
      );
    } catch (error) {
      console.error('Failed to update changelog:', error);
    }
  }
  
  async info(message: string, meta?: Record<string, any>): Promise<void> {
    const userAgent = headers().get('user-agent') || 'unknown';
    const ip = headers().get('x-forwarded-for') || 'unknown';
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      meta,
      userAgent,
      ip
    };
    await this.writeLog(entry);
    console.log(`[INFO] ${message}`, meta || '');
  }
  
  async warn(message: string, meta?: Record<string, any>): Promise<void> {
    const userAgent = headers().get('user-agent') || 'unknown';
    const ip = headers().get('x-forwarded-for') || 'unknown';
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      meta,
      userAgent,
      ip
    };
    await this.writeLog(entry);
    console.warn(`[WARN] ${message}`, meta || '');
  }
  
  async error(message: string, meta?: Record<string, any>): Promise<void> {
    const userAgent = headers().get('user-agent') || 'unknown';
    const ip = headers().get('x-forwarded-for') || 'unknown';
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      meta,
      userAgent,
      ip
    };
    await this.writeLog(entry);
    console.error(`[ERROR] ${message}`, meta || '');
  }
  
  async debug(message: string, meta?: Record<string, any>): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      const userAgent = headers().get('user-agent') || 'unknown';
      const ip = headers().get('x-forwarded-for') || 'unknown';
      
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        meta,
        userAgent,
        ip
      };
      await this.writeLog(entry);
      console.log(`[DEBUG] ${message}`, meta || '');
    }
  }
}

// 创建全局日志实例
export const logger = new Logger();

export default logger;