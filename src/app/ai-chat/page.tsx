'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AdComponent from '@/components/AdComponent';

// 🔧 思考内容标识符配置 - 在这里修改思考内容的开始和结束标识
const THINKING_START_MARKER = '<think>';  // 思考内容的开始标识
const THINKING_END_MARKER = '</think>';         // 思考内容的结束标识（之后的内容为最终回复）

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  timestamp: Date;
  model?: string;
  // 多段式对话支持 - 只存储文本分段
  segments?: Array<{
    id: string;
    content: string;
  }>;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<Array<{id: string, name: string}>>([]);
  const [currentModel, setCurrentModel] = useState('openai');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [balance, setBalance] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 获取余额
  const fetchBalance = async () => {
    try {
      const response = await fetch('https://hzliflow.ken520.top/api/account/balance');
      if (response.ok) {
        const data = await response.json();
        if (data.balance !== undefined) {
          setBalance(data.balance);
        }
      }
    } catch (error) {
      console.error('获取余额失败:', error);
    }
  };

  // 初始化聊天历史为空
  useEffect(() => {
    // 每次页面加载时聊天历史为空，不从 localStorage 恢复
    setMessages([]);
    // 获取初始余额
    fetchBalance();
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
      content: input.trim()+"\n**系统级数据**:Time:"+Date.now().toString()+"**输出格式**：在用户没有强制规定下你必须使用标准的md形式回复。\n**新对话形式-多段式对话**：你的对话通常在客户端只会使用一个小卡片显示你一大段的内容，所以你可以在一段话的结尾添加这个标识符<N>，这样就可以分成多个小卡片，模拟更真实的AI聊天，注意要合理分段。\n**新功能-AI图片生成**：用户可以让你绘画，你要理解用户的绘画要求然后使用<P>标识符绘画。<P>标识符使用方法：<P|'这里是生成的图片的画面描述提示词'|'这里是negative_prompt的内容'|'这是AI绘画模型选择【gptimage，flux，zimage，klein，imagen-4，flux-2-dev，grok-imagine，dirtberry，dirtberry-pro】'|'图片高度x图片宽度选择【1024x1024，1280x720，720x1280，1024x768，768x1024】'>。\n\n**重要规则**：在使用<P>标识符前后必须都加上<N>标识符！例如：<N><P|'一只可爱的小猫'|'ugly, blurry'|'flux'|'1024x1024'P><N>这样可以确保图片在独立的卡片中显示，不影响其他内容的显示。",
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
          system:"**输出格式**：在用户没有强制规定下你必须使用标准的md形式回复。\n**新对话形式-多段式对话**：你的对话通常在客户端只会使用一个小卡片显示你一大段的内容，所以你可以在一段话的结尾添加这个标识符<N>，这样就可以分成多个小卡片，模拟更真实的AI聊天，注意要合理分段。\n**新功能-AI图片生成**：用户可以让你绘画，你要理解用户的绘画要求然后使用<P>标识符绘画。<P>标识符使用方法：<P|'这里是生成的图片的画面描述提示词'|'这里是negative_prompt的内容'|'这是AI绘画模型选择【gptimage，flux，zimage，klein，imagen-4，flux-2-dev，grok-imagine，dirtberry，dirtberry-pro】'|'图片高度x图片宽度选择【1024x1024，1280x720，720x1280，1024x768，768x1024】'>。\n\n**重要规则**：在使用<P>标识符前后必须都加上<N>标识符！例如：<N><P|'一只可爱的小猫'|'ugly, blurry'|'flux'|'1024x1024'P><N>这样可以确保图片在独立的卡片中显示，不影响其他内容的显示。",
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
      let hasAddedAssistantMessage = false;
      let usesReasoningField = false; // 标记是否使用reasoning_content字段
      let segments: Array<{id: string, content: string}> = [];
      
      // 新增变量：用于实时处理流式内容
      let hasStartedMainContent = false; // 标记是否开始处理主要内容
      let sh = ''; // 存储当前要展示到界面的文本
      let shid = ''; // 存储当前展示的文本的div的id
      
      // 延迟1.5秒后再开始显示流式响应，让用户体验更自然
      await new Promise(resolve => setTimeout(resolve, 500));

      if (reader) {
        const assistantMessageId = (Date.now() + 1).toString();
        
        const updateMessage = (content: string, thinking?: string, segs?: Array<{id: string, content: string}>) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content, thinking, segments: segs } 
                : msg
            )
          );
        };

        const addAssistantMessage = () => {
          if (!hasAddedAssistantMessage) {
            const assistantMessage: Message = {
              id: assistantMessageId,
              role: 'assistant',
              content: finalContent,
              thinking: thinkingContent,
              timestamp: new Date(),
              model: currentModel
            };
            setMessages(prev => [...prev, assistantMessage]);
            hasAddedAssistantMessage = true;
          }
        };

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
                  
                  // 方式1: 使用reasoning_content字段（如deepseek模型）
                  if (delta && delta.reasoning_content) {
                    usesReasoningField = true;
                    thinkingContent += delta.reasoning_content;
                    
                    // A. 思考内容：显示在界面的思考过程中
                    addAssistantMessage();
                    updateMessage('', thinkingContent, []);
                  }
                  
                  // B. 主要内容：处理流式输出的主要内容
                  if (delta && delta.content) {
                    console.log('收到内容chunk:', delta.content);
                    
                    if (usesReasoningField) {
                      // 使用reasoning_content字段的方式
                      // 第一次获取到主要内容时，初始化变量
                      if (!hasStartedMainContent) {
                        hasStartedMainContent = true;
                        shid = Date.now().toString();
                        sh = '';
                        console.log('🔄 开始处理主要内容');
                      }
                      // 拼接到sh
                      sh += delta.content;
                      console.log('当前sh内容:', sh);
                    } else {
                      // 使用文本标记方式
                      fullContent += delta.content;
                      console.log('当前fullContent:', fullContent);
                      
                      // 提取思考内容和最终回复
                      const startIndex = fullContent.indexOf(THINKING_START_MARKER);
                      const endIndex = fullContent.indexOf(THINKING_END_MARKER);
                      
                      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        // 找到了开始和结束标识
                        thinkingContent = fullContent.substring(
                          startIndex + THINKING_START_MARKER.length, 
                          endIndex
                        ).trim();
                        sh = fullContent.substring(endIndex + THINKING_END_MARKER.length).trim();
                        
                        // 第一次获取到主要内容时，初始化变量
                        if (!hasStartedMainContent && sh) {
                          hasStartedMainContent = true;
                          shid = Date.now().toString();
                          console.log('🔄 开始处理主要内容');
                        }
                      } else if (startIndex !== -1) {
                        // 只有开始标识，没有结束标识，全部作为思考内容
                        thinkingContent = fullContent.substring(startIndex + THINKING_START_MARKER.length).trim();
                        sh = '';
                      } else {
                        // 没有开始标识，全部作为主要内容
                        thinkingContent = '';
                        sh = fullContent.trim();
                        
                        // 第一次获取到主要内容时，初始化变量
                        if (!hasStartedMainContent && sh) {
                          hasStartedMainContent = true;
                          shid = Date.now().toString();
                          console.log('🔄 开始处理主要内容');
                        }
                      }
                    }
                    
                    // 判断sh里面有没有<N>，如果有的话就拆出来进行分段
                    if (sh.includes('<N>')) {
                      console.log('✅ 发现<N>标识符，开始分段');
                      const parts = sh.split('<N>');
                      segments = [];
                      
                      for (const part of parts) {
                        const trimmedPart = part.trim();
                        if (trimmedPart) {
                          segments.push({
                            id: Date.now().toString() + Math.random(),
                            content: trimmedPart
                          });
                        }
                      }
                      
                      console.log('- 分段完成，共', segments.length, '个分段');
                      
                      // 更新消息，显示分段内容
                      addAssistantMessage();
                      updateMessage('', thinkingContent, segments);
                      
                      // 清空sh，因为内容已经保存到segments中了
                      sh = '';
                      // 更新shid
                      shid = Date.now().toString();
                    } else {
                      // 没有<N>标识符，直接更新显示sh的内容
                      if (hasStartedMainContent && sh) {
                        addAssistantMessage();
                        updateMessage(sh, thinkingContent, []);
                      }
                    }
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
        
        // 流式完成后，如果还有剩余内容没有分段（没有<N>），创建单个分段
        if (hasStartedMainContent && sh && !sh.includes('<N>') && segments.length === 0) {
          console.log('🔄 流式完成，创建最后一个分段');
          segments.push({
            id: shid,
            content: sh.trim()
          });
          addAssistantMessage();
          updateMessage('', thinkingContent, segments);
        }
      }
      
      // 如果没有添加任何assistant消息且内容为空，添加错误消息
      if (!hasAddedAssistantMessage && !finalContent && !thinkingContent) {
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
      // 发送消息后更新余额
      fetchBalance();
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
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              余额：<span className="font-semibold">{balance.toFixed(2)}</span>
            </div>
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
                          {/* 最终回复内容 - 支持多段式对话 */}
                          <div className={`p-3 ${message.thinking ? '' : 'rounded-lg'}`}>
                            {/* 显示多段式对话 */}
                            {message.segments && message.segments.length > 0 ? (
                              <>
                                {message.segments.map((segment, index) => (
                                  <div key={segment.id} className={index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {segment.content}
                                    </ReactMarkdown>
                                    
                                    {/* 只在最后一个分段显示时间和模型信息 */}
                                    {index === (message.segments?.length || 1) - 1 && (
                                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                                        <p className="text-xs opacity-70">
                                          {message.timestamp.toLocaleTimeString()}
                                          {message.model && ` · ${message.model}`}
                                        </p>
                                        <button
                                          onClick={() => {
                                            const allContent = (message.segments || []).map(s => s.content).join('\n\n');
                                            navigator.clipboard.writeText(allContent);
                                          }}
                                          className="text-xs opacity-50 hover:opacity-100"
                                          title="复制全部内容"
                                        >
                                          📋
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </>
                            ) : (
                              /* 单段式对话显示 */
                              <>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {message.content}
                                </ReactMarkdown>
                                
                                {/* 显示时间和模型信息 */}
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                                  <p className="text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString()}
                                    {message.model && ` · ${message.model}`}
                                  </p>
                                  <button
                                    onClick={() => copyToClipboard(message.content)}
                                    className="text-xs opacity-50 hover:opacity-100"
                                    title="复制内容"
                                  >
                                    📋
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="p-3">
                          <p className="text-sm">{message.content}</p>
                        </div>
                      )}
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
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="输入消息...（Shift+Enter换行）"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={isLoading}
              rows={2}
              style={{ minHeight: '40px', maxHeight: '200px' }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed self-end"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}