import { FaMagic, FaComments, FaChartPie, FaImage, FaCode, FaRobot } from 'react-icons/fa';
import Link from 'next/link';

export default function AIToolsPage() {
  const tools = [
    {
      id: 1,
      title: 'AI内容生成器',
      description: '自动生成高质量文章、博客和营销内容',
      icon: <FaMagic className="text-3xl text-purple-600" />,
      category: '内容创作',
      link: '/tools/content-generator'
    },
    {
      id: 2,
      title: '智能客服',
      description: '24/7全自动化客服对话系统',
      icon: <FaComments className="text-3xl text-blue-600" />,
      category: '客户服务',
      link: '/tools/chatbot'
    },
    {
      id: 3,
      title: '数据可视化',
      description: '将复杂数据转化为直观的图表和报告',
      icon: <FaChartPie className="text-3xl text-green-600" />,
      category: '数据分析',
      link: '/tools/visualizer'
    },
    {
      id: 4,
      title: 'AI图像生成',
      description: '基于文本描述生成高质量图像',
      icon: <FaImage className="text-3xl text-pink-600" />,
      category: '创意设计',
      link: '/tools/image-generator'
    },
    {
      id: 5,
      title: '代码助手',
      description: '智能代码生成、审查和优化',
      icon: <FaCode className="text-3xl text-yellow-600" />,
      category: '开发工具',
      link: '/tools/code-assistant'
    },
    {
      id: 6,
      title: 'AI分析器',
      description: '智能分析文本、图像和数据模式',
      icon: <FaRobot className="text-3xl text-red-600" />,
      category: '分析工具',
      link: '/tools/analyzer'
    }
  ];

  const features = [
    '基于最新的AI模型',
    '实时处理和分析',
    '多语言支持',
    '云端安全存储',
    '个性化定制',
    'API接口访问'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* AI工具导航 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-blue-600 font-medium">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600">API</Link>
          </div>
        </div>
      </nav>

      {/* 标题区域 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            智能 <span className="text-blue-600">AI工具箱</span>
          </h1>
          <p className="text-xl text-black">
            NewWebAI提供一整套AI驱动的专业工具，助力您的工作与创作
          </p>
        </div>

        {/* 特性展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">强大的AI能力</h2>
              <p className="text-black mb-8">
                我们的AI工具集成了最新的机器学习模型，能够处理各种复杂的任务，从内容生成到数据分析，全面提升工作效率。
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">AI性能指标</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>处理速度</span>
                    <span>99.9%</span>
                  </div>
                  <div className="w-full bg-blue-400/30 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>准确率</span>
                    <span>98.7%</span>
                  </div>
                  <div className="w-full bg-blue-400/30 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>可用性</span>
                    <span>99.95%</span>
                  </div>
                  <div className="w-full bg-blue-400/30 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 工具列表 */}
        <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-black mb-12">我们的AI工具</h2>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link href={tool.link} key={tool.id}>
                <div 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                          {tool.category}
                        </span>
                        <h3 className="text-xl font-bold text-black">{tool.title}</h3>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-lg">
                        {tool.icon}
                      </div>
                    </div>
                    <p className="text-black mb-6">{tool.description}</p>
                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition">
                      立即使用
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 应用场景 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold text-center text-black mb-12">应用场景</h2>          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaComments className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">客户服务</h3>
              <p className="text-black">
                使用智能客服工具，提供24/7全天候客户服务，提升客户满意度
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartPie className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">数据分析</h3>
              <p className="text-black">
                利用AI分析工具处理复杂数据，生成可视化报告，辅助决策
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMagic className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">内容创作</h3>
              <p className="text-black">
                借助AI内容生成工具，快速创建高质量文章、博客和营销内容
              </p>
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
          <div className="border-t border-gray-300 mt-12 pt-8 text-center text-black">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}