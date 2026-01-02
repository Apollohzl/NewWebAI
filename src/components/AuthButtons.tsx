'use client';

import { useAuth } from '@/context/SimpleAuthContext';
import Link from 'next/link';
import UserAvatar from './UserAvatar';

export default function AuthButtons() {
  const { user, loading } = useAuth();

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
    return <UserAvatar />;
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