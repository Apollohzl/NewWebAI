'use client';

import { useEffect } from 'react';

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
        if ((window as any).ezoicAds && (window as any).ezoicAds.refresh) {
          (window as any).ezoicAds.refresh();
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