import { NextRequest, NextResponse } from 'next/server';
import { leancloudRequest } from '@/lib/leancloud';

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
    const prompt = `请以专业技术博客的风格，写一篇关于"${topic.title}"的文章。

要求：
1. 文章长度：800-1200字
2. 包含引言、正文、结论
3. 语言：中文
4. 风格：使用HTML格式，包含h1/h2/h3标题、p段落、ul/ol列表、strong/em强调等
5. 关键词：${topic.keywords.join('、')}
6. 分类：${topic.category}

请确保内容专业、实用、有价值，避免空洞的描述。
请直接返回HTML代码，不要使用代码块包装。`;

    // 使用GET方法调用AI聊天API
    const response = await fetch(`/api/ai-chat?message=${encodeURIComponent(prompt)}&model=openai`, {
      method: 'GET',
    });

    const data = await response.json();
    
    if (!response.ok || !data.content) {
      throw new Error('AI生成失败');
    }

    return data.content;
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
    
    console.log(`开始生成博客: ${topic.title}`);
    
    // 生成博客内容
    const content = await generateBlogContent(topic);
    const excerpt = extractExcerpt(content);
    
    // 计算阅读时间（按每分钟500字计算）
    const readTime = Math.ceil(content.length / 500);
    
    // 创建博客文章数据
    const blogPost = {
      title: topic.title,
      content: content,
      excerpt: excerpt,
      category: topic.category,
      tags: topic.keywords,
      author: 'AI小黄',
      status: '正常',
      published: true,
      readTime: `${readTime} 分钟阅读`,
      keywords: topic.keywords,
      createdAt: { "__type": "Date", "iso": new Date().toISOString() },
      updatedAt: { "__type": "Date", "iso": new Date().toISOString() },
      generatedAt: { "__type": "Date", "iso": new Date().toISOString() }
    };

    // 保存到LeanCloud
    const response = await leancloudRequest('/classes/BlogPosts', {
      method: 'POST',
      body: JSON.stringify(blogPost),
    });
    
    console.log(`博客创建成功: ${topic.title}`);
    
    return NextResponse.json({
      success: true,
      message: '博客生成成功',
      post: {
        id: response.objectId,
        title: topic.title,
        category: topic.category,
        readTime: blogPost.readTime,
        excerpt: excerpt.substring(0, 100) + '...'
      }
    });
    
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
    const response = await leancloudRequest('/classes/BlogPosts?order=-createdAt&limit=10');
    
    const recentPosts = response.results || [];
    
    return NextResponse.json({
      status: 'running',
      message: '自动博客生成服务正在运行',
      recentPosts: recentPosts.map((post: any) => ({
        id: post.objectId,
        title: post.title,
        category: post.category,
        readTime: post.readTime,
        generatedAt: post.generatedAt || post.createdAt,
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