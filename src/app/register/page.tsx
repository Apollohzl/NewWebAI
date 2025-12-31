'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRobot, FaEye, FaEyeSlash, FaCheck, FaExclamationTriangle, FaEnvelope, FaLock, FaUser, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '@/context/SimpleAuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [message, setMessage] = useState('');
  
  const { register } = useAuth();
  const router = useRouter();

  // 密码强度检测
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength++;
      if (/[a-z]/.test(formData.password)) strength++;
      if (/[A-Z]/.test(formData.password)) strength++;
      if (/[0-9]/.test(formData.password)) strength++;
      if (/[^a-zA-Z0-9]/.test(formData.password)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // 基础验证
    if (!formData.username || !formData.email) {
      setError('请填写用户名和邮箱地址');
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setError('请输入密码和确认密码');
      return;
    }

    // 验证密码
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    if (!formData.agreeTerms) {
      setError('请同意服务条款和隐私政策');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (data.needEmailVerification) {
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } else {
        setError(data.error || '注册失败，请稍后重试');
      }
    } catch (err) {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      {/* 导航栏 */}
      <nav className="relative bg-white/60 backdrop-blur-lg shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img src="/logo.png" alt="NewWebAI" className="h-10 w-10 transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NewWebAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">首页</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">博客</Link>
            <Link href="/store" className="text-gray-600 hover:text-blue-600 transition-colors">产品</Link>
            <Link href="/ai-tools" className="text-gray-600 hover:text-blue-600 transition-colors">AI工具</Link>
            <Link href="/api-docs" className="text-gray-600 hover:text-blue-600 transition-colors">API</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">关于</Link>
          </div>
          
          <Link href="/login" className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5">
            <span className="text-gray-700 font-medium">登录</span>
            <FaArrowRight className="text-gray-500 text-sm" />
          </Link>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧介绍 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  开启AI
                </span>
                <br />
                <span className="text-gray-900">智能之旅</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                加入NewWebAI，探索人工智能的无限可能。体验最前沿的AI技术，让创新触手可及。
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">安全可靠</h3>
                  <p className="text-gray-600">企业级安全保障，您的数据安全是我们的首要任务</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FaRobot className="text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">智能高效</h3>
                  <p className="text-gray-600">强大的AI引擎，为您提供精准、高效的智能服务</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">即时响应</h3>
                  <p className="text-gray-600">快速响应机制，让您的创意即刻实现</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧注册表单 */}
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* 顶部装饰 */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
              
              <div className="p-8 lg:p-10">
                {/* 步骤指示器 */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      currentStep >= 1 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > 1 ? <FaCheck className="text-xs" /> : '1'}
                    </div>
                    <div className={`h-0.5 w-12 transition-all ${
                      currentStep > 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      currentStep >= 2 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > 2 ? <FaCheck className="text-xs" /> : '2'}
                    </div>
                    <div className={`h-0.5 w-12 transition-all ${
                      currentStep > 2 ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      currentStep >= 3 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > 3 ? <FaCheck className="text-xs" /> : '3'}
                    </div>
                  </div>
                </div>

                {/* 标题 */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">创建账户</h2>
                  <p className="text-gray-600">加入我们，开启智能AI之旅</p>
                </div>

                {/* 错误提示 */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                    <FaExclamationTriangle className="text-red-500 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* 成功提示 */}
                {message && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
                    <FaCheck className="text-green-500 mt-0.5" />
                    <p className="text-green-700 text-sm">{message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 用户名 */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700">
                      <FaUser className="mr-2 text-gray-400" />
                      用户名
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      placeholder="请输入用户名"
                      required
                    />
                  </div>

                  {/* 邮箱 */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      placeholder="请输入邮箱地址"
                      required
                    />
                  </div>

                  {/* 密码 */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                      <FaLock className="mr-2 text-gray-400" />
                      密码
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
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
                    {/* 密码强度指示器 */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">密码强度</span>
                          <span className={`text-xs font-medium ${
                            passwordStrength <= 2 ? 'text-red-500' : 
                            passwordStrength <= 3 ? 'text-yellow-500' : 
                            'text-green-500'
                          }`}>
                            {passwordStrength <= 2 ? '弱' : passwordStrength <= 3 ? '中' : '强'}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength <= 2 ? 'bg-red-500' : 
                              passwordStrength <= 3 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 确认密码 */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-700">
                      <FaLock className="mr-2 text-gray-400" />
                      确认密码
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                        placeholder="请再次输入密码"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <FaEye className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">两次输入的密码不一致</p>
                    )}
                  </div>

                  {/* 服务条款 */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                      我已阅读并同意
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium ml-1">服务条款</Link>
                      和
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium ml-1">隐私政策</Link>
                    </label>
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={loading || formData.password !== formData.confirmPassword}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        注册中...
                      </span>
                    ) : (
                      '注册账户'
                    )}
                  </button>
                </form>

                {/* 登录链接 */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    已有账户？
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">立即登录</Link>
                  </p>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="relative bg-gray-900/80 backdrop-blur-lg text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/logo.png" alt="NewWebAI" className="h-8 w-8" />
              <span className="text-xl font-bold">NewWebAI</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="hover:text-blue-400 transition-colors">服务条款</Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">隐私政策</Link>
              <Link href="/disclaimer" className="hover:text-blue-400 transition-colors">免责声明</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2025 小黄の数字宇宙工作室. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  );
}