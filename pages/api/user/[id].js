// pages/api/user/[id].js
// 模拟用户数据（在实际应用中应使用数据库）
const users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({ error: '用户未找到' });
    }
    
    res.status(200).json(user);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}