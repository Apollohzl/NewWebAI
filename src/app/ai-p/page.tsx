'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ImageModel {
  id: string;
  name: string;
  description: string;
}

export default function AIDrawPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [models, setModels] = useState<ImageModel[]>([]);
  const [selectedModel, setSelectedModel] = useState('zimage');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState('worst quality, blurry');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [translatedPrompt, setTranslatedPrompt] = useState('');
  const [enhance, setEnhance] = useState(false);
  const [safe, setSafe] = useState(false);
  const [quality, setQuality] = useState('medium');
  const [transparent, setTransparent] = useState(false);
  const [seed, setSeed] = useState(0);
  const [firstFrameImage, setFirstFrameImage] = useState('');
  const [lastFrameImage, setLastFrameImage] = useState('');

  // 预定义的分辨率选项
  const ratios = [
    { label: '1:1 (1024x1024)', value: '1:1', width: 1024, height: 1024 },
    { label: '16:9 (1280x720)', value: '16:9', width: 1280, height: 720 },
    { label: '9:16 (720x1280)', value: '9:16', width: 720, height: 1280 },
    { label: '4:3 (1024x768)', value: '4:3', width: 1024, height: 768 },
    { label: '3:4 (768x1024)', value: '3:4', width: 768, height: 1024 }
  ];

  // 加载模型列表
  useEffect(() => {
    fetch('/api/ai/image-models')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setModels(data.data);
          if (data.data.length > 0) {
            setSelectedModel(data.data[0].id);
          }
        }
      })
      .catch(error => console.error('Failed to load models:', error));
  }, []);

  // 生成图像
  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setTranslatedPrompt('');

    try {
      const ratio = ratios.find(r => r.value === selectedRatio)!;
      
      const requestBody = {
        prompt: prompt.trim(),
        model: selectedModel,
        width: ratio.width,
        height: ratio.height,
        negative_prompt: negativePrompt.trim() || 'worst quality, blurry',
        enhance: enhance,
        safe: safe,
        quality: quality,
        transparent: transparent,
        seed: seed
      };

      // 如果是视频模型，添加相应参数
      if (['veo', 'seedance', 'seedance-pro'].includes(selectedModel)) {
        (requestBody as any).duration = 4; // 默认4秒
        // 视频模型只支持16:9或9:16比例
        if (selectedRatio === '16:9' || selectedRatio === '9:16') {
          (requestBody as any).aspectRatio = selectedRatio;
        } else {
          // 如果不是支持的比例，默认使用16:9
          (requestBody as any).aspectRatio = '16:9';
        }
        
        // 对于seedance模型，支持参考图像
        if (selectedModel.startsWith('seedance')) {
          if (firstFrameImage) {
            (requestBody as any)['image[0]'] = firstFrameImage; // 第一帧
          }
          if (lastFrameImage) {
            (requestBody as any)['image[1]'] = lastFrameImage; // 最后一帧
          }
        }
        
        if (selectedModel === 'veo') {
          (requestBody as any).audio = false; // 默认无音频
        }
      }

      const response = await fetch('/api/ai-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success && data.data) {
        setGeneratedImage(data.data.imageData);
        setIsVideo(data.data.isVideo || false);
        setTranslatedPrompt(data.data.translatedPrompt || '');
      } else {
        throw new Error(data.error?.message || '生成失败');
      }
    } catch (error: any) {
      console.error('Generate error:', error);
      alert(`生成失败：${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 下载媒体文件
  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    
    // 根据内容类型设置正确的扩展名
    if (isVideo) {
      link.download = `ai-generated-${Date.now()}.mp4`;
    } else {
      link.download = `ai-generated-${Date.now()}.png`;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← 返回首页
          </button>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="NewWebAI" className="h-7 w-7" />
            <h1 className="text-2xl font-bold text-black">AI 绘画</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入和控制 */}
          <div className="space-y-6">
            {/* 提示词输入 */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-black mb-2">
                图像描述 <span className="text-red-600">*</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述你想要生成的图像（支持中文）..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                支持中文输入，将自动翻译成英文
              </p>
            </div>

            {/* 模型选择 */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-black mb-2">
                AI 模型
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 比例选择 */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-black mb-2">
                图像比例
              </label>
              <select
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ratios.map(ratio => (
                  <option key={ratio.value} value={ratio.value}>
                    {ratio.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 高级设置 */}
            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-sm font-medium text-black mb-4"
              >
                高级设置
                <span className="text-gray-400">
                  {showAdvanced ? '收起 ▲' : '展开 ▼'}
                </span>
              </button>
              
              {showAdvanced && (
                <div className="space-y-4">
                  {/* 增强选项 */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={enhance}
                        onChange={(e) => setEnhance(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-black">AI增强提示词</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">让AI改进您的提示词以获得更好的结果</p>
                  </div>

                  {/* 安全过滤 */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={safe}
                        onChange={(e) => setSafe(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-black">启用安全内容过滤</span>
                    </label>
                  </div>

                  {/* 透明背景 */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={transparent}
                        onChange={(e) => setTransparent(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-black">透明背景</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">（仅适用于gptimage模型）</p>
                  </div>

                  {/* 随机种子 */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      随机种子
                    </label>
                    <input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                      min="-1"
                      max="2147483647"
                      placeholder="输入-1表示随机"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">使用相同的种子获得可重现的结果</p>
                  </div>

                  {/* 图像质量 */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      图像质量
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">低质量</option>
                      <option value="medium">中等质量</option>
                      <option value="high">高质量</option>
                      <option value="hd">高清</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">（仅适用于gptimage模型）</p>
                  </div>

                  {/* 对于seedance模型的参考图像 */}
                  {selectedModel.startsWith('seedance') && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">
                          第一帧参考图像 (可选)
                        </label>
                        <input
                          type="text"
                          value={firstFrameImage}
                          onChange={(e) => setFirstFrameImage(e.target.value)}
                          placeholder="输入图像URL作为第一帧参考..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">用于seedance模型的第一帧</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">
                          最后一帧参考图像 (可选)
                        </label>
                        <input
                          type="text"
                          value={lastFrameImage}
                          onChange={(e) => setLastFrameImage(e.target.value)}
                          placeholder="输入图像URL作为最后一帧参考..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">用于seedance模型的最后一帧</p>
                      </div>
                    </div>
                  )}

                  {/* 负面描述 */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      负面描述
                    </label>
                    <textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="不希望在图像中出现的内容..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      支持中文输入
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateImage}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isGenerating ? '生成中...' : '生成图像'}
            </button>
          </div>

          {/* 右侧：预览 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-black mb-4">预览</h2>
              
                                {generatedImage ? (
                              <div className="space-y-4">
                                {isVideo ? (
                                  <video
                                    src={generatedImage}
                                    controls
                                    className="w-full rounded-lg shadow-md max-h-[600px]"
                                    autoPlay={false}
                                  >
                                    您的浏览器不支持视频播放。
                                  </video>
                                ) : (
                                  <img
                                    src={generatedImage}
                                    alt="Generated"
                                    className="w-full rounded-lg shadow-md"
                                  />
                                )}
                                
                                {translatedPrompt && translatedPrompt !== prompt && (
                                  <div className="bg-blue-50 p-3 rounded text-sm">
                                    <p className="text-gray-700">
                                      <span className="font-medium">原始描述：</span>{prompt}
                                    </p>
                                    <p className="text-gray-700 mt-1">
                                      <span className="font-medium">翻译后：</span>{translatedPrompt}
                                    </p>
                                  </div>
                                )}
                                
                                <button
                                  onClick={downloadImage}
                                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                  下载{isVideo ? '视频' : '图像'}
                                </button>
                              </div>
                            ) : (
                              <div className="text-center py-12 text-gray-500">
                                <div className="bg-gray-100 rounded-lg p-8">
                                  <p className="text-lg mb-2">尚未生成图像</p>
                                  <p className="text-sm">输入描述并点击生成按钮</p>
                                </div>
                              </div>
                            )}            </div>
          </div>
        </div>
      </div>
    </div>
  );
}