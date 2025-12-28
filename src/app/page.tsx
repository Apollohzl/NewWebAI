import Link from 'next/link';
import { FaRobot, FaBlog, FaShoppingCart, FaChartLine, FaCogs, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRobot className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-blue-600 font-medium">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600 transition">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600 transition">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600 transition">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600 transition">API</Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition">关于</Link>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            免费试用
          </button>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            智能AI驱动的 <span className="text-blue-600">数字宇宙</span>
          </h1>
          <p className="text-xl text-black max-w-2xl mx-auto mb-10">
            NewWebAI 是由小黄の数字宇宙工作室打造的智能平台，为您提供AI驱动的博客、产品和服务
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
              探索AI功能
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition">
              了解我们的服务
            </button>
          </div>
        </div>
      </section>

      {/* AI功能介绍 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-16">智能AI功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <FaBlog className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI智能博客</h3>
              <p className="text-black">
                由AI驱动的内容创作平台，自动生成高质量文章，个性化推荐内容
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <FaShoppingCart className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">智能电商平台</h3>
              <p className="text-black">
                个性化商品推荐，AI客服，智能库存管理，提升购物体验
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <FaChartLine className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">数据智能分析</h3>
              <p className="text-black">
                实时数据分析，预测趋势，为业务决策提供智能支持
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-16">精选产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <FaCogs className="text-blue-600 text-5xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">AI产品 {item}</h3>
                  <p className="text-black mb-4">智能AI解决方案，助力业务增长</p>
                  {item === 1 ? (
                    <Link href="/ai-chat" className="text-blue-600 font-medium hover:underline">
                      了解更多 →
                    </Link>
                  ) : (
                    <button className="text-blue-600 font-medium hover:underline">了解更多 →</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户评价 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-16">用户反馈</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <FaUsers className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">用户 {item}</h4>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-black italic">
                  "NewWebAI的AI功能大大提升了我们的工作效率，智能推荐系统准确率很高，用户体验极佳！"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaRobot className="text-blue-400 text-2xl" />
                <span className="text-xl font-bold">NewWebAI</span>
              </div>
              <p className="text-black">
                由小黄の数字宇宙工作室打造的智能AI平台，为您的业务提供智能化解决方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-black transition">AI博客</a></li>
                <li><a href="#" className="hover:text-black transition">智能电商</a></li>
                <li><a href="#" className="hover:text-black transition">数据分析</a></li>
                <li><a href="#" className="hover:text-black transition">API服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-black transition">关于我们</a></li>
                <li><a href="#" className="hover:text-black transition">团队</a></li>
                <li><a href="#" className="hover:text-black transition">新闻</a></li>
                <li><a href="#" className="hover:text-black transition">合作伙伴</a></li>
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
