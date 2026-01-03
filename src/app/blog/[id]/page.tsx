'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  objectId: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

// 配置ReactMarkdown组件
const components = {
  code: (props: any) => (
    <pre className={`${props.className || ''} bg-gray-100 rounded-lg p-4 overflow-x-auto`}>
      <code className="text-sm">{props.children}</code>
    </pre>
  ),
  table: (props: any) => (
    <div className={`overflow-x-auto ${props.className || ''}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {props.children}
      </table>
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50">{props.children}</thead>,
  tbody: (props: any) => <tbody className="divide-y divide-gray-200">{props.children}</tbody>,
  tr: (props: any) => <tr className={props.className || ''}>{props.children}</tr>,
  th: (props: any) => <th className={`font-medium text-gray-900 px-4 py-2 ${props.className || ''}`}>{props.children}</th>,
  td: (props: any) => <td className={`px-4 py-2 text-sm ${props.className || ''}`}>{props.children}</td>,
  ul: (props: any) => <ul className={`list-disc list-inside space-y-2 ${props.className || ''}`}>{props.children}</ul>,
  ol: (props: any) => <ol className={`list-decimal list-inside space-y-2 ${props.className || ''}`}>{props.children}</ol>,
  li: (props: any) => <li className={props.className || ''}>{props.children}</li>,
  blockquote: (props: any) => (
    <blockquote className={`border-l-4 border-gray-300 pl-4 py-2 italic text-gray-700 ${props.className || ''}`}>
      {props.children}
    </blockquote>
  ),
  h1: (props: any) => <h1 className={`text-3xl font-bold mb-4 ${props.className || ''}`}>{props.children}</h1>,
  h2: (props: any) => <h2 className={`text-2xl font-bold mb-3 ${props.className || ''}`}>{props.children}</h2>,
  h3: (props: any) => <h3 className={`text-xl font-bold mb-2 ${props.className || ''}`}>{props.children}</h3>,
  h4: (props: any) => <h4 className={`text-lg font-bold mb-1 ${props.className || ''}`}>{props.children}</h4>,
  h5: (props: any) => <h5 className={`text-base font-bold mb-1 ${props.className || ''}`}>{props.children}</h5>,
  h6: (props: any) => <h6 className={`text-sm font-bold mb-1 ${props.className || ''}`}>{props.children}</h6>,
  p: (props: any) => <p className={props.className || ''}>{props.children}</p>,
  a: (props: any) => (
    <a href={props.href} className={`${props.className || ''} text-blue-600 hover:text-blue-800`}>
      {props.children}
    </a>
  ),
  span: (props: any) => <span className={props.className || ''}>{props.children}</span>,
  em: (props: any) => <span className={`italic ${props.className || ''}`}>{props.children}</span>,
  strong: (props: any) => <span className={`font-bold ${props.className || ''}`}>{props.children}</span>,
  inlineCode: (props: any) => <code className={`bg-gray-100 px-1 py-0.5 rounded text-sm ${props.className || ''}`}>{props.children}</code>,
  pre: (props: any) => (
    <pre className={`${props.className || ''} bg-gray-100 rounded-lg p-4 overflow-x-auto`}>
      <code className="text-sm">{props.children}</code>
    </pre>
  ),
};

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params?.id) return;
      
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setPost(data.post);
        } else {
          setError(data.error || '博客文章不存在');
        }
      } catch (error) {
        setError('网络错误，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.id]);
  
  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载博客文章中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '博客文章不存在'}</p>
          <Link href="/blog" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/store" className="text-black hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-6">
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">{post.title}</h1>
          <div className="flex items-center text-black mb-8">
            <span>作者: {post.author}</span>
            <span className="mx-3">•</span>
            <span>{post.readTime}</span>
            <span className="mx-3">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
          
          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="markdown-content max-w-none text-black">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {post.content}
            </ReactMarkdown>
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