'use client';

import { useState, useEffect } from 'react';
import { FaChartLine, FaChartPie, FaChartBar, FaSync } from 'react-icons/fa';
import Link from 'next/link';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export default function DataVisualizationPage() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ChartData | null>(null);

  // 模拟数据获取
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 根据时间范围生成数据
      let labels: string[] = [];
      let values: number[] = [];
      
      if (timeRange === 'week') {
        labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        values = [65, 59, 80, 81, 56, 55, 40];
      } else if (timeRange === 'month') {
        labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        values = [28, 48, 40, 19, 86, 27, 90, 34, 56, 72, 81, 65];
      } else {
        labels = ['Q1', 'Q2', 'Q3', 'Q4'];
        values = [450, 560, 620, 780];
      }
      
      const backgroundColors = [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)',
        'rgba(83, 102, 255, 0.6)',
        'rgba(255, 99, 255, 0.6)',
        'rgba(99, 255, 132, 0.6)',
        'rgba(255, 206, 99, 0.6)',
        'rgba(54, 235, 162, 0.6)',
      ];
      
      setData({
        labels,
        datasets: [
          {
            label: 'NewWebAI 使用量',
            data: values,
            backgroundColor: backgroundColors.slice(0, values.length),
            borderColor: backgroundColors.slice(0, values.length).map(color => color.replace('0.6', '1')),
            borderWidth: 1
          }
        ]
      });
      
      setLoading(false);
    };
    
    fetchData();
  }, [timeRange]);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // 渲染图表
  const renderChart = () => {
    if (!data) return null;

    if (chartType === 'pie') {
      return (
        <div className="relative w-full h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full relative">
              {data.datasets[0].data.map((value, index) => {
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = (value / total) * 100;
                const degrees = (percentage / 100) * 360;
                
                // 计算扇形角度
                let startAngle = 0;
                for (let i = 0; i < index; i++) {
                  startAngle += (data.datasets[0].data[i] / total) * 360;
                }
                
                return (
                  <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      clipPath: `path('M50% 50% L${50 + Math.cos((startAngle - 90) * Math.PI / 180) * 50}% ${50 + Math.sin((startAngle - 90) * Math.PI / 180) * 50}% A50% 50% 0 ${degrees > 180 ? 1 : 0} 1 ${50 + Math.cos((startAngle + degrees - 90) * Math.PI / 180) * 50}% ${50 + Math.sin((startAngle + degrees - 90) * Math.PI / 180) * 50}% Z')`
                    }}
                  >
                    <div 
                      className="w-full h-full"
                      style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 mt-48">
            <div className="grid grid-cols-2 gap-4">
              {data.labels.map((label, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-2 rounded-sm" 
                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm">{label}: {data.datasets[0].data[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (chartType === 'bar') {
      return (
        <div className="w-full h-80 flex items-end justify-between pt-10 pb-6 px-4">
          {data.datasets[0].data.map((value, index) => {
            const maxValue = Math.max(...data.datasets[0].data);
            const height = (value / maxValue) * 250;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div className="text-xs mb-1">{value}</div>
                <div
                  className="w-4/5 transition-all duration-500 ease-out"
                  style={{
                    height: `${height}px`,
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
                />
                <div className="text-xs mt-2 text-center">{data.labels[index]}</div>
              </div>
            );
          })}
        </div>
      );
    }

    // 默认折线图
    return (
      <div className="w-full h-80 relative">
        <div className="absolute inset-0 flex flex-col justify-between pr-6 pb-6">
          {/* Y轴刻度 */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center text-xs text-black">
              <div className="w-8 text-right mr-2">{100 - i * 25}</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 pl-10 pr-6 pb-6">
          {/* 折线图 */}
          <svg className="w-full h-full">
            <polyline
              fill="none"
              stroke={data.datasets[0].backgroundColor[0]}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={data.datasets[0].data.map((value, index, arr) => {
                const x = (index / (arr.length - 1)) * 100;
                const maxValue = Math.max(...data.datasets[0].data);
                const y = 100 - (value / maxValue) * 100;
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            
            {/* 数据点 */}
            {data.datasets[0].data.map((value, index, arr) => {
              const x = (index / (arr.length - 1)) * 100;
              const maxValue = Math.max(...data.datasets[0].data);
              const y = 100 - (value / maxValue) * 100;
              
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="5"
                  fill={data.datasets[0].backgroundColor[index]}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        
        {/* X轴标签 */}
        <div className="absolute bottom-0 left-10 right-6 flex justify-between">
          {data.labels.map((label, index) => (
            <div key={index} className="text-xs text-center" style={{ width: `${100 / data.labels.length}%` }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-black hover:text-blue-600">首页</a>
            <a href="/blog" className="text-black hover:text-blue-600">博客</a>
            <a href="/store" className="text-black hover:text-blue-600">产品</a>
            <a href="/ai-tools" className="text-blue-600 font-medium">AI工具</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-4">AI 数据可视化</h1>
          <p className="text-xl text-black">
            NewWebAI 提供智能数据分析和可视化功能，帮助您洞察业务趋势
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                          <h2 className="text-2xl font-bold text-black">数据概览</h2>
                          <p className="text-black">NewWebAI 用户活动数据</p>            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['week', 'month', 'quarter'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      timeRange === range
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-black hover:text-black'
                    }`}
                  >
                    {range === 'week' ? '本周' : range === 'month' ? '本月' : '本季度'}
                  </button>
                ))}
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['line', 'bar', 'pie'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`p-2 rounded-md transition ${
                      chartType === type
                                              ? 'bg-white text-blue-600 shadow-sm'
                                              : 'text-black hover:text-black'                    }`}
                  >
                    {type === 'line' ? <FaChartLine /> : type === 'bar' ? <FaChartBar /> : <FaChartPie />}
                  </button>
                ))}
              </div>
              
              <button
                onClick={refreshData}
                disabled={loading}
                className={`flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${
                  loading ? 'opacity-70' : ''
                }`}
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                <span className="ml-2">刷新数据</span>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
            {loading ? (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-black">加载数据中...</p>
                          </div>            ) : data ? (
              renderChart()
            ) : (
              <p className="text-black">暂无数据</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">智能分析</h3>
            <p className="text-black">
              NewWebAI 使用AI算法自动识别数据中的模式和趋势，提供深入洞察。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">实时更新</h3>
            <p className="text-black">
              数据可视化图表实时更新，确保您始终看到最新的业务指标。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-black mb-3">交互式图表</h3>
            <p className="text-black">
              用户可以与图表交互，选择不同的维度和时间范围，深入探索数据。
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">AI驱动的洞察</h2>
          <p className="mb-6 max-w-3xl">
            NewWebAI的数据可视化工具不仅仅是展示数字，而是通过AI分析发现隐藏的模式和趋势。我们的智能算法可以预测未来趋势，识别异常数据点，并提供可操作的业务建议。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">预测分析</h3>
              <p>基于历史数据预测未来趋势，帮助您提前规划业务策略。</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">智能警报</h3>
              <p>当关键指标出现异常时，系统会自动发送警报通知。</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
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