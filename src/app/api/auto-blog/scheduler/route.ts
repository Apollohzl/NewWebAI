import { NextRequest, NextResponse } from 'next/server';

// 全局变量存储定时器
let globalTimer: NodeJS.Timeout | null = null;
let isRunning = false;

// 执行博客生成任务
async function generateBlog() {
  try {
    console.log('开始执行自动博客生成任务...');
    
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auto-blog/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ 自动博客生成成功: ${result.post.title}`);
    } else {
      console.error(`❌ 自动博客生成失败: ${result.error}`);
    }
    
    return result;
  } catch (error: any) {
    console.error('自动博客生成任务执行失败:', error);
    return { success: false, error: error.message || '执行失败' };
  }
}

// 启动定时器
function startTimer() {
  if (isRunning) {
    console.log('定时器已在运行中');
    return;
  }
  
  isRunning = true;
  
  // 立即执行一次
  generateBlog();
  
  // 设置每小时执行一次的定时器
  globalTimer = setInterval(async () => {
    console.log('执行定时博客生成任务...');
    await generateBlog();
  }, 60 * 60 * 1000); // 1小时 = 60分钟 * 60秒 * 1000毫秒
  
  console.log('✅ 自动博客生成定时器已启动，每小时执行一次');
}

// 停止定时器
function stopTimer() {
  if (globalTimer) {
    clearInterval(globalTimer);
    globalTimer = null;
    isRunning = false;
    console.log('⏹️ 自动博客生成定时器已停止');
  }
}

// 获取定时器状态
function getTimerStatus() {
  return {
    isRunning,
    nextRun: isRunning ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : null,
    interval: '1小时'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    switch (action) {
      case 'start':
        startTimer();
        return NextResponse.json({
          success: true,
          message: '自动博客生成定时器已启动',
          status: getTimerStatus()
        });
        
      case 'stop':
        stopTimer();
        return NextResponse.json({
          success: true,
          message: '自动博客生成定时器已停止',
          status: getTimerStatus()
        });
        
      case 'restart':
        stopTimer();
        setTimeout(() => startTimer(), 1000);
        return NextResponse.json({
          success: true,
          message: '自动博客生成定时器已重启',
          status: getTimerStatus()
        });
        
      case 'generate':
        const result = await generateBlog();
        return NextResponse.json({
          success: result.success,
          message: result.success ? '手动生成博客成功' : '手动生成博客失败',
          result: result
        });
        
      default:
        return NextResponse.json(
          { error: '无效的操作' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('调度器操作失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || '调度器操作失败' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      scheduler: getTimerStatus(),
      message: isRunning ? '定时器正在运行' : '定时器未运行',
      settings: {
        interval: '1小时',
        action: 'POST /api/auto-blog/scheduler 启动定时器'
      },
      controls: {
        start: 'POST /api/auto-blog/scheduler (action=start)',
        stop: 'POST /api/auto-blog/scheduler (action=stop)',
        restart: 'POST /api/auto-blog/scheduler (action=restart)',
        generate: 'POST /api/auto-blog/scheduler (action=generate)'
      }
    });
  } catch (error: any) {
    console.error('获取调度器状态失败:', error);
    return NextResponse.json(
      { 
        error: error.message || '获取状态失败' 
      },
      { status: 500 }
    );
  }
}