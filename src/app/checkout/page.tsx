'use client';

import { useState } from 'react';
import { FaWeixin, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    
    // 模拟支付过程
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      // 支付成功后清空购物车
      clearCart();
    }, 2000);
  };

  // 计算订单总额（含税）
  const subtotal = getTotal();
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + tax;

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">支付成功！</h2>
            <p className="text-black mb-6">您的订单已成功支付，感谢您的购买！</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-black">订单号: <span className="font-medium">ORD-{Math.floor(Math.random() * 1000000)}</span></p>
              <p className="text-black">支付金额: <span className="font-medium">¥{orderTotal.toFixed(2)}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/store" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                继续购物
              </Link>
                          <Link href="/orders" className="px-6 py-3 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition">
                            查看订单
                          </Link>            </div>
          </div>
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
            <Link href="/store" className="text-black font-medium">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600">API</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-black">结算</h1>
            <Link href="/cart" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-1" />
              返回购物车
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 订单信息 */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold text-black mb-4">收货信息</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">姓名</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入收货人姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">电话</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入联系电话"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">地址</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入收货地址"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-black mb-4">支付方式</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="wechat" 
                      checked={paymentMethod === 'wechat'}
                      onChange={() => setPaymentMethod('wechat')}
                      className="mr-3"
                    />
                    <FaWeixin className="text-green-600 text-xl mr-3" />
                    <span className="font-medium">微信支付</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 订单摘要 */}
            <div>
                          <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-lg font-semibold text-black mb-4">订单摘要</h2>
                            <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name} × {item.quantity}</p>
                        <p className="text-sm text-black">单价: ¥{item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-black">商品小计</span>
                    <span>¥{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">配送费</span>
                    <span>¥0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">税费</span>
                    <span>¥{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>总计</span>
                    <span>¥{orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {paymentMethod === 'wechat' && (
                  <div className="mt-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-black mb-3">请选择支付金额</p>
                      <div className="flex justify-center space-x-2 mb-4">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">¥0.01</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm">¥1.00</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm">¥5.00</button>
                      </div>
                      <div className="relative inline-block">
                        <input 
                          type="number" 
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-center"
                          placeholder="自定义金额"
                          value={orderTotal}
                          readOnly
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">¥</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="bg-gray-100 rounded-lg p-6 inline-block">
                        <h3 className="font-semibold text-black mb-3">推荐使用微信支付</h3>
                        <div className="bg-white p-4 rounded-lg inline-block">
                          <img 
                            src="/微信收款码.jpg" 
                            alt="微信支付二维码" 
                            className="w-48 h-48 mx-auto object-cover"
                            width={192}
                            height={192}
                          />
                          <p className="mt-2 text-sm text-black">¥{orderTotal.toFixed(2)}</p>
                          <p className="text-sm text-black">收款人：NewWebAI</p>
                        </div>
                        <p className="text-black">请使用微信扫码支付</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isPaying}
                  className={`w-full mt-6 py-3 rounded-lg font-medium text-white flex items-center justify-center ${
                    isPaying ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isPaying ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}></path>
                      </svg>
                      处理中...
                    </>
                  ) : (
                    <>
                      <FaWeixin className="mr-2" />
                      微信支付 ¥{orderTotal.toFixed(2)}
                    </>
                  )}
                </button>
                
                <div className="mt-4 text-center">
                  <p className="text-black text-sm">支付完成后，您将收到确认邮件</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
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
};

export default CheckoutPage;