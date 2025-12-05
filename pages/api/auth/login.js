// pages/api/auth/login.js
// 模拟用户数据（在实际应用中应使用数据库）
const users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // 简单的身份验证（实际应用中应使用更安全的方法）
    if (email === 'admin@newwebai.com' && password === 'admin123') {
      const user = users.find(u => u.email === email);
      res.status(200).json({ 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token: 'fake-jwt-token-for-demo' // 实际应用中应生成真正的JWT
      });
    } else {
      res.status(401).json({ success: false, error: '无效的凭据' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}