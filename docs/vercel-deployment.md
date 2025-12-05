# Vercel 部署配置指南

## 配置步骤

1. **导入项目**
   - 在 Vercel 仪表板中选择 "Import Git Repository"
   - 选择 GitHub 仓库 `Apollohzl/NewWebAI`
   - 点击 "Import"

2. **项目配置**
   - 项目名称：NewWebAI（或您喜欢的名称）
   - 框架预设：None（我们使用自定义的 Express 应用）
   - 根目录：保持默认（/）

3. **构建设置**
   - 构建命令：`npm run vercel-build`（package.json 中定义）
   - 输出目录：保持空白
   - 安装命令：`npm install`

4. **环境变量**
   - 无需特殊环境变量（当前项目使用默认配置）

## Vercel 配置文件说明

### vercel.json
- `builds` 部分定义了如何构建应用
- `routes` 部分设置了 API 路由和静态文件路由
- `github` 部分启用了 GitHub 集成

### API 路由兼容性
- 服务器代码已更新以兼容 Vercel 环境
- 添加了 `/api/routes/index.js` 作为 Vercel 兼容的 API 端点
- 服务器代码检查 `process.env.VERCEL` 环境变量以适配不同环境

## 部署后验证

部署完成后，您可以通过以下 URL 访问应用：
- 主页：`https://your-project-name.vercel.app/`
- 控制面板：`https://your-project-name.vercel.app/dashboard.html`
- AI 聊天：`https://your-project-name.vercel.app/ai-chat.html`
- API 端点：`https://your-project-name.vercel.app/api/models`

## API 端点
- `GET /api/models`: 获取AI模型列表
- `GET /api/models/:id`: 获取特定AI模型
- `POST /api/contact`: 提交联系表单
- `POST /api/auth/login`: 用户登录
- `POST /api/auth/register`: 用户注册
- `GET /api/user/:id`: 获取用户信息
- `POST /api/ai/generate`: AI内容生成
- `GET /api/stats`: 获取统计数据

## 注意事项

1. **数据持久性**：当前版本使用内存存储，生产环境中应使用数据库
2. **安全性**：示例中使用的凭据（admin@newwebai.com/admin123）应在生产中替换
3. **性能**：Vercel 的 Serverless 函数有执行时间限制，请根据需要调整
4. **自定义域名**：可在 Vercel 仪表板中添加自定义域名

## 故障排除

如果遇到问题，请检查：
1. 确保所有依赖项都已添加到 package.json
2. 验证 vercel.json 配置正确
3. 检查服务器代码是否正确处理 Vercel 环境

## 更新部署

推送到 GitHub 仓库的 main 分支会自动触发新的部署。