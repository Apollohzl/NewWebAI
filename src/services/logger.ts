// src/services/logger.ts
import fs from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  meta?: Record<string, any>;
}

export class Logger {
  private logFilePath: string;
  
  constructor() {
    // 创建 logs 目录
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    // 设置日志文件路径
    const date = new Date().toISOString().split('T')[0];
    this.logFilePath = path.join(logsDir, `app-${date}.log`);
  }
  
  private writeLog(entry: LogEntry): void {
    const logLine = JSON.stringify(entry) + '\n';
    fs.appendFileSync(this.logFilePath, logLine);
  }
  
  info(message: string, meta?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      meta
    };
    this.writeLog(entry);
    console.log(`[INFO] ${message}`, meta || '');
  }
  
  warn(message: string, meta?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      meta
    };
    this.writeLog(entry);
    console.warn(`[WARN] ${message}`, meta || '');
  }
  
  error(message: string, meta?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      meta
    };
    this.writeLog(entry);
    console.error(`[ERROR] ${message}`, meta || '');
  }
  
  debug(message: string, meta?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      meta
    };
    this.writeLog(entry);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, meta || '');
    }
  }
}

// 创建全局日志实例
export const logger = new Logger();

export default logger;