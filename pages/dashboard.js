// pages/dashboard.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalModels: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // 获取统计数据
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => {
        setStats({
          totalUsers: data.totalUsers || 0,
          totalContacts: data.totalContacts || 0,
          totalModels: data.totalModels || 0,
          satisfaction: data.satisfaction || 86
        });
      })
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  // 模拟图表数据
  const trafficData = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '访问量',
        data: [120, 190, 150, 210, 280, 250, 300],
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: '独立访客',
        data: [80, 120, 100, 150, 180, 170, 220],
        borderColor: '#4cc9f0',
        backgroundColor: 'rgba(76, 201, 240, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const modelData = {
    labels: ['GPT-4', 'DALL-E', 'Whisper', 'Claude', '其他'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#4361ee',
        '#3a0ca3',
        '#4cc9f0',
        '#4895ef',
        '#3f37c9'
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>控制面板 - NewWebAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </Head>

      <div className="container-fluid">
        <div className="row">
          {/* 侧边栏 */}
          <div className="col-md-3 col-lg-2 px-0">
            <div className="sidebar p-4">
              <h4 className="mb-4"><i className="fas fa-robot me-2"></i>NewWebAI</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    <i className="fas fa-home me-2"></i>首页
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboard" className="nav-link active">
                    <i className="fas fa-tachometer-alt me-2"></i>控制面板
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/ai-chat" className="nav-link">
                    <i className="fas fa-comments me-2"></i>AI聊天
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-chart-line me-2"></i>分析
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-users me-2"></i>用户管理
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-cogs me-2"></i>AI模型
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-envelope me-2"></i>消息
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-cog me-2"></i>设置
                  </a>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="bg-light rounded-circle p-1" style={{ width: '40px', height: '40px' }}>
                      <div className="bg-primary rounded-circle w-100 h-100 d-flex align-items-center justify-content-center">
                        <span className="text-white fw-bold">U</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white fw-bold">管理员</div>
                    <small className="text-light">admin@newwebai.com</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="col-md-9 col-lg-10 main-content">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>控制面板</h2>
                <div className="d-flex">
                  <div className="dropdown me-2">
                    <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <i className="fas fa-calendar me-1"></i>今天
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">今天</a></li>
                      <li><a className="dropdown-item" href="#">本周</a></li>
                      <li><a className="dropdown-item" href="#">本月</a></li>
                    </ul>
                  </div>
                  <button className="btn btn-primary"><i className="fas fa-plus me-1"></i>新建项目</button>
                </div>
              </div>

              {/* 统计卡片 */}
              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="card card-stats h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3 className="text-dark mb-1">{stats.totalUsers}</h3>
                          <p className="text-muted mb-0">总访问量</p>
                        </div>
                        <div className="stat-icon bg-primary-light text-primary">
                          <i className="fas fa-eye"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-success"><i className="fas fa-arrow-up me-1"></i>12.5%</span>
                        <small className="text-muted">较上周</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card card-stats h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3 className="text-dark mb-1">{stats.totalUsers}</h3>
                          <p className="text-muted mb-0">活跃用户</p>
                        </div>
                        <div className="stat-icon bg-success-light text-success">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-success"><i className="fas fa-arrow-up me-1"></i>8.3%</span>
                        <small className="text-muted">较上周</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card card-stats h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3 className="text-dark mb-1">{stats.totalModels}</h3>
                          <p className="text-muted mb-0">AI模型</p>
                        </div>
                        <div className="stat-icon bg-warning-light text-warning">
                          <i className="fas fa-robot"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-success"><i className="fas fa-arrow-up me-1"></i>2.1%</span>
                        <small className="text-muted">较上周</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card card-stats h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h3 className="text-dark mb-1">{stats.satisfaction}%</h3>
                          <p className="text-muted mb-0">满意度</p>
                        </div>
                        <div className="stat-icon bg-danger-light text-danger">
                          <i className="fas fa-smile"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-success"><i className="fas fa-arrow-up me-1"></i>3.7%</span>
                        <small className="text-muted">较上周</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 图表区域 */}
              <div className="row mb-4">
                <div className="col-lg-8">
                  <div className="card h-100">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">访问量趋势</h5>
                      <div>
                        <button className="btn btn-sm btn-outline-primary me-1">日</button>
                        <button className="btn btn-sm btn-primary">周</button>
                        <button className="btn btn-sm btn-outline-primary">月</button>
                      </div>
                    </div>
                    <div className="card-body">
                      <canvas id="trafficChart" height="300"></canvas>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">AI模型使用情况</h5>
                    </div>
                    <div className="card-body">
                      <canvas id="modelChart" height="300"></canvas>
                    </div>
                  </div>
                </div>
              </div>

              {/* 活动和最近项目 */}
              <div className="row">
                <div className="col-lg-6">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">最近活动</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="activity-item border-0">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="bg-primary rounded-circle p-2">
                              <i className="fas fa-plus text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">新的AI模型已部署</h6>
                            <p className="text-muted mb-0">GPT-5 模型于 10分钟前部署</p>
                            <small className="text-muted">刚刚</small>
                          </div>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="bg-success rounded-circle p-2">
                              <i className="fas fa-user-plus text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">新用户注册</h6>
                            <p className="text-muted mb-0">John Doe 注册了账户</p>
                            <small className="text-muted">30分钟前</small>
                          </div>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="bg-warning rounded-circle p-2">
                              <i className="fas fa-chart-line text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">分析报告生成</h6>
                            <p className="text-muted mb-0">本周分析报告已生成</p>
                            <small className="text-muted">2小时前</small>
                          </div>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="bg-info rounded-circle p-2">
                              <i className="fas fa-cog text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">系统更新</h6>
                            <p className="text-muted mb-0">系统已更新到最新版本</p>
                            <small className="text-muted">5小时前</small>
                          </div>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="bg-danger rounded-circle p-2">
                              <i className="fas fa-exclamation-triangle text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">错误日志</h6>
                            <p className="text-muted mb-0">发现API连接错误</p>
                            <small className="text-muted">昨天</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card h-100">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">最近项目</h5>
                      <a href="#" className="btn btn-sm btn-primary">查看全部</a>
                    </div>
                    <div className="card-body p-0">
                      <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">AI聊天机器人</h6>
                            <small className="text-muted">2天前</small>
                          </div>
                          <p className="mb-1">开发一个智能客服聊天机器人</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-primary">进行中</span>
                            <div className="progress" style={{ width: '100px', height: '6px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">图像生成模型</h6>
                            <small className="text-muted">1周前</small>
                          </div>
                          <p className="mb-1">基于DALL-E的图像生成工具</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-success">已完成</span>
                            <div className="progress" style={{ width: '100px', height: '6px' }}>
                              <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">语音识别系统</h6>
                            <small className="text-muted">2周前</small>
                          </div>
                          <p className="mb-1">集成Whisper的语音转文本系统</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-warning">测试中</span>
                            <div className="progress" style={{ width: '100px', height: '6px' }}>
                              <div className="progress-bar bg-warning" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">数据分析平台</h6>
                            <small className="text-muted">3周前</small>
                          </div>
                          <p className="mb-1">可视化数据分析和报告生成</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-info">计划中</span>
                            <div className="progress" style={{ width: '100px', height: '6px' }}>
                              <div className="progress-bar bg-info" role="progressbar" style={{ width: '10%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // 初始化访问量趋势图
            const trafficCtx = document.getElementById('trafficChart').getContext('2d');
            new Chart(trafficCtx, {
              type: 'line',
              data: ${JSON.stringify(trafficData)},
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

            // 初始化AI模型使用情况饼图
            const modelCtx = document.getElementById('modelChart').getContext('2d');
            new Chart(modelCtx, {
              type: 'doughnut',
              data: ${JSON.stringify(modelData)},
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            });
          });
        `
      }} />

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
        }

        .sidebar {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
        }

        .main-content {
          padding-top: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .card-stats {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.5rem;
        }

        .bg-primary-light { background-color: rgba(67, 97, 238, 0.1); }
        .bg-success-light { background-color: rgba(74, 222, 128, 0.1); }
        .bg-warning-light { background-color: rgba(250, 204, 21, 0.1); }
        .bg-danger-light { background-color: rgba(248, 113, 113, 0.1); }

        .activity-item {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8) !important;
          border-radius: 8px;
          margin: 5px 0;
          transition: all 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }

        .card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}