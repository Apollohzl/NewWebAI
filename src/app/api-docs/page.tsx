'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ApiCard from '@/components/api/ApiCard';

// 定义API数据类型
interface ApiInfo {
  id: string;
  name: string;
  description: string;
  status: string;
  visits: string;
  icon: string;
  tags: string[];
  category: string;
  requestUrl: string;
  methods: string[];
}

interface ApiResponse {
  apis: ApiInfo[];
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
}

const ApiDocsPage = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // 加载API数据
    fetch('/api/config/apis')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error loading API data:', error));
  }, []);

  const getStatusColor = (status: string) => {
    return status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredApis = apiData?.apis.filter(api => {
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 页眉 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </a>
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

      {/* 横幅区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">🌟 NewWebAI API</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            提供丰富的API接口，助力您的开发和集成
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索API..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                全部
              </button>
              {apiData?.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* API卡片网格 */}
        <div className="api-grid">
          {filteredApis.map((api) => (
            <ApiCard
              key={api.id}
              id={api.id}
              name={api.name}
              description={api.description}
              status={api.status}
              visits={api.visits}
              icon={api.icon}
              tags={api.tags}
            />
          ))}
        </div>
      </div>
                                {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">NewWebAI</h4>
              <p className="text-gray-400">
                由小黄の数字宇宙工作室打造的智能AI平台，为您的业务提供智能化解决方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">AI博客</a></li>
                <li><a href="#" className="hover:text-white transition">智能电商</a></li>
                <li><a href="#" className="hover:text-white transition">数据分析</a></li>
                <li><a href="#" className="hover:text-white transition">API服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">团队</a></li>
                <li><a href="#" className="hover:text-white transition">新闻</a></li>
                <li><a href="#" className="hover:text-white transition">合作伙伴</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-gray-400">
                <li>邮箱: contact@newwebai.com</li>
                <li>网址: https://hzliflow.ken520.top/</li>
                <li>公司: 小黄の数字宇宙工作室</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApiDocsPage;