import fs from 'fs';
import path from 'path';
import { User } from '@/types';

// 数据存储路径
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 初始化用户文件
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// 读取用户数据
export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取用户数据失败:', error);
    return [];
  }
}

// 保存用户数据
export function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('保存用户数据失败:', error);
  }
}

// 查找用户
export function findUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
}

// 查找用户
export function findUserById(id: string): User | null {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
}

// 添加用户
export function addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// 更新用户
export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return null;
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveUsers(users);
  return users[userIndex];
}

// 删除用户
export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  saveUsers(filteredUsers);
  return true;
}