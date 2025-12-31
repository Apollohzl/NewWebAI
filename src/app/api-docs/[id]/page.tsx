'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ApiParamTable from '@/components/api/ApiParamTable';
import { ApiCodeExamples } from '@/components/api/ApiCodeExamples';

// 定义API参数类型
interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

// 定义API方法数据类型
interface ApiMethodData {
  params: ApiParam[];
  response: any;
}

// 定义API数据类型
interface ApiInfo {
  id: string;
  name: string;
  description: string;
  status: string;
  visits: string;
  icon: string;
  tags: string[];
  category: string;
  requestUrl: string;
  methods: string[];
}

interface ApiResponse {
  apis: ApiInfo[];
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
}

const ApiDetailPage = () => {
  const params = useParams();
  const apiId = params?.id as string;
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [currentApi, setCurrentApi] = useState<ApiInfo | null>(null);
  const [apiParams, setApiParams] = useState<any>(null);
  const [availableModels, setAvailableModels] = useState<Array<{id: string, name: string}>>([]);
  const [availableImageModels, setAvailableImageModels] = useState<Array<{id: string, name: string, description: string}>>([]);
  const [activeTab, setActiveTab] = useState('doc');
  const [activeMethod, setActiveMethod] = useState('GET');
  const [testParams, setTestParams] = useState<Record<string, string>>({});
  const [testResponse, setTestResponse] = useState<any>(null);

  useEffect(() => {
    // 加载API数据
    fetch('/api/config/apis')
      .then(response => response.json())
      .then(data => {
        setApiData(data);
        const api = data.apis.find((a: ApiInfo) => a.id === apiId);
        if (api) {
          setCurrentApi(api);
          if (api.methods.length > 0) {
            setActiveMethod(api.methods[0]);
          }
        }
      })
      .catch(error => console.error('Error loading API data:', error));
  }, [apiId]);

  useEffect(() => {
    // 加载API参数
    if (apiId) {
      fetch(`/api/config/params?api=${apiId}`)
        .then(response => response.json())
        .then(data => {
          setApiParams(data);
          // 初始化测试参数的默认值
          const defaultParams: Record<string, string> = {};
          if (data.params) {
            data.params.forEach((param: any) => {
              if (param.example) {
                defaultParams[param.name] = param.example;
              }
            });
          }
          setTestParams(defaultParams);
        })
        .catch(error => console.error('Error loading API params:', error));
    }
  }, [apiId]);

  // 加载AI模型列表（仅对AI对话API）
  useEffect(() => {
    if (apiId === 'ai-chat') {
      fetch('/api/ai/models')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.data) {
            setAvailableModels(data.data);
          }
        })
        .catch(error => console.error('Error loading AI models:', error));
    }
  }, [apiId]);

  // 加载AI图像模型列表（仅对AI图像API）
  useEffect(() => {
    if (apiId === 'ai-image') {
      fetch('/api/ai/image-models')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.data) {
            setAvailableImageModels(data.data);
          }
        })
        .catch(error => console.error('Error loading AI image models:', error));
    }
  }, [apiId]);

  const getStatusColor = (status: string) => {
    return status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleTestApi = async () => {
    if (!currentApi) return;
    
    try {
      // 使用相对路径而不是绝对URL
      let url = `/api/${currentApi.id}`;
      let response;

      if (activeMethod === 'GET' || activeMethod === 'DELETE') {
        // GET和DELETE请求使用查询参数
        let params = new URLSearchParams(testParams).toString();
        if (params) {
          url += '?' + params;
        }
        response = await fetch(url, {
          method: activeMethod,
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } else {
        // POST、PUT、PATCH请求使用请求体
        response = await fetch(url, {
          method: activeMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testParams)
        });
      }
      
      // 检查响应是否为JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { 
            error: 'Invalid JSON response',
            response: text.substring(0, 500) + (text.length > 500 ? '...' : '')
          };
        }
      }
      
      setTestResponse(data);
    } catch (error: any) {
      setTestResponse({ error: error.message });
    }
  };

  const handleParamChange = (paramName: string, value: string) => {
    setTestParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  if (!currentApi) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页眉 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="NewWebAI" className="h-6 w-6" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black hover:text-blue-600">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600">AI工具</Link>
            <Link href="/api-docs" className="text-blue-600 font-medium">API</Link>
            <Link href="/about" className="text-black hover:text-blue-600">关于</Link>
          </div>
        </div>
      </nav>

      {/* 横幅区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/api-docs" className="text-white opacity-75 hover:opacity-100 mr-2">
              ← 返回API列表
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-4xl mr-4">{currentApi.icon}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentApi.name}</h1>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentApi.status)}`}>
                  {currentApi.status}
                </span>
                <div className="flex items-center text-white opacity-75">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  积累调用：{currentApi.visits}
                </div>
              </div>
            </div>
          </div>
          <p className="text-white opacity-90 mt-4 max-w-3xl">
            {currentApi.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {currentApi.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-black rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md">
          {/* 标签页导航 */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('doc')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'doc'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                接口文档
              </button>
              <button
                onClick={() => setActiveTab('error')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'error'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                状态码参照
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                代码示例
              </button>
            </div>
          </div>

          {/* 标签页内容 */}
          <div className="p-6">
            {activeTab === 'doc' && (
              <div>
                {/* 接口基本信息 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">接口信息</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">接口地址：</span>
                        <code className="ml-2 text-blue-600">{currentApi.requestUrl}</code>
                      </div>
                      <div>
                        <span className="font-medium">请求方式：</span>
                        <span className="ml-2">{currentApi.methods.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium">返回格式：</span>
                        <span className="ml-2">Json</span>
                      </div>
                      <div>
                        <span className="font-medium">接口状态：</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(currentApi.status)}`}>
                          {currentApi.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 请求方法选择 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">请求方法</h3>
                  <div className="flex space-x-2">
                    {currentApi.methods.map(method => (
                      <button
                        key={method}
                        onClick={() => setActiveMethod(method)}
                        className={`px-4 py-2 rounded-lg ${
                          activeMethod === method
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 请求参数 */}
                <ApiParamTable 
                  params={apiParams?.params || []}
                  title="请求参数"
                />

                {/* 返回参数 */}
                <ApiParamTable 
                  params={[
                    {
                      name: 'code',
                      type: 'number',
                      required: false,
                      description: '状态码'
                    },
                    {
                      name: 'message',
                      type: 'string',
                      required: false,
                      description: '返回消息'
                    },
                    {
                      name: 'data',
                      type: 'object',
                      required: false,
                      description: '返回数据'
                    }
                  ]}
                  title="返回参数"
                />

                {/* 在线测试 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">在线测试</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {apiParams?.params?.map((param: any, index: number) => (
                        <div key={index}>
                          <label className="block text-sm font-medium mb-1">
                            {param.name} 
                            {param.required && <span className="text-red-600"> *</span>}
                          </label>
                          {(param.name === 'model' && apiId === 'ai-chat' && availableModels.length > 0) ? (
                            <select
                              value={testParams[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">请选择模型</option>
                              {availableModels.map((model: any) => (
                                <option key={model.id} value={model.id}>
                                  {model.name}
                                </option>
                              ))}
                            </select>
                          ) : (param.name === 'model' && apiId === 'ai-image' && availableImageModels.length > 0) ? (
                            <select
                              value={testParams[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">请选择模型</option>
                              {availableImageModels.map((model: any) => (
                                <option key={model.id} value={model.id}>
                                  {model.name} - {model.description}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={param.type === 'number' ? 'number' : 'text'}
                              value={testParams[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              placeholder={param.example || `请输入${param.name}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                          <p className="text-xs text-gray-500 mt-1">{param.description}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleTestApi}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      测试API
                    </button>
                    {testResponse && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold mb-2">响应结果:</h4>
                        {apiId === 'ai-image' && testResponse.data?.imageData ? (
                          <div className="space-y-4">
                            <div className="flex justify-center">
                              <img 
                                src={testResponse.data.imageData} 
                                alt="生成的图像" 
                                className="max-w-full h-auto rounded-lg shadow-lg"
                                style={{ maxHeight: '500px' }}
                              />
                            </div>
                            {testResponse.data.translatedPrompt && testResponse.data.translatedPrompt !== testResponse.data.prompt && (
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">原始提示词：</span>{testResponse.data.prompt}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                  <span className="font-medium">翻译后提示词：</span>{testResponse.data.translatedPrompt}
                                </p>
                              </div>
                            )}
                            <details className="bg-gray-100 p-4 rounded-lg">
                              <summary className="cursor-pointer font-medium">查看详细响应</summary>
                              <pre className="mt-2 bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                {JSON.stringify(testResponse, null, 2)}
                              </pre>
                            </details>
                          </div>
                        ) : (
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                            {JSON.stringify(testResponse, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'error' && (
              <div>
                <h3 className="text-lg font-semibold mb-3">状态码参照</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left">状态码</th>
                        <th className="py-2 px-4 text-left">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 font-mono text-sm">200</td>
                        <td className="py-2 px-4">请求成功</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 font-mono text-sm">400</td>
                        <td className="py-2 px-4">请求参数错误</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-mono text-sm">401</td>
                        <td className="py-2 px-4">未授权访问</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 font-mono text-sm">404</td>
                        <td className="py-2 px-4">接口不存在</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-mono text-sm">500</td>
                        <td className="py-2 px-4">服务器内部错误</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <ApiCodeExamples apiUrl={currentApi.requestUrl} method={activeMethod} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDetailPage;