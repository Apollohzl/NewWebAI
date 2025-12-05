// pages/api/ai/generate.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
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
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(200).json(response);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}