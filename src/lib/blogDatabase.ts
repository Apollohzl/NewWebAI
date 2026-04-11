import { BlogQueries } from './sqlDatabase';

export interface BlogPost {
  id?: string;
  objectId?: string; // 保持与现有代码的兼容性
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
}

// 获取博客文章列表
export async function getBlogPosts(limit: number = 10, skip: number = 0): Promise<BlogPost[]> {
  try {
    return await BlogQueries.getList(limit, skip);
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return [];
  }
}

// 根据ID获取单个博客文章
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const post = await BlogQueries.findById(id);
    if (!post) return null;
    
    return {
      id: post.id.toString(),
      objectId: post.id.toString(),
      title: post.title || '',
      content: post.content || '',
      category: post.category || '',
      author: post.author || '',
      readTime: post.readTime || '',
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
      tags: [],
      published: post.published !== undefined ? post.published : true,
      excerpt: post.excerpt
    } as BlogPost;
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return null;
  }
}

// 创建博客文章
export async function createBlogPost(postData: Omit<BlogPost, 'id' | 'objectId' | 'createdAt' | 'updatedAt'>): Promise<BlogPost | null> {
  try {
    const newPost = await BlogQueries.create(postData);
    if (!newPost) return null;
    
    return {
      ...newPost,
      id: newPost.id.toString(),
      objectId: newPost.id.toString()
    };
  } catch (error) {
    console.error('创建博客文章失败:', error);
    return null;
  }
}

// 更新博客文章
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const post = await BlogQueries.update(id, updates);
    if (!post) return null;
    
    return {
      id: post.id.toString(),
      objectId: post.id.toString(),
      title: post.title || '',
      content: post.content || '',
      category: post.category || '',
      author: post.author || '',
      readTime: post.readTime || '',
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
      tags: [],
      published: post.published !== undefined ? post.published : true,
      excerpt: post.excerpt
    } as BlogPost;
  } catch (error) {
    console.error('更新博客文章失败:', error);
    return null;
  }
}

// 删除博客文章
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    return await BlogQueries.delete(id);
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return false;
  }
}

// 根据作者获取博客文章
export async function getBlogPostsByAuthor(author: string, limit: number = 10): Promise<BlogPost[]> {
  try {
    const posts = await BlogQueries.getByAuthor(author, limit);
    return posts.map(post => ({
      id: post.id.toString(),
      objectId: post.id.toString(),
      title: post.title || '',
      content: post.content || '',
      category: post.category || '',
      author: post.author || '',
      readTime: post.readTime || '',
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
      tags: [],
      published: post.published !== undefined ? post.published : true,
      excerpt: post.excerpt
    })) as BlogPost[];
  } catch (error) {
    console.error('获取作者博客文章失败:', error);
    return [];
  }
}