import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/hzliflow.ken520.top',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
