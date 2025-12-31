import AV from 'leancloud-storage';

// 初始化LeanCloud
const initLeanCloud = () => {
  const appId = process.env.LEANCLOUD_APP_ID;
  const appKey = process.env.LEANCLOUD_APP_KEY;
  const serverURL = process.env.LEANCLOUD_SERVER_URL;

  if (!appId || !appKey || !serverURL) {
    throw new Error('LeanCloud配置缺失，请检查环境变量');
  }

  AV.init({
    appId,
    appKey,
    serverURL,
  });
};

// 导出AV实例和初始化函数
export { AV, initLeanCloud };

// 用户相关的LeanCloud操作
export class LeanCloudUser {
  // 注册用户
  static async register(username: string, email: string, password: string) {
    const user = new AV.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    
    try {
      const registeredUser = await user.signUp();
      return registeredUser;
    } catch (error: any) {
      throw new Error(error.message || '注册失败');
    }
  }

  // 用户登录
  static async login(username: string, password: string) {
    try {
      const user = await AV.User.logIn(username, password);
      return user;
    } catch (error: any) {
      throw new Error(error.message || '登录失败');
    }
  }

  // 获取当前用户
  static getCurrentUser() {
    return AV.User.current();
  }

  // 用户登出
  static logout() {
    AV.User.logOut();
  }

  // 通过邮箱查找用户
  static async findUserByEmail(email: string) {
    const query = new AV.Query('_User');
    query.equalTo('email', email);
    
    try {
      const users = await query.find();
      return users.length > 0 ? users[0] : null;
    } catch (error: any) {
      throw new Error(error.message || '查找用户失败');
    }
  }
}