import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';
import productsData from '@/config/products.json';
import apisData from '@/config/apis.json';

export async function POST(request: NextRequest) {
  try {
    // 迁移产品数据到LeanCloud
    console.log('开始迁移产品数据...');
    
    for (const product of productsData.products) {
      try {
        const response = await leancloudRequest('/classes/Products', {
          method: 'POST',
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            rating: product.rating,
            tags: product.tags,
            features: product.features
          }),
        });
        console.log(`产品 "${product.name}" 迁移成功`);
      } catch (error) {
        console.error(`产品 "${product.name}" 迁移失败:`, error);
      }
    }

    // 迁移API数据到LeanCloud
    console.log('开始迁移API数据...');
    
    for (const api of apisData.apis) {
      try {
        const response = await leancloudRequest('/classes/APIs', {
          method: 'POST',
          body: JSON.stringify({
            id: api.id,
            name: api.name,
            description: api.description,
            status: api.status,
            visits: api.visits,
            icon: api.icon,
            tags: api.tags,
            category: api.category,
            requestUrl: api.requestUrl,
            methods: api.methods
          }),
        });
        console.log(`API "${api.name}" 迁移成功`);
      } catch (error) {
        console.error(`API "${api.name}" 迁移失败:`, error);
      }
    }

    return NextResponse.json({
      message: '数据迁移完成',
      products: productsData.products.length,
      apis: apisData.apis.length
    });
  } catch (error: any) {
    console.error('数据迁移失败:', error);
    return NextResponse.json(
      { error: error.message || '数据迁移失败' },
      { status: 500 }
    );
  }
}