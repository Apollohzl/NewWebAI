// NewWebAI 网站交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 显示加载状态
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading me-2"></span>发送中...';
            submitBtn.disabled = true;
            
            // 模拟API调用
            setTimeout(() => {
                // 这里应该实际调用后端API
                alert(`感谢您的消息！\n姓名: ${name}\n邮箱: ${email}\n主题: ${subject}\n消息: ${message}`);
                
                // 重置表单
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // 显示成功消息
                showMessage('消息已成功发送！我们会尽快回复您。', 'success');
            }, 2000);
        });
    }

    // 滚动动画效果
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .card').forEach(card => {
        observer.observe(card);
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = '';
            navbar.style.boxShadow = '';
        }
    });

    // 窗口大小改变时的响应
    window.addEventListener('resize', function() {
        // 在移动设备上调整导航栏行为
        if (window.innerWidth < 992) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// 显示消息的通用函数
function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    messageDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    messageDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// 添加到首页的其他功能
// 轮播图功能（如果有）
function initCarousel() {
    // 如果有轮播图元素，则初始化
    const carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach(carousel => {
        // 可以在这里初始化自定义轮播功能
        console.log('初始化轮播图:', carousel.id || 'unnamed');
    });
}

// 点击按钮时的波纹效果
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// 初始化页面时运行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图（如果有）
    initCarousel();
    
    // 为所有按钮添加波纹效果
    document.querySelectorAll('.btn').forEach(button => {
        addRippleEffect(button);
    });
});

// 页面加载完成后的额外动画
window.addEventListener('load', function() {
    // 为页面添加整体淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
