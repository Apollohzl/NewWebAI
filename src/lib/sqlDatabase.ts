// =====================================================
// SQLPub 数据库操作工具函数
// TypeScript 版本
// =====================================================

import { query, getConnection } from './sql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { User, BlogPost, Product, ApiConfig, ChatMessage } from '@/types';

// 通用查询结果类型
export type QueryResult<T = any> = T[];
export type SingleResult<T = any> = T | null;

/**
 * 用户相关操作
 */
export const UserQueries = {
  // 查找用户
  async findByEmail(email: string): Promise<SingleResult<User>> {
    const results = await query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    ) as User[];
    return results.length > 0 ? results[0] : null;
  },

  // 根据ID查找用户
  async findById(id: string): Promise<SingleResult<User>> {
    const results = await query(
      'SELECT * FROM users WHERE id = ? LIMIT 1',
      [id]
    ) as User[];
    return results.length > 0 ? results[0] : null;
  },

  // 创建用户
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = Date.now().toString();
    
    await query(
      `INSERT INTO users (id, username, email, password, avatar, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userData.username,
        userData.email,
        userData.password,
        userData.avatar || null,
        userData.role || 'user',
        userData.isActive !== undefined ? userData.isActive : true
      ]
    );

    return {
      id,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as User;
  },

  // 更新用户
  async update(id: string, updates: Partial<User>): Promise<SingleResult<User>> {
    await query(
      `UPDATE users 
       SET username = ?, avatar = ?, role = ?, is_active = ?
       WHERE id = ?`,
      [
        updates.username,
        updates.avatar || null,
        updates.role || 'user',
        updates.isActive !== undefined ? updates.isActive : true,
        id
      ]
    );

    return this.findById(id);
  },

  // 删除用户
  async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM users WHERE id = ?',
      [id]
    ) as ResultSetHeader;
    return result.affectedRows > 0;
  },

  // 获取所有用户
  async getAll(): Promise<User[]> {
    const results = await query(
      'SELECT * FROM users ORDER BY created_at DESC'
    ) as any[];
    
    return results.map((user: any) => ({
      ...user,
      id: user.id.toString(),
      isActive: user.is_active !== undefined ? user.is_active : true,
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: user.updatedAt || new Date().toISOString()
    }));
  }
};

/**
 * 博客文章相关操作
 */
export const BlogQueries = {
  // 获取博客列表
  async getList(limit: number = 10, skip: number = 0): Promise<BlogPost[]> {
    const results = await query(
      `SELECT * FROM blog_posts 
       WHERE published = TRUE 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, skip]
    ) as BlogPost[];
    
    return results.map((post: any) => ({
      ...post,
      id: post.id.toString(),
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString()
    }));
  },

  // 根据ID获取博客文章
  async findById(id: string): Promise<SingleResult<BlogPost>> {
    const results = await query(
      'SELECT * FROM blog_posts WHERE id = ? LIMIT 1',
      [id]
    ) as BlogPost[];
    
    if (results.length === 0) return null;
    
    return {
      ...results[0],
      id: results[0].id.toString(),
      createdAt: results[0].createdAt || new Date().toISOString(),
      updatedAt: results[0].updatedAt || new Date().toISOString()
    };
  },

  // 创建博客文章
  async create(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const id = Date.now().toString();
    
    await query(
      `INSERT INTO blog_posts (id, title, content, excerpt, category, author, read_time, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        postData.title,
        postData.content,
        postData.excerpt || null,
        postData.category || '技术',
        postData.author,
        postData.readTime,
        postData.published !== undefined ? postData.published : true
      ]
    );

    return {
      id,
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as BlogPost;
  },

  // 更新博客文章
  async update(id: string, updates: Partial<BlogPost>): Promise<SingleResult<BlogPost>> {
    await query(
      `UPDATE blog_posts 
       SET title = ?, content = ?, excerpt = ?, category = ?, author = ?, read_time = ?, published = ?
       WHERE id = ?`,
      [
        updates.title,
        updates.content,
        updates.excerpt,
        updates.category,
        updates.author,
        updates.readTime,
        updates.published,
        id
      ]
    );

    return this.findById(id);
  },

  // 删除博客文章
  async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM blog_posts WHERE id = ?',
      [id]
    ) as ResultSetHeader;
    return result.affectedRows > 0;
  },

  // 根据作者获取博客文章
  async getByAuthor(author: string, limit: number = 10): Promise<BlogPost[]> {
    const results = await query(
      `SELECT * FROM blog_posts 
       WHERE author = ? AND published = TRUE 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [author, limit]
    ) as BlogPost[];
    
    return results.map((post: any) => ({
      ...post,
      id: post.id.toString(),
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString()
    }));
  }
};

/**
 * 聊天消息相关操作
 */
export const ChatQueries = {
  // 保存聊天消息
  async create(messageData: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<ChatMessage> {
    const id = Date.now().toString();
    
    await query(
      `INSERT INTO chat_messages (id, user_id, role, content, thinking_content, model, session_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        messageData.userId || null,
        messageData.role,
        messageData.content,
        messageData.thinkingContent || null,
        messageData.model || null,
        messageData.sessionId || null
      ]
    );

    return {
      id,
      ...messageData,
      createdAt: new Date().toISOString()
    } as ChatMessage;
  },

  // 获取用户聊天历史
  async getHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    const results = await query(
      `SELECT * FROM chat_messages 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [userId, limit]
    ) as ChatMessage[];
    
    return results.map((msg: any) => ({
      ...msg,
      id: msg.id.toString(),
      createdAt: msg.createdAt || new Date().toISOString()
    }));
  },

  // 获取会话消息
  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    const results = await query(
      `SELECT * FROM chat_messages 
       WHERE session_id = ? 
       ORDER BY created_at ASC`,
      [sessionId]
    ) as ChatMessage[];
    
    return results.map((msg: any) => ({
      ...msg,
      id: msg.id.toString(),
      createdAt: msg.createdAt || new Date().toISOString()
    }));
  }
};

/**
 * 产品相关操作
 */
export const ProductQueries = {
  // 获取所有产品
  async getAll(): Promise<Product[]> {
    const results = await query(
      'SELECT * FROM products WHERE in_stock = TRUE ORDER BY created_at DESC'
    ) as Product[];
    
    return results.map((product: any) => ({
      ...product,
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: product.updatedAt || new Date().toISOString(),
      tags: product.tags ? JSON.parse(product.tags as unknown as string) : [],
      features: product.features ? JSON.parse(product.features as unknown as string) : []
    }));
  },

  // 根据ID获取产品
  async findById(id: number): Promise<SingleResult<Product>> {
    const results = await query(
      'SELECT * FROM products WHERE id = ? LIMIT 1',
      [id]
    ) as Product[];
    
    if (results.length === 0) return null;
    
    const product = results[0];
    return {
      ...product,
      tags: product.tags ? JSON.parse(product.tags as unknown as string) : [],
      features: product.features ? JSON.parse(product.features as unknown as string) : [],
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: product.updatedAt || new Date().toISOString()
    } as Product;
  }
};

/**
 * API配置相关操作
 */
export const ApiQueries = {
  // 获取所有API配置
  async getAll(): Promise<ApiConfig[]> {
    const results = await query(
      'SELECT * FROM api_configs ORDER BY visits DESC'
    ) as ApiConfig[];
    
    return results.map((api: any) => ({
      ...api,
      tags: api.tags ? JSON.parse(api.tags as unknown as string) : [],
      methods: api.methods ? JSON.parse(api.methods as unknown as string) : [],
      createdAt: api.createdAt || new Date().toISOString(),
      updatedAt: api.updatedAt || new Date().toISOString()
    }));
  },

  // 根据分类获取API配置
  async getByCategory(category: string): Promise<ApiConfig[]> {
    const results = await query(
      'SELECT * FROM api_configs WHERE category = ? ORDER BY visits DESC',
      [category]
    ) as ApiConfig[];
    
    return results.map((api: any) => ({
      ...api,
      tags: api.tags ? JSON.parse(api.tags as unknown as string) : [],
      methods: api.methods ? JSON.parse(api.methods as unknown as string) : [],
      createdAt: api.createdAt || new Date().toISOString(),
      updatedAt: api.updatedAt || new Date().toISOString()
    }));
  }
};

/**
 * 数据库初始化和健康检查
 */
export const DatabaseUtils = {
  // 初始化数据库
  async initialize(): Promise<boolean> {
    try {
      console.log('🔄 正在初始化数据库...');
      
      // 测试连接
      const connection = await getConnection();
      await connection.ping();
      connection.release();
      
      // 检查必要表是否存在
      const tablesResult = await query('SHOW TABLES') as any[];
      const tableNames = tablesResult.map((t: any) => Object.values(t)[0]);
      
      const requiredTables = ['users', 'blog_posts', 'chat_messages', 'products'];
      const missingTables = requiredTables.filter(t => !tableNames.includes(t));
      
      if (missingTables.length > 0) {
        console.warn('⚠️  缺少必要表:', missingTables);
        return false;
      }
      
      console.log('✅ 数据库初始化成功');
      return true;
    } catch (error) {
      console.error('❌ 数据库初始化失败:', error);
      return false;
    }
  },

  // 健康检查
  async healthCheck(): Promise<{ status: string; database: any; tables: any[] }> {
    try {
      const versionResult = await query('SELECT VERSION() as version') as any[];
      const tablesResult = await query('SHOW TABLES') as any[];
      
      return {
        status: 'healthy',
        database: {
          version: versionResult[0]?.version,
          host: process.env.SQL_HOST,
          database: process.env.SQL_DATABASE
        },
        tables: tablesResult.map((t: any) => ({
          name: Object.values(t)[0],
          status: 'active'
        }))
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: null,
        tables: []
      };
    }
  }
};