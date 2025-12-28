'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaMicrophone, FaStop } from 'react-icons/fa';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 NewWebAI 智能助手，我可以回答关于网站功能、AI技术或产品的问题。请随时提问！',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // 滚动到最新消息
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 模拟AI响应
  const getAIResponse = async (userMessage: string) => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 根据用户输入生成响应
    let response = '';
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('你好')) {
      response = '你好！很高兴见到你。NewWebAI 是一个智能AI平台，我可以帮助你了解我们的产品和服务。';
    } else if (userMessage.toLowerCase().includes('产品') || userMessage.toLowerCase().includes('服务')) {
      response = '我们提供多种AI驱动的产品，包括：AI内容生成器、智能客服系统、数据分析平台和个性化推荐引擎。这些产品可以帮助您的业务实现智能化转型。';
    } else if (userMessage.toLowerCase().includes('技术') || userMessage.toLowerCase().includes('ai')) {
      response = 'NewWebAI 使用最新的AI技术，包括自然语言处理、机器学习和深度学习算法。我们的技术架构基于Next.js 14，支持SSR和SSG，确保最佳性能和用户体验。';
    } else if (userMessage.toLowerCase().includes('价格') || userMessage.toLowerCase().includes('定价')) {
      response = '我们提供多种定价方案：基础版¥99/月，专业版¥299/月，企业版定制报价。您可以访问我们的产品页面了解更多详情。';
    } else {
      const responses = [
        '这是一个很好的问题！NewWebAI 使用先进的AI技术来提供智能解决方案。',
        '根据您提到的内容，NewWebAI 的相关功能可以有效解决这类问题。',
        '我们的AI系统经过专门训练，可以处理您提到的这类任务。',
        '这与我们的核心产品之一有关。您可以查看我们的产品页面了解详细信息。',
        'NewWebAI 致力于通过AI技术为用户提供最佳体验。'
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    return response;
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 获取AI响应
      const aiResponse = await getAIResponse(inputValue);
      
      // 添加AI消息
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // 添加错误消息
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: '抱歉，我在处理您的请求时遇到了问题。请稍后重试。',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    // 这里将集成语音识别功能
    setIsListening(true);
    setInputValue('正在聆听...');
    
    // 模拟语音识别
    setTimeout(() => {
      setInputValue('你好，我想了解一下你们的AI产品');
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRobot className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-black hover:text-blue-600">首页</a>
            <a href="/blog" className="text-black hover:text-blue-600">博客</a>
            <a href="/store" className="text-black hover:text-blue-600">产品</a>
            <a href="/ai-tools" className="text-black font-medium">AI工具</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-4">AI 智能助手</h1>
          <p className="text-xl text-black">
            体验 NewWebAI 的智能对话功能，获取实时帮助和信息
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px]">
          {/* 聊天历史 */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-5 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-black rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 pt-1">
                          <FaRobot className="text-blue-500 text-lg" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium mb-1">
                          {message.role === 'user' ? '您' : 'NewWebAI 智能助手'}
                        </div>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="flex-shrink-0 pt-1">
                          <FaUser className="text-blue-200 text-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-5 bg-gray-100 text-black rounded-bl-none">
                    <div className="flex items-center space-x-3">
                      <FaRobot className="text-blue-500 text-lg" />
                      <div className="font-medium">NewWebAI 智能助手</div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的问题..."
                  className="w-full border border-gray-300 rounded-2xl py-4 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className={`absolute right-3 bottom-3 p-2 rounded-full ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  {isListening ? <FaStop /> : <FaMicrophone />}
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ''}
                className={`flex items-center justify-center w-14 h-14 rounded-full ${
                  isLoading || inputValue.trim() === ''
                    ? 'bg-gray-300 text-black'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition`}
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="mt-3 text-sm text-black text-center">
              NewWebAI 智能助手可以回答关于产品、技术和服务的问题
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">智能问答</h3>
            <p className="text-black">
              基于先进的AI模型，NewWebAI助手可以理解自然语言并提供准确的回答。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">实时交互</h3>
            <p className="text-black">
              通过实时对话，用户可以快速获取所需信息，提升用户体验。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">持续学习</h3>
            <p className="text-black">
              系统不断学习用户交互，提供更加个性化和精准的服务。
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">NewWebAI</h4>
              <p className="text-black">
                由小黄の数字宇宙工作室打造的智能AI平台，为您的业务提供智能化解决方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-white transition">AI博客</a></li>
                <li><a href="#" className="hover:text-white transition">智能电商</a></li>
                <li><a href="#" className="hover:text-white transition">数据分析</a></li>
                <li><a href="#" className="hover:text-white transition">API服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-black">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">团队</a></li>
                <li><a href="#" className="hover:text-white transition">新闻</a></li>
                <li><a href="#" className="hover:text-white transition">合作伙伴</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-black">
                <li>邮箱: contact@newwebai.com</li>
                <li>网址: https://hzliflow.ken520.top/</li>
                <li>公司: 小黄の数字宇宙工作室</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-12 pt-8 text-center text-black">
            <p>© 2025 小黄の数字宇宙工作室. 保留所有权利. NewWebAI 是我们的智能AI平台.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}