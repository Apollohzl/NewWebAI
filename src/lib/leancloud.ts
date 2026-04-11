// =====================================================
// SQLPub 数据库操作 (替换 LeanCloud)
// 保持文件名以保持向后兼容性
// =====================================================

import { query } from './sql';

// 为了保持向后兼容性，导出类似 LeanCloud 的接口
export async function leancloudRequest(endpoint: string, options: RequestInit = {}) {
  console.warn('⚠️  leancloudRequest() 已被 SQLPub 数据库替换，请使用 sqlDatabase.ts 中的方法');
  
  // 解析 endpoint 转换为 SQL 查询
  const tableName = endpoint.match(/\/classes\/(\w+)/)?.[1];
  
  if (!tableName) {
    throw new Error(`无法解析表名: ${endpoint}`);
  }
  
  try {
    if (options.method === 'POST') {
      // 创建操作
      const body = JSON.parse(options.body as string);
      const now = new Date();
      
      const fields = Object.keys(body).filter(k => k !== 'id');
      const values = fields.map(f => body[f]);
      const placeholders = fields.map(() => '?');
      
      const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
      await query(sql, [...values, now, now]);
      
      return { objectId: Date.now().toString() };
    } else if (endpoint.includes('?')) {
      // 查询操作
      const url = new URL('http://localhost' + endpoint);
      const where = url.searchParams.get('where');
      const limit = url.searchParams.get('limit') || '100';
      
      let sql = `SELECT * FROM ${tableName}`;
      const params: any[] = [];
      
      if (where) {
        const queryObj = JSON.parse(where);
        const conditions = Object.entries(queryObj).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            const queryValue = value as any;
            if (queryValue.$gte || queryValue.$lt) {
              if (queryValue.$gte?.__type === 'Date') {
                params.push(queryValue.$gte.iso);
                return `${key} >= ?`;
              }
            }
            return `${key} = ?`;
          }
          params.push(value);
          return `${key} = ?`;
        });
        sql += ' WHERE ' + conditions.join(' AND ');
      }
      
      sql += ` LIMIT ${limit}`;
      const results = await query(sql, params);
      
      return { results };
    }
    
    return { results: [] };
  } catch (error) {
    console.error('SQL 查询失败:', error);
    throw error;
  }
}

// 用户相关的操作 - 使用 SQL 数据库
export class LeanCloudUser {
  static async register(username: string, email: string, password: string) {
    console.warn('⚠️  LeanCloudUser.register() 已被 UserQueries.create() 替换');
    const { UserQueries } = await import('./sqlDatabase');
    return await UserQueries.create({ username, email, password, role: 'user', isActive: true });
  }

  static async login(email: string, password: string) {
    console.warn('⚠️  LeanCloudUser.login() 已被 UserQueries.findByEmail() 替换');
    const { UserQueries } = await import('./sqlDatabase');
    const user = await UserQueries.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    throw new Error('用户名或密码错误');
  }

  static async findUserByEmail(email: string) {
    console.warn('⚠️  LeanCloudUser.findUserByEmail() 已被 UserQueries.findByEmail() 替换');
    const { UserQueries } = await import('./sqlDatabase');
    return await UserQueries.findByEmail(email);
  }
}

// 初始化函数
export function initLeanCloud() {
  console.log('✅ SQLPub 数据库已初始化（替换 LeanCloud）');
}