'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaRobot, FaArrowLeft } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState({
    id: '',
    url: '',
    answer: ''
  });
  const [captchaError, setCaptchaError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里先不实现逻辑，后面再讨论
    console.log('重置密码请求:', email);
    setIsSubmitted(true);
  };

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
  React.useEffect(() => {
    fetchCaptcha();
  }, []);

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
    setCaptchaError('');

    // 验证验证码
    const isCaptchaValid = await verifyCaptcha();
    if (!isCaptchaValid) {
      return;
    }

    // 这里先不实现逻辑，后面再讨论
    console.log('重置密码请求:', email);
    setIsSubmitted(true);
    // 重置验证码
    fetchCaptcha();
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

      {/* 忘记密码表单区域 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <FaRobot className="text-blue-600 text-5xl" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">忘记密码</h1>
              <p className="text-black">
                {!isSubmitted 
                  ? "请输入您的邮箱地址，我们将向您发送密码重置链接" 
                  : "重置链接已发送"}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入注册时使用的邮箱地址"
                    required
                  />
                </div>

                {/* 验证码 */}
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  发送重置链接
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    密码重置链接已发送至 <strong>{email}</strong>
                  </p>
                </div>
                
                <div className="text-sm text-black">
                  <p>请检查您的邮箱（包括垃圾邮件文件夹），并点击链接重置密码。</p>
                  <p className="mt-2">如果您没有收到邮件，请确认邮箱地址是否正确。</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  重新发送
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <FaArrowLeft className="mr-2" />
                返回登录
              </Link>
            </div>

            {!isSubmitted && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-black mb-3">其他选择</h3>
                <div className="space-y-2">
                  <p className="text-sm text-black">
                    记起密码了？
                    <Link href="/login" className="text-blue-600 hover:underline ml-1">立即登录</Link>
                  </p>
                  <p className="text-sm text-black">
                    还没有账户？
                    <Link href="/register" className="text-blue-600 hover:underline ml-1">立即注册</Link>
                  </p>
                </div>
              </div>
            )}
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