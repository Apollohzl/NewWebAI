// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('联系表单已成功提交！');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('提交失败，请重试。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('提交失败，请重试。');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-fluid">
      <Head>
        <title>NewWebAI - 智能网站解决方案</title>
        <meta name="description" content="利用AI技术为您打造现代化、高效能的网站，提升用户体验和业务转化率。" />
      </Head>

      {/* 导航栏 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link href="/" className="navbar-brand">
            <i className="fas fa-robot me-2"></i>NewWebAI
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link active">首页</Link>
              </li>
              <li className="nav-item">
                <Link href="#features" className="nav-link">功能</Link>
              </li>
              <li className="nav-item">
                <Link href="#about" className="nav-link">关于</Link>
              </li>
              <li className="nav-item">
                <Link href="#contact" className="nav-link">联系</Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link">控制面板</Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-chat" className="nav-link">AI聊天</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">智能网站解决方案</h1>
              <p className="lead mb-4">利用AI技术为您打造现代化、高效能的网站，提升用户体验和业务转化率。</p>
              <div className="d-flex gap-3">
                <Link href="#features" className="btn btn-light btn-lg">了解更多</Link>
                <Link href="#contact" className="btn btn-outline-light btn-lg">联系我们</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image">
                <i className="fas fa-robot" style={{ fontSize: '200px', opacity: 0.8 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能部分 */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">核心功能</h2>
            <p className="lead">我们的智能网站解决方案提供全方位的功能支持</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <i className="fas fa-brain fs-2"></i>
                  </div>
                  <h4 className="card-title">AI智能优化</h4>
                  <p className="card-text">通过AI技术自动优化网站性能和用户体验，智能调整内容布局和交互方式。</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <i className="fas fa-mobile-alt fs-2"></i>
                  </div>
                  <h4 className="card-title">响应式设计</h4>
                  <p className="card-text">完美适配各种设备屏幕，确保在桌面、平板和手机上都有最佳浏览体验。</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <i className="fas fa-bolt fs-2"></i>
                  </div>
                  <h4 className="card-title">高性能</h4>
                  <p className="card-text">采用最新技术栈，确保网站加载速度快，运行稳定，SEO友好。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">关于我们</h2>
              <p className="lead">NewWebAI致力于利用人工智能技术革新网站开发和用户体验。我们的团队由资深开发者和AI专家组成，专注于为客户提供最先进的网站解决方案。</p>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i> 专业开发团队</li>
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i> AI技术集成</li>
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i> 客户至上服务</li>
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i> 持续技术支持</li>
              </ul>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="about-image bg-light p-4 rounded">
                <i className="fas fa-users" style={{ fontSize: '150px', opacity: 0.7 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="py-5 bg-primary text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">联系我们</h2>
            <p className="lead">有任何问题或合作意向？请随时联系我们</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">姓名</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">邮箱</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="subject" className="form-label">主题</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="message" className="form-label">消息</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-light btn-lg">发送消息</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0 py-2">&copy; 2025 NewWebAI. 保留所有权利。</p>
            </div>
            <div className="col-md-6">
              <div className="social-links d-flex justify-content-md-end py-2">
                <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-light me-3"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-light"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
          padding-top: 56px;
        }

        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }

        .hero-image {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .feature-card {
          border: none;
          transition: all 0.3s ease;
          height: 100%;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          font-size: 2rem;
        }

        .btn {
          border-radius: 50px;
          font-weight: 600;
          padding: 12px 30px;
          transition: all 0.3s ease;
        }

        .btn-lg {
          padding: 15px 40px;
          font-size: 1.1rem;
        }

        .btn-light {
          color: var(--primary-color);
          background-color: white;
          border-color: white;
        }

        .btn-light:hover {
          color: var(--primary-color);
          background-color: var(--light-color);
          border-color: var(--light-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .btn-outline-light {
          color: white;
          border-color: white;
        }

        .btn-outline-light:hover {
          background-color: white;
          color: var(--primary-color);
        }

        .form-control {
          border-radius: 50px;
          padding: 12px 20px;
          border: 1px solid #ddd;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.25rem rgba(67, 97, 238, 0.25);
        }

        .social-links a {
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          color: var(--accent-color) !important;
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding: 4rem 0;
          }
          
          .display-4 {
            font-size: 2.5rem;
          }
          
          .navbar-collapse {
            background: white;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          
          .navbar-dark .navbar-nav .nav-link {
            color: var(--dark-color) !important;
            margin: 5px 0;
          }
        }
      `}</style>
    </div>
  );
}