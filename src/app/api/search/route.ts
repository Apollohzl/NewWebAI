import { NextRequest } from 'next/server';
import { products } from '../../../lib/products'; // 引入产品数据
// 模拟博客文章数据
const mockBlogPosts = [
  { id: 1, title: 'AI技术如何改变我们的生活', excerpt: '人工智能技术正在深刻改变我们的生活方式...', author: '张三', date: '2024-01-15', tags: ['AI', '技术', '未来'], category: '技术' },
  { id: 2, title: 'Next.js 14 新特性详解', excerpt: 'Next.js 14带来了许多令人兴奋的新功能...', author: '李四', date: '2024-02-20', tags: ['Next.js', 'React', '前端'], category: '开发' },
  { id: 3, title: '电商网站优化策略', excerpt: '如何通过优化用户体验和转化率来提升电商网站的业绩...', author: '王五', date: '2024-03-10', tags: ['电商', '优化', '用户体验'], category: '商业' },
  { id: 4, title: '数据可视化的重要性', excerpt: '数据可视化帮助我们更好地理解复杂数据...', author: '赵六', date: '2024-04-05', tags: ['数据', '可视化', '分析'], category: '技术' },
  { id: 5, title: '人工智能与未来工作', excerpt: 'AI技术对未来工作模式的影响...', author: '钱七', date: '2024-05-12', tags: ['AI', '未来', '工作'], category: '趋势' }
];

// 模拟用户数据
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'user' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || searchParams.get('query') || '';
  const type = searchParams.get('type') || 'all'; // all, products, blog, users
  const limit = parseInt(searchParams.get('limit') || '10');
  
  if (!query) {
    return Response.json({
      error: 'Query parameter is required',
      message: '搜索查询参数(q或query)是必需的'
    }, { status: 400 });
  }
  
  // 执行搜索
  let results: any = {
    products: [],
    blog: [],
    users: []
  };
  
  // 搜索产品
  if (type === 'all' || type === 'products') {
    results.products = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, limit);
  }
  
  // 搜索博客
  if (type === 'all' || type === 'blog') {
    results.blog = mockBlogPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, limit);
  }
  
  // 搜索用户
  if (type === 'all' || type === 'users') {
    results.users = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) || 
      user.email.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);
  }
  
  // 计算总结果数
  const totalResults = results.products.length + results.blog.length + results.users.length;
  
  // 如果只搜索特定类型，只返回该类型的结果
  let response: any = {
    query,
    type,
    totalResults,
    timestamp: new Date().toISOString(),
    api: 'search',
    version: '1.0.0'
  };
  
  if (type === 'all') {
    response.results = results;
  } else {
    response.results = results[type];
  }
  
  return Response.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query || body.q || '';
    const type = body.type || 'all';
    const filters = body.filters || {};
    const limit = body.limit || 10;
    
    if (!query) {
      return Response.json({
        error: 'Query parameter is required',
        message: '搜索查询参数是必需的'
      }, { status: 400 });
    }
    
    // 执行搜索
    let results: any = {
      products: [],
      blog: [],
      users: []
    };
    
    // 搜索产品
    if (type === 'all' || type === 'products') {
      results.products = products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || 
                           product.description.toLowerCase().includes(query.toLowerCase()) ||
                           product.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()));
        
        // 应用额外过滤器
        let matchesFilters = true;
        if (filters.category) {
          matchesFilters = matchesFilters && product.category.toLowerCase().includes(filters.category.toLowerCase());
        }
        if (filters.minPrice !== undefined) {
          matchesFilters = matchesFilters && product.price >= filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          matchesFilters = matchesFilters && product.price <= filters.maxPrice;
        }
        
        return matchesQuery && matchesFilters;
      }).slice(0, limit);
    }
    
    // 搜索博客
    if (type === 'all' || type === 'blog') {
      results.blog = mockBlogPosts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                           post.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()));
        
        // 应用额外过滤器
        let matchesFilters = true;
        if (filters.category) {
          matchesFilters = matchesFilters && post.category.toLowerCase().includes(filters.category.toLowerCase());
        }
        if (filters.author) {
          matchesFilters = matchesFilters && post.author.toLowerCase().includes(filters.author.toLowerCase());
        }
        
        return matchesQuery && matchesFilters;
      }).slice(0, limit);
    }
    
    // 搜索用户
    if (type === 'all' || type === 'users') {
      results.users = mockUsers.filter(user => {
        const matchesQuery = user.name.toLowerCase().includes(query.toLowerCase()) || 
                           user.email.toLowerCase().includes(query.toLowerCase());
        
        // 应用额外过滤器
        let matchesFilters = true;
        if (filters.role) {
          matchesFilters = matchesFilters && user.role === filters.role;
        }
        
        return matchesQuery && matchesFilters;
      }).slice(0, limit);
    }
    
    // 计算总结果数
    const totalResults = results.products.length + results.blog.length + results.users.length;
    
    // 返回结果
    let response: any = {
      query,
      type,
      filters,
      totalResults,
      timestamp: new Date().toISOString(),
      api: 'search',
      version: '1.0.0'
    };
    
    if (type === 'all') {
      response.results = results;
    } else {
      response.results = results[type];
    }
    
    return Response.json(response);
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}