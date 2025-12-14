import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-800 hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-gray-800 hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-gray-800 hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-gray-800 hover:text-blue-600">AI工具</Link>
            <Link href="/about" className="text-blue-600 font-medium">关于</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">关于我们</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">小黄の数字宇宙工作室</h2>
              <p className="text-gray-800 leading-relaxed">
                小黄の数字宇宙工作室致力于构建智能化的数字产品和服务。我们专注于人工智能、Web开发和创新技术，
                为企业和个人提供高效、智能的解决方案。
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">NewWebAI 项目</h2>
              <p className="text-gray-800 leading-relaxed">
                NewWebAI 是我们基于 Next.js 14 框架构建的智能网站平台，集成了先进的 AI 功能，
                包括智能内容生成、数据分析、个性化推荐等。我们致力于为用户提供最佳的智能体验。
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">我们的使命</h2>
              <p className="text-gray-800 leading-relaxed">
                通过人工智能技术，简化复杂的工作流程，提升个人和企业的生产力。
                我们相信技术应该让生活更简单、更高效、更智能。
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">联系我们</h2>
              <p className="text-gray-800">
                邮箱: contact@newwebai.com<br />
                公司: 小黄の数字宇宙工作室
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
          <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-600">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}