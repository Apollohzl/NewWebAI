import { User } from '@/types';
import { connectToDatabase } from '@/lib/mongodb';

// 查找用户
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });
    return user as User | null;
  } catch (error) {
    console.error('查找用户失败:', error);
    return null;
  }
}

// 查找用户
export async function findUserById(id: string): Promise<User | null> {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ id });
    return user as User | null;
  } catch (error) {
    console.error('查找用户失败:', error);
    return null;
  }
}

// 添加用户
export async function addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    const db = await connectToDatabase();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(), // 在实际应用中，可以使用MongoDB的ObjectId
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await db.collection('users').insertOne(newUser);
    return newUser;
  } catch (error) {
    console.error('添加用户失败:', error);
    throw error;
  }
}

// 更新用户
export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('users').findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    );
    
    return result as User | null;
  } catch (error) {
    console.error('更新用户失败:', error);
    return null;
  }
}

// 删除用户
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('users').deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('删除用户失败:', error);
    return false;
  }
}

// 获取所有用户
export async function getUsers(): Promise<User[]> {
  try {
    const db = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();
    return users as User[];
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return [];
  }
}