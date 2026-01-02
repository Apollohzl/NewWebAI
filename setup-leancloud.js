// LeanCloud 数据库初始化脚本
// 运行方法：node setup-leancloud.js

const https = require('https');
const querystring = require('querystring');

// 从环境变量获取配置
const APP_ID = process.env.LEANCLOUD_APP_ID || 'your_app_id';
const APP_KEY = process.env.LEANCLOUD_APP_KEY || 'your_app_key';
const MASTER_KEY = process.env.LEANCLOUD_MASTER_KEY || 'your_master_key';

// LeanCloud API 配置
const BASE_URL = 'https://api.leancloud.cn';
const API_VERSION = '1.1';

// 产品数据
const productsData = [
  {
    name: "AI智能写作助手",
    description: "基于最新AI技术的智能写作工具，帮助您快速生成高质量内容",
    price: 99.99,
    originalPrice: 199.99,
    image: "/api/placeholder/300/300",
    category: "软件工具",
    rating: 4.8,
    tags: ["AI", "写作", "效率"],
    features: ["智能生成", "多语言支持", "一键导出"]
  },
  {
    name: "数据可视化仪表板",
    description: "强大的数据分析和可视化工具，让数据一目了然",
    price: 149.99,
    originalPrice: 299.99,
    image: "/api/placeholder/300/300",
    category: "数据分析",
    rating: 4.9,
    tags: ["数据", "图表", "分析"],
    features: ["实时更新", "多种图表", "自定义面板"]
  },
  {
    name: "智能客服系统",
    description: "24/7全自动化客服，提升客户满意度",
    price: 199.99,
    originalPrice: 399.99,
    image: "/api/placeholder/300/300",
    category: "客户服务",
    rating: 4.7,
    tags: ["客服", "自动化", "AI"],
    features: ["24/7服务", "智能回复", "多渠道支持"]
  }
];

// API数据
const apisData = [
  {
    id: "hello",
    name: "Hello API",
    description: "基础问候API，支持多种语言的问候语",
    status: "正常",
    visits: "6739",
    icon: "👋",
    tags: ["基础", "问候", "示例"],
    category: "basic",
    requestUrl: "https://hzliflow.ken520.top/api/hello",
    methods: ["GET", "POST"]
  },
  {
    id: "ai-chat",
    name: "AI对话 API",
    description: "智能对话接口，支持多轮对话",
    status: "正常",
    visits: "24589",
    icon: "🤖",
    tags: ["AI", "对话", "智能"],
    category: "ai",
    requestUrl: "https://hzliflow.ken520.top/api/ai-chat",
    methods: ["GET", "POST"]
  },
  {
    id: "ai-image",
    name: "AI图像生成 API",
    description: "基于AI的图像生成和编辑服务",
    status: "正常",
    visits: "18923",
    icon: "🎨",
    tags: ["AI", "图像", "生成"],
    category: "ai",
    requestUrl: "https://hzliflow.ken520.top/api/ai-image",
    methods: ["GET", "POST"]
  }
];

// 发送HTTP请求的辅助函数
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'rW7lcnwzcrjbif21jrhxtmoh-mdyxbmmi.api.lncldglobal.com',
      port: 443,
      path: `/${API_VERSION}${path}`,
      method: method,
      headers: {
        'X-LC-Id': APP_ID,
        'X-LC-Key': MASTER_KEY,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// 创建表并插入数据
async function createTableAndInsertData(tableName, data) {
  try {
    console.log(`\n🔄 开始创建 ${tableName} 表并插入数据...`);
    
    for (const item of data) {
      try {
        const response = await makeRequest(`/classes/${tableName}`, 'POST', item);
        if (response.status === 201) {
          console.log(`✅ 成功插入: ${item.name || item.id}`);
        } else {
          console.log(`❌ 插入失败: ${item.name || item.id}`, response.data);
        }
      } catch (error) {
        console.log(`❌ 插入错误: ${item.name || item.id}`, error.message);
      }
    }
    
    console.log(`✅ ${tableName} 表创建和数据插入完成！`);
  } catch (error) {
    console.error(`❌ 创建 ${tableName} 表失败:`, error);
  }
}

// 主函数
async function main() {
  console.log('🚀 开始初始化 LeanCloud 数据库...');
  console.log(`📋 App ID: ${APP_ID}`);
  
  // 检查配置
  if (APP_ID === 'your_app_id' || MASTER_KEY === 'your_master_key') {
    console.log('\n❌ 请先设置正确的 LeanCloud 配置！');
    console.log('方法1: 设置环境变量');
    console.log('  export LEANCLOUD_APP_ID=your_app_id');
    console.log('  export LEANCLOUD_MASTER_KEY=your_master_key');
    console.log('方法2: 直接修改此脚本中的配置');
    return;
  }

  try {
    // 创建Products表
    await createTableAndInsertData('Products', productsData);
    
    // 创建APIs表
    await createTableAndInsertData('APIs', apisData);
    
    console.log('\n🎉 LeanCloud 数据库初始化完成！');
    console.log('\n📊 创建的表:');
    console.log('  - Products (产品信息)');
    console.log('  - APIs (API信息)');
    console.log('\n🔗 管理地址: https://console.leancloud.cn/apps/' + APP_ID + '/data');
    
  } catch (error) {
    console.error('❌ 初始化失败:', error);
  }
}

// 运行主函数
main();