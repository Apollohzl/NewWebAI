# Vercel 环境变量配置指南

## 🔑 必须配置在 Vercel 上的环境变量

在 Vercel 项目设置中添加以下环境变量：

### 数据库配置（SQLPub）
```
SQL_HOST=mysql6.sqlpub.com
SQL_PORT=3311
SQL_USER=apollohzl
SQL_PASSWORD=iDceSWHqhSIUYXyY
SQL_DATABASE=hzliflow
```

### 应用配置
```
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### API 配置
```
POLLINATIONS_API_KEY=sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B
```

## 📝 Vercel 配置步骤

### 方法一：通过 Vercel Dashboard

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 "Settings" 标签
4. 选择 "Environment Variables"
5. 添加上述环境变量
6. 点击 "Save" 保存
7. 重新部署项目

### 方法二：通过 Vercel CLI

```bash
# 设置环境变量
vercel env add SQL_HOST production
# 输入: mysql6.sqlpub.com

vercel env add SQL_PORT production
# 输入: 3311

vercel env add SQL_USER production
# 输入: apollohzl

vercel env add SQL_PASSWORD production
# 输入: iDceSWHqhSIUYXyY

vercel env add SQL_DATABASE production
# 输入: hzliflow

# 添加其他环境变量
vercel env add NEXTAUTH_URL production
# 输入: https://your-domain.vercel.app

vercel env add POLLINATIONS_API_KEY production
# 输入: sk_lP8NdaqOKvbNPB8n1ApyB2UQcsVwcT7B
```

## 🔒 安全注意事项

1. **不要提交密码到 Git**
   - 确保 `.env.local` 在 `.gitignore` 中
   - 不要在代码中硬编码密码

2. **定期更换密码**
   - 定期更换 SQLPub 密码
   - 更新 Vercel 环境变量

3. **使用生产环境密码**
   - 确保使用强密码
   - 不要与本地开发环境共享密码

## ✅ 配置验证

配置完成后，验证环境变量是否正确：

```bash
# 在 Vercel 项目中查看环境变量
vercel env ls

# 测试数据库连接
vercel logs
```

## 🚀 部署流程

1. **配置环境变量**
   - 按上述步骤配置所有必要的环境变量

2. **重新部署**
   ```bash
   vercel --prod
   ```

3. **检查部署日志**
   ```bash
   vercel logs
   ```

4. **测试应用**
   - 访问你的 Vercel 域名
   - 测试数据库连接功能

## 📊 数据库连接测试

配置完成后，可以在应用中测试数据库连接：

```javascript
// 测试数据库连接
const connection = await mysql.createConnection({
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

console.log('数据库连接成功！');
```

## 🆘 常见问题

### Q: 环境变量不生效？
A: 需要重新部署项目才能应用新的环境变量。

### Q: 数据库连接失败？
A: 检查以下项：
- SQL_HOST、SQL_PORT 是否正确
- SQL_USER、SQL_PASSWORD 是否正确
- SQL_DATABASE 名称是否正确
- 网络连接是否正常

### Q: 如何查看环境变量？
A: 在 Vercel Dashboard 的 Settings -> Environment Variables 中查看。

## 📞 技术支持

如有问题，请联系：
- Vercel 文档: https://vercel.com/docs
- SQLPub 文档: https://sqlpub.com/docs
- 项目仓库: https://github.com/Apollohzl/NewWebAI