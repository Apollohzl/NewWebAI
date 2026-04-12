'use client';

import { useState, useEffect } from 'react';
import { FaRobot, FaChartLine, FaCogs, FaGlobe, FaMobileAlt, FaLock, FaFilter, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string | null;
  category: string;
  rating: string;
  tags: string[];
  features: string[];
  in_stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === '全部') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/config/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        // 提取所有分类
        const uniqueCategories = Array.from(new Set<string>(data.data.map((p: Product) => p.category)));
        setCategories(uniqueCategories);
      } else {
        setError('获取产品数据失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
      console.error('获取产品数据失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons: { [key: string]: any } = {
    '软件工具': <FaRobot className="text-blue-600" />,
    '数据分析': <FaChartLine className="text-green-600" />,
    '客户服务': <FaCogs className="text-purple-600" />,
    '创意设计': <FaGlobe className="text-yellow-600" />,
    '开发工具': <FaLock className="text-red-600" />,
    '营销工具': <FaMobileAlt className="text-indigo-600" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* 产品导航 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600">博客</Link>
            <Link href="/products" className="text-black font-medium">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
          </div>
        </div>
      </nav>

      {/* 产品标题 */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-6">
          我们的 <span className="text-blue-600">AI产品</span>
        </h1>
        <p className="text-xl text-center text-black max-w-3xl mx-auto mb-8">
          NewWebAI提供一系列智能化解决方案，帮助您的业务实现数字化转型
        </p>

        {/* 分类筛选 */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('全部')}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === '全部'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-blue-600 text-4xl" />
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 text-xl">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              重试
            </button>
          </div>
        )}

        {/* 产品列表 */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">暂无产品数据</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <span className="ml-1 text-black">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3">{product.name}</h3>
                  <p className="text-black mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-black px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-black">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">¥{product.price}</span>
                      <span className="text-gray-400 line-through ml-2">¥{product.original_price}</span>
                    </div>
                    <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
                      {product.in_stock ? '有货' : '缺货'}
                    </span>
                  </div>

                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    了解更多
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 定价方案 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-16">灵活的定价方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100">
              <h3 className="text-2xl font-bold text-black mb-4">基础版</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">¥99<span className="text-lg">/月</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  基础AI功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10,000次API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  基础支持
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-black py-3 rounded-lg hover:bg-gray-200 transition">
                选择基础版
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-blue-500 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                推荐
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">专业版</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">¥299<span className="text-lg">/月</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  全部AI功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100,000次API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  优先支持
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  个性化定制
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                选择专业版
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100">
              <h3 className="text-2xl font-bold text-black mb-4">企业版</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">定制报价</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  全部功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  无限API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  专属客户经理
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  安全合规
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition">
                联系销售
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
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
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-black">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}