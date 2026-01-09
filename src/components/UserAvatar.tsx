'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/SimpleAuthContext';
import Link from 'next/link';

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!user) {
    return null;
  }

  // 处理头像URL
  const getAvatarUrl = () => {
    if (!user.avatar) {
      return '/user0.svg';
    }
    
    // 如果是LeanCloud URL，确保正确格式
    if (user.avatar.startsWith('http')) {
      return user.avatar;
    }
    
    // 如果是相对路径，添加LeanCloud域名前缀（如果需要）
    // 这里可能需要根据您的LeanCloud配置调整
    return user.avatar;
  };
  
  const avatarUrl = getAvatarUrl();

  const handleMouseEnter = () => {
    // 清除任何现有的延迟隐藏
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // 延迟隐藏，给用户时间移动到下拉菜单
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleMenuClick = () => {
    setShowDropdown(false);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 圆形头像 */}
      <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-indigo-500 transition-colors">
        <img
          src={avatarUrl}
          alt={`${user.username}的头像`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // 如果头像加载失败，使用默认头像
            (e.target as HTMLImageElement).src = '/user0.svg';
          }}
        />
      </div>

      {/* 下拉菜单 */}
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 用户信息显示 */}
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.username}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* 菜单项 */}
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={handleMenuClick}
          >
            账户设置
          </Link>
          
          {/* 开发者选项 - 仅对特定邮箱显示 */}
          {user.email === '959855534@qq.com' && (
            <Link
              href="/admin/developer"
              className="block px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
              onClick={handleMenuClick}
            >
              开发者选项
            </Link>
          )}
          
          <button
            onClick={() => {
              logout();
              handleMenuClick();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}