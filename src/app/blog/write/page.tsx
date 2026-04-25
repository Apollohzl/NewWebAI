'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  objectId: string;
  username: string;
  email: string;
  name?: string;
}

export default function BlogWritePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '技术',
    tags: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 检查用户登录状态
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 从localStorage获取token
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/blog');
        return;
      }

      const response = await fetch('/api/auth/check-status', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        // 未登录，跳转到博客页面
        router.push('/blog');
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
      // 出错时也跳转到博客页面
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('请先登录');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 准备标签数组
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // 计算阅读时间
      const readTime = calculateReadTime(formData.content);

      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content, // 直接使用HTML内容
          excerpt: formData.excerpt || stripHtml(formData.content).substring(0, 150) + '...',
          category: formData.category,
          tags: tagsArray,
          author: user.name || user.username,
          readTime: readTime
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // 等待2秒后跳转到博客页面
        setTimeout(() => {
          router.push('/blog');
        }, 2000);
      } else {
        setError(data.error || '发布失败，请重试');
      }
    } catch (error) {
      setError('网络错误，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const stripHtml = (html: string): string => {
    // 移除HTML标签，只保留纯文本
    return html.replace(/<[^>]*>/g, '');
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = before + selectedText + after;
    
    const newStart = start + before.length;
    const newEnd = newStart + selectedText.length;

    const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    
    setFormData(prev => ({ ...prev, content: newValue }));
    
    // 恢复焦点和选择
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const insertHeading = (level: number) => {
    insertText(`<h${level}>`, `</h${level}>`);
  };

  const insertBold = () => {
    insertText('<strong>', '</strong>');
  };

  const insertItalic = () => {
    insertText('<em>', '</em>');
  };

  const insertCode = () => {
    insertText('<code>', '</code>');
  };

  const insertCodeBlock = () => {
    insertText('<pre><code>', '</code></pre>');
  };

  const insertLink = () => {
    const url = prompt('请输入链接地址:');
    if (url) {
      insertText(`<a href="${url}">`, '</a>');
    }
  };

  const insertImage = () => {
    const url = prompt('请输入图片地址:');
    if (url) {
      insertText(`<img src="${url}" alt="图片" />`);
    }
  };

  const insertList = (ordered: boolean) => {
    const tag = ordered ? 'ol' : 'ul';
    insertText(`<${tag}>\n<li>`, '</li>\n</' + tag + '>');
  };

  const insertQuote = () => {
    insertText('<blockquote>', '</blockquote>');
  };

  const insertLine = () => {
    insertText('<hr>');
  };

  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} 分钟阅读`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">检查登录状态中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
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
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-black mb-8">编写博客文章</h1>

          {success ? (
            <div className="text-center py-12">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-black mb-2">发布成功！</h2>
              <p className="text-black">等待一会就可以看到文章了，正在跳转...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="title" className="block text-black font-medium mb-2">
                  文章标题 *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入文章标题"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="category" className="block text-black font-medium mb-2">
                    分类
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="技术">技术</option>
                    <option value="AI">AI</option>
                    <option value="Web开发">Web开发</option>
                    <option value="产品">产品</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-black font-medium mb-2">
                    标签（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：React, JavaScript, 前端"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="excerpt" className="block text-black font-medium mb-2">
                  摘要
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="简短描述文章内容（可选）"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="content" className="block text-black font-medium mb-2">
                  文章内容 *
                </label>
                
                {/* HTML编辑工具栏 */}
                <div className="mb-2 border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
                  {/* 标题按钮 */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => insertHeading(1)}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="一级标题"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHeading(2)}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="二级标题"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHeading(3)}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="三级标题"
                    >
                      H3
                    </button>
                  </div>

                  {/* 格式按钮 */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={insertBold}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
                      title="粗体"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={insertItalic}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
                      title="斜体"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={insertCode}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
                      title="行内代码"
                    >
                      &lt;/&gt;
                    </button>
                  </div>

                  {/* 代码块 */}
                  <button
                    type="button"
                    onClick={insertCodeBlock}
                    className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="代码块"
                  >
                    { } 代码块
                  </button>

                  {/* 列表 */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => insertList(false)}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="无序列表"
                    >
                      • 列表
                    </button>
                    <button
                      type="button"
                      onClick={() => insertList(true)}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="有序列表"
                    >
                      1. 列表
                    </button>
                  </div>

                  {/* 其他 */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={insertLink}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="插入链接"
                    >
                      🔗 链接
                    </button>
                    <button
                      type="button"
                      onClick={insertImage}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="插入图片"
                    >
                      🖼️ 图片
                    </button>
                    <button
                      type="button"
                      onClick={insertQuote}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="引用"
                    >
                      " 引用
                    </button>
                    <button
                      type="button"
                      onClick={insertLine}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="分割线"
                    >
                      — 分割线
                    </button>
                  </div>
                </div>

                <div className="mb-2 text-sm text-gray-600">
                  直接编写HTML代码，或使用上方工具栏插入常用标签
                </div>
                <textarea
                  ref={textareaRef}
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="编写HTML内容..."
                  required
                />
              </div>

              <div className="flex justify-between">
                <Link
                  href="/blog"
                  className="px-6 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? '发布中...' : '发布文章'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}