// =====================================================
// SQLPub 数据库操作
// 此文件保持向后兼容性，将请求转发到 SQL 数据库
// =====================================================

import { User } from '@/types';
import { UserQueries } from './sqlDatabase';

// 确保数据目录存在
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 兼容旧版本的用户文件操作
export function getUsers(): User[] {
  console.warn('⚠️  getUsers() 正在使用 JSON 文件，建议使用 UserQueries.getAll()');
  // 这里不再使用 JSON 文件，直接返回空数组或从数据库读取
  return [];
}

export function saveUsers(users: User[]): void {
  console.warn('⚠️  saveUsers() 不再需要，数据直接保存到 SQL 数据库');
}

// 查找用户 - 转发到 SQL 数据库
export function findUserByEmail(email: string): Promise<User | null> {
  return UserQueries.findByEmail(email);
}

// 查找用户 - 转发到 SQL 数据库
export function findUserById(id: string): Promise<User | null> {
  return UserQueries.findById(id);
}

// 添加用户 - 转发到 SQL 数据库
export async function addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  return await UserQueries.create(user);
}

// 更新用户 - 转发到 SQL 数据库
export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  return await UserQueries.update(id, updates);
}

// 删除用户 - 转发到 SQL 数据库
export async function deleteUser(id: string): Promise<boolean> {
  return await UserQueries.delete(id);
}