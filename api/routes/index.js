// api/routes/index.js - Vercel兼容的API路由
export default function handler(req, res) {
  // 根据请求路径提供不同的响应
  const { pathname } = req;
  
  if (pathname === '/api/models') {
    return handleModels(req, res);
  } else if (pathname.startsWith('/api/models/')) {
    return handleModelDetail(req, res, pathname);
  } else if (pathname === '/api/contact') {
    return handleContact(req, res);
  } else if (pathname === '/api/auth/login') {
    return handleLogin(req, res);
  } else if (pathname === '/api/auth/register') {
    return handleRegister(req, res);
  } else if (pathname.startsWith('/api/user/')) {
    return handleUserDetail(req, res, pathname);
  } else if (pathname === '/api/ai/generate') {
    return handleAiGenerate(req, res);
  } else if (pathname === '/api/stats') {
    return handleStats(req, res);
  } else {
    // 对于非API请求，返回404
    res.status(404).json({ error: 'API endpoint not found' });
  }
}

// 模拟数据
let contacts = [];
let users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];
let aiModels = [
  { id: 1, name: 'GPT-4', description: '高级语言模型', status: 'active' },
  { id: 2, name: 'DALL-E', description: '图像生成模型', status: 'active' },
  { id: 3, name: 'Whisper', description: '语音识别模型', status: 'active' }
];

// API 处理函数
function handleModels(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(aiModels);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function handleModelDetail(req, res, pathname) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const id = parseInt(pathname.split('/')[3]);
  const model = aiModels.find(m => m.id === id);
  
  if (!model) {
    return res.status(404).json({ error: '模型未找到' });
  }
  
  res.status(200).json(model);
}

function handleContact(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
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
  
  res.status(201).json({ 
    message: '联系表单已成功提交', 
    contact: newContact 
  });
}

function handleLogin(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { email, password } = req.body;
  
  if (email === 'admin@newwebai.com' && password === 'admin123') {
    const user = users.find(u => u.email === email);
    res.status(200).json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: 'fake-jwt-token-for-demo'
    });
  } else {
    res.status(401).json({ success: false, error: '无效的凭据' });
  }
}

function handleRegister(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: '所有字段都是必需的' });
  }
  
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
}

function handleUserDetail(req, res, pathname) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const id = parseInt(pathname.split('/')[3]);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: '用户未找到' });
  }
  
  res.status(200).json(user);
}

function handleAiGenerate(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { prompt, model } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: '提示词是必需的' });
  }
  
  const response = {
    id: Date.now(),
    model: model || 'gpt-4',
    prompt: prompt,
    response: `这是基于您提示词 "${prompt}" 的AI生成内容。在实际应用中，这将连接到真实的AI模型API。`,
    createdAt: new Date().toISOString()
  };
  
  setTimeout(() => {
    res.status(200).json(response);
  }, 1000);
}

function handleStats(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const stats = {
    totalUsers: users.length,
    totalContacts: contacts.length,
    totalModels: aiModels.length,
    online: true,
    serverTime: new Date().toISOString()
  };
  
  res.status(200).json(stats);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};