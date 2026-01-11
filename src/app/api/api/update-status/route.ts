import { NextRequest, NextResponse } from 'next/server';

// LeanCloud配置
const LEANCLOUD_APP_ID = process.env.LEANCLOUD_APP_ID;
const LEANCLOUD_APP_KEY = process.env.LEANCLOUD_APP_KEY;
const LEANCLOUD_SERVER_URL = process.env.LEANCLOUD_SERVER_URL;

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    console.log('Update API Status - API ID:', id);
    console.log('Update API Status - New Status:', status);

    if (!id || !status) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 使用Master Key更新API状态
    const url = `${LEANCLOUD_SERVER_URL}/1.1/classes/APIs/${id}`;
    const headers = {
      'X-LC-Id': LEANCLOUD_APP_ID!,
      'X-LC-Key': `${LEANCLOUD_APP_KEY},master`,
      'Content-Type': 'application/json',
    };

    console.log('Update API Status - Request URL:', url);
    console.log('Update API Status - Using Master Key');

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status }),
    });

    console.log('Update API Status - Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Update API Status - Error Response:', errorData);
      
      // 如果是ACL错误，尝试先清除ACL再更新
      if (errorData.error && errorData.error.includes('ACL')) {
        console.log('尝试清除ACL后更新...');
        
        // 先更新ACL为允许所有用户写入
        const aclUpdateResponse = await fetch(url, {
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

        if (aclUpdateResponse.ok) {
          console.log('ACL更新成功，重新尝试更新状态...');
          // 再次尝试更新状态
          const statusUpdateResponse = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ status }),
          });

          if (statusUpdateResponse.ok) {
            return NextResponse.json({ success: true });
          }
        }
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新API状态失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '更新失败' },
      { status: 500 }
    );
  }
}