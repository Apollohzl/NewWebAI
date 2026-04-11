import { User } from '@/types';
import { UserQueries } from './sqlDatabase';

// 查找用户
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    return await UserQueries.findByEmail(email);
  } catch (error) {
    console.error('查找用户失败:', error);
    return null;
  }
}

// 查找用户
export async function findUserById(id: string): Promise<User | null> {
  try {
    return await UserQueries.findById(id);
  } catch (error) {
    console.error('查找用户失败:', error);
    return null;
  }
}

// 添加用户
export async function addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    return await UserQueries.create(userData);
  } catch (error) {
    console.error('添加用户失败:', error);
    throw error;
  }
}

// 更新用户
export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    return await UserQueries.update(id, updates);
  } catch (error) {
    console.error('更新用户失败:', error);
    return null;
  }
}

// 删除用户
export async function deleteUser(id: string): Promise<boolean> {
  try {
    return await UserQueries.delete(id);
  } catch (error) {
    console.error('删除用户失败:', error);
    return false;
  }
}

// 获取所有用户
export async function getUsers(): Promise<User[]> {
  try {
    const results = await UserQueries.getAll();
    return results.map(user => ({
      id: user.id.toString(),
      username: user.username || '',
      email: user.email || '',
      password: user.password || '',
      avatar: user.avatar,
      role: user.role || 'user',
      isActive: user.isActive !== undefined ? user.isActive : true,
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: user.updatedAt || new Date().toISOString(),
    })) as User[];
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return [];
  }
}