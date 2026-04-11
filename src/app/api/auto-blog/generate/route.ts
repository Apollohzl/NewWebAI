import { NextRequest, NextResponse } from 'next/server';
import { BlogQueries } from '@/lib/sqlDatabase';

// 博客主题列表，避免重复
const BLOG_TOPICS = [
  {
    title: "AI技术在现代Web开发中的应用",
    keywords: ["AI", "Web开发", "JavaScript", "React", "Vue", "Next.js"],
    category: "技术"
  },
  {
    title: "机器学习算法的实际应用案例",
    keywords: ["机器学习", "算法", "Python", "数据分析", "人工智能"],
    category: "技术"
  },
  {
    title: "云计算与边缘计算的未来趋势",
    keywords: ["云计算", "边缘计算", "AWS", "Azure", "5G", "物联网"],
    category: "技术"
  },
  {
    title: "前端框架性能优化最佳实践",
    keywords: ["前端", "性能优化", "React", "Vue", "Angular", "Webpack"],
    category: "技术"
  },
  {
    title: "人工智能在医疗健康领域的创新",
    keywords: ["AI", "医疗", "健康", "诊断", "机器学习", "数据分析"],
    category: "应用"
  },
  {
    title: "区块链技术的商业应用探索",
    keywords: ["区块链", "加密货币", "智能合约", "DeFi", "NFT", "Web3"],
    category: "应用"
  },
  {
    title: "网络安全威胁防护策略",
    keywords: ["网络安全", "黑客攻击", "数据保护", "加密", "防火墙", "安全审计"],
    category: "安全"
  },
  {
    title: "大数据分析的商业价值",
    keywords: ["大数据", "数据分析", "商业智能", "数据挖掘", "预测分析", "决策支持"],
    category: "应用"
  }
];

// 随机选择一个主题
function getRandomTopic() {
  return BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
}

// 生成博客内容
async function generateBlogContent(topic: any) {
  try {
    const prompt = `现在你是一个帖子智能编辑员，你每次输出都需要以json纯文本格式输出，禁止换行，禁止使用md格式。内容要求，需要提供category :  "文章类型分类，如音乐，艺术，生活"，excerpt :  "摘要"，tags :["标签1","标签2"]，title :  "标题"，content :  "创建一个html页面，不准使用js，页面好看一点，可以引入图片，只支持a标签跳转，你这个帖子是镶嵌在一个帖子页面里的一个容器里的，用来展示这个帖子的内容的所以请编写时不要修改其他的会影响其他东西的程序，里面的内容可以自己发挥，想些什么都可以，这是一个公开的帖子系统，面向的是全世界"。就是这几个值就行。content示例： <div class='blog-post'><style>.blog-post {font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #667eea; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #f6f9ff 0%, #f0f4ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);}.code-block {background: #1a202c; color: #e2e8f0; padding: 1.5rem; border-radius: 8px; font-family: 'Fira Code', monospace; margin: 1.5rem 0; overflow-x: auto;}.tech-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tech-card {background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease; border-top: 4px solid #4299e1;}.tech-card:hover {transform: translateY(-5px);}.feature-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.feature-list li:before {content: '⚡'; position: absolute; left: 0; color: #4299e1;}.img-container {text-align: center; margin: 2rem 0;}.tech-img {max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);}</style><h1 class='post-title'>Next.js 15全栈开发指南：App Router、服务端组件与现代Web架构</h1><div class='img-container'><img src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop' alt='Next.js开发界面' class='tech-img' width='800' height='400'></div><p>随着Next.js 15的发布，React全栈开发进入了新的时代。本次更新不仅带来了<strong>性能的显著提升</strong>，更重要的是<strong>开发体验的革命性改进</strong>，特别是对App Router的全面优化和服务端组件的成熟应用。</p><section><h2 class='section-title'>🚀 App Router的深度优化</h2><div class='feature-box'><p><strong>并行路由与拦截路由</strong>让复杂布局的实现变得简单。现在你可以轻松创建模态对话框、条件性布局和动态路由结构：</p><div class='code-block'>// 并行路由配置示例<br>export default function Layout({<br>  children,<br>  modal,<br>  analytics<br>}: {<br>  children: React.ReactNode<br>  modal: React.ReactNode<br>  analytics: React.ReactNode<br>}) {<br>  return (<br>    &lt;&gt;<br>      {children}<br>      {modal}<br>      &lt;aside&gt;{analytics}&lt;/aside&gt;<br>    &lt;/&gt;<br>  )<br>}</div></div><ul class='feature-list'><li>改进的加载状态管理，支持骨架屏和渐进式渲染</li><li>增强的错误边界处理，提供更友好的错误恢复体验</li><li>智能缓存策略，减少不必要的重新渲染</li></ul></section><section><h2 class='section-title'>🔧 服务端组件最佳实践</h2><p>Next.js 15进一步强化了服务端组件的地位，让开发者能够更自然地编写<em>服务端优先</em>的应用：</p><div class='tech-grid'><div class='tech-card'><h3>数据获取优化</h3><p>支持流式传输和渐进式数据加载，显著减少首次内容绘制时间</p></div><div class='tech-card'><h3>SEO增强</h3><p>自动生成语义化HTML结构，改善搜索引擎可访问性</p></div><div class='tech-card'><h3>性能监控</h3><p>内置性能指标跟踪，提供详细的Core Web Vitals报告</p></div></div></section><section><h2 class='section-title'>🎯 开发工具升级</h2><p>全新的开发服务器<strong>Turbopack</strong>现在达到稳定状态，提供：</p><ul class='feature-list'><li>热更新速度提升至3倍以上</li><li>内存使用减少50%</li><li>TypeScript编译时间优化70%</li></ul><p>结合React 19的新特性，如<code>useOptimistic</code>和<code>useActionState</code>，开发体验得到全面提升。</p></section><p class='feature-box'><strong>迁移建议：</strong>现有项目建议逐步迁移到App Router，优先从静态页面开始。新项目直接采用Next.js 15的全栈架构，充分利用服务端组件的性能优势。</p><p>Next.js 15标志着全栈开发的成熟，通过<em>简化的API</em>、<em>优化的性能</em>和<em>增强的开发工具</em>，为构建现代Web应用提供了完整的解决方案。</p></div>不要照抄我这个示例的内容和模板，请你写的内容不要再涉及技术之类的，可以多谈谈生活！`;

    const response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'kimi',
        temperature: 1.0,
        max_tokens: 6000
      })
    });

    const data = await response.json();
    
    if (!response.ok || !data.data) {
      throw new Error('AI生成失败');
    }

    // 解析AI返回的JSON数据
    const aiResponse = data.data.message || data.data;
    
    // 移除可能的markdown代码块标记
    const cleanResponse = aiResponse.replace(/```json\n?|```/g, '').trim();
    
    try {
      const parsedData = JSON.parse(cleanResponse);
      return parsedData;
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      console.error('AI返回内容:', cleanResponse);
      throw new Error('AI返回的内容不是有效的JSON格式');
    }
  } catch (error) {
    console.error('生成博客内容失败:', error);
    // 如果AI生成失败，返回一个默认内容
    return generateDefaultContent(topic);
  }
}

// 生成默认内容（备用方案）
function generateDefaultContent(topic: any) {
  const keywordsText = topic.keywords.map((keyword: string) => `<li>${keyword}的应用与发展</li>`).join('\n');
  
  return `<h1>${topic.title}</h1>

<h2>引言</h2>

<p>在当今快速发展的技术时代，${topic.title}已经成为了一个热门话题。本文将深入探讨这一领域的最新发展和实际应用。</p>

<h2>主要内容</h2>

<ul>
${keywordsText}
</ul>

<h2>实际应用</h2>

<p>在实际应用中，${topic.title}展现出了巨大的潜力和价值。通过合理的实施和优化，可以显著提升系统的性能和用户体验。</p>

<h2>未来展望</h2>

<p>随着技术的不断进步，${topic.title}将会在更多领域发挥重要作用。我们需要持续关注相关技术的发展趋势，以便更好地应对未来的挑战和机遇。</p>

<h2>结论</h2>

<p>本文深入探讨了${topic.title}的核心概念和实际应用。希望通过这篇文章，读者能够对这一技术有更深入的理解，并在实际工作中加以应用。</p>

<hr>

<p><em>本文由 NewWebAI 自动生成，仅供参考学习使用。</em></p>`;
}

// 提取摘要
function extractExcerpt(content: string, maxLength: number = 200): string {
  const plainText = content.replace(/[#*`_~]/g, '').replace(/\n+/g, ' ').trim();
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
}

export async function POST(request: NextRequest) {
  try {
    // 获取请求体中的主题（可选）
    const { customTopic } = await request.json();
    
    // 使用自定义主题或随机主题
    const topic = customTopic || getRandomTopic();
    
    console.log(`开始生成博客`);
    
    // 生成博客内容
    const aiResponse = await generateBlogContent(topic);
    
    // 检查AI是否返回了预期的JSON格式
    if (typeof aiResponse === 'object' && aiResponse !== null) {
      // AI返回了JSON格式的数据，使用其中的字段
      const { title, content, category, excerpt, tags } = aiResponse;
      
      // 调用博客创建API
      const blogResponse = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category: category || '生活',
          excerpt: excerpt || extractExcerpt(content, 200),
          tags: tags || ['生活'],
          author: 'hzliflow-kimiai',
          readTime: '1 分钟阅读',
          status: '正常',
          published: true,
          keywords: tags || ['生活']
        }),
      });
      
      const blogData = await blogResponse.json();
      
      if (!blogResponse.ok || !blogData.success) {
        throw new Error(blogData.error || '博客创建失败');
      }
      
      console.log(`博客创建成功: ${title}`);
      
      return NextResponse.json({
        success: true,
        message: '博客生成成功',
        post: {
          id: blogData.postId || blogData.id,
          title: title,
          category: category || '生活',
          readTime: '1 分钟阅读',
          excerpt: excerpt ? excerpt.substring(0, 100) + '...' : extractExcerpt(content, 100)
        }
      });
    } else {
      // 如果AI没有返回JSON格式，使用默认方法
      const content = aiResponse;
      const excerpt = extractExcerpt(content);
      
      // 调用博客创建API
      const blogResponse = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: topic.title,
          content: content,
          category: topic.category,
          excerpt: excerpt,
          tags: topic.keywords,
          author: 'hzliflow-kimiai',
          readTime: '1 分钟阅读',
          status: '正常',
          published: true,
          keywords: topic.keywords
        }),
      });
      
      const blogData = await blogResponse.json();
      
      if (!blogResponse.ok || !blogData.success) {
        throw new Error(blogData.error || '博客创建失败');
      }
      
      console.log(`博客创建成功: ${topic.title}`);
      
      return NextResponse.json({
        success: true,
        message: '博客生成成功',
        post: {
          id: blogData.postId || blogData.id,
          title: topic.title,
          category: topic.category,
          readTime: '1 分钟阅读',
          excerpt: excerpt.substring(0, 100) + '...'
        }
      });
    }
    
  } catch (error: any) {
    console.error('自动生成博客失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || '生成博客失败',
        details: error.stack 
      },
      { status: 500 }
    );
  }
}

// GET方法：获取生成状态和历史
export async function GET(request: NextRequest) {
  try {
    // 查询最近生成的博客
    const recentPosts = await BlogQueries.getList(10, 0);
    
    return NextResponse.json({
      status: 'running',
      message: '自动博客生成服务正在运行',
      recentPosts: recentPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        category: post.category,
        readTime: post.readTime,
        generatedAt: post.createdAt,
        isAutoGenerated: post.author === 'AI小黄'
      })),
      totalGenerated: recentPosts.filter((p: any) => p.author === 'AI小黄').length,
      nextRun: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1小时后
    });
    
  } catch (error: any) {
    console.error('获取生成状态失败:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error.message || '获取状态失败' 
      },
      { status: 500 }
    );
  }
}