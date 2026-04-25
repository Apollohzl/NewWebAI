import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/sql';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiId = searchParams.get('api');
  
  try {
    if (apiId) {
      // 从数据库api_config表获取指定API的参数
      const results = await query(
        'SELECT * FROM api_config WHERE api_name = ?',
        [apiId]
      ) as any[];
      
      if (results.length > 0) {
        const paramsJson = results[0].params;
        // 解析JSON字符串
        let params;
        try {
          params = JSON.parse(paramsJson);
        } catch {
          params = paramsJson;
        }
        return NextResponse.json({ params });
      }
      return NextResponse.json({ error: 'API not found' }, { status: 404 });
    }
    
    // 如果没有指定API，返回所有API参数
    const allResults = await query('SELECT * FROM api_config') as any[];
    const allParams: Record<string, any> = {};
    allResults.forEach((row: any) => {
      try {
        allParams[row.api_name] = { params: JSON.parse(row.params) };
      } catch {
        allParams[row.api_name] = { params: row.params };
      }
    });
    return NextResponse.json(allParams);
  } catch (error) {
    console.error('Failed to load API parameters:', error);
    return NextResponse.json(
      { error: 'Failed to load API parameters configuration' },
      { status: 500 }
    );
  }
}