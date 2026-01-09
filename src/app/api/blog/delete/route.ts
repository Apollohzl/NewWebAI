import { NextRequest, NextResponse } from 'next/server';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_SERVER_URL = process.env.LEANCLOUD_SERVER_URL;

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const sessionToken = request.headers.get('Authorization')?.replace('Bearer ', '');

    console.log('Delete Blog - Session Token:', sessionToken ? sessionToken.substring(0, 20) + '...' : '不存在');
    console.log('Delete Blog - Blog ID:', id);

    if (!id) {
      return NextResponse.json(
        { error: '缺少博客ID' },
        { status: 400 }
      );
    }

    if (!sessionToken) {
      return NextResponse.json(
        { error: '未登录，请先登录' },
        { status: 401 }
      );
    }

    // 使用用户session token删除博客文章
    const url = `${LEANCLOUD_SERVER_URL}/1.1/classes/BlogPosts/${id}`;
    const headers = {
      'X-LC-Id': LEANCLOUD_APP_ID!,
      'X-LC-Session': sessionToken,
      'Content-Type': 'application/json',
    };

    console.log('Delete Blog - Request URL:', url);
    console.log('Delete Blog - Request Headers:', headers);

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    console.log('Delete Blog - Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Delete Blog - Error Response:', errorData);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '删除失败' },
      { status: 500 }
    );
  }
}