'use client';

import { useState } from 'react';
import { useAuth } from '@/context/SimpleAuthContext';
import Link from 'next/link';

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return null;
  }

  // 默认头像或用户头像
  const avatarUrl = user.avatar || '/user0.svg';

  return (
    <div className="relative">
      {/* 圆形头像 */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-indigo-500 transition-colors"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
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
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* 用户信息显示 */}
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.username}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          {/* 菜单项 */}
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setShowDropdown(false)}
          >
            账户设置
          </Link>
          
          <button
            onClick={() => {
              logout();
              setShowDropdown(false);
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