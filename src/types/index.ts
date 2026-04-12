export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // 实际项目中应该是hash后的密码
  avatar?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  inStock: boolean;
  tags?: string[];
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface BlogPost {
  id: string;
  objectId?: string; // 保持与现有代码的兼容性
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiConfig {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  category?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  status?: string;
  visits?: number;
  tags?: string[];
  methods?: string[];
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatMessage {
  id: string;
  userId?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  thinkingContent?: string;
  model?: string;
  sessionId?: string;
  createdAt?: string;
  created_at?: string;
}