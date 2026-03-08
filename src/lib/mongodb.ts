import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI!);
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