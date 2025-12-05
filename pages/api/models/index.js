// pages/api/models/index.js
export default function handler(req, res) {
  // 模拟AI模型数据
  const aiModels = [
    { id: 1, name: 'GPT-4', description: '高级语言模型', status: 'active' },
    { id: 2, name: 'DALL-E', description: '图像生成模型', status: 'active' },
    { id: 3, name: 'Whisper', description: '语音识别模型', status: 'active' }
  ];

  if (req.method === 'GET') {
    res.status(200).json(aiModels);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}