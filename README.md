# NewWebAI - 智能AI网站平台

![Logo](public/logo.png)

**在线访问**: https://hzliflow.ken520.top/

**GitHub仓库**: https://github.com/Apollohzl/NewWebAI

由**小黄の数字宇宙工作室**打造的智能AI驱动网站平台，基于 Next.js 16 框架构建，集成了先进的 AI 功能和现代化的 Web 技术。

---

## 项目概述

NewWebAI 是一个综合性的智能网站平台，提供以下核心功能：

- 🤖 **AI智能对话** - 基于 Pollinations AI 的实时对话系统，支持多种AI模型
- 📝 **AI博客系统** - 支持AI自动生成博客内容，Markdown渲染
- 🛒 **电商产品展示** - 产品目录、购物车、结账流程
- 🔌 **API服务门户** - 完善的API文档和调用接口
- 👤 **用户认证系统** - 注册、登录、密码重置、头像上传
- 📊 **广告管理系统** - 集成广告投放系统
- 🌐 **数据分析** - Google Analytics集成

---

## 技术栈

### 框架与语言
- **Next.js 16** - React框架（App Router）
- **TypeScript** - 类型安全
- **React 19** - UI库

### 样式与UI
- **Tailwind CSS 4** - 原子化CSS框架
- **React Icons** - 图标库
- **react-markdown** - Markdown渲染

### 后端与数据库
- **MySQL** - 关系型数据库
- **mysql2** - MySQL驱动
- **JWT** - JSON Web Token认证
- **bcryptjs** - 密码加密

### AI服务
- **Pollinations AI** - AI对话和图像生成API
- **流式响应** - Server-Sent Events (SSE)

### 部署
- **Vercel** - 自动部署
- **GitHub** - 代码仓库

---

## 项目结构

```
newwebai/
├── public/                    # 静态资源
│   ├── adsimg/                # 广告图片
│   ├── logo.png               # 网站Logo
│   ├── favicon.ico            # 网站图标
│   └── *.svg                  # 各种SVG图标
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── about/             # 关于我们页面
│   │   ├── admin/             # 管理后台
│   │   │   ├── auto-blog/     # AI自动博客管理
│   │   │   ├── developer/     # 开发者工具
│   │   │   └── test-api/      # API测试页面
│   │   ├── ads.txt/           # 广告配置文件
│   │   ├── ai-chat/           # AI对话主页面
│   │   ├── ai-p/              # AI图像生成页面
│   │   ├── ai-tools/          # AI工具集合
│   │   │   ├── chat/          # AI聊天工具
│   │   │   └── dashboard/     # AI仪表板
│   │   ├── api/               # API路由
│   │   │   ├── account/       # 账户相关API
│   │   │   ├── admin/         # 管理员API
│   │   │   ├── ads/           # 广告API
│   │   │   ├── ai/            # AI相关API
│   │   │   │   ├── models/    # AI模型列表
│   │   │   │   └── image-models/  # 图像模型
│   │   │   ├── auth/          # 认证API
│   │   │   ├── auto-blog/     # 自动博客API
│   │   │   ├── blog/         # 博客API
│   │   │   ├── config/       # 配置API
│   │   │   └── ...           # 其他API
│   │   ├── api-docs/         # API文档页面
│   │   ├── blog/             # 博客系统
│   │   │   ├── [id]/         # 博客详情页
│   │   │   └── write/        # 写博客页面
│   │   ├── cart/             # 购物车页面
│   │   ├── checkout/         # 结账页面
│   │   ├── disclaimer/       # 免责声明
│   │   ├── forgot-password/  # 忘记密码
│   │   ├── login/            # 登录页面
│   │   ├── privacy/          # 隐私政策
│   │   ├── products/         # 产品列表页
│   │   ├── profile/          # 用户资料页
│   │   ├── register/         # 注册页面
│   │   ├── reset-password/   # 重置密码
│   │   ├── store/            # 产品商店
│   │   │   └── [id]/        # 产品详情页
│   │   ├── terms/            # 服务条款
│   │   ├── verify/           # 邮箱验证
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 根布局
│   │   ├── metadata.ts       # 全局元数据
│   │   └── page.tsx          # 首页
│   ├── components/           # React组件
│   │   ├── AdComponent.tsx   # 广告组件
│   │   ├── AdPlacement.tsx   # 广告位组件
│   │   ├── AuthButtons.tsx   # 认证按钮组件
│   │   ├── GoogleAnalytics.tsx  # GA组件
│   │   ├── UserAvatar.tsx    # 用户头像组件
│   │   └── api/              # API文档组件
│   │       ├── ApiCard.tsx       # API卡片
│   │       ├── ApiCodeExamples.tsx  # 代码示例
│   │       └── ApiParamTable.tsx   # 参数表格
│   ├── config/               # 配置文件
│   │   ├── ads.json          # 广告配置
│   │   ├── apiParams.json    # API参数配置
│   │   ├── apis.json         # API列表配置
│   │   ├── products.json     # 产品数据
│   │   └── videoModels.ts    # 视频模型配置
│   ├── context/              # React Context
│   │   ├── AuthContext.tsx   # 认证上下文（旧版）
│   │   ├── CartContext.tsx   # 购物车上下文
│   │   └── SimpleAuthContext.tsx  # 简化认证上下文
│   ├── lib/                  # 工具库
│   │   ├── auth.ts           # 认证工具函数
│   │   ├── autoBlogScheduler.ts  # 自动博客调度器
│   │   ├── blogDatabase.ts   # 博客数据库操作
│   │   ├── database.ts       # 数据库主文件
│   │   ├── firebase.ts       # Firebase配置
│   │   ├── products.ts       # 产品数据
│   │   ├── sql.ts            # SQL连接
│   │   ├── sqlDatabase.ts    # SQL数据库操作
│   │   └── userDatabase.ts  # 用户数据库操作
│   ├── services/             # 服务层
│   │   ├── logger.ts         # 日志服务
│   │   └── translate.ts      # 翻译服务
│   ├── types/                # TypeScript类型定义
│   │   └── index.ts          # 全局类型
│   └── utils/                # 工具函数
│       └── logUtils.ts       # 日志工具
├── *.sql                     # 数据库SQL脚本
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 页面功能详解

### 公开页面

#### 首页 (`/`)
- 响应式导航栏（桌面/移动端）
- 英雄区域展示
- AI功能介绍卡片
- 产品展示区域
- 广告位展示
- 页脚信息

#### 博客系统 (`/blog`)
- 博客文章列表展示
- 分类筛选
- 搜索功能
- 文章详情页 `/blog/[id]`
  - Markdown/HTML内容渲染
  - 标签展示
  - 上一篇/下一篇导航
- 写博客页面 `/blog/write`

#### 产品商店 (`/store`)
- 产品网格展示
- 产品分类
- 产品详情页 `/store/[id]`
  - 产品图片
  - 价格和评分
  - 功能特性
  - 相关产品推荐
  - 加入购物车/立即购买

#### 购物车 (`/cart`)
- 商品列表管理
- 数量调整
- 商品删除
- 价格计算（含税费）
- 去结算按钮

#### AI工具 (`/ai-tools`)
- AI工具导航
- AI聊天界面 `/ai-tools/chat`
  - 实时对话
  - 打字机效果
  - 加载动画
- AI仪表板 `/ai-tools/dashboard`

#### AI对话 (`/ai-chat`)
- 多AI模型切换
- 流式响应展示
- 创造性参数调节
- 最大Token设置
- 思考过程展示（支持DeepSeek等模型的reasoning）
- 对话历史管理
- 多段消息分割 `<N>` 标识符支持
- 余额显示

#### AI图像生成 (`/ai-p`)
- 文本转图像
- 多种比例选择
- 预览和下载

#### API文档 (`/api-docs`)
- API卡片展示
- 分类筛选
- 搜索功能
- API详情页 `/api-docs/[id]`
  - 请求示例
  - 参数说明
  - 响应格式

#### 关于页面 (`/about`)
- 工作室介绍
- 项目介绍
- 联系方式

#### 法律页面
- 服务条款 (`/terms`)
- 隐私政策 (`/privacy`)
- 免责声明 (`/disclaimer`)

---

### 用户认证页面

#### 登录 (`/login`)
- 邮箱/密码登录
- 验证码验证（中文验证码）
- 密码显示/隐藏切换
- 记住登录状态
- GitHub OAuth按钮（预留）
- 忘记密码链接

#### 注册 (`/register`)
- 用户名、邮箱、密码注册
- 邮箱验证链接发送
- 注册成功提示

#### 忘记密码 (`/forgot-password`)
- 邮箱验证
- 重置密码链接发送

#### 重置密码 (`/reset-password`)
- 邮箱链接验证
- 新密码设置

#### 邮箱验证 (`/verify`)
- 注册邮箱验证
- 验证成功跳转

#### 用户资料 (`/profile`)
- 头像上传
- 用户名/邮箱修改
- 密码重置（通过邮件）
- 账户安全设置

---

### 管理后台

#### 自动博客管理 (`/admin/auto-blog`)
- 定时器状态监控
- 启动/停止/重启定时器
- 手动生成博客
- AI创造性参数调节（0-2）
- AI模型选择
- 最大Token数设置（1000-9000）
- 执行间隔设置（10-1440分钟）
- 内容预览
- 确认发布功能
- 最近生成博客列表

#### 开发者工具 (`/admin/developer`)
- API测试工具
- 环境变量配置

#### API测试 (`/admin/test-api`)
- API接口测试
- 请求/响应查看

---

## API接口文档

### 认证相关 `/api/auth`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册 |
| `/api/auth/login` | POST | 用户登录 |
| `/api/auth/logout` | POST | 用户登出 |
| `/api/auth/check-status` | GET | 检查认证状态 |
| `/api/auth/update-profile` | PUT | 更新用户资料 |
| `/api/auth/update-password` | PUT | 更新密码 |
| `/api/auth/upload-avatar` | POST | 上传头像 |
| `/api/auth/request-password-reset` | POST | 请求密码重置 |
| `/api/auth/reset-password` | POST | 重置密码 |

### 博客相关 `/api/blog`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/blog` | GET | 获取博客列表 |
| `/api/blog` | POST | 创建博客 |
| `/api/blog/[id]` | GET | 获取博客详情 |
| `/api/blog/[id]` | PUT | 更新博客 |
| `/api/blog/[id]` | DELETE | 删除博客 |
| `/api/blog/create` | POST | 创建博客 |

### AI相关 `/api/ai*`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/ai-chat` | GET/POST | AI对话 |
| `/api/ai/models` | GET | 获取AI模型列表 |
| `/api/ai/image-models` | GET | 获取图像模型列表 |
| `/api/ai-image` | POST | AI图像生成 |

### 账户相关 `/api/account`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/account/balance` | GET | 获取账户余额 |

### 配置相关 `/api/config`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/config/apis` | GET | 获取API列表配置 |
| `/api/config/products` | GET | 获取产品列表配置 |
| `/api/config/params` | GET | 获取参数配置 |

### 广告相关 `/api/ads`

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/ads` | GET | 获取广告列表 |

---

## 数据库结构

### 用户表 (users)
```sql
- id (VARCHAR) - 主键
- username (VARCHAR) - 用户名
- email (VARCHAR) - 邮箱
- password (VARCHAR) - 密码哈希
- avatar (VARCHAR) - 头像URL
- role (ENUM) - 角色(user/admin)
- is_active (BOOLEAN) - 是否激活
- created_at (DATETIME) - 创建时间
- updated_at (DATETIME) - 更新时间
```

### 博客表 (blogposts)
```sql
- id (VARCHAR) - 主键
- title (VARCHAR) - 标题
- content (TEXT) - 内容(HTML)
- excerpt (TEXT) - 摘要
- category (VARCHAR) - 分类
- author (VARCHAR) - 作者
- read_time (VARCHAR) - 阅读时间
- status (ENUM) - 状态(正常/草稿)
- created_at (DATETIME)
- updated_at (DATETIME)
```

### 博客标签表 (blog_tags)
```sql
- id (INT) - 主键
- tag_name (VARCHAR) - 标签名
```

### 博客-标签关联表 (blog_post_tags)
```sql
- post_id (VARCHAR) - 博客ID
- tag_id (INT) - 标签ID
```

### 聊天消息表 (chat_messages)
```sql
- id (VARCHAR) - 主键
- user_id (VARCHAR) - 用户ID
- role (ENUM) - 角色
- content (TEXT) - 内容
- thinking_content (TEXT) - 思考内容
- model (VARCHAR) - 使用的模型
- session_id (VARCHAR) - 会话ID
- created_at (DATETIME)
```

### 产品表 (products)
```sql
- id (INT) - 主键
- name (VARCHAR) - 产品名
- description (TEXT) - 描述
- price (DECIMAL) - 价格
- category (VARCHAR) - 分类
- image (VARCHAR) - 图片URL
- tags (JSON) - 标签
- features (JSON) - 功能特性
- in_stock (BOOLEAN) - 是否有库存
- rating (DECIMAL) - 评分
- created_at (DATETIME)
- updated_at (DATETIME)
```

---

## 核心组件说明

### AuthButtons
用户认证状态按钮组件，根据登录状态显示登录/注册或用户头像下拉菜单。

### AdComponent
广告展示组件，从 `/api/ads` 获取广告数据并随机展示。

### AdPlacement
广告位组件，用于页面特定位置的广告展示。

### CartContext
购物车状态管理，提供添加、删除、更新数量、清空购物车等功能。

### SimpleAuthContext
用户认证状态管理，处理登录、注册、登出、用户信息更新。

### ApiCard
API文档卡片组件，展示单个API的基本信息。

### ApiCodeExamples
API代码示例组件，提供多种语言的调用示例。

### ApiParamTable
API参数表格组件，详细展示API参数说明。

---

## 环境变量配置

```env
# 数据库配置
SQL_HOST=your_mysql_host
SQL_PORT=3306
SQL_DATABASE=your_database
SQL_USER=your_username
SQL_PASSWORD=your_password

# JWT配置
JWT_SECRET=your_jwt_secret

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Pollinations AI API
POLLINATIONS_API_KEY=your_api_key
```

---

## 安装与运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
创建 `.env.local` 文件并配置上述环境变量。

### 3. 初始化数据库
运行 SQL 脚本初始化数据库表结构。

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 构建生产版本
```bash
npm run build
npm start
```

---

## 部署说明

### Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 点击 Deploy

项目已配置自动部署，推送到 main 分支后会自动部署。

---

## 功能特色

### 1. AI对话系统
- 支持多种AI模型（OpenAI、DeepSeek、Gemini等）
- 流式响应，实时显示
- 思考过程展示
- 多段消息分割
- 对话历史保存

### 2. 自动博客生成
- 定时任务自动生成
- 可调节AI参数
- 内容预览确认
- 自动发布

### 3. 电商功能
- 产品展示和分类
- 购物车管理
- 价格计算
- 结账流程

### 4. 广告系统
- 广告位管理
- 随机广告展示
- 广告点击追踪

### 5. 用户系统
- 邮箱注册验证
- JWT认证
- 头像上传
- 密码安全重置

---

## 开发指南

### 添加新页面
在 `src/app` 目录下创建新文件夹和 `page.tsx` 文件。

### 添加新API
在 `src/app/api` 目录下创建新的路由文件夹和 `route.ts` 文件。

### 添加新组件
在 `src/components` 目录下创建新的组件文件。

### 添加新产品
编辑 `src/config/products.json` 文件添加新产品数据。

### 添加新API接口
编辑 `src/config/apis.json` 文件添加新的API配置。

---

## 联系方式

- **公司**: 小黄の数字宇宙工作室
- **邮箱**: contact@newwebai.com
- **网站**: https://hzliflow.ken520.top/
- **GitHub**: https://github.com/Apollohzl/NewWebAI

---

## 许可证

© 2025 小黄の数字宇宙工作室. 保留所有权利.

NewWebAI 是小黄の数字宇宙工作室的智能AI平台商标。
