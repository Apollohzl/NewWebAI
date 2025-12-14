// src/utils/logUtils.ts
import fs from 'fs';
import path from 'path';

export const updateChangelog = (entry: string): void => {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  const changelogPath = path.join(process.cwd(), 'changelog.log');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${entry}\n`;
  
  fs.appendFileSync(changelogPath, logEntry);
};

export const saveLastPrompt = (prompt: string): void => {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  const lastqPath = path.join(process.cwd(), 'lastq.log');
  const timestamp = new Date().toISOString();
  const content = `[${timestamp}] Last user prompt: ${prompt}\n`;
  
  fs.writeFileSync(lastqPath, content);
};

export const saveProjectSnapshot = (snapshot: string): void => {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  const snapshotPath = path.join(process.cwd(), 'project_snapshot.txt');
  fs.writeFileSync(snapshotPath, snapshot);
};

// 初始化日志系统
export const initializeLogging = (): void => {
  const requiredFiles = [
    'changelog.log',
    'lastq.log',
    'project_snapshot.txt'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  });
};