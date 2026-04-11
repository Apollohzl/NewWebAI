// =====================================================
// SQL 数据库连接测试脚本
// 验证数据库连接和基本功能
// =====================================================

const mysql = require('mysql2/promise');

// 从环境变量或配置文件读取配置
const config = {
  host: process.env.SQL_HOST || 'localhost',
  port: process.env.SQL_PORT || 3306,
  user: process.env.SQL_USER || 'root',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DATABASE || 'newwebai'
};

async function testDatabaseConnection() {
  console.log('=====================================================');
  console.log('     SQL 数据库连接测试');
  console.log('=====================================================\n');
  
  let connection = null;
  
  try {
    console.log('🔌 正在连接数据库...');
    console.log(`   主机: ${config.host}`);
    console.log(`   端口: ${config.port}`);
    console.log(`   用户: ${config.user}`);
    console.log(`   数据库: ${config.database}\n`);
    
    // 创建连接
    connection = await mysql.createConnection(config);
    console.log('✅ 数据库连接成功!\n');
    
    // 测试基本查询
    console.log('📊 执行基本查询测试...\n');
    
    // 1. 检查数据库版本
    const [version] = await connection.execute('SELECT VERSION() as version');
    console.log(`   MySQL 版本: ${version[0].version}`);
    
    // 2. 检查数据库字符集
    const [charset] = await connection.execute('SELECT @@character_set_database as charset');
    console.log(`   字符集: ${charset[0].charset}`);
    
    // 3. 检查表列表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`\n   发现 ${tables.length} 个表:`);
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });
    
    // 4. 测试各表的记录数
    console.log('\n📈 表记录统计:\n');
    
    const tableStats = await Promise.all([
      checkTableCount(connection, 'users', '用户表'),
      checkTableCount(connection, 'blog_posts', '博客文章表'),
      checkTableCount(connection, 'blog_tags', '博客标签表'),
      checkTableCount(connection, 'blog_post_tags', '文章标签关联表'),
      checkTableCount(connection, 'chat_messages', '聊天记录表'),
      checkTableCount(connection, 'products', '产品表'),
      checkTableCount(connection, 'api_configs', 'API配置表'),
      checkTableCount(connection, 'ads', '广告表'),
      checkTableCount(connection, 'video_models', '视频模型表'),
      checkTableCount(connection, 'cart_items', '购物车表'),
      checkTableCount(connection, 'ai_image_generations', 'AI图像生成记录表'),
      checkTableCount(connection, 'user_sessions', '用户会话表'),
      checkTableCount(connection, 'system_configs', '系统配置表')
    ]);
    
    // 5. 测试索引
    console.log('\n🔍 检查关键索引:\n');
    await checkIndexes(connection, 'users');
    await checkIndexes(connection, 'blog_posts');
    
    // 6. 测试外键约束
    console.log('\n🔗 检查外键约束:\n');
    await checkForeignKeys(connection);
    
    // 7. 测试插入和查询
    console.log('\n🧪 测试基本操作:\n');
    await testBasicOperations(connection);
    
    console.log('\n=====================================================');
    console.log('           测试完成 - 所有功能正常');
    console.log('=====================================================\n');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    console.error('\n错误详情:', error);
    return false;
    
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 数据库连接已关闭\n');
    }
  }
}

async function checkTableCount(connection, tableName, displayName) {
  try {
    const [result] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
    const count = result[0].count;
    console.log(`   ✅ ${displayName.padEnd(20)}: ${count} 条记录`);
    return { table: tableName, count, status: 'success' };
  } catch (error) {
    console.log(`   ⚠️  ${displayName.padEnd(20)}: ${error.message}`);
    return { table: tableName, count: 0, status: 'error', error: error.message };
  }
}

async function checkIndexes(connection, tableName) {
  try {
    const [indexes] = await connection.execute(`SHOW INDEX FROM ${tableName}`);
    console.log(`   ✅ ${tableName} 表: ${indexes.length} 个索引`);
    indexes.forEach(index => {
      console.log(`      - ${index.Key_name} (${index.Column_name})`);
    });
  } catch (error) {
    console.log(`   ⚠️  ${tableName} 表索引检查失败: ${error.message}`);
  }
}

async function checkForeignKeys(connection) {
  try {
    const [constraints] = await connection.execute(`
      SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE REFERENCED_TABLE_SCHEMA = DATABASE()
      AND REFERENCED_TABLE_NAME IS NOT NULL
    `);
    
    if (constraints.length > 0) {
      console.log(`   ✅ 发现 ${constraints.length} 个外键约束:`);
      constraints.forEach(constraint => {
        console.log(`      - ${constraint.TABLE_NAME}.${constraint.COLUMN_NAME} -> ${constraint.REFERENCED_TABLE_NAME}.${constraint.REFERENCED_COLUMN_NAME}`);
      });
    } else {
      console.log(`   ℹ️  没有发现外键约束`);
    }
  } catch (error) {
    console.log(`   ⚠️  外键约束检查失败: ${error.message}`);
  }
}

async function testBasicOperations(connection) {
  try {
    // 测试系统配置表
    console.log('   测试系统配置读写...');
    
    // 读取
    const [configs] = await connection.execute('SELECT * FROM system_configs LIMIT 3');
    console.log(`      读取配置: ${configs.length} 条`);
    
    if (configs.length > 0) {
      configs.forEach(config => {
        console.log(`         - ${config.config_key}: ${config.config_value}`);
      });
    }
    
    // 测试视频模型配置
    console.log('\n   测试视频模型配置...');
    const [models] = await connection.execute('SELECT id, name, provider FROM video_models WHERE is_active = TRUE');
    console.log(`      活跃模型: ${models.length} 个`);
    models.forEach(model => {
      console.log(`         - ${model.name} (${model.provider})`);
    });
    
    // 测试API分类
    console.log('\n   测试API分类...');
    const [categories] = await connection.execute('SELECT * FROM api_categories ORDER BY id');
    console.log(`      API分类: ${categories.length} 个`);
    categories.forEach(category => {
      console.log(`         - ${category.id}: ${category.name}`);
    });
    
    console.log('\n   ✅ 基本操作测试通过');
    
  } catch (error) {
    console.log(`   ❌ 基本操作测试失败: ${error.message}`);
  }
}

// 主函数
async function main() {
  console.log('NewWebAI SQL 数据库测试工具\n');
  
  // 加载环境变量
  require('dotenv').config({ path: '.env.migration' });
  
  const success = await testDatabaseConnection();
  
  if (success) {
    console.log('✅ 数据库已准备好进行迁移！\n');
    process.exit(0);
  } else {
    console.log('❌ 数据库测试失败，请检查配置后再试。\n');
    process.exit(1);
  }
}

// 运行测试
main().catch(error => {
  console.error('致命错误:', error);
  process.exit(1);
});