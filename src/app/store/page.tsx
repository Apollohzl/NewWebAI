'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaTag, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  tags: string[];
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
          width={300}
          height={300}
        />
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-black line-clamp-1">{product.name}</h3>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-blue-600">¥{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-black line-through">¥{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <p className="text-black text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-3">
          {renderRating(product.rating)}
          <span className="text-black text-sm ml-2">({product.rating})</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags?.slice(0, 2).map((tag, index) => (
            <span key={index} className="inline-flex items-center bg-gray-100 text-black text-xs px-2 py-1 rounded-full">
              <FaTag className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <Link 
            href={`/store/${product.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看详情
          </Link>
          <button 
            onClick={handleAddToCart}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
          >
            <FaShoppingCart className="mr-1" />
            <span>加入购物车</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { items, getTotal, getItemCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/config/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data.products || []);
        } else {
          setError('获取产品数据失败');
        }
      } catch (error) {
        setError('网络错误，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载产品数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (    <div className="min-h-screen bg-gray-50 pb-24"> {/* 添加底部边距，为固定栏留出空间 */}
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-black font-medium">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600">API</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-black hover:text-blue-600">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">AI智能产品</h1>
            <p className="text-black">探索我们强大的AI驱动产品</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">最新上架</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">价格排序</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">评分最高</button>
          </div>
        </div>

        {/* 产品筛选器 */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4">
            <div>
              <h3 className="font-medium text-black mb-2">分类</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">全部</button>
                <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100">软件工具</button>
                <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100">数据分析</button>
                <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100">客户服务</button>
                <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100">创意设计</button>
              </div>
            </div>
          </div>
        </div>

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 底部固定购物车栏 */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaShoppingCart className="text-xl text-blue-600 mr-2" />
                <span className="font-medium">
                  {getItemCount()} 件商品，总计: 
                  <span className="text-lg font-bold text-blue-600"> ¥{getTotal().toFixed(2)}</span>
                </span>
              </div>
              <Link 
                href="/cart" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                去结算
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-black">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;