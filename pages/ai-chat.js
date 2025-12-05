// pages/ai-chat.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！我是NewWebAI智能助手，有什么我可以帮您的吗？', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 模拟AI响应
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: getAIResponse(inputText, selectedModel),
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: '抱歉，我在处理您的请求时遇到了问题。请稍后再试。',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const getAIResponse = (userMessage, model) => {
    const responses = {
      'gpt-4': {
        greeting: '您好！我是GPT-4模型，有什么我可以帮您的吗？',
        default: `我理解您想了解关于"${userMessage}"的信息。作为GPT-4模型，我可以为您提供详细的回答和分析。`,
        thanks: '不客气！如果您有其他问题，随时问我。',
        howareyou: '我很好，谢谢！您呢？我随时准备回答您的问题。'
      },
      'claude': {
        greeting: '您好！我是Claude模型，很高兴为您服务。请问您需要什么帮助？',
        default: `关于"${userMessage}"，我的分析如下：Claude模型注重提供有用、无害和诚实的回应。`,
        thanks: '感谢您的认可！如果您有更多问题，我很乐意继续帮助您。',
        howareyou: '我运行良好，随时准备协助您！您今天过得怎么样？'
      },
      'llama': {
        greeting: '您好！我是Llama 3模型，我能帮您解答各种问题。',
        default: `对于关于"${userMessage}"的问题，Llama 3模型可以提供基于知识的详细回答。`,
        thanks: '谢谢！如果您有其他问题，尽管问我。',
        howareyou: '我状态良好，准备为您服务！您有什么问题吗？'
      }
    };

    const currentModelResponses = responses[model];

    if (userMessage.toLowerCase().includes('你好') || userMessage.toLowerCase().includes('您好')) {
      return currentModelResponses.greeting;
    } else if (userMessage.toLowerCase().includes('谢谢') || userMessage.toLowerCase().includes('感谢')) {
      return currentModelResponses.thanks;
    } else if (userMessage.toLowerCase().includes('你好吗') || userMessage.toLowerCase().includes('怎么样')) {
      return currentModelResponses.howareyou;
    } else {
      return currentModelResponses.default;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: '对话已清空。您可以开始新的对话。', isUser: false }
    ]);
  };

  return (
    <div className="chat-container">
      <Head>
        <title>AI聊天助手 - NewWebAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card chat-container">
              <div className="chat-header d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0"><i className="fas fa-robot me-2"></i>AI 聊天助手</h5>
                  <small>由 NewWebAI 提供支持</small>
                </div>
                <div className="d-flex align-items-center">
                  <select 
                    className="form-select model-selector" 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="claude">Claude</option>
                    <option value="llama">Llama 3</option>
                  </select>
                  <button className="btn btn-light btn-sm ms-2" onClick={clearChat}>
                    <i className="fas fa-trash"></i> 清空
                  </button>
                </div>
              </div>
              <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', maxHeight: '60vh' }}>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                  >
                    {message.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="message ai-message">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input">
                <div className="d-flex">
                  <textarea 
                    className="form-control me-2" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="输入您的消息..." 
                    rows="1"
                    style={{ resize: 'none', minHeight: '40px', maxHeight: '100px' }}
                    disabled={isLoading}
                  />
                  <button 
                    className="btn btn-primary" 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                  >
                    <i className="fas fa-paper-plane me-1"></i> 发送
                  </button>
                </div>
                <div className="mt-2">
                  <small className="text-muted">提示：AI助手可以回答问题、创作文字、表达观点等。请确保您的提问符合使用条款。</small>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4>AI 功能特性</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-lightbulb fs-3"></i>
                      </div>
                      <h5 className="card-title">创意写作</h5>
                      <p className="card-text">帮助您创作文章、故事、诗歌等创意内容。</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-code fs-3"></i>
                      </div>
                      <h5 className="card-title">代码生成</h5>
                      <p className="card-text">协助编写代码、调试和优化程序。</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-chart-bar fs-3"></i>
                      </div>
                      <h5 className="card-title">数据分析</h5>
                      <p className="card-text">分析数据并提供洞察和建议。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #4361ee;
          --secondary-color: #3f37c9;
          --accent-color: #4cc9f0;
          --light-color: #f8f9fa;
          --dark-color: #212529;
          --success-color: #4ade80;
          --warning-color: #facc15;
          --danger-color: #f87171;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: var(--dark-color);
          overflow-x: hidden;
          background-color: #f8f9fa;
        }

        .chat-container {
          height: 80vh;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 15px 20px;
        }

        .message {
          margin-bottom: 15px;
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .user-message {
          background-color: var(--primary-color);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }

        .ai-message {
          background-color: white;
          color: #333;
          margin-right: auto;
          border-bottom-left-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .chat-input {
          padding: 15px;
          background-color: white;
          border-top: 1px solid #eee;
        }

        .chat-input .form-control {
          border-radius: 50px;
          padding: 12px 20px;
        }

        .chat-input .btn {
          border-radius: 50px;
          padding: 10px 25px;
        }

        .typing-indicator {
          display: inline-block;
          padding: 12px 16px;
          background-color: white;
          border-radius: 18px;
          color: #666;
          margin-right: auto;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .typing-indicator span {
          height: 8px;
          width: 8px;
          float: left;
          margin: 0 2px;
          background-color: #9E9EA1;
          display: block;
          border-radius: 50%;
          opacity: 0.4;
        }

        .typing-indicator span:nth-of-type(1) {
          animation: typing 1s infinite;
        }

        .typing-indicator span:nth-of-type(2) {
          animation: typing 1s infinite 0.2s;
        }

        .typing-indicator span:nth-of-type(3) {
          animation: typing 1s infinite 0.4s;
        }

        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .model-selector {
          margin-right: 10px;
          min-width: 120px;
        }
      `}</style>
    </div>
  );
}