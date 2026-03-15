import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

// 如果没有提供MONGODB_URI，抛出错误或使用替代方案
if (!MONGODB_URI) {
  console.warn('警告: MONGODB_URI 环境变量未设置，某些功能可能无法正常工作');
}

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('数据库连接需要MONGODB_URI环境变量。请在.env.local文件中设置此变量。');
  }
  
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  
  const db = client.db('newwebai'); // 使用newwebai数据库
  cachedDb = db;
  
  // 确保集合存在并设置索引
  await setupCollections(db);
  
  return db;
}

async function setupCollections(db: Db) {
  // 为用户集合创建索引
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('users').createIndex({ createdAt: 1 });
  
  // 为博客文章集合创建索引
  await db.collection('blog_posts').createIndex({ createdAt: -1 });
  await db.collection('blog_posts').createIndex({ title: 'text', content: 'text' }); // 文本搜索索引
  
  // 为AI聊天记录集合创建索引
  await db.collection('chat_messages').createIndex({ userId: 1, createdAt: -1 });
  
  console.log('数据库集合和索引设置完成');
}