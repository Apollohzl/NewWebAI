export default function Head() {
  return (
    <>
      <title>NewWebAI - 智能AI网站</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、博客、购物等多种功能" />
      <meta name="keywords" content="AI, 人工智能, AI对话, AI图像生成, AI视频生成, 博客, 购物, Next.js" />
      <meta name="author" content="小黄の数字宇宙工作室" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://hzliflow.ken520.top/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hzliflow.ken520.top/" />
      <meta property="og:title" content="NewWebAI - 智能AI网站" />
      <meta property="og:description" content="NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、博客、购物等多种功能" />
      <meta property="og:image" content="https://hzliflow.ken520.top/logo.png" />
      <meta property="og:site_name" content="NewWebAI" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://hzliflow.ken520.top/" />
      <meta property="twitter:title" content="NewWebAI - 智能AI网站" />
      <meta property="twitter:description" content="NewWebAI是一个基于Next.js框架的智能AI网站，提供AI对话、博客、购物等多种功能" />
      <meta property="twitter:image" content="https://hzliflow.ken520.top/logo.png" />
      
      {/* Ezoic 隐私脚本 - 必须首先加载 */}
      <script 
        data-cfasync="false" 
        src="https://cmp.gatekeeperconsent.com/min.js"
      />
      <script 
        data-cfasync="false" 
        src="https://the.gatekeeperconsent.com/cmp.min.js"
      />
      
      {/* Ezoic 主要脚本 */}
      <script async src="//www.ezojs.com/ezoic/sa.min.js" />
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `
        }}
      />
    </>
  );
}