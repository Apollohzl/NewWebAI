'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AdComponent from '@/components/AdComponent';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  timestamp: Date;
  model?: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<Array<{id: string, name: string}>>([]);
  const [currentModel, setCurrentModel] = useState('openai');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 初始化聊天历史为空
  useEffect(() => {
    // 每次页面加载时聊天历史为空，不从 localStorage 恢复
    setMessages([]);
  }, []);

  // 加载模型列表
  useEffect(() => {
    fetch('/api/ai/models')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setModels(data.data);
          if (data.data.length > 0 && !currentModel) {
            setCurrentModel(data.data[0].id);
          }
        }
      })
      .catch(error => console.error('Failed to load models:', error));
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      model: currentModel
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          model: currentModel,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let thinkingContent = '';
      let finalContent = '';
      
      // 创建一个空的assistant消息
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        thinking: '',
        timestamp: new Date(),
        model: currentModel
      };
      
      const messagesWithAssistant = [...newMessages, assistantMessage];
      setMessages(messagesWithAssistant);

      if (reader) {
        const updateMessage = (content: string, thinking?: string) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content, thinking } 
                : msg
            )
          );
        };

        // 延迟1.5秒后再开始显示流式响应，让用户体验更自然
        await new Promise(resolve => setTimeout(resolve, 1500));

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const dataStr = trimmedLine.slice(6);
              
              // 跳过空数据
              if (!dataStr || dataStr === '[DONE]') continue;
              
              try {
                const data = JSON.parse(dataStr);
                
                // 检查choices数组并提取内容
                if (data.choices && data.choices.length > 0) {
                  const delta = data.choices[0].delta;
                  if (delta && delta.content) {
                    fullContent += delta.content;
                    
                    // 检查是否有分隔线
                    if (fullContent.includes('---')) {
                      // 分隔思考和最终内容
                      const parts = fullContent.split('---');
                      if (parts.length >= 2) {
                        thinkingContent = parts[0].trim();
                        finalContent = parts.slice(1).join('---').trim();
                      }
                    } else {
                      // 还没有分隔线，全部作为思考内容显示
                      thinkingContent = fullContent;
                      finalContent = '';
                    }
                    
                    updateMessage(finalContent, thinkingContent);
                  }
                  
                  // 检查是否完成
                  if (data.choices[0].finish_reason) {
                    break;
                  }
                }
              } catch (e) {
                console.error('解析流式数据失败:', e);
              }
            }
          }
        }
      }
      
      // 如果内容为空，添加错误消息
      if (!finalContent) {
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: '抱歉，我无法回答这个问题。',
          timestamp: new Date(),
          model: currentModel
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `错误：${error.message}`,
        timestamp: new Date(),
        model: currentModel
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  // 复制消息内容到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // 可以添加一个提示，表示复制成功
        console.log('内容已复制到剪贴板');
      },
      (err) => {
        console.error('复制失败: ', err);
      }
    );
  };

  // 切换模型
  const handleModelChange = (model: string) => {
    setCurrentModel(model);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 返回首页
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="NewWebAI" className="h-6 w-6" />
              <h1 className="text-xl font-semibold text-black">AI 对话</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={currentModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* 自定义广告位 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <AdComponent />
      </div>

      {/* 消息列表容器 */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8 flex-1 flex items-center justify-center">
              <div>
                <p className="text-lg">开始新的对话</p>
                <p className="text-sm mt-2">当前模型：{currentModel}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
              <div className="space-y-4 pb-24">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg relative ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <>
                          {/* 思考内容板块 */}
                          {message.thinking && (
                            <div className="bg-gray-100 border-b border-gray-200 p-3 rounded-t-lg">
                              <div className="text-xs text-gray-500 mb-2 font-semibold">🤔 思考过程</div>
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]} 
                                components={{
                                  p: ({node, ...props}) => <p className="text-sm text-gray-700 mb-2" {...props} />,
                                  li: ({node, ...props}) => <li className="mb-1 text-sm text-gray-700" {...props} />,
                                  code: ({node, ...props}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs" {...props} />,
                                }}
                              >
                                {message.thinking}
                              </ReactMarkdown>
                            </div>
                          )}
                          {/* 最终回复内容 */}
                          <div className={`p-3 ${message.thinking ? '' : 'rounded-lg'}`}>
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]} 
                              components={{
                                p: ({node, ...props}) => <p className="text-sm mb-2" {...props} />,
                                h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-base font-bold mb-2" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                code: ({node, ...props}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs" {...props} />,
                                pre: ({node, ...props}) => <pre className="bg-gray-200 p-2 rounded mt-1 mb-2 overflow-x-auto" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-gray-400 pl-2 text-gray-600 italic" {...props} />,
                                table: ({node, ...props}) => <table className="min-w-full border-collapse" {...props} />,
                                th: ({node, ...props}) => <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-bold" {...props} />,
                                td: ({node, ...props}) => <td className="border border-gray-300 px-2 py-1" {...props} />,
                                a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                em: ({node, ...props}) => <em className="italic" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        </>
                      ) : (
                        <div className="p-3">
                          <p className="text-sm">{message.content}</p>
                        </div>
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                        {message.model && ` · ${message.model}`}
                      </p>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="absolute bottom-1 right-1 text-xs opacity-50 hover:opacity-100"
                        title="复制内容"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-black p-3 rounded-lg">
                      <p className="text-sm">AI正在思考...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 - 固定在底部 */}
      <div className="bg-white border-t border-gray-200 p-4 fixed bottom-0 left-0 right-0 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-2 mb-2">
            <div className="flex-1">
              <label className="text-xs text-gray-600">创造性 (0-2):</label>
              <input
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600">最大长度:</label>
              <input
                type="number"
                min="100"
                max="4000"
                step="100"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="输入消息..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}