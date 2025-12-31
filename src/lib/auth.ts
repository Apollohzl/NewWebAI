import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/types';
import { addUser, findUserByEmail, findUserById } from './database';

// JWT密钥（实际项目中应该放在环境变量中）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 密码加密
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// 验证密码
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// 生成JWT Token
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// 验证JWT Token
export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

// 用户注册
export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
}): Promise<{ user: User; token: string } | null> {
  // 检查邮箱是否已存在
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    return null;
  }

  // 加密密码
  const hashedPassword = await hashPassword(userData.password);

  // 创建用户
  const user = addUser({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    role: 'user',
    isActive: true,
  });

  // 生成Token
  const token = generateToken(user.id);

  return { user, token };
}

// 用户登录
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  // 查找用户
  const user = findUserByEmail(email);
  if (!user || !user.isActive) {
    return null;
  }

  // 验证密码
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return null;
  }

  // 生成Token
  const token = generateToken(user.id);

  return { user, token };
}

// 获取用户信息
export function getUserById(id: string): User | null {
  return findUserById(id);
}