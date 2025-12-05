// pages/api/auth/register.js
// 模拟用户数据（在实际应用中应使用数据库）
let users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];

export default function handler(req, res) {
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}