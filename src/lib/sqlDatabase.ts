// =====================================================
// SQLPub 数据库操作工具函数
// TypeScript 版本
// =====================================================

import { query, getConnection } from './sql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

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
    const now = new Date();
    
    await query(
      `INSERT INTO users (id, username, email, password, avatar, role, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userData.username,
        userData.email,
        userData.password,
        userData.avatar || null,
        userData.role || 'user',
        userData.isActive !== undefined ? userData.isActive : true,
        now,
        now
      ]
    );

    return {
      id,
      ...userData,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    } as User;
  },

  // 更新用户
  async update(id: string, updates: Partial<User>): Promise<SingleResult<User>> {
    const now = new Date();
    
    await query(
      `UPDATE users 
       SET username = ?, avatar = ?, role = ?, is_active = ?, updated_at = ?
       WHERE id = ?`,
      [
        updates.username,
        updates.avatar || null,
        updates.role || 'user',
        updates.isActive !== undefined ? updates.isActive : true,
        now,
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
    ) as User[];
    
    return results.map(user => ({
      ...user,
      id: user.id.toString(),
      isActive: user.is_active !== undefined ? user.is_active : true,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString()
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
    
    return results.map(post => ({
      ...post,
      id: post.id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString()
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
      createdAt: results[0].createdAt?.toISOString(),
      updatedAt: results[0].updatedAt?.toISOString()
    };
  },

  // 创建博客文章
  async create(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const id = Date.now().toString();
    const now = new Date();
    
    await query(
      `INSERT INTO blog_posts (id, title, content, excerpt, category, author, read_time, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        postData.title,
        postData.content,
        postData.excerpt || null,
        postData.category || '技术',
        postData.author,
        postData.readTime,
        postData.published !== undefined ? postData.published : true,
        now,
        now
      ]
    );

    return {
      id,
      ...postData,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    } as BlogPost;
  },

  // 更新博客文章
  async update(id: string, updates: Partial<BlogPost>): Promise<SingleResult<BlogPost>> {
    const now = new Date();
    
    await query(
      `UPDATE blog_posts 
       SET title = ?, content = ?, excerpt = ?, category = ?, author = ?, read_time = ?, published = ?, updated_at = ?
       WHERE id = ?`,
      [
        updates.title,
        updates.content,
        updates.excerpt,
        updates.category,
        updates.author,
        updates.readTime,
        updates.published,
        now,
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
  }
};

/**
 * 聊天消息相关操作
 */
export const ChatQueries = {
  // 保存聊天消息
  async create(messageData: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<ChatMessage> {
    const id = Date.now().toString();
    const now = new Date();
    
    await query(
      `INSERT INTO chat_messages (id, user_id, role, content, thinking_content, model, session_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        messageData.userId || null,
        messageData.role,
        messageData.content,
        messageData.thinkingContent || null,
        messageData.model || null,
        messageData.sessionId || null,
        now
      ]
    );

    return {
      id,
      ...messageData,
      createdAt: now.toISOString()
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
    
    return results.map(msg => ({
      ...msg,
      id: msg.id.toString(),
      createdAt: msg.createdAt?.toISOString()
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
    
    return results.map(msg => ({
      ...msg,
      id: msg.id.toString(),
      createdAt: msg.createdAt?.toISOString()
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
    
    return results.map(product => ({
      ...product,
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
      tags: product.tags ? JSON.parse(product.tags as string) : [],
      features: product.features ? JSON.parse(product.features as string) : []
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
      tags: product.tags ? JSON.parse(product.tags as string) : [],
      features: product.features ? JSON.parse(product.features as string) : [],
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString()
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
    
    return results.map(api => ({
      ...api,
      tags: api.tags ? JSON.parse(api.tags as string) : [],
      methods: api.methods ? JSON.parse(api.methods as string) : [],
      createdAt: api.createdAt?.toISOString(),
      updatedAt: api.updatedAt?.toISOString()
    }));
  },

  // 根据分类获取API配置
  async getByCategory(category: string): Promise<ApiConfig[]> {
    const results = await query(
      'SELECT * FROM api_configs WHERE category = ? ORDER BY visits DESC',
      [category]
    ) as ApiConfig[];
    
    return results.map(api => ({
      ...api,
      tags: api.tags ? JSON.parse(api.tags as string) : [],
      methods: api.methods ? JSON.parse(api.methods as string) : [],
      createdAt: api.createdAt?.toISOString(),
      updatedAt: api.updatedAt?.toISOString()
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
      const [tables] = await query('SHOW TABLES');
      const tableNames = tables.map((t: any) => Object.values(t)[0]);
      
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
      const [version] = await query('SELECT VERSION() as version');
      const [tables] = await query('SHOW TABLES');
      
      return {
        status: 'healthy',
        database: {
          version: version[0]?.version,
          host: process.env.SQL_HOST,
          database: process.env.SQL_DATABASE
        },
        tables: tables.map((t: any) => ({
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