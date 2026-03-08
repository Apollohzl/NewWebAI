import { connectToDatabase } from '@/lib/mongodb';

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
    const db = await connectToDatabase();
    const posts = await db.collection('blog_posts').find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // 为保持兼容性，添加objectId字段
    return posts.map(post => ({
      ...post,
      id: post._id.toString(),
      objectId: post._id.toString()
    })) as BlogPost[];
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return [];
  }
}

// 根据ID获取单个博客文章
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const db = await connectToDatabase();
    // 尝试作为ObjectId查找，也尝试作为字符串查找
    let post = await db.collection('blog_posts').findOne({ _id: new (await import('mongodb')).ObjectId(id) });
    
    if (!post) {
      post = await db.collection('blog_posts').findOne({ _id: id });
    }
    
    if (!post) {
      return null;
    }
    
    return {
      ...post,
      id: post._id.toString(),
      objectId: post._id.toString()
    } as BlogPost;
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return null;
  }
}

// 创建博客文章
export async function createBlogPost(postData: Omit<BlogPost, 'id' | 'objectId' | 'createdAt' | 'updatedAt'>): Promise<BlogPost | null> {
  try {
    const db = await connectToDatabase();
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(), // 在实际实现中，将使用MongoDB的ObjectId
      objectId: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const result = await db.collection('blog_posts').insertOne({
      ...newPost,
      _id: new (await import('mongodb')).ObjectId()
    });
    
    return {
      ...newPost,
      id: result.insertedId.toString(),
      objectId: result.insertedId.toString()
    };
  } catch (error) {
    console.error('创建博客文章失败:', error);
    return null;
  }
}

// 更新博客文章
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('blog_posts').findOneAndUpdate(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return null;
    }
    
    return {
      ...result,
      id: result._id.toString(),
      objectId: result._id.toString()
    } as BlogPost;
  } catch (error) {
    console.error('更新博客文章失败:', error);
    return null;
  }
}

// 删除博客文章
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('blog_posts').deleteOne({ 
      $or: [
        { _id: new (await import('mongodb')).ObjectId(id) },
        { _id: id }
      ]
    });
    
    return result.deletedCount > 0;
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return false;
  }
}

// 根据作者获取博客文章
export async function getBlogPostsByAuthor(author: string, limit: number = 10): Promise<BlogPost[]> {
  try {
    const db = await connectToDatabase();
    const posts = await db.collection('blog_posts').find({ author })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return posts.map(post => ({
      ...post,
      id: post._id.toString(),
      objectId: post._id.toString()
    })) as BlogPost[];
  } catch (error) {
    console.error('获取作者博客文章失败:', error);
    return [];
  }
}