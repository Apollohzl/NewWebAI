# 数据库迁移说明

## 概述

本文件夹包含两个 SQL 文件，用于在 SQLPub 数据库中恢复原有的 LeanCloud 数据。

## 文件说明

### 1. `init_database.sql` - 数据库初始化文件

**功能**：创建所有必需的数据库表结构

**包含的表**：
- `_User` - 用户表
- `BlogPosts` - 博客文章表
- `blog_tags` - 博客标签表
- `blog_post_tags` - 博客文章标签关联表
- `APIs` - API 配置表
- `Products` - 产品表

**特点**：
- 使用 utf8mb4 字符集，支持 emoji
- 自动管理创建时间和更新时间
- JSON 字段存储数组类型数据
- 已添加必要的索引优化查询性能
- 外键约束确保数据完整性

### 2. `import_data.sql` - 数据导入文件

**功能**：导入原有的 LeanCloud 数据

**数据统计**：
- 用户数据：3 条
- 博客文章：35 条
- API 配置：3 条
- 产品数据：3 条

**特点**：
- 自动处理标签关联关系
- 保留原有的 ACL 权限设置
- 保留所有时间戳信息
- 正确转义特殊字符

## 使用方法

### 方法一：通过 SQLPub 控制台

1. 登录 SQLPub 控制台
2. 选择数据库 `hzliflow`
3. 先执行 `init_database.sql` 文件
4. 再执行 `import_data.sql` 文件

### 方法二：通过命令行

```bash
# 连接到数据库
mysql -h mysql6.sqlpub.com -P 3311 -u apollohzl -p hzliflow

# 执行初始化文件
source init_database.sql

# 执行导入文件
source import_data.sql
```

### 方法三：使用 Node.js 脚本

```bash
# 测试连接
node test_sql_connection.js

# 执行 SQL 文件
node execute_sql.js init_database.sql
node execute_sql.js import_data.sql
```

## 重新开始

如果需要清空数据库重新开始：

```sql
-- 删除所有表（按依赖顺序）
DROP TABLE IF EXISTS blog_post_tags;
DROP TABLE IF EXISTS blog_tags;
DROP TABLE IF EXISTS BlogPosts;
DROP TABLE IF EXISTS APIs;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS _User;

-- 然后重新执行 init_database.sql 和 import_data.sql
```

## 数据架构映射

### LeanCloud → SQLPub

| LeanCloud 字段 | SQLPub 字段 | 说明 |
|----------------|-------------|------|
| objectId | id | 主键 |
| createdAt | createdAt | 创建时间 |
| updatedAt | updatedAt | 更新时间 |
| ACL | ACL | 访问控制列表 |

### 特殊处理

1. **标签系统**：
   - LeanCloud 使用 JSON 数组存储标签
   - SQLPub 使用关联表（blog_tags 和 blog_post_tags）
   - 导入时自动创建标签关联关系

2. **JSON 字段**：
   - `tags`, `features`, `methods` 等数组字段存储为 JSON
   - `ACL` 字段存储为 JSON 字符串

3. **时间字段**：
   - 保留 ISO 8601 格式的时间戳
   - 数据库会自动处理时间更新

## 注意事项

1. **备份现有数据**：
   - 在执行删除操作前，先备份现有数据
   - 可以使用 `mysqldump` 或 SQLPub 的备份功能

2. **字符集**：
   - 确保数据库使用 utf8mb4 字符集
   - 支持中文和 emoji 字符

3. **索引优化**：
   - 已添加常用字段的索引
   - 优化查询性能

4. **外键约束**：
   - 关联表有外键约束
   - 删除主表记录会自动删除关联记录

## 验证导入

导入完成后，可以执行以下 SQL 验证：

```sql
-- 统计各表数据量
SELECT 
  (SELECT COUNT(*) FROM _User) as user_count,
  (SELECT COUNT(*) FROM BlogPosts) as blog_count,
  (SELECT COUNT(*) FROM APIs) as api_count,
  (SELECT COUNT(*) FROM Products) as product_count,
  (SELECT COUNT(*) FROM blog_tags) as tag_count,
  (SELECT COUNT(*) FROM blog_post_tags) as post_tag_count;

-- 查看用户数据
SELECT id, username, email, createdAt FROM _User;

-- 查看博客文章
SELECT id, title, author, category, createdAt FROM BlogPosts ORDER BY createdAt DESC LIMIT 5;

-- 查看API配置
SELECT id, name, category, status, visits FROM APIs;

-- 查看产品数据
SELECT id, name, category, price, rating FROM Products;
```

## 故障排除

### 问题1：字符编码错误

**症状**：导入后中文显示乱码

**解决**：
```sql
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
```

### 问题2：外键约束错误

**症状**：导入关联表时失败

**解决**：按正确顺序导入，先导入主表，再导入关联表

### 问题3：JSON 解析错误

**症状**：查询 JSON 字段时报错

**解决**：
```sql
-- 使用 JSON 函数查询
SELECT JSON_EXTRACT(tags, '$[0]') FROM BlogPosts WHERE id = 'xxx';
```

## 相关文件

- `init_database.sql` - 数据库初始化
- `import_data.sql` - 数据导入
- `generate_import_sql.js` - 生成导入 SQL 的脚本
- `test_sql_connection.js` - 数据库连接测试

## 支持

如有问题，请检查：
1. 数据库连接配置是否正确
2. SQL 文件路径是否正确
3. 数据库权限是否足够
4. 字符集设置是否正确