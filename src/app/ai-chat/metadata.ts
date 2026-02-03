import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 对话 - NewWebAI | 智能AI聊天助手',
  description: '与NewWebAI的智能AI聊天助手进行对话。支持多种AI模型，可调节创造性参数，提供高质量的AI对话体验。',
  keywords: 'AI聊天, AI对话, 人工智能助手, 多模型AI, 智能问答, OpenAI, AI模型',
  openGraph: {
    title: 'AI 对话 - NewWebAI | 智能AI聊天助手',
    description: '与NewWebAI的智能AI聊天助手进行对话。支持多种AI模型，可调节创造性参数，提供高质量的AI对话体验。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://hzliflow.ken520.top/ai-chat',
    siteName: 'NewWebAI',
    images: [
      {
        url: 'https://hzliflow.ken520.top/logo.png',
        width: 800,
        height: 600,
        alt: 'AI Chat Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 对话 - NewWebAI | 智能AI聊天助手',
    description: '与NewWebAI的智能AI聊天助手进行对话。支持多种AI模型，可调节创造性参数，提供高质量的AI对话体验。',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://hzliflow.ken520.top/ai-chat',
  },
};