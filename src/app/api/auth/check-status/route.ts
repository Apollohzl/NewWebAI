import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/lib/userDatabase';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // 从请求头获取token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    // 根据token中的用户ID查找用户
    const user = await findUserById(decoded.userId);
    
    if (!user) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    // 返回用户信息（移除密码）
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      authenticated: true
    });
  } catch (error: any) {
    console.error('检查用户状态失败:', error);
    return NextResponse.json({ 
      user: null, 
      authenticated: false,
      error: error.message 
    });
  }
}