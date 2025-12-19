import { NextRequest } from 'next/server';

// 模拟博客文章数据
const mockBlogPosts = [
  {
    id: 1,
    title: 'AI技术如何改变我们的生活',
    excerpt: '人工智能技术正在深刻改变我们的生活方式，从智能家居到自动驾驶，AI已经渗透到生活的方方面面。',
    content: '人工智能技术正在深刻改变我们的生活方式，从智能家居到自动驾驶，AI已经渗透到生活的方方面面。随着深度学习和神经网络技术的不断发展，AI系统能够处理更加复杂的任务，为人类提供前所未有的便利。',
    author: '张三',
    date: '2024-01-15',
    tags: ['AI', '技术', '未来'],
    readTime: '5分钟',
    category: '技术',
    likes: 120,
    comments: 23
  },
  {
    id: 2,
    title: 'Next.js 14 新特性详解',
    excerpt: 'Next.js 14带来了许多令人兴奋的新功能，包括App Router、服务端组件等。',
    content: 'Next.js 14带来了许多令人兴奋的新功能，包括App Router、服务端组件等。这些新特性大大提升了开发效率和应用性能，让开发者能够构建更加现代化的Web应用。',
    author: '李四',
    date: '2024-02-20',
    tags: ['Next.js', 'React', '前端'],
    readTime: '8分钟',
    category: '开发',
    likes: 95,
    comments: 15
  },
  {
    id: 3,
    title: '电商网站优化策略',
    excerpt: '如何通过优化用户体验和转化率来提升电商网站的业绩。',
    content: '电商网站的成功不仅取决于产品本身，更取决于用户体验和转化率。通过优化网站加载速度、简化购买流程、个性化推荐等策略，可以显著提升销售业绩。',
    author: '王五',
    date: '2024-03-10',
    tags: ['电商', '优化', '用户体验'],
    readTime: '6分钟',
    category: '商业',
    likes: 78,
    comments: 12
  },
  {
    id: 4,
    title: '数据可视化的重要性',
    excerpt: '数据可视化帮助我们更好地理解复杂数据，发现隐藏的模式和趋势。',
    content: '数据可视化帮助我们更好地理解复杂数据，发现隐藏的模式和趋势。通过图表、图形和仪表板，我们可以将抽象的数据转化为直观的视觉信息，从而做出更明智的决策。',
    author: '赵六',
    date: '2024-04-05',
    tags: ['数据', '可视化', '分析'],
    readTime: '7分钟',
    category: '技术',
    likes: 110,
    comments: 18
  },
  {
    id: 5,
    title: '人工智能与未来工作',
    excerpt: 'AI技术对未来工作模式的影响，以及我们如何适应这种变化。',
    content: 'AI技术对未来工作模式产生了深远影响。虽然一些传统职位可能会被自动化取代，但同时也会创造出许多新的就业机会。关键是我们要学会与AI协作，发挥人类独特的创造力和判断力。',
    author: '钱七',
    date: '2024-05-12',
    tags: ['AI', '未来', '工作'],
    readTime: '10分钟',
    category: '趋势',
    likes: 142,
    comments: 31
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';
  const author = searchParams.get('author') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'date';
  
  // 过滤博客文章
  let filteredPosts = [...mockBlogPosts];
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }
  
  if (author) {
    filteredPosts = filteredPosts.filter(post => 
      post.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  if (search) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // 排序
  if (sort === 'date') {
    filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sort === 'likes') {
    filteredPosts.sort((a, b) => b.likes - a.likes);
  } else if (sort === 'title') {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  // 分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return Response.json({
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredPosts.length / limit),
      totalPosts: filteredPosts.length,
      hasNextPage: endIndex < filteredPosts.length,
      hasPrevPage: startIndex > 0
    },
    filters: {
      category,
      tag,
      author,
      search,
      sort
    },
    api: 'blog',
    version: '1.0.0'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.title || !body.content) {
      return Response.json({
        error: 'Missing required fields',
        message: '标题和内容是必需的'
      }, { status: 400 });
    }
    
    // 创建新博客文章
    const newPost = {
      id: mockBlogPosts.length + 1,
      title: body.title,
      excerpt: body.excerpt || body.content.substring(0, 100) + '...',
      content: body.content,
      author: body.author || 'Anonymous',
      date: body.date || new Date().toISOString().split('T')[0],
      tags: body.tags || [],
      readTime: body.readTime || '5分钟',
      category: body.category || '未分类',
      likes: 0,
      comments: 0
    };
    
    // 在实际应用中，这里会保存到数据库
    console.log('Adding new blog post:', newPost);
    
    return Response.json({
      message: '博客文章创建成功',
      post: newPost,
      api: 'blog',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id;
    
    if (!id) {
      return Response.json({
        error: 'Post ID is required',
        message: '文章ID是必需的'
      }, { status: 400 });
    }
    
    const postIndex = mockBlogPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      return Response.json({
        error: 'Post not found',
        message: '未找到指定文章'
      }, { status: 404 });
    }
    
    // 更新文章信息
    const updatedPost = {
      ...mockBlogPosts[postIndex],
      ...body,
      id: parseInt(id), // 确保ID不变
      date: body.date || mockBlogPosts[postIndex].date // 除非特别指定，否则保持原日期
    };
    
    console.log('Updating blog post:', updatedPost);
    
    return Response.json({
      message: '博客文章更新成功',
      post: updatedPost,
      api: 'blog',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}