// 初始化LeanCloud配置
function getLeanCloudConfig() {
  const appId = process.env.LEANCLOUD_APP_ID;
  const appKey = process.env.LEANCLOUD_APP_KEY;
  const serverURL = process.env.LEANCLOUD_SERVER_URL;

  console.log('环境变量检查:', {
    LEANCLOUD_APP_ID: appId ? '已设置' : '未设置',
    LEANCLOUD_APP_KEY: appKey ? '已设置' : '未设置',
    LEANCLOUD_SERVER_URL: serverURL ? '已设置' : '未设置',
  });

  if (!appId || !appKey || !serverURL) {
    throw new Error(`LeanCloud配置缺失。请检查环境变量：
    - LEANCLOUD_APP_ID: ${appId ? '已设置' : '未设置'}
    - LEANCLOUD_APP_KEY: ${appKey ? '已设置' : '未设置'}  
    - LEANCLOUD_SERVER_URL: ${serverURL ? '已设置' : '未设置'}`);
  }

  return { appId, appKey, serverURL };
}

// LeanCloud API 基础请求函数
export async function leancloudRequest(endpoint: string, options: RequestInit = {}) {
  const config = getLeanCloudConfig();
  const url = `${config.serverURL}/1.1${endpoint}`;
  
  console.log('LeanCloud API请求:', { url, endpoint });
  
  const headers = {
    'X-LC-Id': config.appId,
    'X-LC-Key': config.appKey,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('LeanCloud API响应状态:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('LeanCloud API错误响应:', errorData);
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('LeanCloud API成功响应:', data);
    return data;
  } catch (error) {
    console.error('LeanCloud API请求失败:', error);
    throw error;
  }
}

// 用户相关的LeanCloud操作
export class LeanCloudUser {
  // 注册用户
  static async register(username: string, email: string, password: string) {
    try {
      const userData = {
        username,
        email,
        password,
      };

      const response = await leancloudRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error: any) {
      throw new Error(error.message || '注册失败');
    }
  }

  // 用户登录
  static async login(email: string, password: string) {
    try {
      const loginData = {
        email, // LeanCloud支持邮箱登录
        password,
      };

      const response = await leancloudRequest('/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });

      return response;
    } catch (error: any) {
      throw new Error(error.message || '登录失败');
    }
  }

  // 通过邮箱查找用户
  static async findUserByEmail(email: string) {
    try {
      const where = {
        email,
      };

      const response = await leancloudRequest(`/users?where=${encodeURIComponent(JSON.stringify(where))}`);
      
      return response.results && response.results.length > 0 ? response.results[0] : null;
    } catch (error: any) {
      throw new Error(error.message || '查找用户失败');
    }
  }
}

// 初始化函数（保持兼容性）
export function initLeanCloud() {
  try {
    const config = getLeanCloudConfig();
    console.log('LeanCloud REST API 初始化完成:', {
      appId: config.appId,
      serverURL: config.serverURL,
    });
  } catch (error) {
    console.error('LeanCloud初始化失败:', error);
    throw error;
  }
}