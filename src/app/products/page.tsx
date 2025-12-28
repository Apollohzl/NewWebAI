import { FaRobot, FaChartLine, FaCogs, FaGlobe, FaMobileAlt, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      title: 'AI内容生成器',
      description: '使用先进的GPT模型自动生成高质量文章、博客和营销内容',
      icon: <FaRobot className="text-4xl text-blue-600" />,
      features: ['智能内容生成', '多语言支持', 'SEO优化', '个性化定制']
    },
    {
      id: 2,
      title: '数据分析平台',
      description: '实时分析业务数据，提供可视化报告和智能预测',
      icon: <FaChartLine className="text-4xl text-green-600" />,
      features: ['实时数据监控', '可视化报表', '趋势预测', '智能警报']
    },
    {
      id: 3,
      title: '智能客服系统',
      description: '24/7全自动化客服，支持多渠道接入和智能对话',
      icon: <FaCogs className="text-4xl text-purple-600" />,
      features: ['多语言支持', '情感分析', '无缝转接人工', '对话记录']
    },
    {
      id: 4,
      title: '电商平台AI',
      description: '个性化商品推荐，智能搜索，动态定价策略',
      icon: <FaGlobe className="text-4xl text-yellow-600" />,
      features: ['个性化推荐', '智能搜索', '动态定价', '库存预测']
    }
  ];

  const features = [
    {
      title: '智能算法',
      description: '基于最新AI技术，提供精准的分析和预测能力',
      icon: <FaCogs className="text-blue-600" />
    },
    {
      title: '多平台支持',
      description: '支持Web、移动端、API等多种接入方式',
      icon: <FaMobileAlt className="text-blue-600" />
    },
    {
      title: '数据安全',
      description: '采用银行级加密技术，确保数据安全和隐私',
      icon: <FaLock className="text-blue-600" />
    }
  ];

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
        <p className="text-xl text-center text-black max-w-3xl mx-auto mb-16">
          NewWebAI提供一系列智能化解决方案，帮助您的业务实现数字化转型
        </p>

        {/* 核心功能 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* 产品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-3">{product.title}</h3>
                <p className="text-black mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-40">
                  了解更多
                </button>
              </div>
              <div className="md:w-2/5 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                  <h4 className="font-bold mb-2">AI性能指标</h4>
                  <p className="text-4xl font-bold mb-2">99.9%</p>
                  <p className="text-sm">准确率</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 定价方案 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-16">灵活的定价方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100">
              <h3 className="text-2xl font-bold text-black mb-4">基础版</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">¥99<span className="text-lg">/月</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  基础AI功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10,000次API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  全部AI功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100,000次API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  优先支持
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  全部功能
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  无限API调用
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  专属客户经理
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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