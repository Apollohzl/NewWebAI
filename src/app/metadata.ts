import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NewWebAI - 智能AI网站 | AI驱动的博客、产品与服务',
  description: 'NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、AI图像生成、智能博客、电商平台等多种功能。由小黄の数字宇宙工作室打造。',
  keywords: 'AI, 人工智能, AI对话, AI图像生成, AI视频生成, 智能博客, 电商平台, Next.js',
  openGraph: {
    title: 'NewWebAI - 智能AI网站 | AI驱动的博客、产品与服务',
    description: 'NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、AI图像生成、智能博客、电商平台等多种功能。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://hzliflow.ken520.top/',
    siteName: 'NewWebAI',
    images: [
      {
        url: 'https://hzliflow.ken520.top/logo.png',
        width: 800,
        height: 600,
        alt: 'NewWebAI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewWebAI - 智能AI网站 | AI驱动的博客、产品与服务',
    description: 'NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、AI图像生成、智能博客、电商平台等多种功能。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hzliflow.ken520.top/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};