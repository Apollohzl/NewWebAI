import productsData from '@/config/products.json';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  tags?: string[];
  features?: string[];
}

export const products: Product[] = productsData.products;