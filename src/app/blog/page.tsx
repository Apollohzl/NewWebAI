'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  objectId: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    count: 0,
    hasNext: false,
    hasPrev: false
  });

  const fetchPosts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        search: search
      });
      
      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts || []);
        setPagination(data.pagination || pagination);
      } else {
        setError(data.error || '获取博客数据失败');
      }
    } catch (error) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

        {/* 搜索栏 */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索博客文章..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              搜索
            </button>
          </form>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">加载博客文章中...</p>
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchPosts(currentPage, searchTerm)} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              重新加载
            </button>
          </div>
        )}

        {/* 博客文章列表 */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">暂无博客文章</p>
              </div>
            ) : (
              posts.map((post) => (
                <article 
                  key={post.objectId} 
                  className="bg-white rounded-xl shadow-md overflow-hidden mb-8 hover:shadow-lg transition"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-blue-600 font-medium">
                        {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="text-sm text-black">{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-3">{post.title}</h2>
                    <p className="text-black mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-black">作者: {post.author}</span>
                      <Link 
                        href={`/blog/${post.objectId}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        阅读更多 →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {/* 分页 */}
        {!loading && !error && posts.length > 0 && (
          <div className="flex justify-center mt-12 space-x-2">
            {pagination.hasPrev && (
              <button
                onClick={() => handlePageChange(pagination.current - 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ← 上一页
              </button>
            )}
            
            {/* 页码按钮 */}
            {Array.from({ length: pagination.total }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg transition ${
                  pageNum === pagination.current
                    ? 'bg-blue-600 text-white'
                    : 'text-black hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            {pagination.hasNext && (
              <button
                onClick={() => handlePageChange(pagination.current + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                下一页 →
              </button>
            )}
          </div>
        )}
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

      {/* 编写博客按钮 */}
      <Link 
        href="/blog/write" 
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        title="编写博客"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
      </Link>
    </div>
  );
}