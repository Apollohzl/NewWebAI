// src/utils/logUtils.ts
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

export class LogUtils {
  async updateChangelog(entry: string): Promise<void> {
    try {
      // 仅在服务端环境下尝试写入文件
      if (typeof window === 'undefined') {
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
          fs.mkdirSync(logsDir, { recursive: true });
        }
        
        const changelogPath = path.join(process.cwd(), 'changelog.log');
        const logEntry = `${entry}\n`;
        
        await writeFile(changelogPath, logEntry, { flag: 'a' });
      }
    } catch (error) {
      console.error('Error writing to changelog:', error);
      // 如果文件写入失败，至少记录到控制台
      console.log(`[FALLBACK LOG] ${entry}`);
    }
  }

  async saveLastPrompt(prompt: string): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
          fs.mkdirSync(logsDir, { recursive: true });
        }
        
        const lastqPath = path.join(process.cwd(), 'lastq.log');
        const timestamp = new Date().toISOString();
        const content = `[${timestamp}] Last user prompt: ${prompt}\n`;
        
        await writeFile(lastqPath, content);
      }
    } catch (error) {
      console.error('Error saving last prompt:', error);
    }
  }

  async saveProjectSnapshot(snapshot: string): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
          fs.mkdirSync(logsDir, { recursive: true });
        }
        
        const snapshotPath = path.join(process.cwd(), 'project_snapshot.txt');
        await writeFile(snapshotPath, snapshot);
      }
    } catch (error) {
      console.error('Error saving project snapshot:', error);
    }
  }

  // 初始化日志系统
  async initializeLogging(): Promise<void> {
    if (typeof window === 'undefined') {
      const requiredFiles = [
        'changelog.log',
        'lastq.log',
        'project_snapshot.txt'
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(process.cwd(), file);
        if (!fs.existsSync(filePath)) {
          await writeFile(filePath, '');
        }
      }
    }
  }
}

// 创建全局实例
export const logUtils = new LogUtils();

export default logUtils;