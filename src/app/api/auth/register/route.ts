import { NextRequest, NextResponse } from 'next/server';
import { LeanCloudUser, initLeanCloud, leancloudRequest } from '@/lib/leancloud';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // 初始化LeanCloud
    initLeanCloud();
    console.log('LeanCloud初始化完成');
    
    const { username, email, password } = await request.json();
    console.log('收到注册请求:', { username, email });

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码都是必填的' },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      );
    }

    // 使用LeanCloud的邮箱验证注册
    try {
      // 先创建用户（不发送邮件）
      const registeredUser = await LeanCloudUser.register(username, email, password);
      console.log('用户创建成功:', registeredUser);
      
      // 手动发送自定义验证邮件
      const emailData = {
        recipients: [email],
        subject: 'NewWebAI - 邮箱验证',
        text_body: `您好 ${username}！\n\n感谢您注册 NewWebAI！\n\n请点击以下链接验证您的邮箱：\n${process.env.VERCEL_URL || 'https://hzliflow.ken520.top'}/verify?token=${registeredUser.sessionToken}\n\n验证链接有效期为24小时。\n\n如果这不是您的操作，请忽略此邮件。\n\n© 2025 小黄の数字宇宙工作室. 保留所有权利.`,
        html_body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">NewWebAI</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0;">邮箱验证</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin: 0 0 20px 0;">欢迎加入 NewWebAI！</h2>
              <p style="color: #666; margin: 0 0 15px 0;">您好 <strong>${username}</strong>！</p>
              <p style="color: #666; margin: 0 0 20px 0;">感谢您注册 NewWebAI！请点击下方按钮验证您的邮箱地址：</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.VERCEL_URL || 'https://hzliflow.ken520.top'}/verify?token=${registeredUser.sessionToken}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                  验证邮箱地址
                </a>
              </div>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>⚠️ 重要提醒：</strong>
                  <br>验证链接有效期为24小时，请及时完成验证。
                  <br>如非本人操作，请忽略此邮件。
                </p>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            <div style="text-align: center; color: #6c757d; font-size: 12px;">
              <p style="margin: 0;">此邮件由 NewWebAI 系统自动发送</p>
              <p style="margin: 5px 0 0 0;">© 2025 小黄の数字宇宙工作室. 保留所有权利.</p>
              <p style="margin: 0;">如有问题，请联系客服团队</p>
            </div>
          </div>
        `,
      };

      // 发送自定义邮件
      const emailResponse = await leancloudRequest('/requestMail', {
        method: 'POST',
        body: JSON.stringify(emailData),
      });

      console.log('邮件发送响应:', emailResponse);
      
      return NextResponse.json({
        message: '注册成功！请查看邮箱并点击验证链接完成验证',
        user: {
          id: registeredUser.objectId,
          username: registeredUser.username,
          email: registeredUser.email,
        },
        needEmailVerification: true
      });
    } catch (error: any) {
      console.error('注册失败:', error);
      return NextResponse.json(
        { error: error.message || '注册失败，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: error.message || '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}