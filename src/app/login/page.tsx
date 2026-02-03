'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRobot, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/context/SimpleAuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({
    id: '',
    url: '',
    answer: ''
  });
  const [captchaError, setCaptchaError] = useState('');
  
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // 路由保护：如果用户已登录，跳转到主页
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // 获取验证码
  const fetchCaptcha = async () => {
    try {
      const response = await fetch('https://v2.xxapi.cn/api/chineseCaptcha');
      const data = await response.json();
      if (data.code === 200) {
        setCaptcha({
          id: data.data.id,
          url: data.data.url,
          answer: ''
        });
        setCaptchaError('');
      } else {
        setCaptchaError('获取验证码失败');
      }
    } catch (error) {
      setCaptchaError('获取验证码失败');
    }
  };

  // 初始化时获取验证码
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // 如果正在加载认证状态，显示加载中
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const verifyCaptcha = async () => {
    try {
      const response = await fetch(`https://v2.xxapi.cn/api/chineseCaptcha?type=verify&id=${captcha.id}&answer=${captcha.answer}`);
      const data = await response.json();
      if (data.code === 200) {
        return true;
      } else {
        setCaptchaError('验证码错误');
        return false;
      }
    } catch (error) {
      setCaptchaError('验证码验证失败');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCaptchaError('');
    setLoading(true);

    // 首先验证验证码
    const isCaptchaValid = await verifyCaptcha();
    if (!isCaptchaValid) {
      setLoading(false);
      return;
    }

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push('/');
      } else {
        setError('邮箱或密码错误');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
      // 登录失败后重新获取验证码
      if (!user) {
        fetchCaptcha();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="NewWebAI" className="h-8 w-8" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-black hover:text-blue-600 transition">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600 transition">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600 transition">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600 transition">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600 transition">API</Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition">关于</Link>
          </div>
          <div className="flex space-x-3">
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              登录
            </Link>
            <Link href="/register" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              注册
            </Link>
          </div>
        </div>
      </nav>

      {/* 登录表单区域 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <FaRobot className="text-blue-600 text-5xl" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">欢迎回来</h1>
              <p className="text-black">登录您的NewWebAI账户</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  邮箱地址
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入邮箱地址"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="请输入密码"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    验证码
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={captcha.answer}
                      onChange={(e) => setCaptcha({...captcha, answer: e.target.value})}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入图中文字"
                    />
                    <img 
                      src={captcha.url} 
                      alt="验证码" 
                      className="h-12 w-24 border border-gray-300 rounded cursor-pointer"
                      onClick={fetchCaptcha}
                    />
                    <button 
                      type="button" 
                      onClick={fetchCaptcha}
                      className="px-3 py-3 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      刷新
                    </button>
                  </div>
                  {captchaError && (
                    <p className="text-red-500 text-sm mt-1">{captchaError}</p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    忘记密码？
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-black">
                还没有账户？
                <Link href="/register" className="text-blue-600 hover:underline ml-1">立即注册</Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-black">或使用以下方式登录</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-black hover:bg-gray-50 transition">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black">© 2025 小黄の数字宇宙工作室. 保留所有权利.</p>
          <div className="mt-4 space-x-4">
            <Link href="/terms" className="text-black hover:text-blue-400 transition">服务条款</Link>
            <Link href="/privacy" className="text-black hover:text-blue-400 transition">隐私政策</Link>
            <Link href="/disclaimer" className="text-black hover:text-blue-400 transition">免责声明</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}