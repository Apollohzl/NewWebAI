// src/utils/logUtils.ts
// 简化版日志工具，避免使用 Node.js 特定 API

export class LogUtils {
  async updateChangelog(entry: string): Promise<void> {
    // 在实际部署环境中，可以调用 API 端点来记录日志
    // 或者只记录在控制台中
    console.log(`[CHANGELOG] ${entry}`);
    
    // 如果需要持久化记录，在服务端通过 API 调用来实现
    if (typeof window === 'undefined') {
      try {
        // 发送到日志 API
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: entry,
            level: 'info',
            meta: { type: 'changelog' }
          }),
        });
      } catch (error) {
        console.error('Failed to send changelog to API:', error);
      }
    }
  }

  async saveLastPrompt(prompt: string): Promise<void> {
    console.log(`[LAST_PROMPT] ${prompt}`);
  }

  async saveProjectSnapshot(snapshot: string): Promise<void> {
    console.log(`[PROJECT_SNAPSHOT] ${snapshot.substring(0, 100)}...`);
  }

  async initializeLogging(): Promise<void> {
    // 不需要特殊初始化
    console.log('[LOGGING] Logging initialized');
  }
}

// 创建全局实例
export const logUtils = new LogUtils();

export default logUtils;