'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaRobot, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/context/SimpleAuthContext';
import { useRouter } from 'next/navigation';
import VerificationCodeInput from '@/components/VerificationCodeInput';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

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

    // 验证密码
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (!emailVerified) {
      setError('请先完成邮箱验证');
      return;
    }

    if (!formData.agreeTerms) {
      setError('请同意服务条款和隐私政策');
      return;
    }

    setLoading(true);

    try {
      const success = await register(
        formData.username, 
        formData.email, 
        formData.password,
        formData.verificationCode
      );
      if (success) {
        router.push('/');
      } else {
        setError('注册失败，请稍后重试');
      }
    } catch (err) {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
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
            <Link href="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              登录
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              注册
            </Link>
          </div>
        </div>
      </nav>

      {/* 注册表单区域 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <FaRobot className="text-blue-600 text-5xl" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">创建账户</h1>
              <p className="text-black">加入NewWebAI，开启智能AI之旅</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入用户名"
                  required
                />
              </div>

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

              {/* 邮箱验证码 */}
              <VerificationCodeInput
                email={formData.email}
                onVerified={setEmailVerified}
                onCodeChange={(code) => setFormData(prev => ({ ...prev, verificationCode: code }))}
              />

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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
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
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-black">
                  我已阅读并同意
                  <Link href="/terms" className="text-blue-600 hover:underline ml-1">服务条款</Link>
                  和
                  <Link href="/privacy" className="text-blue-600 hover:underline ml-1">隐私政策</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '注册中...' : '注册账户'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-black">
                已有账户？
                <Link href="/login" className="text-blue-600 hover:underline ml-1">立即登录</Link>
              </p>
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