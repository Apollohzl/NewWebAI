// =====================================================
// 生成数据导入 SQL 文件
// =====================================================
const fs = require('fs');
const path = require('path');

// 数据目录
const dataDir = path.join(__dirname, 'leancloud旧数据备份', 'hzliflow.ken520.top');

// 输出文件
const outputFile = path.join(__dirname, 'import_data.sql');

let sql = '';

// =====================================================
// 处理用户数据
// =====================================================
try {
  const userData = fs.readFileSync(path.join(dataDir, '_User.0.jsonl'), 'utf8');
  const lines = userData.split('\n').filter(line => line.trim() && !line.startsWith('#filetype'));
  
  sql += '-- =====================================================\n';
  sql += '-- 导入用户数据 (users)\n';
  sql += '-- =====================================================\n\n';
  
  lines.forEach((line, index) => {
    try {
      const user = JSON.parse(line);
      sql += `INSERT INTO users (id, username, email, password, salt, avatar, sessionToken, shortId, emailVerified, mobilePhoneVerified, ACL) VALUES (\n`;
      sql += `  '${user.objectId}',\n`;
      sql += `  '${user.username.replace(/'/g, "\\'")}',\n`;
      sql += `  '${user.email}',\n`;
      sql += `  '${user.password}',\n`;
      sql += `  '${user.salt}',\n`;
      sql += `  ${user.avatar ? `'${user.avatar.replace(/'/g, "\\'")}'` : 'NULL'},\n`;
      sql += `  '${user.sessionToken}',\n`;
      sql += `  '${user.shortId}',\n`;
      sql += `  ${user.emailVerified ? 'TRUE' : 'FALSE'},\n`;
      sql += `  ${user.mobilePhoneVerified ? 'TRUE' : 'FALSE'},\n`;
      sql += `  '${JSON.stringify(user.ACL).replace(/'/g, "\\'")}'\n`;
      sql += `);\n\n`;
    } catch (e) {
      console.error('Error parsing user line:', index, e);
    }
  });
  
  sql += `\n`;
} catch (e) {
  console.error('Error reading user data:', e);
}

// =====================================================
// 处理博客数据
// =====================================================
try {
  const blogData = fs.readFileSync(path.join(dataDir, 'BlogPosts.0.jsonl'), 'utf8');
  const lines = blogData.split('\n').filter(line => line.trim() && !line.startsWith('#filetype'));
  
  sql += '-- =====================================================\n';
  sql += '-- 导入博客数据 (blog_posts)\n';
  sql += '-- =====================================================\n\n';
  
  lines.forEach((line, index) => {
    try {
      const post = JSON.parse(line);
sql += `INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
`;
      sql += `  '${post.objectId}',
`;
      sql += `  '${post.title.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
`;
      sql += `  '${post.content.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\\\n')}',
`;
      sql += `  ${post.excerpt ? `'${post.excerpt.replace(/'/g, "\\'").replace(/"/g, '\\"')}'` : 'NULL'},
`;
      sql += `  '${post.category}',
`;
      sql += `  '${post.author}',
`;
      sql += `  '${post.readTime}',
`;
      sql += `  1,
`;
      sql += `  '${JSON.stringify(post.ACL).replace(/'/g, "\\'")}'
`;
      sql += `);\n\n`;
      
      // 处理标签
      if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
        post.tags.forEach(tag => {
          // 插入标签（如果不存在）
          sql += `INSERT IGNORE INTO blog_tags (tag_name) VALUES ('${tag.replace(/'/g, "\\'")}');\n`;
          
          // 获取标签ID并创建关联（使用子查询）
          sql += `INSERT INTO blog_post_tags (post_id, tag_id) SELECT '${post.objectId}', id FROM blog_tags WHERE tag_name = '${tag.replace(/'/g, "\\'")}';\n`;
        });
        sql += `\n`;
      }
    } catch (e) {
      console.error('Error parsing blog line:', index, e);
    }
  });
  
  sql += `\n`;
} catch (e) {
  console.error('Error reading blog data:', e);
}

// =====================================================
// 处理API数据
// =====================================================
try {
  const apiData = fs.readFileSync(path.join(dataDir, 'APIs.0.jsonl'), 'utf8');
  const lines = apiData.split('\n').filter(line => line.trim() && !line.startsWith('#filetype'));
  
  sql += '-- =====================================================\n';
  sql += '-- 导入API数据 (api_configs)\n';
  sql += '-- =====================================================\n\n';
  
  lines.forEach((line, index) => {
    try {
      const api = JSON.parse(line);
      sql += `INSERT INTO api_configs (id, name, description, category, tags, requestUrl, methods, icon, status, visits, ACL) VALUES (\n`;
      sql += `  '${api.objectId}',\n`;
      sql += `  '${api.name.replace(/'/g, "\\'")}',\n`;
      sql += `  ${api.description ? `'${api.description.replace(/'/g, "\\'")}'` : 'NULL'},\n`;
      sql += `  '${api.category}',\n`;
      sql += `  '${JSON.stringify(api.tags).replace(/'/g, "\\'")}',\n`;
      sql += `  '${api.requestUrl}',\n`;
      sql += `  '${JSON.stringify(api.methods).replace(/'/g, "\\'")}',\n`;
      sql += `  '${api.icon}',\n`;
      sql += `  '${api.status}',\n`;
      sql += `  ${api.visits || 0},\n`;
      sql += `  '${JSON.stringify(api.ACL).replace(/'/g, "\\'")}'\n`;
      sql += `);\n\n`;
    } catch (e) {
      console.error('Error parsing API line:', index, e);
    }
  });
  
  sql += `\n`;
} catch (e) {
  console.error('Error reading API data:', e);
}

// =====================================================
// 处理产品数据
// =====================================================
try {
  const productData = fs.readFileSync(path.join(dataDir, 'Products.0.jsonl'), 'utf8');
  const lines = productData.split('\n').filter(line => line.trim() && !line.startsWith('#filetype'));
  
  sql += '-- =====================================================\n';
  sql += '-- 导入产品数据 (products)\n';
  sql += '-- =====================================================\n\n';
  
  lines.forEach((line, index) => {
    try {
      const product = JSON.parse(line);
      sql += `INSERT INTO products (id, name, description, price, originalPrice, category, tags, features, image, rating, in_stock, ACL) VALUES (\n`;
      sql += `  '${product.objectId}',\n`;
      sql += `  '${product.name.replace(/'/g, "\\'")}',\n`;
      sql += `  '${product.description.replace(/'/g, "\\'")}',\n`;
      sql += `  ${product.price},\n`;
      sql += `  ${product.originalPrice},\n`;
      sql += `  '${product.category}',\n`;
      sql += `  '${JSON.stringify(product.tags).replace(/'/g, "\\'")}',\n`;
      sql += `  '${JSON.stringify(product.features).replace(/'/g, "\\'")}',\n`;
      sql += `  '${product.image}',\n`;
      sql += `  ${product.rating},\n`;
      sql += `  TRUE,\n`;
      sql += `  '${JSON.stringify(product.ACL).replace(/'/g, "\\'")}'\n`;
      sql += `);\n\n`;
    } catch (e) {
      console.error('Error parsing product line:', index, e);
    }
  });
} catch (e) {
  console.error('Error reading product data:', e);
}

// =====================================================
// 验证数据导入
// =====================================================
sql += '-- =====================================================\n';
sql += '-- 验证数据导入\n';
sql += '-- =====================================================\n\n';
sql += 'SELECT \n';
sql += '  (SELECT COUNT(*) FROM users) as user_count,\n';
sql += '  (SELECT COUNT(*) FROM blog_posts) as blog_count,\n';
sql += '  (SELECT COUNT(*) FROM api_configs) as api_count,\n';
sql += '  (SELECT COUNT(*) FROM products) as product_count,\n';
sql += '  (SELECT COUNT(*) FROM blog_tags) as tag_count,\n';
sql += '  (SELECT COUNT(*) FROM blog_post_tags) as post_tag_count;\n';

// 写入文件
fs.writeFileSync(outputFile, sql, 'utf8');

console.log('✅ 导入 SQL 文件已生成:', outputFile);
console.log('📊 数据统计:');
console.log(`   - 用户数据: ${fs.readFileSync(path.join(dataDir, '_User.0.jsonl'), 'utf8').split('\n').filter(line => line.trim() && !line.startsWith('#filetype')).length} 条`);
console.log(`   - 博客文章: ${fs.readFileSync(path.join(dataDir, 'BlogPosts.0.jsonl'), 'utf8').split('\n').filter(line => line.trim() && !line.startsWith('#filetype')).length} 条`);
console.log(`   - API配置: ${fs.readFileSync(path.join(dataDir, 'APIs.0.jsonl'), 'utf8').split('\n').filter(line => line.trim() && !line.startsWith('#filetype')).length} 条`);
console.log(`   - 产品数据: ${fs.readFileSync(path.join(dataDir, 'Products.0.jsonl'), 'utf8').split('\n').filter(line => line.trim() && !line.startsWith('#filetype')).length} 条`);
console.log('\n使用方法:');
console.log('1. 先执行 init_database.sql 初始化数据库结构');
console.log('2. 再执行 import_data.sql 导入数据');
console.log('3. 如果需要重新开始，先删除所有表再执行 init_database.sql');