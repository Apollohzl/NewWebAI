'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LeanCloudUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatar?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: LeanCloudUser | null;
  token: string | null;
  sessionToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<LeanCloudUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  sessionToken: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LeanCloudUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化时从localStorage读取保存的认证信息
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedSessionToken = localStorage.getItem('sessionToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setSessionToken(savedSessionToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('解析用户信息失败:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        setSessionToken(data.sessionToken);
        // 保存到localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('sessionToken', data.sessionToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        console.error(data.error);
        return false;
      }
    } catch (error) {
      console.error('登录错误:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log('客户端开始注册请求:', { username, email });
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log('注册响应:', { status: response.status, data });

      if (response.ok) {
        // 注册成功，但需要邮箱验证，不自动登录
        return true;
      } else {
        console.error('注册失败:', data.error);
        return false;
      }
    } catch (error) {
      console.error('注册请求错误:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSessionToken(null);
    // 清除localStorage中的认证信息
    localStorage.removeItem('token');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
  };

  // 更新用户信息的函数
  const updateUser = (updatedUser: Partial<LeanCloudUser>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        sessionToken,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);