// =====================================================
// NewWebAI 数据迁移工具
// 从 MongoDB 迁移数据到 SQL 数据库
// 使用方法: node migrate_data.js
// =====================================================

const { MongoClient } = require('mongodb');
const mysql = require('mysql2/promise');

// 配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/newwebai';
const SQL_CONFIG = {
  host: process.env.SQL_HOST || 'localhost',
  user: process.env.SQL_USER || 'root',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DATABASE || 'newwebai',
  port: process.env.SQL_PORT || 3306
};

// 连接池
let mongoClient = null;
let sqlPool = null;

async function connectToDatabases() {
  try {
    // 连接 MongoDB
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    console.log('✅ MongoDB 连接成功');

    // 连接 MySQL
    sqlPool = mysql.createPool(SQL_CONFIG);
    await sqlPool.getConnection();
    console.log('✅ MySQL 连接成功');

  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    process.exit(1);
  }
}

async function migrateUsers() {
  try {
    console.log('\n🔄 开始迁移用户数据...');
    
    const mongoDb = mongoClient.db('newwebai');
    const usersCollection = mongoDb.collection('users');
    const users = await usersCollection.find({}).toArray();

    let migratedCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        await sqlPool.query(
          `INSERT INTO users (id, username, email, password, avatar, role, is_active, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           username=VALUES(username), 
           password=VALUES(password), 
           avatar=VALUES(avatar),
           role=VALUES(role),
           is_active=VALUES(is_active),
           updated_at=VALUES(updated_at)`,
          [
            user._id?.toString() || user.id,
            user.username,
            user.email,
            user.password,
            user.avatar || null,
            user.role || 'user',
            user.isActive !== undefined ? user.isActive : true,
            user.createdAt || new Date(),
            user.updatedAt || new Date()
          ]
        );
        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移用户失败 (${user.email}):`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ 用户数据迁移完成: 成功 ${migratedCount} 个, 失败 ${errorCount} 个`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移用户数据失败:', error);
    return { success: 0, error: 1 };
  }
}

async function migrateBlogPosts() {
  try {
    console.log('\n🔄 开始迁移博客文章...');
    
    const mongoDb = mongoClient.db('newwebai');
    const postsCollection = mongoDb.collection('blog_posts');
    const posts = await postsCollection.find({}).toArray();

    let migratedCount = 0;
    let errorCount = 0;

    for (const post of posts) {
      try {
        const postId = post._id?.toString() || post.id;
        
        // 插入博客文章
        await sqlPool.query(
          `INSERT INTO blog_posts (id, title, content, excerpt, category, author, read_time, published, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           title=VALUES(title), 
           content=VALUES(content), 
           excerpt=VALUES(excerpt),
           category=VALUES(category),
           author=VALUES(author),
           read_time=VALUES(read_time),
           published=VALUES(published),
           updated_at=VALUES(updated_at)`,
          [
            postId,
            post.title,
            post.content,
            post.excerpt || null,
            post.category || '技术',
            post.author || 'NewWebAI团队',
            post.readTime || null,
            post.published !== undefined ? post.published : true,
            post.createdAt || new Date(),
            post.updatedAt || new Date()
          ]
        );

        // 处理标签
        if (post.tags && Array.isArray(post.tags)) {
          for (const tagName of post.tags) {
            // 插入标签
            await sqlPool.query(
              `INSERT INTO blog_tags (tag_name) VALUES (?)
               ON DUPLICATE KEY UPDATE tag_name=VALUES(tag_name)`,
              [tagName]
            );

            // 获取标签ID
            const [tagResult] = await sqlPool.query(
              `SELECT id FROM blog_tags WHERE tag_name = ?`,
              [tagName]
            );

            if (tagResult.length > 0) {
              const tagId = tagResult[0].id;
              
              // 插入文章标签关联
              await sqlPool.query(
                `INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE post_id=VALUES(post_id)`,
                [postId, tagId]
              );
            }
          }
        }

        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移博客文章失败 (${post.title}):`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ 博客文章迁移完成: 成功 ${migratedCount} 篇, 失败 ${errorCount} 篇`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移博客文章失败:', error);
    return { success: 0, error: 1 };
  }
}

async function migrateChatMessages() {
  try {
    console.log('\n🔄 开始迁移聊天记录...');
    
    const mongoDb = mongoClient.db('newwebai');
    const messagesCollection = mongoDb.collection('chat_messages');
    const messages = await messagesCollection.find({}).toArray();

    let migratedCount = 0;
    let errorCount = 0;

    for (const message of messages) {
      try {
        await sqlPool.query(
          `INSERT INTO chat_messages (id, user_id, role, content, thinking_content, model, session_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           content=VALUES(content), 
           thinking_content=VALUES(thinking_content),
           model=VALUES(model)`,
          [
            message._id?.toString() || message.id,
            message.userId || null,
            message.role || 'user',
            message.content,
            message.thinking_content || null,
            message.model || null,
            message.sessionId || null,
            message.createdAt || new Date()
          ]
        );
        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移聊天记录失败:`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ 聊天记录迁移完成: 成功 ${migratedCount} 条, 失败 ${errorCount} 条`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移聊天记录失败:', error);
    return { success: 0, error: 1 };
  }
}

async function migrateApiConfigs() {
  try {
    console.log('\n🔄 开始迁移API配置...');
    
    // 从JSON文件读取API配置
    const fs = require('fs');
    const path = require('path');
    const apisPath = path.join(__dirname, 'src/config/apis.json');
    
    let apis = [];
    if (fs.existsSync(apisPath)) {
      const apisData = JSON.parse(fs.readFileSync(apisPath, 'utf8'));
      apis = apisData.apis || [];
    }

    let migratedCount = 0;
    let errorCount = 0;

    for (const api of apis) {
      try {
        await sqlPool.query(
          `INSERT INTO api_configs (id, name, description, endpoint, method, category, status, tags, visits, icon, request_url, methods)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           name=VALUES(name), 
           description=VALUES(description),
           status=VALUES(status),
           visits=VALUES(visits)`,
          [
            api.id,
            api.name,
            api.description || '',
            api.requestUrl || '',
            'GET',
            api.category || 'general',
            api.status || '正常',
            JSON.stringify(api.tags || []),
            parseInt(api.visits) || 0,
            api.icon || '',
            api.requestUrl || '',
            JSON.stringify(api.methods || ['GET'])
          ]
        );
        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移API配置失败 (${api.name}):`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ API配置迁移完成: 成功 ${migratedCount} 个, 失败 ${errorCount} 个`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移API配置失败:', error);
    return { success: 0, error: 1 };
  }
}

async function migrateProducts() {
  try {
    console.log('\n🔄 开始迁移产品数据...');
    
    // 从JSON文件读取产品配置
    const fs = require('fs');
    const path = require('path');
    const productsPath = path.join(__dirname, 'src/config/products.json');
    
    let products = [];
    if (fs.existsSync(productsPath)) {
      const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
      products = productsData.products || [];
    }

    let migratedCount = 0;
    let errorCount = 0;

    for (const product of products) {
      try {
        await sqlPool.query(
          `INSERT INTO products (id, name, description, price, original_price, image, category, rating, tags, features, in_stock)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           name=VALUES(name), 
           description=VALUES(description),
           price=VALUES(price),
           original_price=VALUES(original_price),
           rating=VALUES(rating)`,
          [
            product.id,
            product.name,
            product.description || '',
            product.price,
            product.originalPrice || null,
            product.image || null,
            product.category || '',
            product.rating || 0.0,
            JSON.stringify(product.tags || []),
            JSON.stringify(product.features || []),
            true
          ]
        );
        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移产品失败 (${product.name}):`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ 产品数据迁移完成: 成功 ${migratedCount} 个, 失败 ${errorCount} 个`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移产品数据失败:', error);
    return { success: 0, error: 1 };
  }
}

async function migrateAds() {
  try {
    console.log('\n🔄 开始迁移广告数据...');
    
    // 从JSON文件读取广告配置
    const fs = require('fs');
    const path = require('path');
    const adsPath = path.join(__dirname, 'src/config/ads.json');
    
    let ads = [];
    if (fs.existsSync(adsPath)) {
      ads = JSON.parse(fs.readFileSync(adsPath, 'utf8'));
    }

    let migratedCount = 0;
    let errorCount = 0;

    for (const ad of ads) {
      try {
        await sqlPool.query(
          `INSERT INTO ads (id, title, url, cover_image, description, position, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           title=VALUES(title), 
           url=VALUES(url),
           description=VALUES(description),
           position=VALUES(position)`,
          [
            ad.id,
            ad.title,
            ad.url,
            ad.cover || null,
            ad.description || '',
            0,
            true
          ]
        );
        migratedCount++;
      } catch (error) {
        console.error(`  ❌ 迁移广告失败 (${ad.title}):`, error.message);
        errorCount++;
      }
    }

    console.log(`✅ 广告数据迁移完成: 成功 ${migratedCount} 个, 失败 ${errorCount} 个`);
    return { success: migratedCount, error: errorCount };

  } catch (error) {
    console.error('❌ 迁移广告数据失败:', error);
    return { success: 0, error: 1 };
  }
}

async function verifyMigration() {
  try {
    console.log('\n🔍 开始验证迁移结果...');
    
    const tables = ['users', 'blog_posts', 'blog_tags', 'blog_post_tags', 'chat_messages', 'products', 'api_configs', 'ads', 'video_models'];
    
    for (const table of tables) {
      try {
        const [rows] = await sqlPool.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`  📊 ${table}: ${rows[0].count} 条记录`);
      } catch (error) {
        console.log(`  ⚠️  ${table}: 查询失败 - ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ 验证迁移失败:', error);
  }
}

async function closeConnections() {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('\n✅ MongoDB 连接已关闭');
    }
    if (sqlPool) {
      await sqlPool.end();
      console.log('✅ MySQL 连接已关闭');
    }
  } catch (error) {
    console.error('❌ 关闭连接失败:', error);
  }
}

async function main() {
  try {
    console.log('=====================================================');
    console.log('     NewWebAI 数据库迁移工具');
    console.log('=====================================================');
    
    // 连接数据库
    await connectToDatabases();
    
    // 执行迁移
    const results = {
      users: await migrateUsers(),
      blogPosts: await migrateBlogPosts(),
      chatMessages: await migrateChatMessages(),
      apiConfigs: await migrateApiConfigs(),
      products: await migrateProducts(),
      ads: await migrateAds()
    };
    
    // 验证迁移结果
    await verifyMigration();
    
    // 输出迁移总结
    console.log('\n=====================================================');
    console.log('           迁移结果总结');
    console.log('=====================================================');
    console.log(`用户数据:     ✅ ${results.users.success} 个, ❌ ${results.users.error} 个`);
    console.log(`博客文章:     ✅ ${results.blogPosts.success} 篇, ❌ ${results.blogPosts.error} 篇`);
    console.log(`聊天记录:     ✅ ${results.chatMessages.success} 条, ❌ ${results.chatMessages.error} 条`);
    console.log(`API配置:      ✅ ${results.apiConfigs.success} 个, ❌ ${results.apiConfigs.error} 个`);
    console.log(`产品数据:     ✅ ${results.products.success} 个, ❌ ${results.products.error} 个`);
    console.log(`广告数据:     ✅ ${results.ads.success} 个, ❌ ${results.ads.error} 个`);
    console.log('=====================================================\n');
    
    const totalSuccess = Object.values(results).reduce((sum, r) => sum + r.success, 0);
    const totalError = Object.values(results).reduce((sum, r) => sum + r.error, 0);
    
    console.log(`总计: 成功 ${totalSuccess} 个, 失败 ${totalError} 个`);
    
    if (totalError > 0) {
      console.log('\n⚠️  迁移过程中出现错误，请检查上面的错误信息');
      process.exit(1);
    } else {
      console.log('\n✅ 迁移完成！所有数据已成功迁移到 SQL 数据库');
    }
    
  } catch (error) {
    console.error('\n❌ 迁移过程发生严重错误:', error);
    process.exit(1);
  } finally {
    await closeConnections();
  }
}

// 执行迁移
main().catch(console.error);
