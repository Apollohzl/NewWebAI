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
  // 多段式对话支持
  subMessages?: Array<{
    id: string;
    content: string;
    type: 'text' | 'image';
    imageData?: string;
    imageError?: string;
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
      content: input.trim()+"\n**系统级数据**:Time:"+Date.now().toString()+"**输出格式**：在用户没有强制规定下你必须使用标准的md形式回复。\n**新对话形式-多段式对话**：你的对话通常在客户端只会使用一个小卡片显示你一大段的内容，所以你可以在一段话的结尾添加这个标识符<N>，这样就可以分成多个小卡片，模拟更真实的AI聊天，注意要合理分段。\n**新功能-AI图片生成**：用户可以让你绘画，你要理解用户的绘画要求然后使用<P>标识符绘画。<P>标识符使用方法：<P|'这里是生成的图片的画面描述提示词'|'这里是negative_prompt的内容'|'这是AI绘画模型选择【gptimage，flux，zimage，klein，imagen-4，flux-2-dev，grok-imagine，dirtberry，dirtberry-pro】'|'图片高度x图片宽度选择【1024x1024，1280x720，720x1280，1024x768，768x1024】'>。\n\n**重要规则**：在使用<P>标识符前后必须都加上<N>标识符！例如：<N><P|'一只可爱的小猫'|'ugly, blurry'|'flux'|'1024x1024'><N>这样可以确保图片在独立的卡片中显示，不影响其他内容的显示。",
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
          system:"**输出格式**：在用户没有强制规定下你必须使用标准的md形式回复。\n**新对话形式-多段式对话**：你的对话通常在客户端只会使用一个小卡片显示你一大段的内容，所以你可以在一段话的结尾添加这个标识符<N>，这样就可以分成多个小卡片，模拟更真实的AI聊天，注意要合理分段。\n**新功能-AI图片生成**：用户可以让你绘画，你要理解用户的绘画要求然后使用<P>标识符绘画。<P>标识符使用方法：<P|'这里是生成的图片的画面描述提示词'|'这里是negative_prompt的内容'|'这是AI绘画模型选择【gptimage，flux，zimage，klein，imagen-4，flux-2-dev，grok-imagine，dirtberry，dirtberry-pro】'|'图片高度x图片宽度选择【1024x1024，1280x720，720x1280，1024x768，768x1024】'>。\n\n**重要规则**：在使用<P>标识符前后必须都加上<N>标识符！例如：<N><P|'一只可爱的小猫'|'ugly, blurry'|'flux'|'1024x1024'><N>这样可以确保图片在独立的卡片中显示，不影响其他内容的显示。",
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
      let subMessages: Array<{id: string, content: string, type: 'text' | 'image', imageData?: string, imageError?: string}> = [];
      let currentSubContent = '';
      let lastProcessedLength = 0; // 记录上次处理的长度，确保不重复处理
      
      // 延迟1.5秒后再开始显示流式响应，让用户体验更自然
      await new Promise(resolve => setTimeout(resolve, 500));

      if (reader) {
        const assistantMessageId = (Date.now() + 1).toString();
        
        const updateMessage = (content: string, thinking?: string, subs?: Array<{id: string, content: string, type: 'text' | 'image', imageData?: string, imageError?: string}>) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content, thinking, subMessages: subs } 
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
                    
                    // 有思考内容就添加assistant消息
                    addAssistantMessage();
                    updateMessage(finalContent, thinkingContent);
                  }
                  
                  // 处理回答内容
                  if (delta && delta.content) {
                    console.log('收到内容chunk:', delta.content);
                    if (usesReasoningField) {
                      // 如果使用reasoning_content字段，content就是最终回复
                      currentSubContent += delta.content;
                      console.log('当前累积内容:', currentSubContent);
                    } else {
                      // 方式2: 使用文本标记方式
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
                        currentSubContent = fullContent.substring(endIndex + THINKING_END_MARKER.length).trim();
                      } else if (startIndex !== -1) {
                        // 只有开始标识，没有结束标识，全部作为思考内容
                        thinkingContent = fullContent.substring(startIndex + THINKING_START_MARKER.length).trim();
                        currentSubContent = '';
                      } else {
                        // 没有开始标识，全部作为最终内容
                        thinkingContent = '';
                        currentSubContent = fullContent.trim();
                        console.log('提取最终内容后 currentSubContent 长度:', currentSubContent.length);
                      }
                    }
                    
                    // 🔧 重要：先处理<P>标识符，再处理<N>标识符
                    // 这样可以确保<P>标签不会被<N>处理破坏
                    
                    // 处理<P>标识符（AI图片生成）
                    console.log('🔍 检查<P>标识符前完整状态:');
                    console.log('- currentSubContent 长度:', currentSubContent.length);
                    console.log('- currentSubContent 前100字符:', currentSubContent.substring(0, 1000));
                    console.log('- currentSubContent 后100字符:', currentSubContent.substring(Math.max(0, currentSubContent.length - 1000)));
                    console.log('- 是否包含<P|>:', currentSubContent.includes('<P|>'));
                    
                    // 尝试多种格式匹配
                    let pTagMatch = null;
                    
                    // 标准格式：<P|'prompt''negative''model''size'>
                    pTagMatch = currentSubContent.match(/<P\|'([^']*)'([^']*)'([^']*)'([^']*)'>/);
                    if (pTagMatch) console.log('匹配到标准格式');
                    
                    // 宽松格式1：<P|'prompt'negative''model''size'>
                    if (!pTagMatch) {
                      pTagMatch = currentSubContent.match(/<P\|'([^']*)'([^']+)'([^']+)'([^']+)'>/);
                      if (pTagMatch) console.log('匹配到宽松格式1');
                    }
                    
                    // 宽松格式2：使用[\s\S]匹配任意字符包括换行符
                    if (!pTagMatch) {
                      pTagMatch = currentSubContent.match(/<P\|'([^']*)'([^']*)'([^']*)'([^']*)'>/);
                      if (pTagMatch) console.log('匹配到宽松格式2');
                    }
                    
                    console.log('最终匹配结果:', pTagMatch);
                    
                    // 如果没有匹配到但包含<P|>，输出调试信息
                    if (!pTagMatch && currentSubContent.includes('<P|')) {
                      console.log('⚠️ 包含<P|>但正则匹配失败！');
                      const pIndex = currentSubContent.indexOf('<P|');
                      console.log('<P|>起始位置:', pIndex);
                      console.log('附近内容:', currentSubContent.substring(Math.max(0, pIndex - 20), Math.min(currentSubContent.length, pIndex + 100)));
                    }
                    
                    if (pTagMatch) {
                      console.log("✅ 找到<P>标识符:", pTagMatch);
                      const [, prompt, negativePrompt, model, size] = pTagMatch;
                      const [width, height] = size.split('x').map(Number);
                      
                      // 移除<P>标识符
                      currentSubContent = currentSubContent.replace(pTagMatch[0], '');
                      
                      // 创建图片子消息
                      const imageSubMessage = {
                        id: Date.now().toString() + Math.random(),
                        content: '',
                        type: 'image' as const,
                        imageData: undefined as string | undefined,
                        imageError: undefined as string | undefined
                      };
                      subMessages.push(imageSubMessage);
                      
                      // 异步请求AI图片生成
                      fetch('https://hzliflow.ken520.top/api/ai-image', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          prompt: prompt,
                          model: model,
                          width: width,
                          height: height,
                          negative_prompt: negativePrompt,
                          enhance: false,
                          safe: false,
                          quality: 'hd',
                          transparent: false,
                          seed: -1
                        })
                      })
                      .then(res => res.json())
                      .then(data => {
                        if (data.data && data.data.imageData) {
                          // 更新图片数据
                          setMessages(prev => 
                            prev.map(msg => 
                              msg.id === assistantMessageId 
                                ? { 
                                    ...msg, 
                                    subMessages: msg.subMessages?.map(sub => 
                                      sub.id === imageSubMessage.id 
                                        ? { ...sub, imageData: data.data.imageData } 
                                        : sub
                                    )
                                  } 
                                : msg
                            )
                          );
                        } else {
                          // 图片请求失败
                          setMessages(prev => 
                            prev.map(msg => 
                              msg.id === assistantMessageId 
                                ? { 
                                    ...msg, 
                                    subMessages: msg.subMessages?.map(sub => 
                                      sub.id === imageSubMessage.id 
                                        ? { ...sub, imageError: '图片请求失败：未知错误' } 
                                        : sub
                                    )
                                  } 
                                : msg
                            )
                          );
                        }
                      })
                      .catch(error => {
                        console.error('AI图片生成失败:', error);
                        // 图片请求失败
                        setMessages(prev => 
                          prev.map(msg => 
                            msg.id === assistantMessageId 
                              ? { 
                                  ...msg, 
                                  subMessages: msg.subMessages?.map(sub => 
                                    sub.id === imageSubMessage.id 
                                      ? { ...sub, imageError: `图片请求失败：${error.message}` } 
                                      : sub
                                  )
                                } 
                              : msg
                          )
                        );
                      });
                    }
                    
                    // 处理<N>标识符（多段式对话）
                    console.log('🔄 处理<N>标识符');
                    console.log('- 处理前 currentSubContent 长度:', currentSubContent.length);
                    while (currentSubContent.includes('<N>')) {
                      const [before, after] = currentSubContent.split('<N>', 2);
                      console.log('- 找到<N>，before长度:', before?.length, 'after长度:', after?.length);
                      if (before) {
                        subMessages.push({
                          id: Date.now().toString() + Math.random(),
                          content: before,
                          type: 'text'
                        });
                      }
                      currentSubContent = after || '';
                      console.log('- 处理后 currentSubContent 长度:', currentSubContent.length);
                    }
                    
                    finalContent = currentSubContent;
                    
                    // 只有在有内容时才添加assistant消息
                    if (finalContent || thinkingContent || subMessages.length > 0) {
                      addAssistantMessage();
                      updateMessage(finalContent, thinkingContent, subMessages);
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
                          {/* 最终回复内容 */}
                          <div className={`p-3 ${message.thinking ? '' : 'rounded-lg'}`}>
                            {/* 显示主要内容 */}
                            {message.content && (
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
                            )}
                            
                            {/* 显示子消息（多段式对话和图片） */}
                            {message.subMessages && message.subMessages.length > 0 && (
                              <div className="mt-3 space-y-3">
                                {message.subMessages.map((sub) => (
                                  <div key={sub.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    {sub.type === 'text' ? (
                                      <div className="p-3">
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
                                          {sub.content}
                                        </ReactMarkdown>
                                      </div>
                                    ) : sub.type === 'image' ? (
                                      <div className="p-3 bg-gray-50">
                                        {sub.imageData ? (
                                          <img 
                                            src={sub.imageData} 
                                            alt="AI生成的图片" 
                                            className="max-w-full h-auto cursor-pointer rounded hover:opacity-90 transition-opacity"
                                            onClick={() => {
                                              // 图片点击放大功能
                                              if (sub.imageData) {
                                                const win = window.open('');
                                                if (win) {
                                                  win.document.write(`
                                                    <html>
                                                      <head><title>图片预览</title></head>
                                                      <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f0f0f0;">
                                                        <img src="${sub.imageData}" style="max-width:100%;max-height:100vh;cursor:pointer;" onclick="window.close()">
                                                      </body>
                                                    </html>
                                                  `);
                                                }
                                              }
                                            }}
                                          />
                                        ) : sub.imageError ? (
                                          <div className="text-red-600 text-sm">
                                            {sub.imageError}
                                          </div>
                                        ) : (
                                          <div className="text-gray-500 text-sm">
                                            正在生成图片...
                                          </div>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            )}
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