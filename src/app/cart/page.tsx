'use client';

import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-800 hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-gray-800 hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-gray-800 font-medium">产品</Link>
            <Link href="/ai-tools" className="text-gray-800 hover:text-blue-600">AI工具</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 购物车内容 */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaShoppingCart className="mr-2" />
          我的购物车
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaShoppingCart className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">购物车为空</h3>
            <p className="text-gray-700 mb-6">您还没有添加任何商品到购物车</p>
            <Link href="/store" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              浏览商品
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 商品列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                          width={80}
                          height={80}
                        />
                        <div className="ml-6 flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-lg font-bold text-blue-600 mt-1">¥{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                            >
                              <FaMinus className="text-sm" />
                            </button>
                            <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                            >
                              <FaPlus className="text-sm" />
                            </button>
                          </div>
                          <p className="text-lg font-bold text-gray-800 w-24 text-right">
                            ¥{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 订单摘要 */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">订单摘要</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品小计</span>
                    <span className="font-medium">¥{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">配送费</span>
                    <span className="font-medium">¥0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">税费</span>
                    <span className="font-medium">¥{(getTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>总计</span>
                      <span>¥{(getTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium text-center block">
                  去结算
                </Link>
                
                <Link href="/store" className="w-full mt-4 flex items-center justify-center text-gray-600 hover:text-blue-600 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <FaArrowLeft className="mr-2" />
                  继续购物
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">NewWebAI</h4>
              <p className="text-gray-400">
                由小黄の数字宇宙工作室打造的智能AI平台，为您的业务提供智能化解决方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">AI博客</a></li>
                <li><a href="#" className="hover:text-white transition">智能电商</a></li>
                <li><a href="#" className="hover:text-white transition">数据分析</a></li>
                <li><a href="#" className="hover:text-white transition">API服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">团队</a></li>
                <li><a href="#" className="hover:text-white transition">新闻</a></li>
                <li><a href="#" className="hover:text-white transition">合作伙伴</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-gray-400">
                <li>邮箱: contact@newwebai.com</li>
                <li>网址: https://hzliflow.ken520.top/</li>
                <li>公司: 小黄の数字宇宙工作室</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;