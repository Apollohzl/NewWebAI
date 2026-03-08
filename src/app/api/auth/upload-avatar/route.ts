import { NextRequest, NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/userDatabase';
import jwt from 'jsonwebtoken';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const formData = await request.formData();
    const avatar = formData.get('avatar') as File;

    if (!avatar) {
      return NextResponse.json({ error: '请选择头像文件' }, { status: 400 });
    }

    // 验证文件类型和大小
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(avatar.type)) {
      return NextResponse.json({ error: '只支持 JPG、PNG、GIF、WebP 格式的图片' }, { status: 400 });
    }

    if (avatar.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '头像文件大小不能超过10MB' }, { status: 400 });
    }

    // 验证JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
    }

    // 根据token中的用户ID查找用户
    const user = await findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 将文件内容转换为Buffer
    const fileBuffer = await avatar.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // 创建uploads目录（如果不存在）
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'avatars');
    await mkdir(uploadsDir, { recursive: true });

    // 生成唯一文件名
    const fileExtension = avatar.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `avatar_${user.id}_${Date.now()}_${randomBytes(4).toString('hex')}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);

    // 保存文件到public/uploads/avatars目录
    await writeFile(filePath, buffer);

    // 生成头像URL（相对于public目录）
    const avatarUrl = `/uploads/avatars/${fileName}`;

    // 更新用户头像字段
    const updatedUser = await updateUser(user.id, { avatar: avatarUrl });
    if (!updatedUser) {
      // 如果更新失败，删除刚保存的文件
      try {
        await import('fs').then(fs => fs.unlinkSync(filePath));
      } catch (e) {
        console.error('删除失败的头像文件时出错:', e);
      }
      return NextResponse.json({ error: '更新用户信息失败' }, { status: 500 });
    }

    return NextResponse.json({
      message: '头像上传成功',
      avatarUrl: avatarUrl,
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: avatarUrl,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error: any) {
    console.error('头像上传失败:', error);
    return NextResponse.json(
      { error: error.message || '头像上传失败' },
      { status: 500 }
    );
  }
}