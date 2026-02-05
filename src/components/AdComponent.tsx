'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AdItem {
  id: number;
  title: string;
  url: string;
  cover?: string;
  description?: string;
}

const AdComponent = () => {
  const [ad, setAd] = useState<AdItem | null>(null);

  useEffect(() => {
    // 从广告配置文件加载广告数据
    fetch('/config/ads.json')
      .then(res => res.json())
      .then((ads: AdItem[]) => {
        // 随机选择一个广告
        const randomIndex = Math.floor(Math.random() * ads.length);
        setAd(ads[randomIndex]);
      })
      .catch(error => {
        console.error('加载广告数据失败:', error);
      });
  }, []);

  if (!ad) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        {ad.cover && (
          <div className="flex-shrink-0 mr-4">
            <img 
              src={ad.cover} 
              alt={ad.title} 
              className="w-16 h-16 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-blue-700 truncate">{ad.title}</h3>
          {ad.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ad.description}</p>
          )}
          <Link 
            href={ad.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-blue-600 hover:underline"
          >
            了解更多 →
          </Link>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 italic">
        #自定义广告
      </div>
    </div>
  );
};

export default AdComponent;