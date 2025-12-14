'use client';

import { notFound } from 'next/navigation';
import { Product, products } from '@/lib/products';
import { FaStar, FaRegStar, FaStarHalfAlt, FaTag, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { addItem } = useCart();
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-900 hover:text-blue-600">首页</a>
            <a href="/blog" className="text-gray-900 hover:text-blue-600">博客</a>
            <a href="/store" className="text-gray-900 font-medium hover:text-blue-600">产品</a>
            <a href="/ai-tools" className="text-gray-900 hover:text-blue-600">AI工具</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/cart" className="relative text-gray-900 hover:text-blue-600">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {useCart().getItemCount()}
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* 产品详情 */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* 产品图片 */}
            <div className="md:w-1/2 p-6">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-96 object-contain"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            
            {/* 产品信息 */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  <div className="flex items-center mb-4">
                    {renderRating(product.rating)}
                    <span className="text-gray-500 text-sm ml-2">({product.rating} 评分)</span>
                  </div>
                </div>
                {product.originalPrice && (
                  <div className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <p className="text-gray-800 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-blue-600">¥{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through ml-3">¥{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">核心功能</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span className="text-gray-900">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, index) => (
                    <span key={index} className="inline-flex items-center bg-gray-100 text-gray-900 text-sm px-3 py-1 rounded-full">
                      <FaTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    if (product) {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }
                  }}
                  className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition font-medium"
                >
                  <FaShoppingCart className="mr-2" />
                  加入购物车
                </button>
                <button 
                  onClick={() => {
                    if (product) {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      });
                      // 立即购买则跳转到购物车
                      window.location.href = '/cart';
                    }
                  }}
                  className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition font-medium"
                >
                  立即购买
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 产品详情描述 */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">产品详情</h2>
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">AI智能写作助手</h3>
            <p className="text-gray-900 mb-4">
              我们的AI智能写作助手是您内容创作的最佳伙伴。通过先进的自然语言处理技术，
              它能够理解您的需求并生成高质量的文章、博客、营销文案等内容。
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">主要功能</h3>
            <ul className="list-disc pl-5 text-gray-900 mb-4">
              <li>智能内容生成：基于上下文生成连贯、有逻辑的内容</li>
              <li>多语言支持：支持中文、英文等多种语言</li>
              <li>一键导出：支持多种格式导出，方便使用</li>
              <li>风格定制：根据需求调整写作风格</li>
              <li>语法检查：自动检测并修正语法错误</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">适用场景</h3>
            <p className="text-gray-900 mb-4">
              适用于内容创作者、营销人员、学生、教师等各种需要大量文字创作的场景。
              无论是博客撰写、社交媒体内容、商业计划书还是学术论文，AI写作助手都能提供有力支持。
            </p>
          </div>
        </div>

        {/* 相关产品 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">相关产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="p-5">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      width={300}
                      height={300}
                    />
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center mb-2">
                      {renderRating(relatedProduct.rating)}
                      <span className="text-gray-500 text-sm ml-2">({relatedProduct.rating})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">¥{relatedProduct.price.toFixed(2)}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
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

export default ProductDetailPage;