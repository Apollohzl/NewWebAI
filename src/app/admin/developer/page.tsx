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

interface LeanCloudData {
  blogPosts: any[];
  products: any[];
  apis: any[];
  stats: {
    totalBlogPosts: number;
    totalProducts: number;
    totalApis: number;
  };
}

export default function DeveloperPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [leanCloudData, setLeanCloudData] = useState<LeanCloudData | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 检查用户登录状态和权限
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 加载LeanCloud数据
  useEffect(() => {
    if (user) {
      loadLeanCloudData();
    }
  }, [user]);

  // 切换夜间模式
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  const loadLeanCloudData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/admin/leancloud-data');
      const data = await response.json();
      if (response.ok) {
        setLeanCloudData(data);
      }
    } catch (error) {
      console.error('加载LeanCloud数据失败:', error);
    } finally {
      setLoadingData(false);
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* 导航栏 */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className={`${darkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`}>首页</Link>
            <Link href="/blog" className={`${darkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`}>博客</Link>
            <Link href="/store" className={`${darkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`}>产品</Link>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
            title={darkMode ? '切换到白天模式' : '切换到夜间模式'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8 transition-colors duration-300`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-2`}>开发者控制台</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>欢迎，{user?.username}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                开发者模式
              </div>
              <button
                onClick={loadLeanCloudData}
                disabled={loadingData}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors disabled:opacity-50`}
              >
                {loadingData ? '加载中...' : '刷新数据'}
              </button>
            </div>
          </div>

          {/* 标签页导航 */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } ${darkMode ? 'text-white' : ''}`}
              >
                概览
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'blogs'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } ${darkMode ? 'text-white' : ''}`}
              >
                博客文章
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } ${darkMode ? 'text-white' : ''}`}
              >
                产品管理
              </button>
              <button
                onClick={() => setActiveTab('apis')}
                className={`py-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'apis'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } ${darkMode ? 'text-white' : ''}`}
              >
                API配置
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'tools'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } ${darkMode ? 'text-white' : ''}`}
              >
                开发工具
              </button>
            </nav>
          </div>

          {/* 内容区域 */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <OverviewTab darkMode={darkMode} leanCloudData={leanCloudData} loadingData={loadingData} />
            )}
            {activeTab === 'blogs' && (
              <BlogsTab darkMode={darkMode} leanCloudData={leanCloudData} loadingData={loadingData} />
            )}
            {activeTab === 'products' && (
              <ProductsTab darkMode={darkMode} leanCloudData={leanCloudData} loadingData={loadingData} />
            )}
            {activeTab === 'apis' && (
              <ApisTab darkMode={darkMode} leanCloudData={leanCloudData} loadingData={loadingData} />
            )}
            {activeTab === 'tools' && (
              <ToolsTab darkMode={darkMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 概览标签页组件
function OverviewTab({ darkMode, leanCloudData, loadingData }: { darkMode: boolean; leanCloudData: LeanCloudData | null; loadingData: boolean }) {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard darkMode={darkMode} title="博客文章" value={leanCloudData?.stats.totalBlogPosts || 0} icon="📝" />
        <StatCard darkMode={darkMode} title="产品数量" value={leanCloudData?.stats.totalProducts || 0} icon="🛍️" />
        <StatCard darkMode={darkMode} title="API配置" value={leanCloudData?.stats.totalApis || 0} icon="🔌" />
      </div>

      {/* 项目信息 */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>项目信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem darkMode={darkMode} label="项目名称" value="NewWebAI" />
          <InfoItem darkMode={darkMode} label="框架" value="Next.js 14" />
          <InfoItem darkMode={darkMode} label="架构" value="SSR + SSG" />
          <InfoItem darkMode={darkMode} label="公司" value="小黄の数字宇宙工作室" />
          <InfoItem darkMode={darkMode} label="前端服务" value="运行中" status="success" />
          <InfoItem darkMode={darkMode} label="数据库连接" value="正常" status="success" />
        </div>
      </div>

      {/* 快捷操作 */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>快捷操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard darkMode={darkMode} icon="📝" title="自动博客" description="管理AI自动生成博客" link="/admin/auto-blog" />
          <QuickActionCard darkMode={darkMode} icon="📊" title="数据分析" description="查看网站统计数据" disabled />
          <QuickActionCard darkMode={darkMode} icon="⚙️" title="系统设置" description="配置系统参数" disabled />
        </div>
      </div>
    </div>
  );
}

function BlogsTab({ darkMode, leanCloudData, loadingData }: { darkMode: boolean; leanCloudData: LeanCloudData | null; loadingData: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>博客文章列表</h2>
        {loadingData ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} border-b`}>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>标题</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>作者</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>分类</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>状态</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>创建时间</th>
                </tr>
              </thead>
              <tbody>
                {leanCloudData?.blogPosts.map((post: any) => (
                  <tr key={post.objectId} className={`${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-100'} border-b transition-colors`}>
                    <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>{post.title}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.author}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.category}</td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2 py-1 rounded-full text-xs ${post.status === '正常' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// 产品管理标签页组件
function ProductsTab({ darkMode, leanCloudData, loadingData }: { darkMode: boolean; leanCloudData: LeanCloudData | null; loadingData: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>产品列表</h2>
        {loadingData ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} border-b`}>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>名称</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>价格</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>分类</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>库存</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>创建时间</th>
                </tr>
              </thead>
              <tbody>
                {leanCloudData?.products.map((product: any) => (
                  <tr key={product.objectId} className={`${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-100'} border-b transition-colors`}>
                    <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>¥{product.price}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.category}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.stock}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(product.createdAt).toLocaleDateString('zh-CN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// API配置标签页组件
function ApisTab({ darkMode, leanCloudData, loadingData }: { darkMode: boolean; leanCloudData: LeanCloudData | null; loadingData: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>API配置列表</h2>
        {loadingData ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} border-b`}>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>名称</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>端点</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>方法</th>
                  <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>状态</th>
                </tr>
              </thead>
              <tbody>
                {leanCloudData?.apis.map((api: any) => (
                  <tr key={api.objectId} className={`${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-100'} border-b transition-colors`}>
                    <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>{api.name}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{api.endpoint}</td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2 py-1 rounded-full text-xs ${api.method === 'GET' ? 'bg-blue-100 text-blue-800' : api.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                        {api.method}
                      </span>
                    </td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2 py-1 rounded-full text-xs ${api.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {api.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// 开发工具标签页组件
function ToolsTab({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>开发者工具</h2>
        <div className="space-y-3">
          <ToolItem darkMode={darkMode} title="查看工作日志" description="changelog.log" status="待实现" />
          <ToolItem darkMode={darkMode} title="最后一次用户提示词" description="lastq.log" status="待实现" />
          <ToolItem darkMode={darkMode} title="项目快照" description="project_snapshot.txt" status="待实现" />
          <ToolItem darkMode={darkMode} title="Git操作" description="提交、推送代码到GitHub" status="待实现" />
          <ToolItem darkMode={darkMode} title="LeanCloud管理" description="管理数据库和数据表" status="待实现" />
        </div>
      </div>
    </div>
  );
}

// 辅助组件
function StatCard({ darkMode, title, value, icon }: { darkMode: boolean; title: string; value: number; icon: string }) {
  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md transition-colors duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function InfoItem({ darkMode, label, value, status }: { darkMode: boolean; label: string; value: string; status?: string }) {
  return (
    <div>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <div className="flex items-center space-x-2">
        <p className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{value}</p>
        {status === 'success' && (
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
}

function QuickActionCard({ darkMode, icon, title, description, link, disabled }: { darkMode: boolean; icon: string; title: string; description: string; link?: string; disabled?: boolean }) {
  const CardContent = () => (
    <div className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 cursor-pointer'} bg-white border border-gray-200 rounded-lg p-4 transition-colors ${darkMode ? 'bg-gray-800 border-gray-600' : ''}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-black'} mb-1`}>{title}</h3>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );

  if (link && !disabled) {
    return <Link href={link}><CardContent /></Link>;
  }
  return <CardContent />;
}

function ToolItem({ darkMode, title, description, status }: { darkMode: boolean; title: string; description: string; status: string }) {
  return (
    <div className={`flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-600' : ''}`}>
      <div>
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{status}</span>
    </div>
  );
}