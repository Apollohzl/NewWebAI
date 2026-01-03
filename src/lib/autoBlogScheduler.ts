// 自动博客生成调度器
// 在应用启动时自动启动定时器

let schedulerStarted = false;

export async function startAutoBlogScheduler() {
  // 避免重复启动
  if (schedulerStarted) {
    console.log('自动博客调度器已经启动');
    return;
  }

  try {
    // 等待5秒，确保应用完全启动
    setTimeout(async () => {
      console.log('🤖 启动自动博客生成调度器...');
      
      const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auto-blog/scheduler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'start' }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ 自动博客生成调度器启动成功');
        schedulerStarted = true;
      } else {
        console.error('❌ 自动博客生成调度器启动失败');
      }
    }, 5000); // 5秒延迟启动
    
  } catch (error) {
    console.error('启动自动博客调度器时发生错误:', error);
  }
}

// 在应用启动时调用
if (typeof window === 'undefined') {
  // 只在服务器端执行
  startAutoBlogScheduler();
}