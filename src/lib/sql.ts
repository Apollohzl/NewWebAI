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
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
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
    throw new Error(`数据库连接失败: ${error.message}`);
  }
}

/**
 * 执行查询
 */
export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('❌ 查询执行失败:', error);
    throw new Error(`查询执行失败: ${error.message}`);
  }
}

/**
 * 测试数据库连接
 */
export async function testConnection() {
  try {
    const connection = await getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ 数据库连接测试成功');
    return true;
  } catch (error) {
    console.error('❌ 数据库连接测试失败:', error);
    return false;
  }
}

/**
 * 获取数据库信息
 */
export async function getDatabaseInfo() {
  try {
    const [version] = await query('SELECT VERSION() as version');
    const [charset] = await query('SELECT @@character_set_database as charset');
    const [collation] = await query('SELECT @@collation_database as collation');
    
    return {
      version: version[0]?.version,
      charset: charset[0]?.charset,
      collation: collation[0]?.collation,
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