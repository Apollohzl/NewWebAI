import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

async function getBlogPost(): Promise<{ blogPost: BlogPost; serverTime: string }> {
  // 模拟从数据库或API获取博客文章
  const blogPost: BlogPost = {
    id: 1,
    title: 'Next.js 14 与 AI 技术的完美结合',
    content: 'Next.js 14 引入了众多新特性，包括App Router、流式渲染和React Server Components。这些特性使得构建现代化Web应用变得更加高效。结合AI技术，我们可以创建更加智能和个性化的用户体验。',
    date: '2025-01-15',
    author: '小黄AI团队'
  };

  // 获取服务器时间
  const serverTime = new Date().toISOString();

  return {
    blogPost,
    serverTime
  };
}

export default async function BlogPostPage() {
  const { blogPost, serverTime } = await getBlogPost();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-800 hover:text-blue-600">首页</Link>
            <Link href="/store" className="text-gray-800 hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-gray-800 hover:text-blue-600">AI工具</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-6">
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {blogPost.date}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blogPost.title}</h1>
          <div className="flex items-center text-gray-800 mb-8">
            <span>作者: {blogPost.author}</span>
            <span className="mx-3">•</span>
            <span>服务器时间: {serverTime}</span>
          </div>
          <div className="prose max-w-none text-gray-900">
            <p>{blogPost.content}</p>
            <p>SSR (Server-Side Rendering) 使此页面在服务器上渲染，为搜索引擎优化和初始加载性能提供最佳体验。</p>
            <h2>Next.js 14 的优势</h2>
            <p>Next.js 14 提供了 App Router、流式渲染和其他性能优化功能，使构建现代 Web 应用变得更加容易。</p>
            <h2>AI 集成</h2>
            <p>NewWebAI 利用 AI 技术提供智能内容推荐、个性化体验和自动化功能，为用户带来卓越的服务。</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            返回博客列表
          </Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
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