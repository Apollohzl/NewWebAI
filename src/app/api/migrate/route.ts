import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getBlogPosts as getBlogPostsFromDB, createBlogPost } from '@/lib/blogDatabase';
import { getUsers, addUser } from '@/lib/userDatabase';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const step = searchParams.get('step') || 'check';

    if (step === 'check') {
      // 检查当前数据库状态
      const db = await connectToDatabase();
      
      // 检查用户数量
      const userCount = await db.collection('users').countDocuments();
      // 检查博客文章数量
      const blogCount = await db.collection('blog_posts').countDocuments();
      
      return NextResponse.json({
        message: '数据库检查完成',
        stats: {
          users: userCount,
          blogPosts: blogCount
        }
      });
    } else if (step === 'migrate') {
      // 这里可以实现从旧数据源迁移的逻辑
      // 由于我们没有实际的旧数据源，这里提供迁移框架
      
      // 示例：将本地数据迁移到MongoDB
      // 1. 从现有文件系统或旧数据库读取数据
      // 2. 转换数据格式
      // 3. 存储到MongoDB
      
      return NextResponse.json({
        message: '迁移开始，具体实现根据您的旧数据源而定'
      });
    } else {
      return NextResponse.json(
        { error: '无效的步骤参数' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('迁移过程出错:', error);
    return NextResponse.json(
      { error: error.message || '迁移过程出错' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    if (type === 'users') {
      // 迁移用户数据
      const db = await connectToDatabase();
      
      // 清空现有用户数据（仅在首次迁移时使用）
      // await db.collection('users').deleteMany({});
      
      for (const userData of data) {
        // 检查用户是否已存在
        const existingUser = await db.collection('users').findOne({ email: userData.email });
        if (!existingUser) {
          // 如果不存在，则添加
          await db.collection('users').insertOne({
            ...userData,
            _id: new ObjectId(), // 生成新的ObjectId
            createdAt: userData.createdAt || new Date().toISOString(),
            updatedAt: userData.updatedAt || new Date().toISOString()
          });
        }
      }
      
      return NextResponse.json({
        message: `成功迁移 ${data.length} 个用户`
      });
    } else if (type === 'blog_posts') {
      // 迁移博客文章数据
      const db = await connectToDatabase();
      
      // 清空现有博客数据（仅在首次迁移时使用）
      // await db.collection('blog_posts').deleteMany({});
      
      for (const postData of data) {
        // 检查文章是否已存在
        const existingPost = await db.collection('blog_posts').findOne({ title: postData.title });
        if (!existingPost) {
          // 如果不存在，则添加
          await db.collection('blog_posts').insertOne({
            ...postData,
            _id: new ObjectId(), // 生成新的ObjectId
            createdAt: postData.createdAt || new Date().toISOString(),
            updatedAt: postData.updatedAt || new Date().toISOString()
          });
        }
      }
      
      return NextResponse.json({
        message: `成功迁移 ${data.length} 篇博客文章`
      });
    } else {
      return NextResponse.json(
        { error: '无效的数据类型' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('迁移数据时出错:', error);
    return NextResponse.json(
      { error: error.message || '迁移数据时出错' },
      { status: 500 }
    );
  }
}