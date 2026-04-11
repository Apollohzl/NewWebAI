# 🚀 NewWebAI 数据库迁移快速开始指南

## 📋 环境变量配置总结

### ✅ Vercel 环境变量（必须配置）

在 Vercel 项目设置中添加以下环境变量：

```env
SQL_HOST=mysql6.sqlpub.com
SQL_PORT=3311
SQL_USER=apollohzl
SQL_PASSWORD=iDceSWHqhSIUYXyY
SQL_DATABASE=hzliflow
```

### 📁 本地开发配置

1. **复制环境变量模板**
```bash
cp .env.local.example .env.local
```

2. **编辑 `.env.local` 文件**
```env
SQL_HOST=mysql6.sqlpub.com
SQL_PORT=3311
SQL_USER=apollohzl
SQL_PASSWORD=iDceSWHqhSIUYXyY
SQL_DATABASE=hzliflow
```

## 🎯 迁移流程

### 第一步：验证数据库连接

```bash
# 本地测试
node test_sql_connection.js
```

### 第二步：迁移现有数据（如果需要）

```bash
# 迁移 MongoDB 数据到 SQL
node migrate_data.js
```

### 第三步：更新应用代码

主要修改点：
1. 将 MongoDB 查询改为 SQL 查询
2. 更新数据库连接配置
3. 修改数据访问层

### 第四步：部署到 Vercel

```bash
# 提交代码
git add .
git commit -m "migrate to sql database"

# 推送到 GitHub
git push origin main

# 部署到 Vercel
vercel --prod
```

## 📊 数据库状态

- ✅ 14 个表已创建
- ✅ 20 条初始数据已插入
- ✅ 索引和外键约束已设置
- ✅ 字符集: utf8mb4
- ✅ 排序规则: utf8mb4_unicode_ci

## 📁 已创建的文件

| 文件名 | 用途 |
|--------|------|
| `migrate_to_sql.sql` | SQL 建表脚本 |
| `migrate_data.js` | 数据迁移工具 |
| `test_sql_connection.js` | 连接测试工具 |
| `.env.local.example` | 本地环境变量模板 |
| `VERCEL_CONFIG.md` | Vercel 配置指南 |
| `src/lib/sql.ts` | 数据库连接配置 |
| `src/lib/sqlDatabase.ts` | 数据库操作工具 |
| `migration_config.json` | 迁移配置 |
| `MIGRATION_README.md` | 完整迁移文档 |

## 🔧 开发流程

### 本地开发

1. **设置环境变量**
```bash
cp .env.local.example .env.local
# 编辑 .env.local
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **测试数据库功能**
```bash
node test_sql_connection.js
```

### 生产部署

1. **配置 Vercel 环境变量**
   - 访问 Vercel Dashboard
   - 项目设置 -> 环境变量
   - 添加 SQL 相关变量

2. **部署项目**
```bash
vercel --prod
```

3. **验证部署**
```bash
vercel logs
```

## 🛠️ 常用命令

```bash
# 测试数据库连接
node test_sql_connection.js

# 迁移数据
node migrate_data.js

# 本地开发
npm run dev

# 构建项目
npm run build

# 部署到 Vercel
vercel --prod

# 查看日志
vercel logs

# 设置环境变量
vercel env add SQL_HOST production
```

## 📞 需要帮助？

- **数据库连接问题**: 检查环境变量是否正确配置
- **迁移问题**: 查看 `migrate_data.js` 的错误日志
- **部署问题**: 查看 Vercel 部署日志

## ✅ 检查清单

- [ ] Vercel 环境变量已配置
- [ ] 本地 `.env.local` 已配置
- [ ] 数据库连接测试通过
- [ ] 应用代码已更新
- [ ] 本地测试通过
- [ ] 代码已提交到 Git
- [ ] 已部署到 Vercel
- [ ] 生产环境测试通过

---

**准备就绪！** 🎉

现在你可以开始使用 SQLPub 数据库了！