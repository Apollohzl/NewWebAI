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

export default function TestApiPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);

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
        if (data.user.email === '959855534@qq.com') {
          setUser(data.user);
        } else {
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

  const addTestResult = (name: string, success: boolean, message: string, data?: any) => {
    const result = {
      id: Date.now(),
      name,
      success,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [result, ...prev]);
  };

  const testLeanCloudConfig = async () => {
    addTestResult('检查环境变量', true, '开始检查环境变量...');
    
    try {
      // 检查环境变量是否设置
      const envCheck = await fetch('/api/test-env');
      const envData = await envCheck.json();
      addTestResult('环境变量检查', envCheck.ok, envCheck.ok ? '环境变量正常' : '环境变量检查失败', envData);
    } catch (error) {
      addTestResult('环境变量检查', false, `错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const testUserQuery = async () => {
    addTestResult('用户数据查询测试', true, '开始测试用户数据查询...');
    
    try {
      // 测试1: 调用我们的API
      addTestResult('测试1: 调用我们的API', true, '开始调用我们的API...');
      try {
        const response = await fetch('/api/admin/leancloud-data');
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = { rawText: text };
        }
        addTestResult('测试1结果', response.ok, `状态码: ${response.status}, 内容长度: ${text.length}`, data);
      } catch (error) {
        addTestResult('测试1结果', false, `错误: ${error instanceof Error ? error.message : '未知错误'}`);
      }

      // 测试2: 测试LeanCloud连接
      addTestResult('测试2: 测试LeanCloud连接', true, '开始测试LeanCloud连接...');
      try {
        const response = await fetch('/api/test-leancloud-connection');
        const data = await response.json();
        addTestResult('测试2结果', response.ok, `状态码: ${response.status}`, data);
      } catch (error) {
        addTestResult('测试2结果', false, `错误: ${error instanceof Error ? error.message : '未知错误'}`);
      }

    } catch (error) {
      addTestResult('用户数据查询测试', false, `错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const testDirectFetch = async () => {
    addTestResult('直接Fetch测试', true, '开始直接Fetch测试...');
    
    try {
      // 测试直接访问LeanCloud
      const response = await fetch('/api/admin/leancloud-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { rawText: text };
      }
      
      addTestResult('直接Fetch结果', response.ok, `状态码: ${response.status}, 内容长度: ${text.length}`, data);
    } catch (error) {
      addTestResult('直接Fetch测试', false, `错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
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
            <Link href="/admin/developer" className="text-black hover:text-blue-600">开发者控制台</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">API测试页面</h1>
              <p className="text-gray-600">用于调试LeanCloud API连接问题</p>
            </div>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              清除结果
            </button>
          </div>

          {/* 测试按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={testLeanCloudConfig}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              测试环境变量
            </button>
            <button
              onClick={testUserQuery}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              测试用户查询
            </button>
            <button
              onClick={testDirectFetch}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              直接Fetch测试
            </button>
          </div>

          {/* 测试结果 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black mb-4">测试结果</h2>
            {testResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                点击上方按钮开始测试
              </div>
            ) : (
              testResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border ${
                    result.success
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                        {result.success ? '✓' : '✗'}
                      </span>
                      <h3 className="font-semibold text-black">{result.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                  </div>
                  <p className={`text-sm mb-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>
                  {result.data && (
                    <div className="mt-2">
                      <details className="cursor-pointer">
                        <summary className="text-sm text-blue-600 hover:text-blue-800">
                          查看详细数据
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto max-h-96">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}