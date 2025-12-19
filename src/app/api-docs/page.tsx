'use client';

import { useState } from 'react';
import { FaCode, FaCogs, FaDatabase, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

// API数据配置
const apiData = [
  {
    id: 'hello',
    name: 'Hello API',
    icon: <FaCogs className="text-blue-500" />,
    description: '基础问候API，支持多种语言的问候语',
    tags: ['基础', '问候', '示例'],
    requestUrl: 'https://hzliflow.ken520.top/api/hello',
    requestMethod: 'GET',
    params: [
      { name: 'name', type: 'string', required: false, description: '用户姓名', example: '张三' },
      { name: 'greeting', type: 'string', required: false, description: '问候语', example: '你好' },
      { name: 'lang', type: 'string', required: false, description: '语言', example: 'zh' }
    ],
    response: {
      message: 'Hello 张三！',
      timestamp: '2025-01-01T00:00:00.000Z',
      params: { name: '张三', greeting: 'Hello', lang: 'zh' },
      api: 'hello',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/hello"
params = {
    "name": "张三",
    "greeting": "你好",
    "lang": "zh"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/hello?name=张三&greeting=你好&lang=zh')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  },
  {
    id: 'users',
    name: '用户管理 API',
    icon: <FaUser className="text-green-500" />,
    description: '用户信息的增删改查操作',
    tags: ['用户', '管理', 'CRUD'],
    requestUrl: 'https://hzliflow.ken520.top/api/users',
    requestMethod: 'GET',
    params: [
      { name: 'page', type: 'number', required: false, description: '页码', example: '1' },
      { name: 'limit', type: 'number', required: false, description: '每页数量', example: '10' },
      { name: 'role', type: 'string', required: false, description: '用户角色过滤', example: 'admin' },
      { name: 'search', type: 'string', required: false, description: '搜索关键词', example: '张三' }
    ],
    response: {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', createdAt: '2023-01-15' }
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        hasNextPage: false,
        hasPrevPage: false
      },
      api: 'users',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/users"
params = {
    "page": 1,
    "limit": 10,
    "role": "admin"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/users?page=1&limit=10&role=admin')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  },
  {
    id: 'products',
    name: '产品管理 API',
    icon: <FaDatabase className="text-purple-500" />,
    description: '产品信息的查询、筛选和管理',
    tags: ['产品', '电商', '管理'],
    requestUrl: 'https://hzliflow.ken520.top/api/products',
    requestMethod: 'GET',
    params: [
      { name: 'page', type: 'number', required: false, description: '页码', example: '1' },
      { name: 'limit', type: 'number', required: false, description: '每页数量', example: '10' },
      { name: 'category', type: 'string', required: false, description: '分类', example: 'ai' },
      { name: 'search', type: 'string', required: false, description: '搜索关键词', example: 'AI' },
      { name: 'minPrice', type: 'number', required: false, description: '最低价格', example: '0' },
      { name: 'maxPrice', type: 'number', required: false, description: '最高价格', example: '999999' },
      { name: 'sort', type: 'string', required: false, description: '排序方式', example: 'price-asc' }
    ],
    response: {
      products: [
        { id: 1, name: 'AI智能写作助手', description: '...', price: 99.99, category: 'ai', rating: 4.8 }
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: 1,
        hasNextPage: false,
        hasPrevPage: false
      },
      api: 'products',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/products"
params = {
    "category": "ai",
    "sort": "price-asc",
    "limit": 10
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/products?category=ai&sort=price-asc&limit=10')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  },
  {
    id: 'blog',
    name: '博客管理 API',
    icon: <FaCode className="text-red-500" />,
    description: '博客文章的管理与查询',
    tags: ['博客', '内容', '文章'],
    requestUrl: 'https://hzliflow.ken520.top/api/blog',
    requestMethod: 'GET',
    params: [
      { name: 'page', type: 'number', required: false, description: '页码', example: '1' },
      { name: 'limit', type: 'number', required: false, description: '每页数量', example: '10' },
      { name: 'category', type: 'string', required: false, description: '分类', example: '技术' },
      { name: 'tag', type: 'string', required: false, description: '标签', example: 'AI' },
      { name: 'author', type: 'string', required: false, description: '作者', example: '张三' },
      { name: 'search', type: 'string', required: false, description: '搜索关键词', example: 'AI' },
      { name: 'sort', type: 'string', required: false, description: '排序方式', example: 'date' }
    ],
    response: {
      posts: [
        { id: 1, title: 'AI技术如何改变我们的生活', excerpt: '...', author: '张三', date: '2024-01-15' }
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 1,
        hasNextPage: false,
        hasPrevPage: false
      },
      api: 'blog',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/blog"
params = {
    "category": "技术",
    "sort": "date",
    "limit": 10
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/blog?category=技术&sort=date&limit=10')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  },
  {
    id: 'search',
    name: '全站搜索 API',
    icon: <FaSearch className="text-yellow-500" />,
    description: '全站内容搜索，支持多类型数据',
    tags: ['搜索', '全站', '多类型'],
    requestUrl: 'https://hzliflow.ken520.top/api/search',
    requestMethod: 'GET',
    params: [
      { name: 'q', type: 'string', required: true, description: '搜索关键词', example: 'AI' },
      { name: 'type', type: 'string', required: false, description: '搜索类型', example: 'all' },
      { name: 'limit', type: 'number', required: false, description: '每页数量', example: '10' }
    ],
    response: {
      query: 'AI',
      type: 'all',
      totalResults: 10,
      results: {
        products: [],
        blog: [],
        users: []
      },
      api: 'search',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/search"
params = {
    "q": "AI",
    "type": "all",
    "limit": 10
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/search?q=AI&type=all&limit=10')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  },
  {
    id: 'cart',
    name: '购物车 API',
    icon: <FaShoppingCart className="text-indigo-500" />,
    description: '购物车管理，包括增删改查',
    tags: ['购物车', '电商', '管理'],
    requestUrl: 'https://hzliflow.ken520.top/api/cart',
    requestMethod: 'GET',
    params: [
      { name: 'userId', type: 'string', required: false, description: '用户ID', example: '123' }
    ],
    response: {
      items: [
        { id: 1, productId: 1, name: '商品名称', price: 99.99, quantity: 2 }
      ],
      totalItems: 2,
      totalAmount: 199.98,
      userId: '123',
      api: 'cart',
      version: '1.0.0'
    },
    examples: {
      python: `import requests

url = "https://hzliflow.ken520.top/api/cart"
params = {
    "userId": "123"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      javascript: `fetch('https://hzliflow.ken520.top/api/cart?userId=123')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  }
];

const ApiDocsPage = () => {
  const [activeTab, setActiveTab] = useState('hello');
  const [activeMethod, setActiveMethod] = useState('GET');
  const [testParams, setTestParams] = useState<Record<string, string>>({});
  const [testResponse, setTestResponse] = useState<any>(null);
  const [activeExample, setActiveExample] = useState('javascript');

  const currentApi = apiData.find(api => api.id === activeTab) || apiData[0];

  const handleTestApi = async () => {
    try {
      let url = currentApi.requestUrl;
      let params = new URLSearchParams(testParams).toString();
      if (params) {
        url += '?' + params;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTestResponse(data);
    } catch (error: any) {
      setTestResponse({ error: error.message });
    }
  };

  const handleParamChange = (paramName: string, value: string) => {
    setTestParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 页眉 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-black">NewWebAI</span>          </a>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-black hover:text-blue-600">首页</a>
            <a href="/blog" className="text-black hover:text-blue-600">博客</a>
            <a href="/store" className="text-black hover:text-blue-600">产品</a>
            <a href="/ai-tools" className="text-black hover:text-blue-600">AI工具</a>
            <a href="/api-docs" className="text-blue-600 font-medium">API</a>
            <a href="/about" className="text-black hover:text-blue-600">关于</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">API 文档中心</h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            NewWebAI 提供丰富的API接口，助力您的开发和集成
          </p>
        </div>

        {/* API标签选择器 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {apiData.map((api) => (
              <button
                key={api.id}
                onClick={() => setActiveTab(api.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeTab === api.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-black hover:bg-blue-50 border border-blue-200'
                }`}
              >
                <span className="mr-2">{api.icon}</span>
                {api.name}
              </button>
            ))}
          </div>
        </div>

        {/* API详情卡片 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">{currentApi.icon}</span>
                <h2 className="text-2xl font-bold text-black">{currentApi.name}</h2>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {currentApi.requestMethod}
                </span>
                <div className="flex space-x-1">
                  {currentApi.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-black rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-black">{currentApi.description}</p>
          </div>

          <div className="p-6">
            {/* 请求URL */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-3">请求地址</h3>
              <div className="bg-blue-100 rounded-lg p-4 font-mono text-sm break-all">
                {currentApi.requestUrl}
              </div>
            </div>

            {/* 请求方法切换 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black mb-3">请求方法</h3>
              <div className="flex space-x-2">
                {['GET', 'POST', 'PUT', 'DELETE'].map(method => (
                  <button
                    key={method}
                    onClick={() => setActiveMethod(method)}
                                    className={`px-4 py-2 rounded-lg ${
                                      activeMethod === method
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-100 text-black hover:bg-blue-200'
                                    }`}                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* 请求参数表格 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-3">请求参数</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-blue-200 rounded-lg">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-4 text-left">参数名</th>
                      <th className="py-2 px-4 text-left">类型</th>
                      <th className="py-2 px-4 text-left">必需</th>
                      <th className="py-2 px-4 text-left">说明</th>
                      <th className="py-2 px-4 text-left">示例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApi.params.map((param, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : ''}>
                        <td className="py-2 px-4 font-mono">{param.name}</td>
                        <td className="py-2 px-4">{param.type}</td>
                        <td className="py-2 px-4">
                          {param.required ? (
                            <span className="text-red-600">是</span>
                          ) : (
                            <span className="text-black">否</span>
                          )}
                        </td>
                        <td className="py-2 px-4">{param.description}</td>
                        <td className="py-2 px-4 font-mono text-sm">{param.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 返回参数表格 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-3">返回参数</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-blue-200 rounded-lg">
                              <thead>
                                <tr className="bg-blue-100">
                                  <th className="py-2 px-4 text-left">参数名</th>
                                  <th className="py-2 px-4 text-left">类型</th>
                                  <th className="py-2 px-4 text-left">说明</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(currentApi.response).map(([key, value], index) => (
                                  <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : ''}>
                                    <td className="py-2 px-4 font-mono">{key}</td>
                                    <td className="py-2 px-4">{typeof value === 'object' ? 'object' : typeof value}</td>
                                    <td className="py-2 px-4">{typeof value === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : String(value)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>            </div>

            {/* 在线测试 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-3">在线测试</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {currentApi.params.map((param, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-black mb-1">
                        {param.name} {param.required && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        type="text"
                        value={testParams[param.name] || ''}
                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                        placeholder={param.example}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleTestApi}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  测试API
                </button>
                {testResponse && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-black mb-2">响应结果:</h4>
                    <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(testResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 代码示例 */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">代码示例</h3>
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setActiveExample('javascript')}
                                  className={`px-4 py-2 rounded-lg ${
                                    activeExample === 'javascript'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-blue-100 text-black hover:bg-blue-200'
                                  }`}                >
                  JavaScript
                </button>
                <button
                  onClick={() => setActiveExample('python')}
                                  className={`px-4 py-2 rounded-lg ${
                                    activeExample === 'python'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-blue-100 text-black hover:bg-blue-200'
                                  }`}                >
                  Python
                </button>
              </div>
              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {activeExample === 'javascript' ? currentApi.examples.javascript : currentApi.examples.python}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-black text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">NewWebAI</h4>
              <p className="text-black">
                由小黄の数字宇宙工作室打造的智能AI平台，为您的业务提供智能化解决方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-white transition">AI博客</a></li>
                <li><a href="#" className="hover:text-white transition">智能电商</a></li>
                <li><a href="#" className="hover:text-white transition">数据分析</a></li>
                <li><a href="#" className="hover:text-white transition">API服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">团队</a></li>
                <li><a href="#" className="hover:text-white transition">新闻</a></li>
                <li><a href="#" className="hover:text-white transition">合作伙伴</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-black">
                <li>邮箱: contact@newwebai.com</li>
                <li>网址: https://hzliflow.ken520.top/</li>
                <li>公司: 小黄の数字宇宙工作室</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-black">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApiDocsPage;