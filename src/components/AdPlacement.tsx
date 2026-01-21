'use client';

import { useEffect } from 'react';

// 扩展Window接口以包含Ezoic相关属性
declare global {
  interface Window {
    ezstandalone?: {
      cmd?: any[];
    };
    ezoicAds?: {
      refresh?: () => void;
    };
  }
}

type AdPlacementProps = {
  id: string;
  className?: string;
  style?: React.CSSProperties;
};

const AdPlacement = ({ id, className = '', style }: AdPlacementProps) => {
  useEffect(() => {
    // 确保Ezoic库已加载并刷新广告
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd = window.ezstandalone.cmd || [];
      window.ezstandalone.cmd.push(() => {
        if (window.ezoicAds && window.ezoicAds.refresh) {
          window.ezoicAds.refresh();
        }
      });
    }
  }, []);

  return (
    <div 
      id={id}
      className={`ezoic-ad ${className}`}
      style={style}
    />
  );
};

export default AdPlacement;