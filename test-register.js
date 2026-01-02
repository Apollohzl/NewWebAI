const fetch = require('node-fetch');

async function testRegisterAPI() {
  const testData = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'testpass123'
  };

  console.log('测试注册API...');
  console.log('测试数据:', testData);

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    
    console.log('响应状态:', response.status);
    console.log('响应数据:', data);
    
    if (response.ok) {
      console.log('✅ 注册API测试成功!');
    } else {
      console.log('❌ 注册API测试失败:', data.error);
    }
  } catch (error) {
    console.error('❌ 请求错误:', error.message);
  }
}

testRegisterAPI();