import { NextRequest, NextResponse } from 'next/server';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_SERVER_URL = process.env.LEANCLOUD_SERVER_URL;

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    console.log('Delete Blog - Blog ID:', id);

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

    console.log('Delete Blog - Request URL:', url);
    console.log('Delete Blog - Using Master Key');

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    console.log('Delete Blog - Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Delete Blog - Error Response:', errorData);
      
      // 如果是ACL错误，尝试先清除ACL再删除
      if (errorData.error && errorData.error.includes('ACL')) {
        console.log('尝试清除ACL后删除...');
        
        // 先更新ACL为允许所有用户写入
        const updateUrl = `${LEANCLOUD_SERVER_URL}/1.1/classes/BlogPosts/${id}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'X-LC-Id': LEANCLOUD_APP_ID!,
            'X-LC-Key': `${LEANCLOUD_APP_KEY},master`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ACL: {
              '*': {
                read: true,
                write: true
              }
            }
          }),
        });

        if (updateResponse.ok) {
          console.log('ACL更新成功，重新尝试删除...');
          // 再次尝试删除
          const deleteResponse = await fetch(url, {
            method: 'DELETE',
            headers,
          });

          if (deleteResponse.ok) {
            return NextResponse.json({ success: true });
          }
        }
      }
      
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