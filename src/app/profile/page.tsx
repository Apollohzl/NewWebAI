'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/SimpleAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, token, sessionToken, updateUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // 如果还在加载认证状态，不执行任何操作
    if (loading) {
      return;
    }

    // 如果认证状态加载完成但没有用户信息，跳转到登录页面
    if (!user) {
      router.push('/login');
      return;
    }

    // 用户已登录，初始化表单数据
    setFormData({
      username: user.username || '',
      email: user.email || '',
    });
    
    setAvatarPreview(user.avatar || '/user0.svg');
  }, [user, loading, router]);

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showMessage('头像文件大小不能超过10MB', 'error');
        return;
      }
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionToken) {
      showMessage('登录状态已过期，请重新登录', 'error');
      router.push('/login');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-LC-Session': sessionToken,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        showMessage('个人信息更新成功', 'success');
      } else {
        showMessage(data.error || '更新失败', 'error');
      }
    } catch (error) {
      showMessage('网络错误，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetRequest = async () => {
    if (!sessionToken) {
      showMessage('登录状态已过期，请重新登录', 'error');
      router.push('/login');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-LC-Session': sessionToken,
        },
        body: JSON.stringify({
          email: user?.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('重置密码邮件已发送，请查收邮件', 'success');
      } else {
        showMessage(data.error || '发送邮件失败', 'error');
      }
    } catch (error) {
      showMessage('网络错误，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!avatarFile) {
      showMessage('请选择要上传的头像', 'error');
      return;
    }

    if (!sessionToken) {
      showMessage('登录状态已过期，请重新登录', 'error');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-LC-Session': sessionToken,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        updateUser({ avatar: data.avatarUrl });
        setAvatarPreview(data.avatarUrl); // 更新预览
        showMessage('头像上传成功', 'success');
        setAvatarFile(null);
      } else {
        showMessage(data.error || '头像上传失败', 'error');
      }
    } catch (error) {
      showMessage('网络错误，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">请先登录</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            前往登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">账户设置</h1>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* 头像上传 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">头像设置</h2>
          <form onSubmit={handleAvatarUpload} className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={avatarPreview}
                  alt="头像预览"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
                >
                  选择头像
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  支持 JPG、PNG、GIF、WebP 格式，文件大小不超过10MB
                </p>
              </div>
            </div>
            {avatarFile && (
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? '上传中...' : '上传头像'}
              </button>
            )}
          </form>
        </div>

        {/* 基本信息更新 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">基本信息</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱地址
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? '更新中...' : '更新信息'}
            </button>
          </form>
        </div>

        {/* 密码修改 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">密码修改</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              为了账户安全，密码修改需要通过邮件验证。点击下方按钮发送重置密码邮件到您的邮箱。
            </p>
          </div>
          
          <button
            onClick={handlePasswordResetRequest}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? '发送中...' : '发送重置密码邮件'}
          </button>
          
          <p className="text-xs text-gray-500 mt-2">
            邮件发送后，请查收邮件并点击重置链接来设置新密码
          </p>
        </div>
      </div>
    </div>
  );
}