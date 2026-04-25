import { NextRequest, NextResponse } from 'next/server';
import { UserQueries, BlogQueries, ProductQueries, ApiQueries } from '@/lib/sqlDatabase';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 验证认证
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: '无效的认证令牌' }, { status: 401 });
    }

    // 检查是否是管理员
    const user = await UserQueries.findById(decoded.userId);
    if (!user || user.email !== '959855534@qq.com') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    // 获取数据
    const [blogPosts, products, apis] = await Promise.all([
      BlogQueries.getList(20, 0),
      ProductQueries.getAll(),
      ApiQueries.getAll()
    ]);

    // 统计数据
    const stats = {
      totalBlogPosts: blogPosts.length,
      totalProducts: products.length,
      totalApis: apis.length,
      todayNewUsers: 0 // 暂时返回0，实际应该查询今天新增的用户
    };

    return NextResponse.json({
      blogPosts,
      products,
      apis,
      stats
    });
  } catch (error: any) {
    console.error('获取仪表板数据失败:', error);
    return NextResponse.json(
      { error: error.message || '获取数据失败' },
      { status: 500 }
    );
  }
}
