// pages/api/stats.js
// 模拟数据（在实际应用中应使用数据库）
let contacts = [];
let users = [
  { id: 1, name: 'Admin', email: 'admin@newwebai.com', role: 'admin' }
];
let aiModels = [
  { id: 1, name: 'GPT-4', description: '高级语言模型', status: 'active' },
  { id: 2, name: 'DALL-E', description: '图像生成模型', status: 'active' },
  { id: 3, name: 'Whisper', description: '语音识别模型', status: 'active' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const stats = {
      totalUsers: users.length,
      totalContacts: contacts.length,
      totalModels: aiModels.length,
      online: true,
      serverTime: new Date().toISOString()
    };
    
    res.status(200).json(stats);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}