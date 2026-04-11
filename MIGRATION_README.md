# NewWebAI 数据库迁移到 SQLPub 完整指南

## 概述
本文档详细说明了如何将 NewWebAI 项目从 MongoDB 和 LeanCloud 迁移到 SQLPub (MySQL) 数据库。

## 📋 前置要求

### 1. 必需软件
- Node.js (v14 或更高版本)
- MySQL 5.7+ 或 MariaDB 10.3+
- MongoDB 4.0+ (仅用于数据导出)
- npm 或 yarn 包管理器

### 2. 必需依赖
```bash
npm install mongodb mysql2
```

### 3. 环境变量
创建 `.env.migration` 文件：
```env
# MongoDB 连接配置
MONGODB_URI=mongodb://localhost:27017/newwebai

# SQL 数据库配置
SQL_HOST=localhost
SQL_PORT=3306
SQL_USER=root
SQL_PASSWORD=your_password
SQL_DATABASE=newwebai

# LeanCloud 配置 (可选)
LEANCLOUD_APP_ID=your_app_id
LEANCLOUD_APP_KEY=your_app_key
LEANCLOUD_SERVER_URL=https://your-server.leancloud.cn
```

## 🗄️ 数据库结构概览

### 核心表结构

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| `users` | 用户数据 | id, username, email, password, role |
| `blog_posts` | 博客文章 | id, title, content, category, author |
| `blog_tags` | 博客标签 | id, tag_name |
| `blog_post_tags` | 文章标签关联 | post_id, tag_id |
| `chat_messages` | 聊天记录 | id, user_id, role, content, thinking_content |
| `products` | 产品数据 | id, name, description, price, category |
| `api_configs` | API配置 | id, name, endpoint, category, status |
| `api_categories` | API分类 | id, name, description |
| `ads` | 广告数据 | id, title, url, cover_image, position |
| `video_models` | 视频模型配置 | id, name, provider, max_duration |
| `cart_items` | 购物车 | id, user_id, product_id, quantity |
| `ai_image_generations` | AI图像生成记录 | id, user_id, prompt, model, image_url |
| `user_sessions` | 用户会话 | id, user_id, session_token, expires_at |
| `system_configs` | 系统配置 | id, config_key, config_value |

## 🚀 迁移步骤

### 第一步：备份现有数据

```bash
# 备份 MongoDB 数据
mongodump --uri="mongodb://localhost:27017/newwebai" --out=./mongodb_backup

# 备份 JSON 配置文件
cp -r src/config ./config_backup
```

### 第二步：创建 SQL 数据库

1. 登录 MySQL：
```bash
mysql -u root -p
```

2. 创建数据库：
```sql
CREATE DATABASE newwebai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. 执行 SQL 脚本：
```bash
mysql -u root -p newwebai < migrate_to_sql.sql
```

### 第三步：配置迁移参数

编辑 `migration_config.json`：
```json
{
  "mongodb": {
    "uri": "mongodb://localhost:27017/newwebai",
    "database": "newwebai"
  },
  "sql": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "your_password",
    "database": "newwebai"
  }
}
```

### 第四步：运行数据迁移

```bash
# 加载环境变量
source .env.migration

# 运行迁移脚本
node migrate_data.js
```

### 第五步：验证迁移结果

检查迁移日志输出，确认：
- ✅ 所有表都有正确的记录数
- ✅ 外键约束正确建立
- ✅ 索引正确创建
- ✅ 数据完整性检查通过

## 🔧 高级配置

### 1. 批量大小调整
在 `migration_config.json` 中调整 `batchSize`：
```json
{
  "tables": {
    "users": {
      "enabled": true,
      "batchSize": 200
    }
  }
}
```

### 2. 并行迁移
启用并行迁移加速大数据量迁移：
```json
{
  "migration": {
    "parallelMigrations": true
  }
}
```

### 3. 选择性迁移
只迁移特定表：
```json
{
  "tables": {
    "users": { "enabled": true },
    "blog_posts": { "enabled": true },
    "chat_messages": { "enabled": false }
  }
}
```

## 📊 数据类型映射

| MongoDB 类型 | MySQL 类型 | 说明 |
|-------------|------------|------|
| String | VARCHAR(255) | 短字符串 |
| String (long) | TEXT | 长文本 |
| Number | INT | 整数 |
| Number (decimal) | DECIMAL(10,2) | 小数 |
| Boolean | BOOLEAN | 布尔值 |
| Date | TIMESTAMP | 日期时间 |
| Array | JSON | 数组转为JSON |
| Object | JSON | 对象转为JSON |
| ObjectId | VARCHAR(255) | MongoDB ObjectId |

## 🛠️ 故障排除

### 常见问题

1. **连接失败**
   ```bash
   # 检查 MongoDB 是否运行
   mongo --eval "db.stats()"

   # 检查 MySQL 是否运行
   mysql -u root -p -e "SELECT 1"
   ```

2. **编码问题**
   ```sql
   -- 确保数据库使用正确的字符集
   ALTER DATABASE newwebai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **外键约束错误**
   ```sql
   -- 临时禁用外键检查
   SET FOREIGN_KEY_CHECKS = 0;
   -- 执行迁移
   SET FOREIGN_KEY_CHECKS = 1;
   ```

4. **内存不足**
   ```json
   // 在 migration_config.json 中减小批量大小
   {
     "migration": {
       "batchSize": 50
     }
   }
   ```

### 性能优化

1. **索引优化**
   ```sql
   -- 查看慢查询
   SHOW VARIABLES LIKE 'slow_query%';

   -- 启用慢查询日志
   SET GLOBAL slow_query_log = 'ON';
   ```

2. **批量插入优化**
   ```sql
   -- 批量插入前禁用索引
   ALTER TABLE users DISABLE KEYS;
   -- 执行批量插入
   -- 启用索引
   ALTER TABLE users ENABLE KEYS;
   ```

## 🔄 回滚操作

如果迁移失败，可以回滚：

```bash
# 删除 SQL 数据库
mysql -u root -p -e "DROP DATABASE newwebai;"

# 恢复 MongoDB 数据
mongorestore --uri="mongodb://localhost:27017/newwebai" ./mongodb_backup

# 恢复 JSON 配置
cp -r ./config_backup/* src/config/
```

## 📝 后续步骤

### 1. 更新应用配置
修改数据库连接配置：
```javascript
// 更新 src/lib/database.ts
const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});
```

### 2. 更新 API 代码
将 MongoDB 查询转换为 SQL 查询：
```javascript
// MongoDB 查询
const users = await db.collection('users').find({ role: 'admin' }).toArray();

// SQL 查询
const [users] = await pool.query('SELECT * FROM users WHERE role = ?', ['admin']);
```

### 3. 测试功能
- 用户注册和登录
- 博客文章发布和读取
- AI 对话功能
- 产品浏览和购买
- API 配置管理

### 4. 性能测试
```bash
# 数据库性能测试
npm run test:db-perf

# 负载测试
npm run test:load
```

## 🔐 安全建议

1. **数据库安全**
   - 使用强密码
   - 限制远程访问
   - 定期备份

2. **数据加密**
   - 敏感字段加密
   - SSL 连接
   - 数据脱敏

3. **访问控制**
   - 最小权限原则
   - 定期审计日志
   - 限制 API 访问

## 📞 技术支持

如有问题，请：
1. 查看迁移日志文件
2. 检查数据库错误日志
3. 联系技术支持团队

## 📚 相关文档

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [MongoDB 官方文档](https://docs.mongodb.com/)
- [Node.js MySQL2 驱动](https://github.com/sidorares/node-mysql2)
- [SQLPub 文档](https://sqlpub.com/docs)

---

**最后更新**: 2026-04-11
**版本**: 1.0.0
**维护者**: NewWebAI Team