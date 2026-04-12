// =====================================================
// SQLPub 数据库连接配置
// =====================================================

import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
  host: process.env.SQL_HOST || 'mysql6.sqlpub.com',
  port: parseInt(process.env.SQL_PORT || '3311'),
  user: process.env.SQL_USER || 'apollohzl',
  password: process.env.SQL_PASSWORD || 'iDceSWHqhSIUYXyY',
  database: process.env.SQL_DATABASE || 'hzliflow',
  charset: 'utf8mb4',
  timezone: '+08:00'
};

// 连接池配置
const poolConfig = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // 超时配置
  connectTimeout: 60000, // 连接超时 60 秒
  acquireTimeout: 60000, // 获取连接超时 60 秒
  timeout: 60000, // 查询超时 60 秒
  // SSL 配置
  ssl: {
    rejectUnauthorized: false
  }
};

// 创建连接池
const pool = mysql.createPool(poolConfig);

/**
 * 获取数据库连接
 */
export async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功');
    return connection;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    throw new Error(`数据库连接失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 执行查询（带重试机制）
 */
export async function query(sql: string, params?: any[], retries = 3): Promise<any> {
  console.log('Query called with SQL:', sql);
  console.log('Query params:', params, 'type:', typeof params);
  
  for (let i = 0; i < retries; i++) {
    try {
      const [results] = await pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error(`❌ 查询执行失败 (尝试 ${i + 1}/${retries}):`, error);
      
      // 如果是最后一次尝试，抛出错误
      if (i === retries - 1) {
        throw new Error(`查询执行失败: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('查询执行失败：重试次数已用尽');
}

/**
 * 测试数据库连接
 */
export async function testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return {
      success: true,
      message: '数据库连接成功',
      details: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database
      }
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ 数据库连接测试失败:', error);
    return {
      success: false,
      message: `数据库连接失败: ${errorMessage}`,
      details: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        error: errorMessage
      }
    };
  }
}

/**
 * 获取数据库信息
 */
export async function getDatabaseInfo() {
  try {
    const versionResults = await query('SELECT VERSION() as version') as any[];
    const charsetResults = await query('SELECT @@character_set_database as charset') as any[];
    const collationResults = await query('SELECT @@collation_database as collation') as any[];
    
    return {
      version: versionResults[0]?.version,
      charset: charsetResults[0]?.charset,
      collation: collationResults[0]?.collation,
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database
    };
  } catch (error) {
    console.error('❌ 获取数据库信息失败:', error);
    return null;
  }
}

/**
 * 关闭连接池
 */
export async function closePool() {
  try {
    await pool.end();
    console.log('✅ 数据库连接池已关闭');
  } catch (error) {
    console.error('❌ 关闭连接池失败:', error);
  }
}

// 导出连接池，用于需要直接使用连接池的场景
export { pool };

// 默认导出
export default {
  getConnection,
  query,
  testConnection,
  getDatabaseInfo,
  closePool,
  pool
};