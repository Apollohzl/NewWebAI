// Vercel兼容的服务器配置
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100个请求
});
app.use(limiter);

// 静态文件服务
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// 模拟数据库
let contacts = [];
let users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];
let aiModels = [
  { id: 1, name: 'GPT-4', description: '高级语言模型', status: 'active' },
  { id: 2, name: 'DALL-E', description: '图像生成模型', status: 'active' },
  { id: 3, name: 'Whisper', description: '语音识别模型', status: 'active' }
];

// API 路由

// 获取AI模型列表
app.get('/api/models', (req, res) => {
  res.json(aiModels);
});

// 获取特定AI模型
app.get('/api/models/:id', (req, res) => {
  const model = aiModels.find(m => m.id === parseInt(req.params.id));
  if (!model) {
    return res.status(404).json({ error: '模型未找到' });
  }
  res.json(model);
});

// 提交联系表单
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: '所有字段都是必需的' });
  }
  
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  // 这里可以添加邮件发送逻辑
  console.log('新联系表单提交:', newContact);
  
  res.status(201).json({ 
    message: '联系表单已成功提交', 
    contact: newContact 
  });
});

// 用户认证相关API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // 简单的身份验证（实际应用中应使用更安全的方法）
  if (email === 'admin@newwebai.com' && password === 'admin123') {
    const user = users.find(u => u.email === email);
    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: 'fake-jwt-token-for-demo' // 实际应用中应生成真正的JWT
    });
  } else {
    res.status(401).json({ success: false, error: '无效的凭据' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: '所有字段都是必需的' });
  }
  
  // 检查用户是否已存在
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: '用户已存在' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json({ 
    message: '用户注册成功', 
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
  });
});

// 获取用户信息
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: '用户未找到' });
  }
  res.json(user);
});

// AI 相关API
app.post('/api/ai/generate', (req, res) => {
  const { prompt, model } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: '提示词是必需的' });
  }
  
  // 模拟AI生成响应
  const response = {
    id: Date.now(),
    model: model || 'gpt-4',
    prompt: prompt,
    response: `这是基于您提示词 "${prompt}" 的AI生成内容。在实际应用中，这将连接到真实的AI模型API。`,
    createdAt: new Date().toISOString()
  };
  
  // 这里可以添加调用真实AI API的逻辑
  setTimeout(() => {
    res.json(response);
  }, 1000); // 模拟API调用延迟
});

// 获取统计数据
app.get('/api/stats', (req, res) => {
  const stats = {
    totalUsers: users.length,
    totalContacts: contacts.length,
    totalModels: aiModels.length,
    online: true,
    serverTime: new Date().toISOString()
  };
  res.json(stats);
});

// 根路径重定向到前端页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API 端点未找到' });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器（仅在非Vercel环境使用）
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 NewWebAI 服务器运行在端口 ${PORT}`);
    console.log(`\n📊 API 端点:`);
    console.log(`   GET    /api/models          - 获取AI模型列表`);
    console.log(`   GET    /api/models/:id      - 获取特定AI模型`);
    console.log(`   POST   /api/contact         - 提交联系表单`);
    console.log(`   POST   /api/auth/login      - 用户登录`);
    console.log(`   POST   /api/auth/register   - 用户注册`);
    console.log(`   GET    /api/user/:id        - 获取用户信息`);
    console.log(`   POST   /api/ai/generate     - AI内容生成`);
    console.log(`   GET    /api/stats           - 获取统计数据`);
    console.log(`\n🌐 访问 http://localhost:${PORT} 查看网站\n`);
  });
}

export default app;