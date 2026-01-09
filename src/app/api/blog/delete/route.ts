import { NextRequest, NextResponse } from 'next/server';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_SERVER_URL = process.env.LEANCLOUD_SERVER_URL;

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '缺少博客ID' },
        { status: 400 }
      );
    }

    // 使用Master Key删除博客文章
    const url = `${LEANCLOUD_SERVER_URL}/1.1/classes/BlogPosts/${id}`;
    const headers = {
      'X-LC-Id': LEANCLOUD_APP_ID!,
      'X-LC-Key': `${LEANCLOUD_APP_KEY},master`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
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