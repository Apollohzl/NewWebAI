'use client';

import { useState } from 'react';

interface VerificationCodeInputProps {
  email: string;
  onVerified: (verified: boolean) => void;
  onCodeChange: (code: string) => void;
}

export default function VerificationCodeInput({ email, onVerified, onCodeChange }: VerificationCodeInputProps) {
  const [code, setCode] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  const sendVerificationCode = async () => {
    if (!email) {
      setError('请先输入邮箱地址');
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setCountdown(60);
        
        // 开发环境显示验证码
        if (process.env.NODE_ENV === 'development' && data.verificationCode) {
          setError(`开发环境验证码: ${data.verificationCode}`);
        }

        // 开始倒计时
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.error || '发送失败');
      }
    } catch (error) {
      setError('发送验证码失败，请稍后重试');
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async () => {
    if (code.length !== 6) {
      setError('请输入6位验证码');
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        onVerified(true);
        setError('');
      } else {
        setError(data.error || '验证码无效');
        onVerified(false);
      }
    } catch (error) {
      setError('验证失败，请稍后重试');
      onVerified(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // 只允许数字
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
    onCodeChange(numericValue);
  };

  const handleVerifyCode = () => {
    if (code.length !== 6) {
      setError('请输入6位验证码');
      return;
    }
    verifyCode();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="verificationCode" className="block text-sm font-medium text-black mb-2">
          邮箱验证码
        </label>
        <div className="flex space-x-3">
          <input
            type="text"
            id="verificationCode"
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入6位验证码"
            maxLength={6}
          />
          <button
            type="button"
            onClick={sendVerificationCode}
            disabled={sending || countdown > 0 || !email}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {sending ? '发送中...' : countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
          </button>
        </div>
      </div>

      {code.length > 0 && (
        <button
          type="button"
          onClick={handleVerifyCode}
          disabled={code.length !== 6}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          验证
        </button>
      )}

      {error && (
        <div className={`text-sm ${error.includes('开发环境验证码') ? 'text-blue-600' : 'text-red-600'}`}>
          {error}
        </div>
      )}
    </div>
  );
}