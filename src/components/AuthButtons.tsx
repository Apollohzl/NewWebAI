'use client';

import { useAuth } from '@/context/SimpleAuthContext';
import Link from 'next/link';

export default function AuthButtons() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex space-x-3">
        <div className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
          加载中...
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm text-black">欢迎, {user.username}</span>
        <button
          onClick={logout}
          className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <div className="flex space-x-3">
      <Link href="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
        登录
      </Link>
      <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        注册
      </Link>
    </div>
  );
}