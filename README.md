# NewWebAI - 智能AI网站平台

由小黄の数字宇宙工作室打造的智能AI驱动网站平台，基于 Next.js 14 构建，结合了 SSR/SSG 技术和先进的人工智能功能。

## 项目概述

NewWebAI 是一个现代化的智能网站平台，提供：

- **AI驱动的内容生成** - 智能博客和内容管理系统
- **个性化用户体验** - 基于AI的推荐和定制服务
- **数据可视化** - 智能数据分析和可视化仪表板
- **AI聊天机器人** - 实时智能客服和助手
- **高性能渲染** - 使用 Next.js 14 的 SSR 和 SSG 技术

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **AI功能**: React 组件实现的智能交互

## 功能特色

### 1. 智能博客系统
- AI辅助内容生成
- 个性化内容推荐
- 响应式设计

### 2. 产品展示平台
- 动态产品展示
- 智能分类和筛选
- 个性化推荐

### 3. AI工具箱
- 智能聊天机器人
- 数据可视化仪表板
- 实时数据分析

### 4. 高性能架构
- 服务端渲染 (SSR) 实现动态内容
- 静态生成 (SSG) 优化加载速度
- SEO优化

## 项目结构

```
src/
├── app/                 # Next.js 14 App Router 页面
│   ├── blog/           # 博客相关页面
│   ├── products/       # 产品展示页面
│   ├── ai-tools/       # AI工具页面
│   ├── ssg-demo/       # SSG 功能演示
│   ├── api/            # API路由
│   ├── layout.tsx      # 全局布局
│   └── page.tsx        # 首页
├── services/           # 服务层
│   └── logger.ts       # 日志服务
├── utils/              # 工具函数
│   └── logUtils.ts     # 日志工具
├── middleware.ts       # 请求中间件
```

## 运行项目

首先，安装依赖：

```bash
npm install
```

然后，启动开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署

该项目已配置为可在 Vercel 上一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Apollohzl/NewWebAI)

## 日志系统

NewWebAI 包含完整的日志记录系统：

- **changelog.log** - 项目变更日志
- **lastq.log** - 最后用户提示词记录
- **project_snapshot.txt** - 项目快照描述
- **logs/** - 运行时日志文件

## 项目部署

- **线上地址**: https://hzliflow.ken520.top/
- **GitHub仓库**: https://github.com/Apollohzl/NewWebAI

## 联系我们

- **公司**: 小黄の数字宇宙工作室
- **项目**: NewWebAI 智能AI平台

---

由小黄の数字宇宙工作室 © 2025. 保留所有权利。
