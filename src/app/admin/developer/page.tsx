'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  objectId: string;
  username: string;
  email: string;
  name?: string;
}

export default function DeveloperPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 检查用户登录状态和权限
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      
      if (!sessionToken) {
        router.push('/');
        return;
      }

      const response = await fetch('/api/auth/check-status', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });
      const data = await response.json();
      
      if (data.authenticated && data.user) {
        // 检查是否是开发者
        if (data.user.email === '959855534@qq.com') {
          setUser(data.user);
        } else {
          // 不是开发者，跳转到首页
          router.push('/');
        }
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
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
            <Link href="/blog" className="text-black hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600">产品</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">开发者选项</h1>
              <p className="text-gray-600">欢迎，{user?.username}</p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              开发者模式
            </div>
          </div>

          {/* 功能区域 */}
          <div className="space-y-6">
            {/* 项目信息 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">项目信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">项目名称</p>
                  <p className="text-black font-medium">NewWebAI</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">框架</p>
                  <p className="text-black font-medium">Next.js 14</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">架构</p>
                  <p className="text-black font-medium">SSR + SSG</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">公司</p>
                  <p className="text-black font-medium">小黄の数字宇宙工作室</p>
                </div>
              </div>
            </div>

            {/* 系统状态 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">系统状态</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black">前端服务</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">运行中</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black">数据库连接</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">正常</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black">自动博客</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">待配置</span>
                </div>
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">快捷操作</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/auto-blog"
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-medium text-black mb-1">自动博客</h3>
                  <p className="text-sm text-gray-600">管理AI自动生成博客</p>
                </Link>
                <div className="bg-white border border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-medium text-black mb-1">数据分析</h3>
                  <p className="text-sm text-gray-600">查看网站统计数据</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
                  <div className="text-2xl mb-2">⚙️</div>
                  <h3 className="font-medium text-black mb-1">系统设置</h3>
                  <p className="text-sm text-gray-600">配置系统参数</p>
                </div>
              </div>
            </div>

            {/* 开发者工具 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">开发者工具</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-black">查看工作日志</h3>
                    <p className="text-sm text-gray-600">changelog.log</p>
                  </div>
                  <span className="text-gray-400">待实现</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-black">最后一次用户提示词</h3>
                    <p className="text-sm text-gray-600">lastq.log</p>
                  </div>
                  <span className="text-gray-400">待实现</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-black">项目快照</h3>
                    <p className="text-sm text-gray-600">project_snapshot.txt</p>
                  </div>
                  <span className="text-gray-400">待实现</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}