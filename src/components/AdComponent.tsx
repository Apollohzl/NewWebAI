import { useState, useEffect } from 'react';

interface AdItem {
  id: string;
  title: string;
  url: string;
  cover?: string;
}

export default function AdComponent() {
  const [ad, setAd] = useState<AdItem | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch('/api/ads');
        const ads: AdItem[] = await response.json();
        if (ads && ads.length > 0) {
          const randomIndex = Math.floor(Math.random() * ads.length);
          setAd(ads[randomIndex]);
        }
      } catch (error) {
        console.error('Failed to load ads:', error);
      }
    };

    fetchAd();
  }, []);

  if (!ad) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">加载广告中...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <a href={ad.url} target="_blank" rel="noopener noreferrer" className="block">
        {ad.cover && (
          <img 
            src={ad.cover} 
            alt={ad.title} 
            className="w-full h-32 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-medium text-black text-sm">{ad.title}</h3>
        </div>
      </a>
    </div>
  );
}