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
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  addedAt: string;
}