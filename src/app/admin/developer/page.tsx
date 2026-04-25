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

interface DashboardData {
  blogPosts: any[];
  products: any[];
  apis: any[];
  stats: {
    totalBlogPosts: number;
    totalProducts: number;
    totalApis: number;
    todayNewUsers: number;
  };
}

export default function DeveloperPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 检查用户登录状态和权限
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 加载仪表板数据
  useEffect(() => {
    if (user) {
      loadDashboardData();
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
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch('/api/auth/check-status', {
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/dashboard-data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
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
                onClick={loadDashboardData}
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
              <OverviewTab darkMode={darkMode} dashboardData={dashboardData} loadingData={loadingData} />
            )}
            {activeTab === 'blogs' && (
              <BlogsTab darkMode={darkMode} dashboardData={dashboardData} loadingData={loadingData} />
            )}
            {activeTab === 'products' && (
              <ProductsTab darkMode={darkMode} dashboardData={dashboardData || { blogPosts: [], products: [], apis: [], stats: { totalBlogPosts: 0, totalProducts: 0, totalApis: 0, todayNewUsers: 0 } }} loadingData={loadingData} />
            )}
            {activeTab === 'apis' && (
              <ApisTab darkMode={darkMode} dashboardData={dashboardData || { blogPosts: [], products: [], apis: [], stats: { totalBlogPosts: 0, totalProducts: 0, totalApis: 0, todayNewUsers: 0 } }} loadingData={loadingData} />
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
function OverviewTab({ darkMode, dashboardData, loadingData }: { darkMode: boolean; dashboardData: DashboardData | null; loadingData: boolean }) {
  const stats = dashboardData?.stats || { totalBlogPosts: 0, totalProducts: 0, totalApis: 0, todayNewUsers: 0 };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard darkMode={darkMode} title="今日新增用户" value={stats.todayNewUsers} icon="👥" />
        <StatCard darkMode={darkMode} title="博客文章" value={stats.totalBlogPosts} icon="📝" />
        <StatCard darkMode={darkMode} title="产品数量" value={stats.totalProducts} icon="🛍️" />
        <StatCard darkMode={darkMode} title="API配置" value={stats.totalApis} icon="🔌" />
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

function BlogsTab({ darkMode, dashboardData, loadingData }: { darkMode: boolean; dashboardData: DashboardData | null; loadingData: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (dashboardData?.blogPosts) {
      // 按创建时间倒序排序
      const sortedPosts = [...dashboardData.blogPosts].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
      setPosts(sortedPosts);
    }
  }, [dashboardData]);

  const handleDelete = async (postId: string) => {
    if (!confirm('确定要删除这篇博客文章吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });

      console.log('Delete Response Status:', response.status);
      const responseData = await response.json().catch(() => ({}));
      console.log('Delete Response Data:', responseData);

      if (response.ok) {
        alert('删除成功');
        setRefreshKey(prev => prev + 1);
        // 重新加载数据
        window.location.reload();
      } else {
        alert('删除失败：' + (responseData.error || '未知错误'));
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('删除失败：' + error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">博客文章</h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>共 {posts.length} 篇文章</span>
      </div>

      {/* 搜索框 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索文章标题、作者或分类..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-black placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {loadingData ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? '没有找到匹配的文章' : '暂无博客文章'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">标题</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">作者</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">分类</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">创建时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post: any, index: number) => (
                <tr key={post.objectId || index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50`}>
                  <td className="py-3 px-4 text-sm text-black">{post.title}</td>
                  <td className="py-3 px-4 text-sm text-black">{post.author}</td>
                  <td className="py-3 px-4 text-sm text-black">{post.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === '正常'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-black">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('zh-CN') : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(post.objectId)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProductsTab({ darkMode, dashboardData, loadingData }: { darkMode: boolean; dashboardData: DashboardData; loadingData: boolean }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = dashboardData?.products || [];

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">产品管理</h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>共 {products.length} 个产品</span>
      </div>

      {loadingData ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">暂无产品</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any, index: number) => (
            <div
              key={product.objectId || index}
              onClick={() => setSelectedProduct(product)}
              className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'} cursor-pointer transition-colors`}
            >
              <h3 className="font-medium text-black mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">¥{product.price}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* 产品悬浮窗口 */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedProduct(null)}>
          <div 
            className={`rounded-lg p-6 w-full max-w-4xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-black">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-light"
              >
                ×
              </button>
            </div>
            
            {/* 模拟淘宝产品界面 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 产品图片 */}
              <div className={`aspect-square rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                {selectedProduct.image ? (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>📦</span>
                )}
              </div>
              
              {/* 产品信息 */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-red-600">¥{selectedProduct.price}</p>
                  {selectedProduct.originalPrice && (
                    <p className="text-xl text-gray-400 line-through">¥{selectedProduct.originalPrice}</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">价格</p>
                </div>
                
                <div>
                  <p className="font-medium text-black text-lg">{selectedProduct.description}</p>
                  <p className="text-sm text-gray-500">描述</p>
                </div>
                
                <div>
                  <p className={`px-3 py-1 rounded-full text-sm inline-block ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedProduct.category}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">分类</p>
                </div>
                
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-black">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">特性</p>
                  </div>
                )}
                
                {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">标签</p>
                  </div>
                )}
                
                {selectedProduct.rating && (
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-black font-medium">{selectedProduct.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">评分</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={() => window.location.href = '/admin/products/edit'}
                    className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    编辑产品
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ApisTab({ darkMode, dashboardData, loadingData }: { darkMode: boolean; dashboardData: DashboardData; loadingData: boolean }) {
  const [apis, setApis] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (dashboardData?.apis) {
      setApis(dashboardData.apis);
    }
  }, [dashboardData]);

  const handleStatusChange = async (apiId: string, currentStatus: string) => {
    const newStatus = currentStatus === '正常' ? '关闭' : '正常';
    
    if (!confirm(`确定要将此API状态改为${newStatus}吗？`)) {
      return;
    }

    try {
      const response = await fetch('/api/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: apiId,
          status: newStatus,
        }),
      });

      console.log('Update Status Response:', response.status);
      const responseData = await response.json().catch(() => ({}));
      console.log('Update Status Data:', responseData);

      if (response.ok) {
        // 更新本地状态
        setApis(prev => prev.map(api =>
          api.objectId === apiId ? { ...api, status: newStatus } : api
        ));
      } else {
        alert('状态更新失败：' + (responseData.error || '未知错误'));
      }
    } catch (error) {
      console.error('Update Status Error:', error);
      alert('状态更新失败：' + error);
    }
  };

  const handleAddApi = async (apiData: any) => {
    try {
      const response = await fetch('/api/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        alert('添加成功');
        setShowAddModal(false);
        setRefreshKey(prev => prev + 1);
        window.location.reload();
      } else {
        alert('添加失败');
      }
    } catch (error) {
      alert('添加失败：' + error);
    }
  };

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">API配置列表</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            添加
          </button>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>共 {apis.length} 个API</span>
        </div>
      </div>

      {loadingData ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : apis.length === 0 ? (
        <div className="text-center py-8 text-gray-500">暂无API配置</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">名称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">请求链接</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">创建时间</th>
              </tr>
            </thead>
            <tbody>
              {apis.map((api: any, index: number) => (
                <tr 
                  key={api.objectId || index} 
                  className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 cursor-pointer`}
                  onClick={() => window.location.href = `/api-docs/${api.objectId}`}
                >
                  <td className="py-3 px-4 text-sm text-black">{api.name}</td>
                  <td className="py-3 px-4 text-sm text-black font-mono">{api.endpoint}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(api.objectId, api.status);
                      }}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        api.status === '正常'
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {api.status || '-'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm text-black">
                    {api.createdAt ? new Date(api.createdAt).toLocaleDateString('zh-CN') : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 添加API的悬浮窗口 */}
      {showAddModal && (
        <AddApiModal
          darkMode={darkMode}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddApi}
        />
      )}
    </div>
  );
}

// 开发工具标签页组件
function AddApiModal({ darkMode, onClose, onSubmit }: { darkMode: boolean; onClose: () => void; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    endpoint: '',
    description: '',
    category: 'general',
    method: 'GET',
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">添加新API</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>API名称 *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>请求链接 *</label>
            <input
              type="text"
              required
              value={formData.endpoint}
              onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              >
                <option value="general">通用</option>
                <option value="ai">AI服务</option>
                <option value="data">数据服务</option>
                <option value="auth">认证服务</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>方法</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>标签（逗号分隔）</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              placeholder="例如: AI, GPT, 聊天"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ToolsTab({ darkMode }: { darkMode: boolean }) {
  const [updateInput, setUpdateInput] = useState('');
  const [updateResult, setUpdateResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUpdateMessage = async () => {
    if (!updateInput.trim()) {
      alert('请输入更新内容');
      return;
    }

    setIsGenerating(true);
    try {
      // 获取当前时间
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('zh-CN').replace(/\//g, '/');
      const formattedTime = `${dateStr} ${timeStr}`;

      // 确定问候语
      const hour = now.getHours();
      let greeting = '早上好';
      if (hour >= 12 && hour < 18) {
        greeting = '下午好';
      } else if (hour >= 18) {
        greeting = '晚上好';
      }

      // 构建提示词
      const prompt = `你现在是一个智能网站更新提示小助手，你的任务是每次为用户提供一段不超过60字的更新语言提示，用户会提供给你更新的主要功能以及对应网址，要求你用可爱的俏皮一点童真一点的语气回话，输出格式是这样的（全部都是纯文本，不要使用md格式输出任何其他的无关信息）：【快去试一下新功能啦 - NewWebAI - 小黄の数字宇宙工作室】（换行）您好用户，早上/下午/晚上 好（换行）网站新推出了一个功能哟~快来体验叭：（网址）（换行）新功能介绍：（换行）- （功能介绍，语言要求已经提示过了，中间可以插上网址，不要用md格式，直接输出网址纯文本，这里可以添加更新介绍，支持换行，格式不变"\\n- 介绍"）...（换行）logData yyyy/mm/dd hh：mm：ss。示例：【快去试一下新功能啦 - NewWebAI - 小黄の数字宇宙工作室】\n\n您好用户 下午好，\n\n网站新推出了一个功能哟~快来体验叭：https://hzliflow.ken520.top/blog\n\n新功能介绍：\n\n- 新加了新的数据库\n\n- 添加了一个新功能->博客系统\n\n- 用户登录后可以访问https://hzliflow.ken520.top/blog，点击右下角的按钮进行编写文章哟！\n\nlogData 2026/1/3 14：54：46。好的，现在我将发送给你关于这次的更新信息：。\n\n目前时间：${formattedTime}；\n\n${updateInput}`;

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          model: 'deepseek',
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();

      if (data.success && data.data) {
        setUpdateResult(data.data.message || '生成失败');
      } else {
        throw new Error(data.error?.message || '请求失败');
      }
    } catch (error: any) {
      console.error('生成更新信息失败:', error);
      setUpdateResult(`生成失败：${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(updateResult).then(
      () => {
        alert('已复制到剪贴板');
      },
      (err) => {
        console.error('复制失败: ', err);
        alert('复制失败');
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* 更新信息工具 */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>更新信息</h2>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              输入更新内容
            </label>
            <textarea
              value={updateInput}
              onChange={(e) => setUpdateInput(e.target.value)}
              placeholder="请输入本次更新的主要功能，如：新增AI对话功能、优化页面布局等..."
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-black placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={4}
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={generateUpdateMessage}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-lg ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {isGenerating ? '生成中...' : '生成'}
            </button>
          </div>
          {updateResult && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  生成结果
                </label>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  复制
                </button>
              </div>
              <div
                className={`w-full p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'
                } whitespace-pre-wrap break-words max-h-60 overflow-y-auto`}
              >
                {updateResult}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 其他开发者工具 */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 transition-colors duration-300`}>
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>开发者工具</h2>
        <div className="space-y-3">
          <ToolItem darkMode={darkMode} title="查看工作日志" description="changelog.log" status="待实现" />
          <ToolItem darkMode={darkMode} title="最后一次用户提示词" description="lastq.log" status="待实现" />
          <ToolItem darkMode={darkMode} title="项目快照" description="project_snapshot.txt" status="待实现" />
          <ToolItem darkMode={darkMode} title="Git操作" description="提交、推送代码到GitHub" status="待实现" />
          <ToolItem darkMode={darkMode} title="SQLPub管理" description="管理数据库和数据表" status="待实现" />
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