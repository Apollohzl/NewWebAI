// pages/api/contact.js
// 模拟数据存储（在实际应用中应使用数据库）
let contacts = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}