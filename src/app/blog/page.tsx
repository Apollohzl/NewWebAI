import Link from 'next/link';

export default function BlogPage() {
  // 模拟博客文章数据
  const blogPosts = [
    {
      id: 1,
      title: 'AI技术的未来发展趋势',
      excerpt: '探讨人工智能技术的最新进展和未来发展方向，以及对社会的影响。',
      date: '2025-01-15',
      author: '小黄AI团队',
      readTime: '5 分钟阅读'
    },
    {
      id: 2,
      title: 'Next.js 14 新特性详解',
      excerpt: '深入了解Next.js 14的新功能，包括服务器组件、流式渲染等。',
      date: '2025-01-12',
      author: '小黄AI团队',
      readTime: '8 分钟阅读'
    },
    {
      id: 3,
      title: '构建智能推荐系统',
      excerpt: '如何使用机器学习算法构建个性化推荐系统，提升用户体验。',
      date: '2025-01-10',
      author: '小黄AI团队',
      readTime: '6 分钟阅读'
    },
    {
      id: 4,
      title: 'Web开发最佳实践',
      excerpt: '现代Web开发中的最佳实践，包括性能优化、安全性和可访问性。',
      date: '2025-01-08',
      author: '小黄AI团队',
      readTime: '7 分钟阅读'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 博客导航 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-blue-600 font-medium">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600">API</Link>
          </div>
        </div>
      </nav>

      {/* 博客标题 */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-black mb-4">AI & Tech 博客</h1>
        <p className="text-xl text-center text-black max-w-2xl mx-auto mb-12">
          探索人工智能、Web开发和技术创新的最新动态
        </p>

        {/* 博客文章列表 */}
        <div className="max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8 hover:shadow-lg transition"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-blue-600 font-medium">{post.date}</span>
                  <span className="text-sm text-black">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-3">{post.title}</h2>
                <p className="text-black mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-black">作者: {post.author}</span>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg">2</button>
          <button className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg">3</button>
          <button className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg">下一页 →</button>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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