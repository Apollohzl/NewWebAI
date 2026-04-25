import { NextResponse } from 'next/server';
import { ApiQueries } from '@/lib/sqlDatabase';

export async function GET() {
  try {
    const apis = await ApiQueries.getAll();
    
    // 提取所有唯一的分类
    const categoriesSet = new Set<string>();
    apis.forEach(api => {
      if (api.category) {
        categoriesSet.add(api.category);
      }
    });
    
    const categories = Array.from(categoriesSet).map((category, index) => ({
      id: category,
      name: category,
      description: `${category}相关的API接口`
    }));
    
    return NextResponse.json({ apis, categories });
  } catch (error) {
    console.error('获取API配置失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}