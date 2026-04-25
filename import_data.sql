-- =====================================================
-- 导入API参数配置数据 (api_config)
-- =====================================================

INSERT INTO api_config (api_name, params) VALUES (
  'hello',
  '[{"name":"name","type":"string","required":false,"description":"问候的对象名称","example":"World"},{"name":"greeting","type":"string","required":false,"description":"问候语","example":"Hello"},{"name":"lang","type":"string","required":false,"description":"语言代码(zh/en/ja)","example":"zh"}]'
);

INSERT INTO api_config (api_name, params) VALUES (
  'ai-chat',
  '[{"name":"message","type":"string","required":false,"description":"对话消息（GET请求时使用）","example":"你好，请介绍一下你自己"},{"name":"messages","type":"array","required":false,"description":"对话消息数组（POST请求时使用），格式：[{role: user, content: 消息}]","example":"[{role: user, content: 你好}]"},{"name":"sessionId","type":"string","required":false,"description":"会话ID","example":"session_123"},{"name":"model","type":"string","required":false,"description":"AI模型(openai/claude/gemini等)","example":"openai"},{"name":"temperature","type":"number","required":false,"description":"创造性控制(0-2，默认0.7)","example":"0.7"},{"name":"max_tokens","type":"number","required":false,"description":"最大回复长度(默认2000)","example":"2000"}]'
);

INSERT INTO api_config (api_name, params) VALUES (
  'ai-image',
  '[{"name":"prompt","type":"string","required":true,"description":"图像描述（支持中文，将自动翻译成英文）","example":"一只可爱的小猫在花园里玩耍"},{"name":"model","type":"string","required":false,"description":"AI模型(flux/dall-e/stable-diffusion等)","example":"flux"},{"name":"width","type":"number","required":false,"description":"图像宽度","example":"512"},{"name":"height","type":"number","required":false,"description":"图像高度","example":"512"},{"name":"seed","type":"number","required":false,"description":"随机种子（用于生成相同图像）","example":"42"},{"name":"style","type":"string","required":false,"description":"图像风格","example":"realistic"},{"name":"negative_prompt","type":"string","required":false,"description":"负面描述（支持中文，将自动翻译成英文）","example":"模糊, 低质量"},{"name":"nologo","type":"boolean","required":false,"description":"是否去除水印","example":"true"}]'
);

-- =====================================================
-- 导入用户数据 (users)
-- =====================================================

INSERT INTO users (id, username, email, password, salt, avatar, sessionToken, shortId, emailVerified, mobilePhoneVerified, ACL) VALUES (
  '69552e55ab078458c940272a',
  '迷小龙丶H',
  '2488633798@qq.com',
  'EcnXXvpBHlfqo9HC1CM4WG1zFg6PVqkqj0bMA1Os49tGd4zJkehp5SRDqs1ecfLtTM/4sw4fU5I6o0prxq3C0w==',
  'pz56vb9v1q3quq9mdo6eok8q0xraz01fl81xk2cy2xinu7pf',
  NULL,
  'txbj8lu8368g2r2w5lrqyyrga',
  'kgajgz',
  FALSE,
  FALSE,
  '{"*":{"read":true,"write":true}}'
);

INSERT INTO users (id, username, email, password, salt, avatar, sessionToken, shortId, emailVerified, mobilePhoneVerified, ACL) VALUES (
  '69554f1dab078458c9402af9',
  'admin',
  '959855534@qq.com',
  'XF9cGGwR6MW7peYTxJqeC1cYHD6DokUB37iSDdVQxMj2VyDmEiM9r0vxaj8RsHN1/Cz0+tIKrMAzD01ISedhBQ==',
  'cwbzz4fwlrejndm8bb3hpnkr40oj80myelsarepvpmnp7n09',
  'https://lc-gluttony.s3.amazonaws.com/nCNTeAtQVesGL0m9o4jACz3dTTuEvOP5itVJktbe.jpg',
  'sro5e5d7zdm6ile0prajg2q9q',
  'uwyzpd',
  TRUE,
  FALSE,
  '{"*":{"read":true,"write":true}}'
);

INSERT INTO users (id, username, email, password, salt, avatar, sessionToken, shortId, emailVerified, mobilePhoneVerified, ACL) VALUES (
  '6957180554712079f955ffec',
  'apollo',
  'apollo198@qq.com',
  'BUxOZ3GP7g/dFQSOsXdSPS3jSMTmTM92dHg6WOlix17mZ1GyDtpeEK7vMTgr/k+FMHDmQSnk3VtxkNLCO7DrLA==',
  't9s7822tvsg9jzbc6e9udtcykr5q3ljjl9fzbrg39abcz2xo',
  'https://lc-gluttony.s3.amazonaws.com/42F0aJUYCqKfumctXbsQ1cdk4bxY2ABTDFSxAaGi.jpg',
  'lcfgjfcxeqtbkk7fw7q5ygvpo',
  'ikczhy',
  TRUE,
  FALSE,
  '{"*":{"read":true,"write":true}}'
);


-- =====================================================
-- 导入博客数据 (blog_posts)
-- =====================================================

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6958ab33ab078458c94133f8',
  'AI Agent架构深度解析：构建自主智能系统的关键技术',
  '<article><h2>AI Agent：下一代人工智能应用的核心架构</h2><p>随着大语言模型（LLM）技术的成熟，AI Agent正成为构建智能应用的新范式。与传统的单次对话模型不同，AI Agent具备记忆、规划和工具使用能力，能够自主完成复杂任务链。</p><section><h3>核心架构要素</h3><p>典型的AI Agent系统包含四个关键组件：<strong>规划模块</strong>负责任务分解和策略制定；<strong>记忆机制</strong>包括短期对话记忆和长期知识存储；<strong>工具调用</strong>允许访问外部API和数据库；<strong>行动执行</strong>模块协调所有组件的运作流程。</p></section><section><h3>实际应用场景</h3><ul><li><strong>自动化工作流</strong>：处理多步骤的客户服务请求</li><li><strong>数据分析助手</strong>：连接数据库并生成可视化报告</li><li><strong>研发协作者</strong>：协助代码开发、测试和文档编写</li></ul></section><section><h3>技术挑战与趋势</h3><p>当前主要挑战包括长期记忆的准确性、复杂任务规划的成功率，以及多Agent协作的稳定性。未来发展趋势将集中在<em>专用化Agent</em>的垂直领域优化、<em>可解释性</em>的提升，以及<em>边缘计算</em>与Agent技术的结合。</p></section><p>构建AI Agent应用时，推荐从LangChain、AutoGen等成熟框架起步，重点关注任务边界定义和异常处理机制的设计。</p></article>',
  '深入解析AI Agent的核心架构、应用场景与技术趋势，探讨如何构建具备规划、记忆和执行能力的下一代智能应用。',
  'category',
  'AI小黄',
  '6分钟',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('AI Agent');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ab33ab078458c94133f8', id FROM blog_tags WHERE tag_name = 'AI Agent';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('大语言模型');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ab33ab078458c94133f8', id FROM blog_tags WHERE tag_name = '大语言模型';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自动化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ab33ab078458c94133f8', id FROM blog_tags WHERE tag_name = '自动化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('人工智能架构');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ab33ab078458c94133f8', id FROM blog_tags WHERE tag_name = '人工智能架构';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('LLM');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ab33ab078458c94133f8', id FROM blog_tags WHERE tag_name = 'LLM';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6958ac004243696c7294e6e8',
  'Next.js 15深度指南：掌握App Router与服务端组件架构',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #667eea; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #f6f9ff 0%, #f0f4ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);}.code-block {background: #1a202c; color: #e2e8f0; padding: 1.5rem; border-radius: 8px; font-family: \'Fira Code\', monospace; margin: 1.5rem 0; overflow-x: auto;}.tech-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tech-card {background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease; border-top: 4px solid #4299e1;}.tech-card:hover {transform: translateY(-5px);}.feature-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.feature-list li:before {content: \'⚡\'; position: absolute; left: 0; color: #4299e1;}.img-container {text-align: center; margin: 2rem 0;}.tech-img {max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);}</style><h1 class=\'post-title\'>Next.js 15全栈开发指南：App Router、服务端组件与现代Web架构</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop\' alt=\'Next.js开发界面\' class=\'tech-img\' width=\'800\' height=\'400\'></div><p>随着Next.js 15的发布，React全栈开发进入了新的时代。本次更新不仅带来了<strong>性能的显著提升</strong>，更重要的是<strong>开发体验的革命性改进</strong>，特别是对App Router的全面优化和服务端组件的成熟应用。</p><section><h2 class=\'section-title\'>🚀 App Router的深度优化</h2><div class=\'feature-box\'><p><strong>并行路由与拦截路由</strong>让复杂布局的实现变得简单。现在你可以轻松创建模态对话框、条件性布局和动态路由结构：</p><div class=\'code-block\'>// 并行路由配置示例<br>export default function Layout({<br>  children,<br>  modal,<br>  analytics<br>}: {<br>  children: React.ReactNode<br>  modal: React.ReactNode<br>  analytics: React.ReactNode<br>}) {<br>  return (<br>    &lt;&gt;<br>      {children}<br>      {modal}<br>      &lt;aside&gt;{analytics}&lt;/aside&gt;<br>    &lt;/&gt;<br>  )<br>}</div></div><ul class=\'feature-list\'><li>改进的加载状态管理，支持骨架屏和渐进式渲染</li><li>增强的错误边界处理，提供更友好的错误恢复体验</li><li>智能缓存策略，减少不必要的重新渲染</li></ul></section><section><h2 class=\'section-title\'>🔧 服务端组件最佳实践</h2><p>Next.js 15进一步强化了服务端组件的地位，让开发者能够更自然地编写<em>服务端优先</em>的应用：</p><div class=\'tech-grid\'><div class=\'tech-card\'><h3>数据获取优化</h3><p>支持流式传输和渐进式数据加载，显著减少首次内容绘制时间</p></div><div class=\'tech-card\'><h3>SEO增强</h3><p>自动生成语义化HTML结构，改善搜索引擎可访问性</p></div><div class=\'tech-card\'><h3>性能监控</h3><p>内置性能指标跟踪，提供详细的Core Web Vitals报告</p></div></div></section><section><h2 class=\'section-title\'>🎯 开发工具升级</h2><p>全新的开发服务器<strong>Turbopack</strong>现在达到稳定状态，提供：</p><ul class=\'feature-list\'><li>热更新速度提升至3倍以上</li><li>内存使用减少50%</li><li>TypeScript编译时间优化70%</li></ul><p>结合React 19的新特性，如<code>useOptimistic</code>和<code>useActionState</code>，开发体验得到全面提升。</p></section><p class=\'feature-box\'><strong>迁移建议：</strong>现有项目建议逐步迁移到App Router，优先从静态页面开始。新项目直接采用Next.js 15的全栈架构，充分利用服务端组件的性能优势。</p><p>Next.js 15标志着全栈开发的成熟，通过<em>简化的API</em>、<em>优化的性能</em>和<em>增强的开发工具</em>，为构建现代Web应用提供了完整的解决方案。</p></div>',
  '深度解析Next.js 15的核心特性：App Router架构、服务端组件最佳实践、Turbopack性能优化，以及如何构建高性能的现代全栈应用。',
  '前端开发',
  'AI小黄',
  '8分钟',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('Next.js');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = 'Next.js';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('React');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = 'React';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('全栈开发');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = '全栈开发';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('前端框架');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = '前端框架';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('Web性能');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = 'Web性能';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('App Router');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958ac004243696c7294e6e8', id FROM blog_tags WHERE tag_name = 'App Router';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6958bc5575685f306ba8a511',
  '2026企业AI代理全景：从自动化工具到自主业务伙伴',
  '<h2>🌐 Web开发者的AI工具箱：2026年必备的十大实用技术</h2>\\n<p>在AI技术全面融入Web开发的今天，优秀的开发者不仅需要掌握传统编程技能，更要熟悉各种AI增强工具和框架。以下是2026年每位Web开发者都应了解的十大AI技术工具，它们正在重塑我们的开发方式和工作流程。</p>\\n<h3>1. 🛠️ AI集成开发环境：Cursor与Windsurf</h3>\\n<p><strong>Cursor</strong>已成为新一代智能IDE的代表，它不仅仅是代码补全工具，更是理解上下文、重构代码甚至修复bug的编程伙伴。2026年版本将具备：</p>\\n<ul>\\n<li><strong>多文件上下文理解</strong>：同时分析项目中多个相关文件，提供更准确的建议</li>\\n<li><strong>实时架构建议</strong>：检测代码中的设计模式反例，提出优化方案</li>\\n<li><strong>智能调试</strong>：不仅指出错误，还能解释原因并提供多种修复方案</li>\\n</ul>\\n<p><strong>Windsurf</strong>则专注于Web开发的特殊需求，针对React、Vue、Next.js等框架提供深度优化的代码生成和重构能力。</p>\\n<h3>2. 🔍 AI代码审查工具：Mintlify与Codiga</h3>\\n<p>传统的代码审查往往依赖于人工经验和有限规则，而AI代码审查工具带来了质的飞跃：</p>\\n<p><strong>Mintlify</strong>专注于文档与代码一致性检查，确保API文档、注释和实际实现保持一致。</p>\\n<p><strong>Codiga</strong>则提供了实时的代码质量分析，检测安全漏洞、性能问题和代码异味，并给出具体的改进建议。</p>\\n<p><strong>实际数据</strong>：采用AI代码审查的团队报告显示，代码缺陷率平均降低了42%，审查时间缩短了65%。</p>\\n<h3>3. 🎨 设计到代码AI工具：V0与Locofy</h3>\\n<p><strong>V0</strong>（Vercel出品）可以根据自然语言描述或草图直接生成React组件代码：</p>\\n<pre><code class=\"language-javascript hljs\"><span class=\"hljs-comment\">// 用户描述：\\"一个带有深色模式切换的用户资料卡片组件\\"</span>\\n<span class=\"hljs-comment\">// V0生成的核心代码结构</span>\\n<span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">UserProfileCard</span>(<span class=\"hljs-params\">{ user }</span>) {\\n  <span class=\"hljs-keyword\">const</span> [darkMode, setDarkMode] = <span class=\"hljs-title function_\">useState</span>(<span class=\"hljs-literal\">false</span>);\\n\\n  <span class=\"hljs-keyword\">return</span> (\\n    <span class=\"language-xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">className</span>=<span class=\"hljs-string\">{</span>`<span class=\"hljs-attr\">card</span> ${<span class=\"hljs-attr\">darkMode</span> ? \'<span class=\"hljs-attr\">dark</span>\' <span class=\"hljs-attr\">:</span> \'<span class=\"hljs-attr\">light</span>\'}`}&gt;</span>\\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Avatar</span> <span class=\"hljs-attr\">src</span>=<span class=\"hljs-string\">{user.avatar}</span> /&gt;</span>\\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h3</span>&gt;</span>{user.name}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h3</span>&gt;</span>\\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>{user.bio}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ToggleSwitch</span> \\n        <span class=\"hljs-attr\">checked</span>=<span class=\"hljs-string\">{darkMode}</span>\\n        <span class=\"hljs-attr\">onChange</span>=<span class=\"hljs-string\">{setDarkMode}</span>\\n        <span class=\"hljs-attr\">label</span>=<span class=\"hljs-string\">\</span>\"<span class=\"hljs-attr\">深色模式</span>\\"\\n      /&gt;</span>\\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span></span>\\n  );\\n}\\n</code></pre>\\n<p><strong>Locofy</strong>则可以将Figma设计文件直接转换为高质量的生产就绪代码，支持响应式布局和组件化结构。</p>\\n<h3>4. 🤖 AI测试生成工具：CodiumAI与Testim</h3>\\n<p>生成全面且有效的测试用例一直是开发的痛点，AI测试工具正在改变这一现状：</p>\\n<p><strong>CodiumAI</strong>分析代码逻辑，自动生成单元测试和集成测试，覆盖边缘情况和异常路径。</p>\\n<p><strong>Testim</strong>利用机器学习创建和维持端到端测试，自动适应UI变化，减少测试维护成本。</p>\\n<h3>5. 📊 AI性能优化工具：Partytown与Next.js Analytics</h3>\\n<p><strong>Partytown</strong>巧妙地将第三方脚本移至Web Worker中执行，避免主线程阻塞，通过AI智能判断哪些脚本可以安全转移。</p>\\n<p><strong>Next.js Analytics</strong>（增强版）现在包含AI驱动的性能建议，分析真实用户数据，提供具体的优化方案，如代码分割点建议、图像优化策略等。</p>\\n<h3>6. 🔧 AI驱动的状态管理：Zustand AI与TanStack Query v5</h3>\\n<p>新一代状态管理库开始集成AI能力：</p>\\n<p><strong>Zustand AI</strong>可以分析应用状态变化模式，建议状态结构优化，自动检测不必要的重新渲染。</p>\\n<p><strong>TanStack Query v5</strong>的AI增强功能可以预测数据需求，智能预取用户可能需要的下一组数据。</p>\\n<h3>7. 🗣️ AI语音与对话界面：Vercel AI SDK与Speechly</h3>\\n<p>语音交互正成为Web应用的重要界面：</p>\\n<p><strong>Vercel AI SDK</strong>提供了统一的AI功能集成框架，支持OpenAI、Anthropic、开源模型等多种后端，简化了聊天界面、流式响应等功能的实现。</p>\\n<p><strong>Speechly</strong>提供了高质量的语音转文本和意图识别，特别适合需要语音输入的Web应用。</p>\\n<h3>8. 🖼️ AI图像与媒体处理：Cloudinary AI与imgix</h3>\\n<p><strong>Cloudinary AI</strong>提供了全面的媒体AI功能：</p>\\n<ul>\\n<li><strong>智能裁剪</strong>：基于内容感知的自动裁剪和焦点检测</li>\\n<li><strong>背景移除</strong>：高质量的前景提取</li>\\n<li><strong>自动标记</strong>：为图像库生成搜索标签</li>\\n<li><strong>样式转换</strong>：应用艺术风格到用户上传的图像</li>\\n</ul>\\n<p><strong>imgix</strong>的AI参数可以实时优化图像交付，根据设备能力和网络条件自动调整图像格式和质量### 9. 📈 AI分析与个性化：Census与Hightouch</p>\\n<p>将业务数据与AI模型连接的工具：</p>\\n<p><strong>Census</strong>可以将数据仓库中的客户数据同步到各种AI服务中，实现基于实时数据的个性化。</p>\\n<p><strong>Hightouch</strong>的AI功能可以基于用户行为预测下一步最佳行动，并自动执行跨平台个性化体验。</p>\\n<h3>10. 🔐 AI安全工具：Snyk AI与GitGuardian</h3>\\n<p><strong>Snyk AI</strong>可以检测传统工具难以发现的复杂安全漏洞，特别是与AI模型交互相关的风险。</p>\\n<p><strong>GitGuardian</strong>的AI增强功能可以检测代码中的敏感信息（如API密钥）和潜在的合规问题。</p>\\n<h2>💼 如何构建你的AI工具栈：实践指南</h2>\\n<h3>阶段式采用策略</h3>\\n<p><strong>初学者阶段（1-3个月）</strong></p>\\n<ol>\\n<li>从AI代码助手开始（Cursor或GitHub Copilot）</li>\\n<li>添加AI代码审查工具（Codiga）</li>\\n<li>尝试一个AI测试生成工具（CodiumAI）</li>\\n</ol>\\n<p><strong>中级阶段（4-6个月）</strong></p>\\n<ol>\\n<li>集成设计到代码工具（V0或Locofy）</li>\\n<li>添加AI性能分析工具（Next.js Analytics）</li>\\n<li>探索AI媒体处理（Cloudinary AI）</li>\\n</ol>\\n<p><strong>高级阶段（7-12个月）</strong></p>\\n<ol>\\n<li>实施AI分析与个性化工具</li>\\n<li>集成AI安全工具</li>\\n<li>开发自定义AI工作流，连接多个工具</li>\\n</ol>\\n<h3>成本效益分析</h3>\\n<table>\\n<thead>\\n<tr>\\n<th>工具类别</th>\\n<th>年度成本范围</th>\\n<th>预期效率提升</th>\\n<th>ROI周期</th>\\n</tr>\\n</thead>\\n<tbody><tr>\\n<td>AI代码助手</td>\\n<td>$100-$500/开发者</td>\\n<td>30-50%</td>\\n<td>1-2个月</td>\\n</tr>\\n<tr>\\n<td>AI测试工具</td>\\n<td>$200-$1000/团队</td>\\n<td>40-60%测试时间减少</td>\\n<td>3-4个月</td>\\n</tr>\\n<tr>\\n<td>AI设计工具</td>\\n<td>$300-$1500/团队</td>\\n<td>70%设计到代码时间</td>\\n<td>2-3个月</td>\\n</tr>\\n<tr>\\n<td>AI性能工具</td>\\n<td>$0-$500/项目</td>\\n<td>20-40%性能提升</td>\\n<td>持续收益</td>\\n</tr>\\n</tbody></table>\\n<h3>技能发展路线图</h3>\\n<p><strong>2026年Web开发者AI技能矩阵：</strong></p>\\n<pre><code class=\"hljs language-markdown\">必备技能：\\n<span class=\"hljs-bullet\">1.</span> 基础Prompt工程 - 有效与AI工具沟通\\n<span class=\"hljs-bullet\">2.</span> AI输出验证 - 判断AI生成代码的质量与安全性\\n<span class=\"hljs-bullet\">3.</span> 工具集成 - 将AI工具融入现有工作流\\n\\n进阶技能：\\n<span class=\"hljs-bullet\">1.</span> 微调与定制 - 为特定需求调整AI模型\\n<span class=\"hljs-bullet\">2.</span> 工作流自动化 - 创建AI驱动的自动化流程\\n<span class=\"hljs-bullet\">3.</span> 伦理与合规 - 确保AI工具使用的合规性\\n\\n专家技能：\\n<span class=\"hljs-bullet\">1.</span> 模型训练 - 为特定领域训练专用模型\\n<span class=\"hljs-bullet\">2.</span> 工具开发 - 创建自定义AI开发工具\\n<span class=\"hljs-bullet\">3.</span> 架构设计 - 设计AI原生的应用架构\\n</code></pre>\\n<h2>🚀 结语：人机协作的新时代</h2>\\n<p>2026年的Web开发不再是单纯的人类编程，而是人与AI的深度协作。最成功的开发者将是那些能够有效利用AI工具、将其整合到工作流程中，并专注于AI不擅长的创造性、战略性和人际互动任务的开发者。</p>\\n<p>AI工具不会取代开发者，但使用AI工具的开发者将取代不使用AI工具的开发者。现在正是探索、实验和掌握这些工具的最佳时机。</p>\\n<p><em>你的工具箱决定你的竞争力，在AI时代尤为如此。</em></p>',
  '探索2026年Web开发者必备的十大AI工具，从智能IDE到AI测试、性能优化和安全工具，全面提升开发效率和应用质量。',
  'AI',
  'admin',
  '2 分钟阅读',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('AI代理');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = 'AI代理';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('企业智能化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = '企业智能化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自主系统');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = '自主系统';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('数字化转型');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = '数字化转型';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('业务流程自动化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = '业务流程自动化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('人机协作');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = '人机协作';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('AI趋势2026');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6958bc5575685f306ba8a511', id FROM blog_tags WHERE tag_name = 'AI趋势2026';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '69593a0f889d6023ff39477c',
  '无能乱怒',
  '<h1>新年随想</h1>\\n<hr>\\n<strong>无语了家人们，谁懂啊，学校放假3天，何意味？🥲1/1到1/3，特么周日早上7点前返校</strong>\\n<hr>\\n<strong>话又说回来了，神特么三天假期布置的作业是一堆接着一堆乱七八糟的，烦死了</strong>\\n<hr>\\n<strong>现在是1/3晚上23:47分，特么还差一张历史试卷和一本语文练习，毁灭吧。。。</strong>',
  '一个人的无能狂怒，新年随想',
  '其他',
  'admin',
  '1 分钟阅读',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('何意味');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593a0f889d6023ff39477c', id FROM blog_tags WHERE tag_name = '何意味';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('无语');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593a0f889d6023ff39477c', id FROM blog_tags WHERE tag_name = '无语';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('期末');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593a0f889d6023ff39477c', id FROM blog_tags WHERE tag_name = '期末';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '69593b3854712079f95663a4',
  '啦啦啦啦啦啦啦啊',
  '啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n',
  '啦啦啦啦啦啦啦啦，库里库里库里库里',
  '其他',
  'apollo',
  '1 分钟阅读',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('库里');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593b3854712079f95663a4', id FROM blog_tags WHERE tag_name = '库里';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '69593b93ab078458c941486d',
  '啦啦啦啦啦啦啦啦，库里库里库里库里 啦啦啦啦啦啦啦啦，库里库里库里库里 啦啦啦啦啦啦啦啦，库里库里库里库里',
  '<h1>啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n</h1>',
  '无',
  '其他',
  'apollo',
  '1 分钟阅读',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('啦啦啦啦啦啦啦啦');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593b93ab078458c941486d', id FROM blog_tags WHERE tag_name = '啦啦啦啦啦啦啦啦';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('库里库里库里库里库里');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593b93ab078458c941486d', id FROM blog_tags WHERE tag_name = '库里库里库里库里库里';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '69593bed86e785101d696ddc',
  '无语了',
  '啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n啦啦啦啦啦啦啦啦，库里库里库里库里\\n',
  '我真的无语了',
  '技术',
  'apollo',
  '1 分钟阅读',
  1,
  '{"*":{"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('无语了');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69593bed86e785101d696ddc', id FROM blog_tags WHERE tag_name = '无语了';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c591a7e41365f91daa33e',
  'HTML静态页面设计指南：无JS的精美网页制作',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #667eea; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #f6f9ff 0%, #f0f4ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);}.code-block {background: #1a202c; color: #e2e8f0; padding: 1.5rem; border-radius: 8px; font-family: \'Fira Code\', monospace; margin: 1.5rem 0; overflow-x: auto;}.tech-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tech-card {background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease; border-top: 4px solid #4299e1;}.tech-card:hover {transform: translateY(-5px);}.feature-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.feature-list li:before {content: \'⚡\'; position: absolute; left: 0; color: #4299e1;}.img-container {text-align: center; margin: 2rem 0;}.tech-img {max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);}</style><h1 class=\'post-title\'>HTML静态页面设计指南：无JS的精美网页制作</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop\' alt=\'HTML网页设计\' class=\'tech-img\' width=\'800\' height=\'400\'></div><p>在当今Web开发中，虽然JavaScript功能强大，但有时我们只需要一个纯粹的HTML页面来展示内容。本文将介绍如何创建一个不依赖JavaScript的美观HTML页面，包含图片和链接导航，完全符合现代网页设计标准。</p><section><h2 class=\'section-title\'>🎨 美观设计原则</h2><div class=\'feature-box\'><p>一个优秀的HTML页面应该具备：</p><ul class=\'feature-list\'><li>清晰的视觉层次结构</li><li>一致的颜色搭配和字体选择</li><li>合理的留白和间距</li><li>响应式布局适配不同设备</li></ul></div><p>我们可以使用CSS样式表来定义页面外观，通过嵌入式或外部样式表来实现复杂的视觉效果，而无需任何JavaScript代码。</p></section><section><h2 class=\'section-title\'>🖼️ 图片处理技巧</h2><p>在HTML页面中添加图片是增强视觉效果的重要手段：</p><div class=\'tech-grid\'><div class=\'tech-card\'><h3>图片优化</h3><p>使用适当的图片格式（JPEG、PNG、WebP）以获得最佳质量和加载速度</p></div><div class=\'tech-card\'><h3>响应式图片</h3><p>使用<code>srcset</code>和<code>sizes</code>属性支持不同屏幕尺寸</p></div><div class=\'tech-card\'><h3>图片懒加载</h3><p>通过<code>loading=\'lazy\'</code>属性延迟加载非首屏图片</p></div></div></section><section><h2 class=\'section-title\'>🔗 导航与链接</h2><p>使用<a href=\'#\'>a标签</a>创建导航链接，确保用户可以方便地跳转到相关内容。良好的链接设计包括：</p><ul class=\'feature-list\'><li>清晰的链接文本描述</li><li>合适的链接颜色和悬停效果</li><li>面包屑导航帮助用户了解当前位置</li><li>锚点链接快速定位页面内特定区域</li></ul><p>所有链接都应该具有明确的目的性和可访问性。</p></section><p class=\'feature-box\'><strong>注意事项：</strong>在创建无JavaScript的HTML页面时，请确保所有功能都通过HTML和CSS原生实现。避免使用JavaScript来控制页面行为，这样可以提高页面的加载速度和可访问性。</p><p>通过合理运用HTML和CSS，我们可以创造出既美观又实用的静态网页，满足各种展示需求。</p></div>',
  '创建一个美观的HTML页面，不使用JavaScript，支持图片和链接跳转，适用于公开帖子系统。',
  '技术',
  'admin',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"HTML"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c591a7e41365f91daa33e', id FROM blog_tags WHERE tag_name = '"HTML"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"前端开发"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c591a7e41365f91daa33e', id FROM blog_tags WHERE tag_name = '"前端开发"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"网页设计');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c591a7e41365f91daa33e', id FROM blog_tags WHERE tag_name = '"网页设计';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c597a7e41365f91daa344',
  '寻找日常的宁静：五分钟正念仪式指南',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333; background: #fefefe; padding: 2rem; border-radius: 16px;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #0d9488; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #134e4a; border-bottom: 2px solid #ccfbf1; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.ritual-box {background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 16px; padding: 2rem; margin: 1.5rem 0; border: 1px solid #99f6e4; box-shadow: 0 6px 12px rgba(5, 150, 105, 0.08);}.quote-block {background: #f8fafc; color: #334155; padding: 1.5rem; border-radius: 12px; font-family: \'Georgia\', serif; font-style: italic; margin: 1.5rem 0; border-left: 4px solid #0d9488;}.tip-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tip-card {background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease; border-top: 4px solid #2dd4bf;}.tip-card:hover {transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);}.step-list li {padding: 0.75rem 0; position: relative; padding-left: 2rem;}.step-list li:before {content: \'🧘\'; position: absolute; left: 0;}.img-container {text-align: center; margin: 2rem 0;}.peace-img {max-width: 100%; border-radius: 16px; box-shadow: 0 15px 40px rgba(5, 150, 105, 0.15);}.resource-link {color: #0f766e; text-decoration: none; border-bottom: 1px dashed #2dd4bf;}.resource-link:hover {color: #134e4a; border-bottom-style: solid;}</style><h1 class=\'post-title\'>寻找日常的宁静：五分钟正念仪式指南</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center\' alt=\'宁静的早晨与一杯茶\' class=\'peace-img\' width=\'800\' height=\'400\'></div><p>在信息过载和持续忙碌的时代，<strong>内心的平静</strong>成为一种稀缺资源。然而，建立宁静并不需要遁入深山。通过简短的日常仪式，我们可以在喧嚣中锚定自己。本文介绍一套任何人都能实践的<em>五分钟正念仪式</em>，帮助您重新连接当下。</p><section><h2 class=\'section-title\'>🌅 晨间锚定：开启清醒的一天</h2><div class=\'ritual-box\'><p><strong>「呼吸之锚」练习</strong>：起床后的第一件事，不是查看手机，而是给自己五分钟的宁静。坐在舒适的位置，感受身体与床或椅子的接触点，然后简单地将注意力放在呼吸上。</p></div><ul class=\'step-list\'><li><strong>第一分钟：</strong>身体扫描。从脚趾到头顶，感受身体各部位的状态，不做评判。</li><li><strong>第二、三分钟：</strong>自然呼吸。观察气息的进出，当思绪飘走时，温和地将它带回呼吸。</li><li><strong>第四分钟：</strong>设定意图。在心中默念一个简单的当日意图，如“今日我将保持耐心”。</li><li><strong>第五分钟：</strong>感恩时刻。回想一件你感恩的事物，哪怕微小如清晨的阳光。</li></ul></section><section><h2 class=\'section-title\'>🍃 日常微正念：将平静融入间隙</h2><p>正念无需专门抽出大段时间。利用日常事务的间隙，即可重置你的神经系统：</p><div class=\'tip-grid\'><div class=\'tip-card\'><h3>茶水冥想</h3><p>泡茶或咖啡时，全神贯注于过程——声音、气味、温度。饮用时，感受每一口的热度与味道。</p></div><div class=\'tip-card\'><h3>步行觉知</h3><p>短距离步行时，感受脚掌接触地面的感觉，注意身体的移动和周围空气的流动。</p></div><div class=\'tip-card\'><h3>等待呼吸</h3><p>在排队或等电梯时，进行三次深长的呼吸，将等待时间转化为恢复精力的机会。</p></div></div></section><div class=\'quote-block\'><p>“你无法阻止波浪，但你可以学习冲浪。” —— 乔·卡巴金（正念减压疗法创始人）</p></div><section><h2 class=\'section-title\'>🌙 夜晚沉淀：为睡眠做准备</h2><p>睡前的五分钟仪式，可以帮助大脑从白天的刺激中脱离，进入休息状态：</p><div class=\'ritual-box\'><p><strong>「放下的仪式」：</strong>准备一个小本子或手机备忘录。花五分钟写下：\\n1. 今天完成的<em>一件事</em>（肯定你的努力）。\\n2. 一件<em>学到的事</em>（关注成长）。\\n3. 一件需要<em>放下的事</em>（将忧虑“存”到纸上，而非带入梦中）。\\n完成后，进行四次深呼吸，吸气数到四，屏息数到四，呼气数到六，告诉自己：“这一天的工作已完成。”</p></div></section><p class=\'ritual-box\'><strong>坚持的关键：</strong>不要追求完美。即使只做了一分钟，也值得肯定。关键在于<em>定期回归</em>，而非每次的时长。可以设置每日提醒，或将仪式与已有习惯（如刷牙后）绑定。</p><p>这些简单的实践，就像在心灵花园中每日浇水。它们不会立刻消除所有压力，但会逐渐培养你<em>在风暴中心保持平静</em>的能力。更多资源可访问<a href=\'https://www.mindful.org\' class=\'resource-link\' target=\'_blank\'>正念组织官网</a>或<a href=\'https://www.headspace.com\' class=\'resource-link\' target=\'_blank\'>Headspace应用</a>。</p></div>',
  '如何在快节奏的现代生活中，通过简单的日常仪式与正念练习，找回内心的平静与力量。',
  '其他',
  'admin',
  '2 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"正念"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c597a7e41365f91daa344', id FROM blog_tags WHERE tag_name = '"正念"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"心理健康"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c597a7e41365f91daa344', id FROM blog_tags WHERE tag_name = '"心理健康"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"自我提升"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c597a7e41365f91daa344', id FROM blog_tags WHERE tag_name = '"自我提升"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"日常生活"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c597a7e41365f91daa344', id FROM blog_tags WHERE tag_name = '"日常生活"';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c5c58c8166b72f7cd09cb',
  '城市角落的诗意：在咖啡馆里阅读世界',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Georgia\', serif; line-height: 1.8; color: #4a4a4a; max-width: 800px; margin: 0 auto; padding: 2rem; background: #fffaf5;}.post-title {font-size: 2.2rem; font-weight: normal; color: #5c4b37; margin-bottom: 0.5rem; text-align: center; letter-spacing: -0.5px;}.subtitle {text-align: center; color: #a67c52; font-style: italic; margin-bottom: 2rem; font-size: 1.1rem;}.hero-img {width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin: 2rem 0; box-shadow: 0 5px 15px rgba(0,0,0,0.1);}.section {margin: 2.5rem 0;}.section-title {font-size: 1.5rem; color: #5c4b37; border-bottom: 1px solid #e8d5c4; padding-bottom: 0.5rem; margin-bottom: 1.5rem; font-weight: normal;}.intro {font-size: 1.2rem; color: #7a6a5a; text-align: center; margin: 2rem 0; font-style: italic;}.story-box {background: #fffdf9; border-left: 3px solid #c9a87c; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);}.quote {font-size: 1.3rem; color: #8c6d4f; text-align: center; margin: 2rem 0; padding: 1.5rem; background: #fff8f0; border-radius: 8px; font-style: italic;}.photo-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;}.photo-grid img {width: 100%; height: 200px; object-fit: cover; border-radius: 6px; transition: transform 0.3s ease;}.photo-grid img:hover {transform: scale(1.03);}.footer-note {text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e8d5c4; color: #a67c52; font-size: 0.95rem;}.footer-note a {color: #8c6d4f; text-decoration: none; border-bottom: 1px dotted;}.footer-note a:hover {color: #5c4b37;}</style><h1 class=\'post-title\'>城市角落的诗意：在咖啡馆里阅读世界</h1><p class=\'subtitle\'>那些藏在街角的时间琥珀</p><img src=\'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=400&fit=crop\' alt=\'咖啡馆内景\' class=\'hero-img\'><p class=\'intro\'>每个城市都有自己的心跳，而咖啡馆就是最能听见这种脉搏的地方。它们不是景点，不是地标，却是城市灵魂最诚实的倒影。</p><div class=\'section\'><h2 class=\'section-title\'>☕ 关于氛围</h2><p>维也纳中央咖啡馆的丝绒座椅里，还残留着茨威格的灵感；巴黎花神咖啡馆的镜子，曾映照过萨特和波伏娃的侧影。但更多时候，打动我们的不是这些传奇，而是街角那家无名小馆——晨光斜斜地照在木桌上，咖啡机发出熟悉的嘶嘶声，店主默默记住你的习惯口味。</p><div class=\'story-box\'><p>在京都的寺町通，有家只有八个座位的咖啡店。老板娘年过七旬，每天只营业三小时。她说：「咖啡是有脾气的，泡太多会累。」这里的每一杯都像是手写信，带着温度，带着耐心，带着无法复制的当下。</p></div></div><div class=\'section\'><h2 class=\'section-title\'>⏳ 关于时间</h2><p>咖啡馆教会我们的最重要一课，是如何浪费时间。不是挥霍，而是有质感地、有觉知地度过。在这里，一小时可以很长，长得足够读完一章书，写完一首诗，或者只是看着窗外发呆，让思绪飘到很远的地方。</p><div class=\'photo-grid\'><img src=\'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop\' alt=\'咖啡拉花\'><img src=\'https://images.unsplash.com/photo-1554119921-6c2c948fd9b0?w=400&h=300&fit=crop\' alt=\'阅读时光\'><img src=\'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop\' alt=\'街景\'></div><p>米兰的咖啡师告诉我，他们从不催促客人。一杯浓缩可以续成一下午的聊天，一张小桌可以承载整天的阅读。时间在这里变得宽容，像咖啡上的奶泡，轻柔地包裹住每一个需要喘息的灵魂。</p></div><div class=\'section\'><h2 class=\'section-title\'>👥 关于相遇</h2><p>最动人的是咖啡馆里的无声交汇。邻桌女生在笔记本上敲打的小说，角落里老夫妇分享的提拉米苏，吧台边独自看书的年轻人。我们互不相识，却共享同一片空气，同一种节奏，同一个午后的慵懒。</p><div class=\'quote\'>「咖啡馆是城市的第三空间，不是家，不是办公室，而是属于你的，可以什么都不做的地方。」</div><p>在里斯本的一家老店里，我见过一位老爷爷每天下午三点准时出现，点一杯bica，看一份旧报纸。店员说，他已经这样坐了二十年。那张靠窗的座位，几乎成了他的第二个家。这种仪式感，让平凡的日子有了锚点。</p></div><div class=\'section\'><p class=\'story-box\'>如今，我们活得太快，快到忘记了停顿的美。而咖啡馆固执地存在着，提醒着我们：生活不是效率的堆砌，而是瞬间的集合。那个阳光正好的下午，那杯温度刚好的咖啡，那本翻了一半的书，那位擦肩而过的陌生人——这些才是构成生命质感的，微小而确切的幸福。</p></div><p class=\'footer-note\'>你在哪里遇到了最喜欢的咖啡馆？<a href=\'#\'>分享你的故事</a>，让我们一起收藏这些城市角落的温暖。</p></div>',
  '在城市的褶皱里，总有一些安静的角落，咖啡馆就像时间的琥珀，将匆忙世界隔绝在外。这里收藏着每个人的故事，也酝酿着生活的诗意。',
  '其他',
  'admin',
  '2 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"生活方式"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c5c58c8166b72f7cd09cb', id FROM blog_tags WHERE tag_name = '"生活方式"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"咖啡文化"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c5c58c8166b72f7cd09cb', id FROM blog_tags WHERE tag_name = '"咖啡文化"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"城市探索"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c5c58c8166b72f7cd09cb', id FROM blog_tags WHERE tag_name = '"城市探索"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"慢生活"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c5c58c8166b72f7cd09cb', id FROM blog_tags WHERE tag_name = '"慢生活"';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('"阅读"');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c5c58c8166b72f7cd09cb', id FROM blog_tags WHERE tag_name = '"阅读"';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c61a47e41365f91daa3e4',
  '城市漫步指南：在匆忙生活中寻找静谧角落',
  '<div class=\'post-container\'><style>.post-container {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.8; color: #444; max-width: 100%; padding: 1.5rem; background: linear-gradient(to bottom, #fafafa, #ffffff);}.post-header {text-align: center; margin-bottom: 2.5rem;}.main-title {font-size: 2.2rem; font-weight: 700; background: linear-gradient(135deg, #e76f51 0%, #f4a261 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; letter-spacing: -0.5px;}.subtitle {color: #6c757d; font-size: 1.1rem; font-style: italic;}.hero-image {width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin: 1.5rem 0;}.section {margin: 2rem 0;}.section-title {font-size: 1.6rem; color: #2a9d8f; border-left: 4px solid #e9c46a; padding-left: 1rem; margin: 1.5rem 0; font-weight: 600;}.text-block {background: rgba(255,255,255,0.8); padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin: 1rem 0;}.highlight-box {background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 5px solid #e76f51; padding: 1.2rem; border-radius: 8px; margin: 1.5rem 0;}.tip-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; margin: 1.5rem 0;}.tip-card {background: white; border-radius: 10px; padding: 1.2rem; box-shadow: 0 3px 10px rgba(0,0,0,0.08); transition: transform 0.3s; border-top: 3px solid #2a9d8f;}.tip-card:hover {transform: translateY(-3px);}.tip-card h4 {color: #264653; margin-bottom: 0.5rem; font-size: 1.1rem;}.tip-card p {color: #6c757d; font-size: 0.95rem; line-height: 1.6;}.link-list {display: flex; flex-wrap: wrap; gap: 0.8rem; margin: 1.5rem 0;}.tag-link {background: #e9ecef; color: #495057; padding: 0.4rem 1rem; border-radius: 20px; text-decoration: none; font-size: 0.9rem; transition: all 0.3s; display: inline-block;}.tag-link:hover {background: #dee2e6; transform: translateY(-2px);}.quote-box {font-style: italic; color: #495057; border-left: 3px solid #e9c46a; padding-left: 1.2rem; margin: 1.5rem 0; font-size: 1.1rem;}.footer-note {text-align: center; color: #6c757d; font-size: 0.9rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #dee2e6;}</style><div class=\'post-header\'><h1 class=\'main-title\'>城市漫步指南：在匆忙生活中寻找静谧角落</h1><p class=\'subtitle\'>慢下来，感受城市的呼吸与温度</p></div><img src=\'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=600&fit=crop\' alt=\'城市街道风景\' class=\'hero-image\'><div class=\'section\'><div class=\'text-block\'><p>清晨六点，城市还未完全苏醒。街角的面包店飘出刚出炉的可颂香气，洒水车刚刚驶过的沥青路面闪着微光。这样的时刻，整个世界仿佛只属于你一个人。</p><p>城市漫步不是漫无目的的游荡，而是一场<b>有意识的探索</b>。它教会我们在熟悉的环境中看见陌生，在日常的重复中发现新意。每一次转角，都可能遇见一家隐藏的书店、一面布满涂鸦的墙，或是一位正在浇花的老先生。</p></div></div><div class=\'section\'><h2 class=\'section-title\'>为何我们需要城市漫步？</h2><div class=\'highlight-box\'><p>现代生活节奏太快，我们常常像陀螺一样旋转，却忘了为何出发。漫步让我们重新连接身体与空间，让思维在脚步中自然流淌。研究表明，步行不仅能改善身体健康，更能促进创造性思维，缓解焦虑和抑郁情绪。</p></div></div><div class=\'section\'><h2 class=\'section-title\'>五个让漫步更有意义的秘诀</h2><div class=\'tip-grid\'><div class=\'tip-card\'><h4>1. 放下手机</h4><p>将手机调至静音，只用来拍照记录。让眼睛代替屏幕，真正观察周围的世界。</p></div><div class=\'tip-card\'><h4>2. 选择不同路线</h4><p>每周尝试一条从未走过的小巷，打破日常的惯性路径。</p></div><div class=\'tip-card\'><h4>3. 带上五感</h4><p>聆听鸟鸣和树叶摩擦声，感受阳光的温度，闻闻空气中的味道。</p></div><div class=\'tip-card\'><h4>4. 记录美好</h4><p>带上小本子或相机，捕捉那些转瞬即逝的瞬间。</p></div><div class=\'tip-card\'><h4>5. 与陌生人微笑</h4><p>礼貌的互动能让城市变得更有温度。</p></div></div></div><div class=\'section\'><div class=\'quote-box\'><p>“城市的美丽不在于它的建筑，而在于那些发生在街道上的生活。”—— 简·雅各布斯</p></div></div><div class=\'section\'><h2 class=\'section-title\'>推荐的城市漫步目的地</h2><div class=\'text-block\'><p>每个城市都有属于自己的<b>秘密花园</b>。在老城区寻找百年梧桐树下的咖啡馆，在文创园区看年轻人如何将工业遗产改造成艺术空间，在滨江步道感受水与城市的对话。</p><p>不必追求网红打卡点，真正属于你的风景，往往藏在<b>无人问津的角落</b>。那个阳光正好洒在长椅上的午后，那本在二手书店偶然发现的诗集，那杯在街角小馆喝到惊喜的特调咖啡。</p></div></div><div class=\'section\'><h2 class=\'section-title\'>延伸阅读与灵感</h2><div class=\'link-list\'><a href=\'/tag/street-photography\' class=\'tag-link\'>街头摄影技巧</a><a href=\'/tag/slow-living\' class=\'tag-link\'>慢生活哲学</a><a href=\'/tag/local-guides\' class=\'tag-link\'>本地探索指南</a><a href=\'/tag/urban-gardening\' class=\'tag-link\'>城市园艺</a><a href=\'/tag/independent-bookstore\' class=\'tag-link\'>独立书店地图</a></div></div><div class=\'footer-note\'><p>生活不在别处，就在这些细碎的日常里。</p><p>感谢阅读，愿你的每一步都充满惊喜。</p></div></div>',
  '在快节奏的城市中，如何通过漫步重新发现身边的美好，找到属于自己的静谧时刻',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活方式');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c61a47e41365f91daa3e4', id FROM blog_tags WHERE tag_name = '生活方式';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市探索');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c61a47e41365f91daa3e4', id FROM blog_tags WHERE tag_name = '城市探索';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c61a47e41365f91daa3e4', id FROM blog_tags WHERE tag_name = '慢生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('摄影');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c61a47e41365f91daa3e4', id FROM blog_tags WHERE tag_name = '摄影';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c61a47e41365f91daa3e4', id FROM blog_tags WHERE tag_name = '旅行';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c661b8540b46fa23fee9a',
  '当脚步慢下来，世界才开始清晰',
  '<div class=\'blog-post\'><style>.blog-post { font-family: \'Georgia\', serif; background: linear-gradient(to bottom, #fffaf5, #fff8f0); color: #444; padding: 2.5rem; max-width: 800px; margin: 0 auto; line-height: 1.8; }.post-header { text-align: center; padding-bottom: 2rem; border-bottom: 1px solid #e8d5c4; margin-bottom: 2rem; }.main-title { font-size: 2.6rem; color: #8c6d5f; margin: 0; letter-spacing: -0.5px; }.section-intro { font-size: 1.15rem; color: #a1887f; font-style: italic; margin-top: 1rem; }.section-title { font-size: 1.8rem; color: #8c6d5f; margin: 2.5rem 0 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid #e8d5c4; }.thought-box { background: rgba(255, 255, 255, 0.7); border-radius: 16px; padding: 2rem; margin: 2.5rem 0; box-shadow: 0 6px 20px rgba(140, 109, 95, 0.08); border: 1px solid #f0e6df; }.img-wrapper { margin: 2.5rem 0; text-align: center; }.life-img { max-width: 90%; border-radius: 20px; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); transition: transform 0.4s ease; }.life-img:hover { transform: scale(1.02); }.story-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.8rem; margin: 2.5rem 0; }.story-card { background: rgba(255, 255, 255, 0.8); padding: 1.8rem; border-radius: 14px; border-top: 5px solid #d7b8a3; transition: all 0.3s ease; }.story-card:hover { transform: translateY(-8px); box-shadow: 0 8px 25px rgba(140, 109, 95, 0.12); }.quote-text { font-size: 1.2rem; color: #7e5e51; text-align: center; line-height: 1.9; padding: 1.5rem; border-left: 4px solid #d7b8a3; margin: 2.5rem 0; background: rgba(215, 184, 163, 0.1); border-radius: 8px; }.link-text { color: #a77e6d; text-decoration: none; font-weight: 600; position: relative; }.link-text:hover { color: #8c6d5f; }.footer-note { text-align: center; margin-top: 3rem; padding-top: 2rem; color: #a1887f; font-size: 0.95rem; border-top: 1px dashed #e8d5c4; }</style><div class=\'post-header\'><h1 class=\'main-title\'>当脚步慢下来，世界才开始清晰</h1><p class=\'section-intro\'>在高铁与航班的时代，选择一条更慢的路是否还有意义？</p></div><div class=\'img-wrapper\'><img src=\'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&h=600&fit=crop\' alt=\'山间小路\' class=\'life-img\' width=\'800\' height=\'400\'></div><p>上个月，我做了一件在朋友看来近乎疯狂的事——花了整整36小时，只为一趟600公里的旅程。没有动车，没有飞机，只有一辆普通的绿皮火车，哐当哐当地穿过无数个小镇和村庄。</p><h2 class=\'section-title\'>关于「快」的悖论</h2><div class=\'thought-box\'><p>我们总在追求效率，行程表精确到分钟，景点打卡按小时计算。可奇怪的是，走得越快，记忆越模糊。</p></div><p>那趟慢车没有Wi-Fi，信号时有时无。本以为会无聊到发疯，结果却意外地与对面坐着的老先生聊了一下午。他指着窗外说：「年轻人你看，那是高粱，那是玉米。」我这才发现，原来窗外的风景一直都在，只是我的注意力从未真正落在那里。</p><h2 class=\'section-title\'>被忽略的细节</h2><div class=\'story-grid\'><div class=\'story-card\'><h3 style=\'color:#a77e6d;margin-top:0\'>黄昏的炊烟</h3><p>列车傍晚经过村庄时，空气里飘来柴火的香气。那一刻，我突然想起了外婆家的厨房。</p></div><div class=\'story-card\'><h3 style=\'color:#a77e6d;margin-top:0\'>陌生人的善意</h3><p>午饭时分，旁边的大姐非要分给我半个她亲手做的肉夹馍，说「出门在外，别饿着」。</p></div><div class=\'story-card\'><h3 style=\'color:#a77e6d;margin-top:0\'>时间的重量</h3><p>没有进度条可滑，时间回到本来的样子——缓慢、真实、充满质感。</p></div></div><div class=\'img-wrapper\'><img src=\'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=500&fit=crop\' alt=\'旅途风景\' class=\'life-img\' width=\'700\' height=\'389\'></div><h2 class=\'section-title\'>慢是另一种抵达</h2><p>到达终点的时候，疲惫是真实的，但那种踏实的满足感也是久违了。这趟慢车让我意识到，生活不是打卡清单，世界也不是照片滤镜。真正动人的时刻，往往藏在意料之外的空隙里。</p><div class=\'quote-text\'>「走得快的时候，你在赶路；走得慢的时候，路在经过你。」</div><h2 class=\'section-title\'>给你的小建议</h2><ul style=\'list-style:none;padding-left:0\'><li style=\'padding:0.8rem 0;border-bottom:1px solid #efefef\'><strong style=\'color:#a77e6d\'>✦</strong> 下次去熟悉的城市，尝试坐一次末班公交车</li><li style=\'padding:0.8rem 0;border-bottom:1px solid #efefef\'><strong style=\'color:#a77e6d\'>✦</strong> 出门不带耳机，听听真实世界的声音</li><li style=\'padding:0.85rem 0;border-bottom:1px solid #efefef\'><strong style=\'color:#a77e6d\'>✦</strong> 迷路时先别急着开导航，随便走走看看</li><li style=\'padding:0.8rem 0\'><strong style=\'color:#a77e6d\'>✦</strong> 把一半的「行程」换成「闲逛」</li></ul><p>生活本没有标准答案，旅行也是。<aclass=\'link-text\' href=\'#\'>你有什么慢旅行的故事吗？</a>或者，你愿意尝试放下行程表，看看会发生什么吗？</p><p class=\'footer-note\' style=\'font-family:Georgia,serif\'>在速度与效率至上的人生里，偶尔选择「慢」，是对自己最好的温柔。</p></div>',
  '在这个快节奏的时代，慢旅行不仅是一种移动方式，更是一种生活态度。本文分享了抛开行程表后发现的世界，以及在路上不期而遇的美好瞬间。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c661b8540b46fa23fee9a', id FROM blog_tags WHERE tag_name = '慢生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c661b8540b46fa23fee9a', id FROM blog_tags WHERE tag_name = '旅行';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('人生感悟');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c661b8540b46fa23fee9a', id FROM blog_tags WHERE tag_name = '人生感悟';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('日常');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c661b8540b46fa23fee9a', id FROM blog_tags WHERE tag_name = '日常';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c68227b5b83189fd953f8',
  '在东京的24小时：一场与城市的温柔对话',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Noto Sans JP\', \'Segoe UI\', system-ui, sans-serif; line-height: 1.8; color: #2d3748; background: linear-gradient(135deg, #fef5e7 0%, #f8f4e9 100%); padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);}.post-title {font-size: 2.8rem; font-weight: 700; color: #c41e3a; margin-bottom: 1.5rem; text-align: center; position: relative; padding-bottom: 1rem;}.post-title:after {content: \'\'; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; background: linear-gradient(90deg, #c41e3a, #f4a460); border-radius: 2px;}.section-title {font-size: 1.8rem; color: #2d3748; margin: 2.5rem 0 1rem; padding-left: 1rem; border-left: 5px solid #c41e3a; font-weight: 600;}.feature-box {background: linear-gradient(135deg, #ffffff 0%, #fffaf0 100%); border-radius: 12px; padding: 1.8rem; margin: 2rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border-top: 3px solid #f4a460;}.img-container {text-align: center; margin: 2.5rem 0; position: relative;}.city-img {max-width: 100%; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.12); transition: transform 0.3s ease;}.city-img:hover {transform: scale(1.01);}.time-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; margin: 2rem 0;}.time-card {background: white; border-radius: 10px; padding: 1.2rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.3s ease; border-top: 3px solid #c41e3a;}.time-card:hover {transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1);}.time-card h3 {color: #c41e3a; margin-bottom: 0.5rem; font-size: 1.2rem;}.recommend-list {list-style: none; padding: 0;}.recommend-list li {padding: 0.8rem 0; border-bottom: 1px dashed #e2e8f0; position: relative; padding-left: 2rem;}.recommend-list li:before {content: \'🌸\'; position: absolute; left: 0; font-size: 1.2rem;}.quote-box {background: linear-gradient(135deg, #f8f4e9 0%, #fef5e7 100%); border-left: 5px solid #c41e3a; padding: 1.5rem; margin: 2rem 0; font-style: italic; color: #4a5568; border-radius: 0 8px 8px 0;}.link-btn {display: inline-block; background: linear-gradient(135deg, #c41e3a 0%, #e74c3c 100%); color: white; padding: 0.8rem 1.8rem; text-decoration: none; border-radius: 25px; margin: 0.5rem; transition: all 0.3s ease; font-weight: 500; box-shadow: 0 4px 10px rgba(196,30,58,0.2);}.link-btn:hover {transform: translateY(-2px); box-shadow: 0 6px 15px rgba(196,30,58,0.3);}</style><h1 class=\'post-title\'>在东京的24小时：一场与城市的温柔对话</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop\' alt=\'东京街头晨光\' class=\'city-img\' width=\'800\' height=\'400\'></div><p>清晨五点，东京还在沉睡。我走在<a href=\'#\' class=\'link-btn\'>筑地市场</a>附近的街道上，空气中弥漫着淡淡的海腥味。这座城市的苏醒，是从一杯热腾腾的味噌汤开始的。</p><div class=\'feature-box\'><p><strong>晨间仪式</strong>：在街角的喫茶店，看着店主用虹吸壶精心冲泡一壶咖啡，时间仿佛被刻意放慢。玻璃窗外，上班族们开始步履匆匆，而店内，一位老人正摊开《朝日新闻》，享受着属于他的宁静时刻。</p></div><section><h2 class=\'section-title\'>🌅 上午：城市的呼吸</h2><p>搭乘山手线，我来到了<a href=\'#\' class=\'link-btn\'>上野公园</a>。樱花季已过，但池塘里的莲花正含苞待放。一位画家坐在长椅上，用速写本捕捉着晨跑的少女和散步的老夫妇。</p><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop\' alt=\'上野公园风景\' class=\'city-img\' width=\'800\' height=\'400\'></div><ul class=\'recommend-list\'><li>在<a href=\'#\' class=\'link-btn\'>阿美横丁</a>品尝现烤的鲷鱼烧，外皮酥脆，内馅滚烫</li><li>钻进二手书店，寻找绝版的川端康成文库本</li><li>看一场下午的能剧表演，感受传统艺术的静寂之美</li></ul></section><section><h2 class=\'section-title\'>🍜 午后：味蕾的冒险</h2><div class=\'time-grid\'><div class=\'time-card\'><h3>12:00</h3><p>在<a href=\'#\' class=\'link-btn\'>浅草</a>的老店吃天妇罗，师傅用五十年的手艺，让虾肉在油锅里跳起完美的舞蹈</p></div><div class=\'time-card\'><h3>14:30</h3><p>钻进<a href=\'#\' class=\'link-btn\'>吉祥寺</a>的小巷，发现一家只有八个座位的喫茶店，老板娘的手冲咖啡带着坚果的香气</p></div><div class=\'time-card\'><h3>16:00</h3><p>在<a href=\'#\' class=\'link-btn\'>代官山</a>的杂货铺里，为朋友挑选一只手工烧制的清酒杯</p></div></div></section><section><h2 class=\'section-title\'>🌃 夜晚：城市的另一面</h2><p>黄昏时分，我登上了<a href=\'#\' class=\'link-btn\'>涩谷Sky</a>。360度的落地窗前，整座城市被染成琥珀色。远处的富士山轮廓若隐若现，像一位沉默的守护者。</p><div class=\'quote-box\'>「东京的美，在于它的矛盾。极致的现代与顽固的传统，喧嚣与寂静，快节奏与慢生活，都在这里找到了奇妙的平衡。」</div><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=400&fit=crop\' alt=\'东京夜景\' class=\'city-img\' width=\'800\' height=\'400\'></div><p>深夜十一点，钻进<a href=\'#\' class=\'link-btn\'>新宿</a>的小巷居酒屋。老板递来一杯冰镇的清酒，邻座的白领刚刚结束加班，用筷子夹着烤鸡串，脸上终于露出了放松的笑容。</p></section><div class=\'feature-box\'><h3>💡 旅行小贴士</h3><p>不必追赶所有景点，选择一两个区域深度漫游。买一张<a href=\'#\' class=\'link-btn\'>24小时地铁通票</a>，迷路也没关系——最美的风景往往在计划之外。记得带一双好走的鞋，因为你会忍不住想要用脚步丈量这座城市的每一个角落。</p></div><p>在东京的24小时，我学会了与一座城市对话的方式。不是走马观花，而是用心感受它的脉搏，聆听它的故事，品味它的温度。这座城市永远不会让你感到无聊，每一次转角，都可能遇见意想不到的惊喜。</p><div style=\'text-align: center; margin-top: 3rem;\'><a href=\'#\' class=\'link-btn\'>分享你的东京故事</a><a href=\'#\' class=\'link-btn\'>查看更多旅行随笔</a></div></div>',
  '在东京的一天，从清晨的筑地市场到深夜的居酒屋，感受这座城市的呼吸与脉搏，体验快节奏与慢生活的完美交融。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c68227b5b83189fd953f8', id FROM blog_tags WHERE tag_name = '旅行';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活方式');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c68227b5b83189fd953f8', id FROM blog_tags WHERE tag_name = '生活方式';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市漫步');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c68227b5b83189fd953f8', id FROM blog_tags WHERE tag_name = '城市漫步';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('日本文化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c68227b5b83189fd953f8', id FROM blog_tags WHERE tag_name = '日本文化';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c6a33c8166b72f7cd0aae',
  '在缝隙中生长：给都市人的慢生活指南',
  '<div class=\'lifestyle-container\'><style>.lifestyle-container { font-family: \'Noto Serif SC\', serif; background-color: #f9f7f2; color: #3a3a3a; padding: 30px; border-radius: 20px; line-height: 1.8; max-width: 900px; margin: auto; }.hero-banner { position: relative; overflow: hidden; border-radius: 15px; margin-bottom: 40px; height: 350px; }.hero-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9); }.hero-text { position: absolute; bottom: 30px; left: 30px; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }.hero-text h1 { font-size: 2.8rem; margin: 0; font-weight: 700; }.article-body { padding: 0 10px; }.quote-box { border-left: 4px solid #8e9775; padding-left: 20px; font-style: italic; color: #6b705c; margin: 30px 0; font-size: 1.2rem; }.grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin: 40px 0; }.concept-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.03); border: 1px solid #eee; }.concept-card h3 { color: #8e9775; margin-top: 0; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }.tag-cloud { display: flex; gap: 10px; margin-top: 20px; }.tag-item { padding: 5px 15px; background: #eaddcf; border-radius: 20px; font-size: 0.9rem; color: #7d6e5d; text-decoration: none; transition: 0.3s; }.tag-item:hover { background: #d4c3b3; }.footer-action { text-align: center; margin-top: 50px; padding: 40px; background: #8e9775; border-radius: 12px; color: white; }.action-btn { background: white; color: #8e9775; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block; transition: transform 0.2s; }.action-btn:hover { transform: scale(1.05); }</style><div class=\'hero-banner\'><img src=\'https://images.unsplash.com/photo-1499728603263-13726abce5fd?auto=format&fit=crop&w=1200&q=80\' class=\'hero-img\'><div class=\'hero-text\'><h1>余生很长，何必惊慌</h1><p>寻找生活里的微光与缝隙</p></div></div><div class=\'article-body\'><p>我们似乎习惯了精确到分钟的日程表，习惯了在地铁上刷着永无止境的短视频，却忘记了观察一朵云的消散，或是一杯茶从热气腾腾到温润入口的过程。</p><div class=\'quote-box\'>“所谓慢生活，不是为了拖延时间，而是为了在时间的流动中找回感官的控制权。”</div><p>在快节奏的都市森林里，每个人都是一座孤岛，但只要你愿意停下来，哪怕只是五分钟，生活就会呈现出完全不同的质感。</p><div class=\'grid-layout\'><div class=\'concept-card\'><h3>触觉：指尖的温度</h3><p>放下冰冷的屏幕，去触碰书页的纹理，去揉捏面团的柔软，或者仅仅是修剪一盆枯萎的绿植。真实的触感能让焦虑的神经瞬间着陆。</p></div><div class=\'concept-card\'><h3>听觉：寂静的深度</h3><p>尝试摘下耳机，听听雨水敲击窗棂的声音，听听清晨第一声鸟鸣。在这些自然的频率中，大脑会启动自我修复模式。</p></div></div><h2>实践：如何开启你的慢生活？</h2><p>你不必辞职去远方，只需要在日常中植入一些“留白”：早起十分钟坐在窗边发呆，下班路上绕道去公园看一眼落日，或是亲手烹饪一顿简单的晚餐。这些细碎的时刻，就是我们对抗虚无的铠甲。</p><div class=\'tag-cloud\'><a href=\'#\' class=\'tag-item\'># 咖啡哲学</a><a href=\'#\' class=\'tag-item\'># 独处时光</a><a href=\'#\' class=\'tag-item\'># 极简美学</a><a href=\'#\' class=\'tag-item\'># 自然愈疗</a></div><div class=\'footer-action\'><h3>准备好重新定义你的节奏了吗？</h3><p>每一天都是一份礼物，关键在于你是否有耐心去拆开它。</p><br><a href=\'#\' class=\'action-btn\'>加入慢活社区</a></div></div></div>',
  '在这个追求速度的时代，我们探讨如何放慢脚步，通过感官的复苏和心态的转变，重拾那些被遗忘的生活美学。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a33c8166b72f7cd0aae', id FROM blog_tags WHERE tag_name = '慢生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('极简主义');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a33c8166b72f7cd0aae', id FROM blog_tags WHERE tag_name = '极简主义';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自然治愈');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a33c8166b72f7cd0aae', id FROM blog_tags WHERE tag_name = '自然治愈';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活美学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a33c8166b72f7cd0aae', id FROM blog_tags WHERE tag_name = '生活美学';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c6a86776f551db32b5fb3',
  '晨间的呼吸：手冲咖啡里的慢活艺术',
  '<div class=\'lifestyle-entry\'><style>.lifestyle-entry { font-family: \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif; background-color: #fdfaf6; color: #5a4b41; padding: 40px 20px; border-radius: 16px; border: 1px solid #eee5de; max-width: 800px; margin: 0 auto; line-height: 1.8; }.header-img { width: 100%; height: 350px; object-fit: cover; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 12px 24px rgba(0,0,0,0.08); }.article-header { text-align: center; margin-bottom: 40px; }.article-title { font-size: 2.2rem; color: #3d2b1f; margin-bottom: 12px; letter-spacing: 1px; }.article-subtitle { font-size: 1rem; color: #a69080; font-style: italic; letter-spacing: 2px; }.drop-cap { float: left; font-size: 4rem; line-height: 1; font-weight: bold; margin-right: 12px; color: #d4a373; }.quote-box { background: #fff; border-left: 4px solid #d4a373; padding: 25px; margin: 40px 0; font-style: italic; box-shadow: 4px 4px 0px #faedcd; }.grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }.grid-item { background: rgba(212, 163, 115, 0.05); padding: 20px; border-radius: 10px; border: 1px dashed #d4a373; }.action-link { display: inline-block; background: #3d2b1f; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 30px; margin-top: 20px; transition: all 0.3s ease; }.action-link:hover { background: #d4a373; transform: translateY(-2px); }</style><div class=\'article-header\'><img src=\'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200\' class=\'header-img\'><h1 class=\'article-title\'>晨间的呼吸：手冲咖啡里的慢活艺术</h1><p class=\'article-subtitle\'>— 在香气升腾间，与世界温柔和解 —</p></div><p><span class=\'drop-cap\'>在</span>这个万物都在加速的时代，我们总是在追赶下一个截止日期，却忘了停下来感受当下的温度。对我而言，清晨那三分钟的咖啡手冲时间，不是为了提神醒脑的生理任务，而是一场关乎五感的冥想。当整座城市还未完全苏醒，第一缕阳光斜斜地打在手磨机上，那是生活最质朴的开场白。</p><div class=\'quote-box\'>“慢，并不是对时间的浪费，而是对感官的一场深度致敬。在水流与粉床相遇的那一刻，时间仿佛被按下了暂停键。”</div><p>准备的过程本身就是一种治愈。挑选豆子时，指尖触碰咖啡豆圆润的曲线；研磨时，清脆的碎裂声伴随着浓郁的干香四溢——那是来自埃塞俄比亚高原的柑橘调，或是哥伦比亚山谷的坚果甜。每一份风味，都承载着远方的土壤与雨水。</p><div class=\'grid-layout\'><div class=\'grid-item\'><h3>微光仪式</h3><p>看细长的水流平稳落下，咖啡粉慢慢隆起、呼吸，那是生命在热气中舒展的姿态。</p></div><div class=\'grid-item\'><h3>风味觉察</h3><p>从第一口酸质的明亮，到中段的醇厚，再到最后的甘甜，风味在舌尖层层递进。</p></div></div><p>生活不需要每天都有宏大的叙事。能有一段完全属于自己的时间，听一听注水的声音，嗅一嗅泥土的芬芳，在氤氲的水汽中整理思绪。当我们慢下来，那些平日被忽略的细碎美好——窗外的鸟鸣、微风拂过窗帘的褶皱、陶瓷杯温润的触感——都会变得清晰而动人。</p><div style=\'text-align: center; margin-top: 50px;\'><a href=\'#\' class=\'action-link\'>订阅慢活周刊</a><p style=\'font-size: 0.8rem; color: #ccc; margin-top: 15px;\'>感谢你与我分享这段晨间时光</p></div></div>',
  '在快节奏的世界里，寻找一个属于自己的清晨锚点。这篇文章带你领略手冲咖啡背后的生活哲学，探索如何在呼吸间重拾对生活的热爱。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a86776f551db32b5fb3', id FROM blog_tags WHERE tag_name = '慢生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活美学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a86776f551db32b5fb3', id FROM blog_tags WHERE tag_name = '生活美学';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('治愈系');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a86776f551db32b5fb3', id FROM blog_tags WHERE tag_name = '治愈系';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('仪式感');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6a86776f551db32b5fb3', id FROM blog_tags WHERE tag_name = '仪式感';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c6bdc8540b46fa23feee3',
  '在快节奏的世界里，学会按下暂停键',
  '<div class=\'life-post\'><style>.life-post{font-family:\'PingFang SC\',\'Microsoft YaHei\',sans-serif;line-height:1.8;color:#2c3e50;max-width:100%;}.main-title{font-size:2.2rem;font-weight:700;color:#34495e;margin-bottom:2rem;padding-bottom:1rem;border-bottom:3px solid #e8b968;}.intro-text{font-size:1.1rem;color:#7f8c8d;font-style:italic;margin:1.5rem 0;padding:1.2rem;background:#fdf8f0;border-left:4px solid #e8b968;border-radius:0 8px 8px 0;}.content-section{margin:2rem 0;}.section-header{font-size:1.6rem;color:#2c3e50;margin:2rem 0 1rem;font-weight:600;}.story-box{background:linear-gradient(to right,#fff9f0,#ffffff);padding:1.8rem;margin:1.5rem 0;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);}.moment-card{background:#ffffff;padding:1.3rem;margin:1rem 0;border-left:3px solid #95d5b2;border-radius:5px;box-shadow:0 1px 4px rgba(0,0,0,0.05);}.quote-block{font-size:1.2rem;color:#555;text-align:center;padding:2rem;margin:2rem 0;background:#f8f9fa;border-radius:8px;font-style:italic;position:relative;}.quote-block:before{content:\'❝\';font-size:3rem;color:#e8b968;position:absolute;top:-10px;left:20px;}.life-list{list-style:none;padding:0;}.life-list li{padding:0.8rem 0 0.8rem 2rem;position:relative;color:#495057;}.life-list li:before{content:\'🌿\';position:absolute;left:0;}.image-box{text-align:center;margin:2.5rem 0;}.life-image{max-width:100%;height:auto;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.12);}.closing-note{background:linear-gradient(135deg,#667eea15,#764ba215);padding:1.5rem;margin:2rem 0;border-radius:10px;color:#555;}</style><h1 class=\'main-title\'>在快节奏的世界里，学会按下暂停键</h1><div class=\'intro-text\'>上周五晚上，我坐在阳台上看着城市的灯火，突然意识到已经很久没有这样静静地坐着了。手机放在一旁，没有消息提醒，没有待办事项，只是单纯地看着天空从蓝色渐变成深紫色。</div><div class=\'image-box\'><img src=\'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop\' alt=\'宁静的黄昏时刻\' class=\'life-image\' width=\'800\' height=\'400\'></div><div class=\'content-section\'><h2 class=\'section-header\'>我们为什么总是那么忙</h2><div class=\'story-box\'><p>记得有次和朋友聊天，她说自己一整天从早忙到晚，但到了睡觉前却想不起来具体做了什么。这种感觉太熟悉了。我们好像被一股无形的力量推着往前走，生怕停下来就会被时代抛弃。</p><p>社交媒体上永远有人在分享他们充实的生活，健身、学习、旅行、副业，仿佛不这样做就是在浪费生命。但真的是这样吗？</p></div></div><div class=\'content-section\'><h2 class=\'section-header\'>那些被忽略的小确幸</h2><ul class=\'life-list\'><li>早晨第一口咖啡的香气，那种独特的苦中带甜</li><li>雨后街道上反射的霓虹灯光，像水彩画一样晕开</li><li>周末市场里老板娘多给的那几颗青菜</li><li>深夜听到楼下猫咪的叫声，知道它又平安度过一天</li><li>书页翻动的声音，比任何音乐都动听</li></ul><div class=\'moment-card\'><p>上个月我开始尝试每天记录三件让我开心的小事。一开始觉得很难，总觉得生活平淡无奇。但坚持一周后发现，快乐从来不在远方，它就藏在那些被我们忽略的瞬间里。</p></div></div><div class=\'quote-block\'>生活不是赛跑，不需要跟任何人比速度。每个人都有自己的节奏，找到它，然后好好享受。</div><div class=\'content-section\'><h2 class=\'section-header\'>学会说不的勇气</h2><div class=\'story-box\'><p>最近我拒绝了一个周末的聚会邀请。不是因为不喜欢那些朋友，而是因为我真的需要一个人待着。发出拒绝消息的那一刻，我感受到了久违的轻松。</p><p>我们总是害怕拒绝会让别人失望，但其实，照顾好自己才是对所有人负责的开始。一个疲惫不堪的人，又怎么能给予别人真诚的陪伴呢？</p></div></div><div class=\'image-box\'><img src=\'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=1200&h=500&fit=crop\' alt=\'独处时光\' class=\'life-image\' width=\'800\' height=\'400\'></div><div class=\'content-section\'><h2 class=\'section-header\'>慢下来的艺术</h2><div class=\'moment-card\'><p>开始尝试这些改变后，我的生活确实慢了下来：</p></div><ul class=\'life-list\'><li>把手机设置成灰度模式，减少无意义的刷屏时间</li><li>每周选一天不安排任何计划，让那一天自然展开</li><li>重新学会手写，给远方的朋友寄明信片</li><li>在超市购物时不列清单，随心所欲地逛</li><li>做饭时不看菜谱，凭直觉加调料</li></ul></div><div class=\'closing-note\'><p>写这些文字的时候，窗外又开始下雨了。我泡了杯茶，听着雨声敲打窗户的节奏，突然觉得这样的时刻才是生活本来的样子。</p><p>不是说要完全放弃奋斗，而是在追求的路上，记得偶尔停下来，看看沿途的风景。毕竟，人生不只是到达终点，更是享受旅程本身。</p><p>愿你也能在这个快节奏的世界里，找到属于自己的慢时光。</p></div></div>',
  '在这个快节奏的时代，我们总是被各种声音告诉应该如何生活，却很少停下来问问自己真正想要什么。本文分享一些关于慢生活的思考，以及如何在喧嚣中找到属于自己的节奏。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活方式');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6bdc8540b46fa23feee3', id FROM blog_tags WHERE tag_name = '生活方式';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6bdc8540b46fa23feee3', id FROM blog_tags WHERE tag_name = '慢生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自我探索');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6bdc8540b46fa23feee3', id FROM blog_tags WHERE tag_name = '自我探索';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6bdc8540b46fa23feee3', id FROM blog_tags WHERE tag_name = '城市生活';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696c6ecdbf6aa102b2c654fa',
  '城市里的小确幸：平凡日子里的温柔仪式感',
  '<div class=\'blog-post\'><style>.blog-post{font-family:\'Segoe UI\',system-ui,sans-serif;line-height:1.7;color:#2d2d2d;padding:2rem;background:linear-gradient(180deg,#fff,#fbfdff);border-radius:12px}.post-title{font-size:2.2rem;font-weight:800;background:linear-gradient(90deg,#ff7eb6,#7afcff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem;border-left:5px solid #ff7eb6;padding-left:1rem}.section-title{font-size:1.2rem;color:#1f2937;border-bottom:2px solid #eef2f7;padding-bottom:.5rem;margin:1.5rem 0}.feature-box{background:linear-gradient(135deg,#fff7f9,#f7fffb);border-radius:10px;padding:1rem;margin:1rem 0;border:1px solid #eee;box-shadow:0 6px 18px rgba(15,23,42,0.06)}.img-container{text-align:center;margin:1.2rem 0}.tech-img{max-width:100%;border-radius:12px;box-shadow:0 8px 24px rgba(16,24,40,0.08)}.meta{color:#475569;font-size:.95rem;margin-top:1rem}.list{padding-left:1.2rem;margin:0.6rem 0}.list li{margin:0.4rem 0}.small-note{font-size:.9rem;color:#64748b;margin-top:1rem}</style><h1 class=\'post-title\'>城市里的小确幸：平凡日子里的温柔仪式感</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=600&fit=crop\' alt=\'城市咖啡与阳光\' class=\'tech-img\' width=\'900\' height=\'450\'></div><p>早晨的第一杯咖啡、书店里不经意发现的一本旧书、窗台上的绿植默默伸展——生活的大事未必都轰轰烈烈，很多温柔都藏在不经意的瞬间。</p><section><h2 class=\'section-title\'>清晨仪式：为一天定调</h2><div class=\'feature-box\'><p>给清晨留一点自己的时间：热一杯喜欢的饮料、听一首温暖的歌、写下三件想完成的小事。很简单的步骤，却能让慌乱的日程变得可触。</p></div></section><section><h2 class=\'section-title\'>城市漫步：慢下来的理由</h2><p>在通勤的路线中多走一段，或绕进一条有树的巷子。留心街角的面包店、随手拍下一束光，这些片段会在日后成为温暖的记忆。</p><ul class=\'list\'><li>周末的市集里挑一束花</li><li>试一家从没去过的小餐馆</li><li>把手机收起来十分钟，专注看路上的风景</li></ul></section><section><h2 class=\'section-title\'>家里的小改善</h2><div class=\'feature-box\'><p>不追求大规模改造，换一盏灯、换一个靠枕、或者给厨房添一把好用的刀具，这些细微调整能极大提升居家幸福感。</p></div></section><section><h2 class=\'section-title\'>读书与听歌：给心一点空间</h2><p>一段轻盈的文字或一首熟悉的曲子，随时可以把你从忙碌拉回到自己身上。试着给每天留出十分钟，只为读或听，无需效率的负担。</p></section><div class=\'feature-box\'><h3 style=\'margin:0 0 .5rem 0\'>小清单，易上手</h3><ul class=\'list\'><li>每天写一句感激的话</li><li>每周学一道简单的新菜</li><li>每月给自己一段不被打扰的独处时间</li></ul></div><p class=\'meta\'>想看更多生活灵感与摄影？<a href=\'https://unsplash.com\' target=\'_blank\'>前往 Unsplash</a>，或者在评论里分享你的秘密小仪式。</p><p class=\'small-note\'>本文为公开分享，欢迎转发与交流。愿你在平凡的日子里找到属于自己的温柔。</p></div>',
  '城市里的小确幸，关于日常仪式感与慢生活的暖心建议与可操作清单。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6ecdbf6aa102b2c654fa', id FROM blog_tags WHERE tag_name = '生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('随笔');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6ecdbf6aa102b2c654fa', id FROM blog_tags WHERE tag_name = '随笔';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6ecdbf6aa102b2c654fa', id FROM blog_tags WHERE tag_name = '城市';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('仪式感');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696c6ecdbf6aa102b2c654fa', id FROM blog_tags WHERE tag_name = '仪式感';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696e7accf23d9653a7165931',
  '京都四季：一场穿越千年的时光之旅',
  '<div class=\'blog-post\'><style>.blog-post {background: linear-gradient(to bottom, #faf7f2 0%, #ffffff 100%); font-family: \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif; padding: 2rem; color: #4a4a4a; line-height: 1.8;}.post-header {text-align: center; margin-bottom: 3rem;}.main-title {font-size: 2.8rem; font-weight: 300; letter-spacing: 0.2rem; color: #2c5f7c; margin-bottom: 0.5rem;}.subtitle {font-size: 1.1rem; color: #7a8b8c; font-style: italic;}.hero-img {width: 100%; max-width: 900px; height: 400px; object-fit: cover; border-radius: 8px; margin: 2rem auto; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.1);}.intro-text {font-size: 1.2rem; text-align: center; margin: 2rem 0; color: #5a6c6d; max-width: 800px; margin-left: auto; margin-right: auto;}.season-section {margin: 4rem 0;}.season-title {font-size: 2rem; font-weight: 400; color: #2c5f7c; border-bottom: 2px solid #d4e4e7; padding-bottom: 0.5rem; margin-bottom: 1.5rem; display: flex; align-items: center;}.season-icon {margin-right: 1rem; font-size: 2.5rem;}.season-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;}.season-card {background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease;}.season-card:hover {transform: translateY(-8px);}.card-img {width: 100%; height: 200px; object-fit: cover;}.card-content {padding: 1.5rem;}.card-title {font-size: 1.3rem; color: #2c5f7c; margin-bottom: 0.5rem;}.card-desc {color: #6c7a7b; font-size: 0.95rem;}.tips-box {background: linear-gradient(135deg, #e8f4f8 0%, #f0f8f0 100%); border-left: 5px solid #4a9b8e; padding: 1.5rem; margin: 2rem 0; border-radius: 0 8px 8px 0;}.tips-list {list-style: none; padding: 0;}.tips-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.tips-list li:before {content: \'✓\'; position: absolute; left: 0; color: #4a9b8e; font-weight: bold;}.footer-link {text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e0e0e0;}.footer-link a {color: #2c5f7c; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 20px; transition: background 0.3s;}.footer-link a:hover {background: #e8f4f8; text-decoration: underline;}</style><div class=\'post-header\'><h1 class=\'main-title\'>京都四季</h1><p class=\'subtitle\'>千年古都的自然韵律与文化脉络</p></div><img src=\'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&h=400&fit=crop\' alt=\'京都城市全景\' class=\'hero-img\'><p class=\'intro-text\'>京都，一座被时光温柔以待的城市。在这里，四季不仅是气候的更迭，更是文化的呼吸。从伏见稻荷的千本鸟居到嵯峨野的竹林小径，每一处风景都在诉说着不同的季节故事。</p><section class=\'season-section\'><h2 class=\'season-title\'><span class=\'season-icon\'>🌸</span>春 · 樱花与古城的私语</h2><div class=\'season-grid\'><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=200&fit=crop\' alt=\'清水寺樱花\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>清水寺夜樱</h3><p class=\'card-desc\'>三月下旬至四月上旬，清水寺的舞台被粉色花海包围，夜晚点灯后的樱花如梦似幻。</p></div></div><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=200&fit=crop\' alt=\'鸭川樱花\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>鸭川两岸</h3><p class=\'card-desc\'>沿着鸭川漫步，两岸樱花形成天然花廊，当地人在这里野餐赏樱，感受春天的气息。</p></div></div></div></section><section class=\'season-section\'><h2 class=\'season-title\'><span class=\'season-icon\'>🍃</span>夏 · 绿意与禅意的交融</h2><div class=\'season-grid\'><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=200&fit=crop\' alt=\'竹林小径\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>嵯峨野竹林</h3><p class=\'card-desc\'>清晨的竹林小径，阳光透过竹叶洒下斑驳光影，微风拂过，竹叶沙沙作响，宛如天然禅乐。</p></div></div><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=200&fit=crop\' alt=\'夏日祭典\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>祇园祭</h3><p class=\'card-desc\'>七月整月的祇园祭，山鉾巡行、传统艺能表演，让整个京都与千年的历史共同呼吸。</p></div></div></div></section><section class=\'season-section\'><h2 class=\'season-title\'><span class=\'season-icon\'>🍁</span>秋 · 红叶与寺庙的对话</h2><div class=\'season-grid\'><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop\' alt=\'东福寺红叶\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>东福寺通天桥</h3><p class=\'card-desc\'>十一月的中旬，从通天桥俯瞰满山红叶，层林尽染，是京都最具代表性的秋色。</p></div></div><div class=\'season-card\'><img src=\'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=200&fit=crop\' alt=\'岚山秋景\' class=\'card-img\'><div class=\'card-content\'><h3 class=\'card-title\'>岚山渡月桥</h3><p class=\'card-desc\'>桂川两岸的枫叶与古建筑倒影，乘坐小船顺流而下，仿佛穿越回平安时代。</p></div></div></div></section><section class=\'season-section\'><h2 class=\'season-title\'><span class=\'season-icon\'>❄️</span>冬 · 静谧与温暖的平衡</h2><p style=\'text-align:center; color:#6c7a7b; margin:2rem;\'>冬日的京都，游人稀少，反倒是感受这座城市本真气质的最佳时节。雪花落在金阁寺的金箔上，银阁寺在薄雪覆盖下更显禅意。</p></section><div class=\'tips-box\'><h3 style=\'color:#2c5f7c; margin-top:0;\'>旅行小贴士</h3><ul class=\'tips-list\'><li>最佳旅行时间：春秋两季，但避开日本三连休</li><li>交通建议：购买京都市巴士一日券，500日元无限次乘坐</li><li>住宿推荐：选择京町屋改建的传统民宿，体验地道生活</li><li>文化礼仪：进入寺庙请保持安静，拍摄时注意是否允许</li></ul></div><div class=\'footer-link\'><p>想要了解更多日本旅行资讯？</p><a href=\'https://www.kyoto.travel/\' target=\'_blank\'>访问京都官方旅游网站</a> | <a href=\'https://www.japan-guide.com/\' target=\'_blank\'>日本旅行综合指南</a></div></div>',
  '探索日本古都京都的四季变换，从樱花春日到枫红深秋，感受传统与自然的完美交融。',
  '旅行',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('日本');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '日本';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('京都');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '京都';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '旅行';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('文化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '文化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('四季');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '四季';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('摄影');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7accf23d9653a7165931', id FROM blog_tags WHERE tag_name = '摄影';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '696e7b1f7b5b83189fd98302',
  '数字游民完全手册：在代码与海滩之间找到你的节奏',
  '<div class=\'digital-nomad-post\'><style>.digital-nomad-post{font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif;line-height:1.6;color:#334155;max-width:100%}.hero-section{background:linear-gradient(135deg,#0ea5e9 0%,#0d9488 100%);padding:2.5rem 1.5rem;margin:-1rem -1rem 2rem -1rem;border-radius:12px 12px 0 0;position:relative;overflow:hidden}.hero-title{font-size:2.2rem;font-weight:700;color:white;margin:0;text-shadow:0 2px 4px rgba(0,0,0,0.1)}.hero-subtitle{color:#ecfdf5;font-size:1.1rem;margin-top:0.5rem}.location-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin:2rem 0}.city-card{background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);transition:transform 0.3s ease,box-shadow 0.3s ease;border:1px solid #e2e8f0}.city-card:hover{transform:translateY(-8px);box-shadow:0 12px 30px rgba(0,0,0,0.15)}.city-image{width:100%;height:180px;background:linear-gradient(45deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;object-fit:cover}.city-info{padding:1.5rem}.city-name{font-size:1.3rem;font-weight:600;margin:0 0 0.5rem 0;color:#1e293b}.city-desc{color:#64748b;font-size:0.95rem;margin:0}.tip-list{background:#f0fdfa;border-left:4px solid #0d9488;padding:1.5rem;margin:1.5rem 0;border-radius:8px}.tip-item{margin:0.75rem 0;font-size:1rem}.tip-item strong{color:#0f766e}.resource-box{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:2rem 0}.resource-link{background:white;border:2px solid #e0f2fe;padding:1rem 1.2rem;border-radius:8px;text-decoration:none;color:#0369a1;font-weight:500;transition:all 0.3s ease;display:block}.resource-link:hover{background:#e0f2fe;border-color:#0284c7;color:#01579b;transform:translateX(5px)}.highlight-box{background:linear-gradient(135deg,#fefce8 0%,#fef9c3 100%);border-radius:12px;padding:1.5rem;margin:2rem 0;border:1px solid #fde047}.section-title{font-size:1.4rem;color:#0c4a6e;margin:2rem 0 1rem 0;font-weight:600}</style><div class=\'hero-section\'><h1 class=\'hero-title\'>🌍 数字游民完全手册</h1><p class=\'hero-subtitle\'>在代码与海滩之间找到你的节奏</p></div><p>如果你的办公室可以是巴厘岛的沙滩酒吧、里斯本的百年咖啡馆或者清迈的竹制小屋——为什么还窝在格子间里？数字游民不仅是一种工作方式，更是重构人生体验的设计哲学。</p><div class=\'highlight-box\'><p>根据Nomad List 2024报告，全球活跃的数字游民数量已突破3500万，他们每年创造的经济价值超过7870亿美元。这不是一场逃离，而是一场关于自由生产力的革命。</p></div><h2 class=\'section-title\'>🌟 2024年度最热门游牧城市</h2><div class=\'location-grid\'><div class=\'city-card\'><img src=\'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=180&fit=crop\' class=\'city-image\' alt=\'巴厘岛\'><div class=\'city-info\'><h3 class=\'city-name\'>印度尼西亚·巴厘岛</h3><p class=\'city-desc\'>Canggu的联合办公空间密度世界第一，月均花费$1200-1800。冲浪、码代码、夜生活三重奏。</p></div></div><div class=\'city-card\'><img src=\'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=180&fit=crop\' class=\'city-image\' alt=\'里斯本\'><div class=\'city-info\'><h3 class=\'city-name\'>葡萄牙·里斯本</h3><p class=\'city-desc\'>阳光充足、英文普及、NHR税务政策友好。一杯浓缩咖啡€0.7，WiFi比感情还稳定。</p></div></div><div class=\'city-card\'><img src=\'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=180&fit=crop\' class=\'city-image\' alt=\'清迈\'><div class=\'city-info\'><h3 class=\'city-name\'>泰国·清迈</h3><p class=\'city-desc\'>丛林中的硅谷，月预算低至$800。每年2-4月的烧山季记得备好N95。</p></div></div><div class=\'city-card\'><img src=\'https://images.unsplash.com/photo-1580153111800-b9e7e0e0e8b?w=400&h=180&fit=crop\' class=\'city-image\' alt=\'布宜诺斯艾利斯\'><div class=\'city-info\'><h3 class=\'city-name\'>阿根廷·布宜诺斯艾利斯</h3><p class=\'city-desc\'>南美性价比之王，烤肉+探戈，时区完美对接北美。注意通胀波动。</p></div></div></div><h2 class=\'section-title\'>🧳 游牧生存铁律</h2><div class=\'tip-list\'><div class=\'tip-item\'><strong>WiFi是氧气：</strong>预订前必问上传速度，备份方案是移动热点+当地SIM卡</div><div class=\'tip-item\'><strong>时区游戏：</strong>用World Time Buddy管理客户会议，把东亚客户匹配到东南亚，欧美客户匹配到南美</div><div class=\'tip-item\'><strong>签证算术：</strong>泰国TR60+延期、葡萄牙D7、爱沙尼亚数字游民签证——算清楚180天规则</div><div class=\'tip-item\'><strong>财务管理：</strong>持有Wise多币种+加密钱包+本地银行，别把所有法币存在一个篮子里</div></div><h2 class=\'section-title\'>🔗 必备游牧工具箱</h2><div class=\'resource-box\'><a href=\'https://nomadlist.com\' class=\'resource-link\' target=\'_blank\'>🏆 Nomad List - 城市数据百科</a><a href=\'https://worldtimebuddy.com\' class=\'resource-link\' target=\'_blank\'>🕐 时区协调神器</a><a href=\'https://wise.com\' class=\'resource-link\' target=\'_blank\'>💸 Wise国际转账</a><a href=\'https://flexjobs.com\' class=\'resource-link\' target=\'_blank\'>💼 远程工作平台</a></div><p class=\'highlight-box\'><strong>最后忠告：</strong>真正的数字游民不是逃离现实，而是带着现实去旅行。稳定的收入流 > 诗意的远方，先解决现金流，再谈自由。</p><p>世界很大，代码很长，咖啡很烫。现在开始打包你的第一个旅行包吧——记得带上充电器。</p></div>',
  '探索全球数字游民生活方式，从城市选择到工作平衡，为你呈现现代数字游牧的完整图景',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('数字游民');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7b1f7b5b83189fd98302', id FROM blog_tags WHERE tag_name = '数字游民';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('远程工作');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7b1f7b5b83189fd98302', id FROM blog_tags WHERE tag_name = '远程工作';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7b1f7b5b83189fd98302', id FROM blog_tags WHERE tag_name = '旅行';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活方式');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7b1f7b5b83189fd98302', id FROM blog_tags WHERE tag_name = '生活方式';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('全球化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '696e7b1f7b5b83189fd98302', id FROM blog_tags WHERE tag_name = '全球化';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973895d776f551db32c01cb',
  '城市中的绿洲：寻找日常中的宁静角落',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Georgia\', serif; line-height: 1.8; color: #4a4a4a; max-width: 800px; margin: 0 auto;}.post-title {font-size: 2.2rem; font-weight: 600; color: #2d5a3a; margin-bottom: 2rem; text-align: center; position: relative;}.post-title::after {content: \'\'; display: block; width: 50px; height: 3px; background: linear-gradient(to right, #a8e6cf, #88d8a3); margin: 0.5rem auto;}.section-title {font-size: 1.6rem; color: #2d5a3a; margin: 2.5rem 0 1rem; padding-left: 1rem; border-left: 4px solid #88d8a3;}.serene-box {background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%); border-radius: 15px; padding: 2rem; margin: 2rem 0; border: 1px solid #d4edda; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);}.reflection-list {list-style: none; padding: 0;}.reflection-list li {padding: 1rem 0; position: relative; padding-left: 2rem; font-style: italic;}.reflection-list li:before {content: \'🌿\'; position: absolute; left: 0; color: #88d8a3; font-size: 1.2rem;}.img-container {text-align: center; margin: 2.5rem 0;}.nature-img {max-width: 100%; height: auto; border-radius: 20px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);}.quote-box {background: #fff8e7; border-left: 5px solid #ffd700; padding: 1.5rem; margin: 2rem 0; font-size: 1.1rem; color: #856404; border-radius: 0 10px 10px 0;}</style><h1 class=\'post-title\'>城市中的绿洲：寻找日常中的宁静角落</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop\' alt=\'城市公园绿洲\' class=\'nature-img\'></div><p>在快节奏的都市生活中，我们常常被高楼大厦和车水马龙包围，忘记了自然的温柔拥抱。但每座城市都藏着属于自己的绿洲，那些公园、河边小径或街角花园，能让我们暂时逃离喧嚣，重新连接内心。</p><section><h2 class=\'section-title\'>🌳 晨光中的公园散步</h2><div class=\'serene-box\'><p>想象一下清晨的第一缕阳光洒在树叶上，你漫步在公园小道，空气中弥漫着泥土和花香的混合。这样的时刻，不需要手机，不需要计划，只是单纯地呼吸，感受脚下草地的柔软。</p></div><ul class=\'reflection-list\'><li>聆听鸟鸣，让思绪随风飘散</li><li>触摸树皮，提醒自己生命的韧性</li><li>坐上长椅，观察路人背后的故事</li><li>深呼吸，释放一夜的疲惫</li></ul></section><section><h2 class=\'section-title\'>🏞️ 河畔的午后闲暇</h2><p>城市河流往往是隐藏的宝藏。找一条安静的河岸，带本书或一杯热饮，坐在那里看水流缓缓。河水反射着蓝天，仿佛在诉说时间的流动，让我们学会放慢脚步。</p><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=500&fit=crop\' alt=\'河畔宁静\' class=\'nature-img\'></div><div class=\'quote-box\'><p>\"在喧闹中寻找宁静，是心灵的艺术。\" – 未知</p></div></section><section><h2 class=\'section-title\'>🌸 街角花园的惊喜</h2><div class=\'serene-box\'><p>有时，最美的绿洲就在家门口。一个小小的社区花园，种满季节的花朵，就能点亮平凡的一天。和邻居闲聊，或独自浇水，这些小事积累成生活的诗意。</p></div><p>试着每周抽时间造访一个这样的地方，记录你的感受。或许，你会发现城市并非冷冰冰的钢铁森林，而是脉动着生命力的有机体。</p><p>这些绿洲不只美化了环境，更是我们心灵的港湾。在这里，我们学会感恩简单，拥抱当下。下一个周末，不妨出发，去发现属于你的那片绿洲。</p></div>',
  '探索城市绿洲的魅力，分享如何在喧嚣中寻找内心的宁静与自然的连接。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973895d776f551db32c01cb', id FROM blog_tags WHERE tag_name = '城市生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自然');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973895d776f551db32c01cb', id FROM blog_tags WHERE tag_name = '自然';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('心灵');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973895d776f551db32c01cb', id FROM blog_tags WHERE tag_name = '心灵';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973895d776f551db32c01cb', id FROM blog_tags WHERE tag_name = '旅行';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '69739d968540b46fa240941b',
  '艺术与日常的交响曲：在家里的创作涌动',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.4rem; font-weight: 800; background: linear-gradient(135deg, #2d8cf0 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #2d8cf0; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #f6f9ff 0%, #eef6ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;}.img-container {text-align: center; margin: 2rem 0;}.blog-cta {display: inline-block; padding: 0.6rem 1rem; border-radius: 6px; background: #2d8cf0; color: white; text-decoration: none; margin-top: 0.5rem;} </style> <h1 class=\'post-title\'>艺术与日常的交响曲：在家里的创作涌动</h1> <div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop\' alt=\'艺术创作场景\' class=\'tech-img\' width=\'800\' height=\'400\'></div> <p>在日常的角落里，艺术其实就藏在小小的动作里。我们通过颜色、纹理与光影来讲述故事，而不是靠喧嚣。本文带你用简朴的材料，开启一场关于创造的对话。</p> <section><h2 class=\'section-title\'>✨ 创作的材料与灵感</h2><div class=\'feature-box\'><p>找到生活中的素材，记录灵感的瞬间，比盲目追逐潮流更能持续地产生作品。</p></div><ul class=\'feature-list\'><li>用再生纸和日常颜料做实验</li><li>把光线投射在墙面上，观察阴影的变化</li></ul></section> <section><h2 class=\'section-title\'>🗺️ 展示与连接</h2><p>作品可以通过图片和文字讲述过程；你也可以把链接放在此处，指向你未完成的作品集。</p><p><a href=\'https://example.com/gallery\' target=\'_blank\' rel=\'noopener\'>进入我的画廊</a></p></section> <p class=\'feature-box\'>如果你愿意分享你的日常创作，请在评论区留言，我们一起把日常变成艺术。</p> </div>',
  '在日常生活的细微处找到创作的火花，用简单材料讲述关于艺术的日常故事。',
  '艺术',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('艺术');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69739d968540b46fa240941b', id FROM blog_tags WHERE tag_name = '艺术';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('创作');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69739d968540b46fa240941b', id FROM blog_tags WHERE tag_name = '创作';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('日常');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69739d968540b46fa240941b', id FROM blog_tags WHERE tag_name = '日常';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('家居美学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '69739d968540b46fa240941b', id FROM blog_tags WHERE tag_name = '家居美学';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a0c7f23d9653a716cf2d',
  '都市寻幽：城市角落里的诗意栖居',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #87CEEB 0%, #ADD8E6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #87CEEB; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #f0fff0 0%, #f5fffa 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);}.code-block {background: #f0f8ff; color: #000080; padding: 1.5rem; border-radius: 8px; font-family: \'Courier New\', monospace; margin: 1.5rem 0; overflow-x: auto;}.tech-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tech-card {background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease; border-top: 4px solid #90EE90;}.tech-card:hover {transform: translateY(-5px);}.feature-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.feature-list li:before {content: \'✨\'; position: absolute; left: 0; color: #90EE90;}.img-container {text-align: center; margin: 2rem 0;}.tech-img {max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);}</style><h1 class=\'post-title\'>都市寻幽：城市角落里的诗意栖居</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&h=600&fit=crop\' alt=\'城市公园一角\' class=\'tech-img\' width=\'800\' height=\'400\'></div><p>我们常常在忙碌的生活中忽略了身边那些<strong>不经意的美好</strong>。那些隐藏在车水马龙之外的小巷、街角，或是被遗忘的公园，都可能藏着令人惊喜的<strong>诗意与宁静</strong>。</p><section><h2 class=\'section-title\'>🚶‍♀️ 漫步的艺术</h2><div class=\'feature-box\'><p>真正的“城市漫步”不仅仅是行走，更是一种<strong>观察与感受</strong>。放慢脚步，你会发现：</p><div class=\'code-block\'>// 漫步心法：<br>1. 卸下目的地，拥抱未知。<br>2. 关注细节：一扇窗，一棵树，一个表情。<br>3. 倾听声音：风声，人语，远处的钟声。<br>4. 记录灵感：随手拍下，或用文字记录。</div></div><ul class=\'feature-list\'><li>发现本地特色小店，品尝地道风味</li><li>遇见街头艺人，感受艺术的活力</li><li>探访历史建筑，触摸时光的痕迹</li></ul></section><section><h2 class=\'section-title\'>☕ 街角的咖啡馆</h2><p>在城市的某个角落，总有一家咖啡馆，它不仅仅提供饮品，更是一个<strong>放松身心</strong>的庇护所。那里：</p><div class=\'tech-grid\'><div class=\'tech-card\'><h3>氛围独特</h3><p>或许是复古的装修，或许是充满绿植的阳台，总有一处能让你心动。</p></div><div class=\'tech-card\'><h3>故事发生地</h3><p>人们在这里阅读，交谈，或是独自沉思，每个人都可能是一个故事的片段。</p></div><div class=\'tech-card\'><h3>灵感源泉</h3><p>一杯咖啡的香气，一段轻柔的音乐，都能激发新的想法。</p></div></div></section><section><h2 class=\'section-title\'>🌿 城市绿洲</h2><p>即使在钢筋水泥的丛林中，也总有<strong>绿意盎然</strong>的空间等待你去发掘。</p><ul class=\'feature-list\'><li>隐藏在居民区的小花园</li><li>能俯瞰城市景色的屋顶花园</li><li>充满野趣的河畔步道</li></ul><p>这些地方是都市人<strong>短暂逃离喧嚣</strong>的理想场所。</p></section><p class=\'feature-box\'><strong>如何开始你的都市寻幽之旅？</strong> 别犹豫，带上好奇心，走出家门，去探索你居住的城市吧。也许下一个转角，就能遇见让你心动的风景。</p><p>下次，当我们谈论生活时，不妨也谈谈那些<strong>藏在城市角落的诗意</strong>，它们是构成我们日常的，却又常常被忽视的美。</p></div>',
  '探索城市角落，发现那些隐藏在繁华之下的宁静与美好。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('城市漫步');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a0c7f23d9653a716cf2d', id FROM blog_tags WHERE tag_name = '城市漫步';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活方式');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a0c7f23d9653a716cf2d', id FROM blog_tags WHERE tag_name = '生活方式';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('发现');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a0c7f23d9653a716cf2d', id FROM blog_tags WHERE tag_name = '发现';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a104f23d9653a716cf34',
  '旋律的治愈：跨越时空的音乐之旅',
  '<div class=\'blog-post\'><style>.blog-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #333;}.post-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #FF6347 0%, #FFD700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #FF6347; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin: 2rem 0 1rem;}.feature-box {background: linear-gradient(135deg, #fff0f5 0%, #fffafa 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);}.code-block {background: #f0fff0; color: #8B0000; padding: 1.5rem; border-radius: 8px; font-family: \'Verdana\', sans-serif; margin: 1.5rem 0; overflow-x: auto;}.tech-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.tech-card {background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease; border-top: 4px solid #FF8C00;}.tech-card:hover {transform: translateY(-5px);}.feature-list li {padding: 0.5rem 0; position: relative; padding-left: 1.5rem;}.feature-list li:before {content: \'🎵\'; position: absolute; left: 0; color: #FF8C00;}.img-container {text-align: center; margin: 2rem 0;}.tech-img {max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);}</style><h1 class=\'post-title\'>旋律的治愈：跨越时空的音乐之旅</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&h=600&fit=crop\' alt=\'抽象的音乐视觉化\' class=\'tech-img\' width=\'800\' height=\'400\'></div><p>音乐，是人类最古老、最普遍的语言之一。它能跨越文化、语言和时间的界限，直接触及我们的<strong>心灵深处</strong>。无论是低沉的哀伤，还是高昂的喜悦，总有一段旋律能与我们产生共鸣，带来<strong>情感的慰藉</strong>。</p><section><h2 class=\'section-title\'>🎻 古典的永恒魅力</h2><div class=\'feature-box\'><p>从巴赫的严谨，到莫扎特的灵动，再到贝多芬的磅礴，古典音乐以其<strong>精妙的结构</strong>和<strong>深邃的情感</strong>，成为了音乐史上的瑰宝。它们仿佛时间的长河，流淌着人类智慧与情感的结晶：</p><div class=\'code-block\'>// 古典音乐的治愈力:<br>1. 纯净的音色，舒缓情绪。<br>2. 复杂的和声，引发深思。<br>3. 历史的厚重感，带来宁静。</div></div><ul class=\'feature-list\'><li>聆听一场巴洛克时期的赋格，感受秩序之美</li><li>沉浸在浪漫主义的交响诗中，体验情感的跌宕起伏</li><li>探索印象派的色彩斑斓，感受音乐的画面感</li></ul></section><section><h2 class=\'section-title\'>🎧 电子音符的现代律动</h2><p>当合成器遇上节奏，电子音乐以其<strong>多变的风格</strong>和<strong>前卫的探索</strong>，俘获了无数年轻的心。它可能是深邃的Ambient，也可能是动感的Techno：</p><div class=\'tech-grid\'><div class=\'tech-card\'><h3>氛围营造</h3><p>Ambient音乐用其空灵的音景，创造出放松、冥想的理想环境。</p></div><div class=\'tech-card\'><h3>节奏的释放</h3><p>House、Techno等舞曲风格，通过强烈的节奏感，带来身体的律动与精神的释放。</p></div><div class=\'tech-card\'><h3>实验与创新</h3><p>电子音乐家们不断尝试新的音色和结构，拓展音乐的可能性。</p></div></div></section><section><h2 class=\'section-title\'>🎶 发现属于你的疗愈之声</h2><p>音乐的治愈力量是<strong>个性化</strong>的。找到那段能让你内心平静、重拾力量的旋律，比任何技巧都重要：</p><ul class=\'feature-list\'><li>尝试不同风格的音乐，发现新的喜好</li><li>在情绪低落时，选择能引起共鸣但最终能带来希望的歌曲</li><li>利用音乐作为背景，帮助专注工作或放松身心</li></ul><p>你可以在<a>这个歌单（请在此替换为实际的音乐链接或歌单分享）</a>中找到一些精选的治愈系旋律。</p></section><p class=\'feature-box\'><strong>音乐的意义：</strong>音乐不仅仅是娱乐，它是一种<strong>情感的连接</strong>，一种<strong>精神的寄托</strong>，一种<strong>自我疗愈</strong>的方式。在生活的洪流中，让音乐成为你最忠实的伙伴。</p><p>愿每一段旋律，都能在你疲惫时给予你温暖，在你迷茫时点亮希望，让你在音乐的海洋中，找到属于自己的那份宁静与力量。</p></div>',
  '从古典到电子，探索那些能触动灵魂的旋律，发现音乐的治愈力量。',
  '音乐',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('音乐');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a104f23d9653a716cf34', id FROM blog_tags WHERE tag_name = '音乐';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旋律');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a104f23d9653a716cf34', id FROM blog_tags WHERE tag_name = '旋律';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('治愈');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a104f23d9653a716cf34', id FROM blog_tags WHERE tag_name = '治愈';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a13a7e41365f91db47fc',
  '烟火人间：街头小吃的味觉地图',
  '<div class=\'food-post\'><style>.food-post {font-family: \'Georgia\', serif; line-height: 1.8; color: #4a4a4a; max-width: 100%;}.post-header {text-align: center; padding: 2rem 0; background: linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%); border-radius: 0 0 50% 50% / 0 0 30px 30px; margin-bottom: 2rem;}.post-header h1 {font-size: 2.2rem; color: #c44536; margin: 0; text-shadow: 2px 2px 4px rgba(255,255,255,0.5);}.post-header p {color: #772e25; font-style: italic; margin-top: 0.5rem;}.flavor-section {margin: 2rem 0;}.flavor-title {display: flex; align-items: center; gap: 0.5rem; font-size: 1.4rem; color: #c44536; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px dashed #fcb69f;}.food-gallery {display: flex; gap: 1rem; overflow-x: auto; padding: 1rem 0;}.food-item {min-width: 200px; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(196, 69, 54, 0.15);}.food-item img {width: 100%; height: 140px; object-fit: cover;}.food-item-info {padding: 1rem;}.food-item-info h4 {margin: 0 0 0.5rem; color: #c44536;}.food-item-info p {margin: 0; font-size: 0.85rem; color: #888;}.story-box {background: #fffaf5; border-left: 4px solid #fcb69f; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 12px 12px 0;}.story-box p {margin: 0; font-style: italic;}.taste-map {display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;}.taste-card {padding: 1.2rem; border-radius: 12px; text-align: center;}.taste-card.spicy {background: linear-gradient(135deg, #ff6b6b, #ee5a24);color: white;}.taste-card.sweet {background: linear-gradient(135deg, #fd79a8, #e84393); color: white;}.taste-card.savory {background: linear-gradient(135deg, #fdcb6e, #e17055); color: white;}.taste-card.sour {background: linear-gradient(135deg, #55efc4, #00b894); color: white;}.taste-card h4 {margin: 0 0 0.5rem; font-size: 1.1rem;}.taste-card p {margin: 0; font-size: 0.85rem; opacity: 0.9;}.vendor-quote {background: #2d3436; color: #dfe6e9; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; position: relative;}.vendor-quote:before {content: \'💬\'; position: absolute; top: -15px; left: 20px; font-size: 1.5rem;}.vendor-quote p {margin: 0;}.vendor-quote .author {text-align: right; margin-top: 1rem; color: #fdcb6e; font-size: 0.9rem;}.tip-banner {background: linear-gradient(135deg, #a29bfe, #6c5ce7); color: white; padding: 1.2rem; border-radius: 12px; margin: 1.5rem 0; display: flex; align-items: center; gap: 1rem;}.tip-banner span {font-size: 2rem;}.closing {text-align: center; padding: 2rem; background: #fffaf5; border-radius: 12px; margin-top: 2rem;}.closing p {font-size: 1.1rem; color: #772e25;}</style><div class=\'post-header\'><h1>🍜 烟火人间</h1><p>街头小吃的味觉地图</p></div><p>城市的灵魂藏在哪里？不在高楼大厦，不在购物中心，而在那些<strong>飘着热气的小摊前</strong>，在老板娴熟翻动锅铲的瞬间，在食客们心满意足的表情里。</p><section class=\'flavor-section\'><div class=\'flavor-title\'>🌏 环球街头风味巡礼</div><div class=\'food-gallery\'><div class=\'food-item\'><img src=\'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop\' alt=\'墨西哥玉米饼\' width=\'200\' height=\'140\'><div class=\'food-item-info\'><h4>Tacos</h4><p>墨西哥 · 玉米的艺术</p></div></div><div class=\'food-item\'><img src=\'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=300&fit=crop\' alt=\'越南河粉\' width=\'200\' height=\'140\'><div class=\'food-item-info\'><h4>Phở</h4><p>越南 · 汤底的哲学</p></div></div><div class=\'food-item\'><img src=\'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop\' alt=\'日本章鱼烧\' width=\'200\' height=\'140\'><div class=\'food-item-info\'><h4>たこ焼き</h4><p>日本 · 圆润的幸福</p></div></div></div></section><div class=\'story-box\'><p>「我爷爷推着这辆车的时候，这条街还是土路。现在我儿子也学会了这门手艺，酱料的配方从没变过。」—— 某煎饼摊第三代传人</p></div><section class=\'flavor-section\'><div class=\'flavor-title\'>👅 四味江湖</div><div class=\'taste-map\'><div class=\'taste-card spicy\'><h4>辣 · 热烈</h4><p>川渝串串、印度咖喱角</p></div><div class=\'taste-card sweet\'><h4>甜 · 温柔</h4><p>土耳其冰淇淋、比利时华夫</p></div><div class=\'taste-card savory\'><h4>鲜 · 醇厚</h4><p>广式肠粉、意大利炸饭团</p></div><div class=\'taste-card sour\'><h4>酸 · 清爽</h4><p>泰式青木瓜、墨西哥酸橘汁</p></div></div></section><div class=\'vendor-quote\'><p>做小吃这行，手艺是根本，但真正留住客人的是那份真诚。每一份出品都当作是做给自己家人吃的，马虎不得。</p><div class=\'author\'>—— 夜市老板老陈</div></div><section class=\'flavor-section\'><div class=\'flavor-title\'>🗺️ 寻味指南</div><p>想要找到最地道的街头美食？这里有几个小窍门：</p><ul><li><strong>跟着本地人走</strong> — 排队最长的摊位往往有其道理</li><li><strong>避开景区核心</strong> — 往巷子深处走两步，价格和味道都会给你惊喜</li><li><strong>和老板聊几句</strong> — 他们的推荐往往比菜单靠谱</li><li><strong>接受意外</strong> — 有时候随便指一个，反而成为最难忘的味道</li></ul></section><div class=\'tip-banner\'><span>🌙</span><div><strong>深夜觅食提示：</strong>最好的街头美食往往在太阳落山后才开始营业，带上好胃口和一点冒险精神吧。</div></div><div class=\'closing\'><p>每一口街头小吃，都是一座城市写给旅人的<strong>情书</strong>。<br>去吃吧，去感受那些藏在烟火气里的人情味。</p></div></div>',
  '深入街头巷尾，探寻那些被时光眷顾的地道风味，一口咬下去就是满满的故事。',
  '美食',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('美食');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a13a7e41365f91db47fc', id FROM blog_tags WHERE tag_name = '美食';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('街头小吃');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a13a7e41365f91db47fc', id FROM blog_tags WHERE tag_name = '街头小吃';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('风味探索');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a13a7e41365f91db47fc', id FROM blog_tags WHERE tag_name = '风味探索';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a1ab7e41365f91db480b',
  '地图边缘：那些值得迷路的小众秘境',
  '<div class=\'travel-post\'><style>.travel-post {font-family: \'Palatino\', serif; line-height: 1.8; color: #2c3e50; max-width: 100%;}.hero-banner {position: relative; height: 300px; border-radius: 16px; overflow: hidden; margin-bottom: 2rem;}.hero-banner img {width: 100%; height: 100%; object-fit: cover;}.hero-overlay {position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(transparent, rgba(0,0,0,0.7));}.hero-overlay h1 {color: white; font-size: 2rem; margin: 0; text-shadow: 2px 2px 8px rgba(0,0,0,0.5);}.hero-overlay p {color: #ecf0f1; margin: 0.5rem 0 0; font-style: italic;}.intro-text {font-size: 1.15rem; border-left: 3px solid #1abc9c; padding-left: 1.5rem; margin: 2rem 0; color: #34495e;}.destination-card {background: white; border-radius: 16px; overflow: hidden; margin: 2rem 0; box-shadow: 0 10px 40px rgba(0,0,0,0.1);}.dest-img {width: 100%; height: 200px; object-fit: cover;}.dest-content {padding: 1.5rem;}.dest-header {display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;}.dest-header h3 {margin: 0; color: #16a085; font-size: 1.3rem;}.dest-tag {background: #1abc9c; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem;}.dest-content p {margin: 0 0 1rem; color: #7f8c8d;}.dest-details {display: flex; gap: 1.5rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px dashed #bdc3c7;}.detail-item {display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #95a5a6;}.travel-tips {background: linear-gradient(135deg, #0c2461 0%, #1e3799 100%); color: white; padding: 2rem; border-radius: 16px; margin: 2rem 0;}.travel-tips h3 {margin: 0 0 1.5rem; display: flex; align-items: center; gap: 0.5rem;}.tips-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;}.tip-item {background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;}.tip-item h4 {margin: 0 0 0.5rem; color: #74b9ff; font-size: 0.95rem;}.tip-item p {margin: 0; font-size: 0.85rem; opacity: 0.9;}.quote-section {text-align: center; padding: 3rem 1rem; background: url(\'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop\') center/cover; border-radius: 16px; position: relative; margin: 2rem 0;}.quote-section:before {content: \'\'; position: absolute; inset: 0; background: rgba(44, 62, 80, 0.7); border-radius: 16px;}.quote-section blockquote {position: relative; color: white; font-size: 1.4rem; font-style: italic; margin: 0; padding: 0 1rem;}.quote-section cite {position: relative; display: block; margin-top: 1rem; color: #1abc9c;}.packing-list {background: #ffeaa7; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;}.packing-list h4 {margin: 0 0 1rem; color: #2d3436;}.packing-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.8rem;}.pack-item {background: white; padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;}.footer-cta {text-align: center; padding: 2rem; background: linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%); border-radius: 16px;}.footer-cta p {margin: 0; font-size: 1.1rem; color: #2d3436;}</style><div class=\'hero-banner\'><img src=\'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=600&fit=crop\' alt=\'隐秘山谷风景\' width=\'800\' height=\'300\'><div class=\'hero-overlay\'><h1>🧭 地图边缘</h1><p>那些值得迷路的小众秘境</p></div></div><p class=\'intro-text\'>当热门景点挤满了举着自拍杆的人群，真正的旅行者开始向地图的边缘进发。那里没有攻略可循，没有网红打卡点，只有属于你自己的发现。</p><div class=\'destination-card\'><img class=\'dest-img\' src=\'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop\' alt=\'格鲁吉亚山区\' width=\'800\' height=\'200\'><div class=\'dest-content\'><div class=\'dest-header\'><h3>🏔️ 格鲁吉亚 · 斯瓦涅季</h3><div class=\'dest-tag\'>高加索秘境</div></div><p>千年石塔守护着与世隔绝的村落，这里的时间仿佛凝固在中世纪。徒步穿越乌什古利，你会遇见欧洲海拔最高的永久定居点，以及当地人倔强而热情的笑容。</p><div class=\'dest-details\'><span class=\'detail-item\'>📍 梅斯蒂亚</span><span class=\'detail-item\'>🗓️ 6-9月最佳</span><span class=\'detail-item\'>⏱️ 建议5-7天</span></div></div></div><div class=\'destination-card\'><img class=\'dest-img\' src=\'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=400&fit=crop\' alt=\'马达加斯加猴面包树\' width=\'800\' height=\'200\'><div class=\'dest-content\'><div class=\'dest-header\'><h3>🌴 马达加斯加 · 猴面包树大道</h3><div class=\'dest-tag\'>第八大洲</div></div><p>日落时分，巨大的猴面包树剪影在橙红色天空下排列成行，如同通往另一个世界的门户。这座岛屿90%的物种是地球上独一无二的存在。</p><div class=\'dest-details\'><span class=\'detail-item\'>📍 穆龙达瓦</span><span class=\'detail-item\'>🗓️ 4-11月旱季</span><span class=\'detail-item\'>⏱️ 建议10-14天</span></div></div></div><div class=\'quote-section\'><blockquote>「旅行的意义不在于发现新的风景，而在于获得新的眼光。」</blockquote><cite>— 马塞尔·普鲁斯特</cite></div><div class=\'travel-tips\'><h3>🎒 小众旅行生存指南</h3><div class=\'tips-grid\'><div class=\'tip-item\'><h4>学几句当地话</h4><p>一句蹩脚的问候，能打开无数扇门</p></div><div class=\'tip-item\'><h4>带上纸质地图</h4><p>信号消失的地方，才是冒险开始的地方</p></div><div class=\'tip-item\'><h4>慢下来</h4><p>在一个地方待久一点，比走马观花更有收获</p></div><div class=\'tip-item\'><h4>接受不确定</h4><p>最好的故事往往来自计划之外</p></div></div></div><div class=\'packing-list\'><h4>📦 探险者必备清单</h4><div class=\'packing-grid\'><span class=\'pack-item\'>🥾 徒步靴</span><span class=\'pack-item\'>🔦 头灯</span><span class=\'pack-item\'>💊 常用药品</span><span class=\'pack-item\'>📓 旅行日记</span><span class=\'pack-item\'>🔌 万能转换插头</span><span class=\'pack-item\'>🧣 多功能头巾</span></div></div><div class=\'footer-cta\'><p>世界很大，热门景点只是冰山一角。<br><strong>勇敢地迷路吧，最美的风景在意料之外。</strong></p></div></div>',
  '背上行囊，踏入那些被遗忘的角落，寻找地图之外的故事与风景。',
  '旅行',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('旅行');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a1ab7e41365f91db480b', id FROM blog_tags WHERE tag_name = '旅行';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('探险');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a1ab7e41365f91db480b', id FROM blog_tags WHERE tag_name = '探险';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('小众目的地');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a1ab7e41365f91db480b', id FROM blog_tags WHERE tag_name = '小众目的地';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a7bf8540b46fa24094f7',
  '模拟的温度：黑胶复兴背后的听觉仪式',
  '<div class=\'vinyl-revival-post\'><style>.vinyl-revival-post { background-color: #1a1a1a; color: #e0e0e0; font-family: \'Georgia\', serif; line-height: 1.8; padding: 20px; border: 1px solid #333; box-shadow: 0 0 20px rgba(0,0,0,0.5); border-radius: 4px; } .vr-header { text-align: center; border-bottom: 2px solid #c5a059; padding-bottom: 2rem; margin-bottom: 2rem; } .vr-title { font-size: 2.8rem; font-weight: normal; margin: 0; color: #c5a059; text-transform: uppercase; letter-spacing: 2px; } .vr-subtitle { font-style: italic; color: #888; margin-top: 10px; display: block; } .vr-image-hero { width: 100%; height: 350px; object-fit: cover; border-radius: 2px; filter: grayscale(20%) contrast(1.2); border: 4px solid #2a2a2a; } .vr-content-section { margin: 3rem 0; display: flex; flex-direction: column; gap: 20px; } .vr-card { background: #222; border: 1px solid #333; padding: 1.5rem; transition: transform 0.3s ease, border-color 0.3s; position: relative; } .vr-card:hover { transform: translateY(-3px); border-color: #c5a059; } .vr-card h3 { color: #f0f0f0; border-left: 3px solid #c5a059; padding-left: 10px; margin-top: 0; } .vr-columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; } .vr-quote { font-size: 1.3rem; text-align: center; color: #c5a059; padding: 2rem; background: #111; border-top: 1px solid #c5a059; border-bottom: 1px solid #c5a059; margin: 3rem 0; font-family: \'Times New Roman\', serif; } .vr-highlight { color: #c5a059; font-weight: bold; } .vr-footer { text-align: center; font-size: 0.9rem; color: #666; margin-top: 3rem; } .vr-btn { display: inline-block; margin-top: 10px; color: #c5a059; text-decoration: none; border-bottom: 1px dotted #c5a059; transition: all 0.2s; } .vr-btn:hover { color: #fff; border-bottom-style: solid; }</style><header class=\'vr-header\'><h1 class=\'vr-title\'>Analog Warmth</h1><span class=\'vr-subtitle\'>在快节奏的世界里，寻找慢下来的声音</span></header><img src=\'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?w=1200&h=600&fit=crop\' alt=\'黑胶唱机在旋转\' class=\'vr-image-hero\'><p style=\'font-size: 1.1rem; margin-top: 2rem;\'>当手指轻轻拂过唱片封面粗糙的纸质纹理，当你小心翼翼地将唱针放置在旋转的黑色沟槽上，那个瞬间的静电声，是音乐开始前的神圣仪式。这不仅是关于听觉，更是关于<span class=\'vr-highlight\'>触感与时间</span>。</p><div class=\'vr-quote\'>“黑胶唱片是有瑕疵的，但正是这种不完美，赋予了音乐呼吸般的生命力。”</div><section class=\'vr-content-section\'><div class=\'vr-columns\'><div class=\'vr-card\'><h3>不仅是声音，是仪式</h3><p>流媒体让音乐变得像自来水一样廉价且随手可得。而黑胶迫使你慢下来：你必须站起来，挑选唱片，翻面。这种<strong>主动聆听</strong>的过程，让你重新夺回了对音乐的专注力。</p></div><div class=\'vr-card\'><h3>巨大的视觉艺术</h3><p>在手机屏幕上，封面只是一个图标。在黑胶唱片上，封面是值得装裱的<span class=\'vr-highlight\'>30厘米见方的艺术品</span>。你能看到设计的细节，阅读背面的歌词，感受艺术家完整的表达意图。</p></div><div class=\'vr-card\'><h3>温暖的模拟音质</h3><p>虽然数字音频在参数上可能更“完美”，但模拟信号不仅保留了声波的连续性，还带来了独特的谐波失真——也就是发烧友口中那种无法复制的<strong>温暖感</strong>和空间感。</p></div></div></section><div style=\'background-color: #222; padding: 2rem; border-radius: 4px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;\'><img src=\'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop\' alt=\'唱片收藏\' style=\'width: 150px; height: 150px; object-fit: cover; border-radius: 50%; animation: spin 20s linear infinite;\'><div style=\'flex: 1;\'><h3 style=\'margin:0 0 10px 0; color: #c5a059;\'>开始你的收藏之旅</h3><p style=\'margin:0;\'>不要被复杂的设备吓倒。从你最喜爱的那张专辑开始，去逛逛城市的独立唱片店。在那堆满尘埃的旧箱子里，你可能会发现通往过去的时光机。</p><a href=\'#\' class=\'vr-btn\'>探索附近的唱片地图 &rarr;</a></div></div><footer class=\'vr-footer\'><p>&copy; 2024 音频漫游指南. <a href=\'#\' class=\'vr-btn\'>订阅我们的复古周刊</a></p></footer></div>',
  '在流媒体主导的数字时代，为什么越来越多的人重新爱上了黑胶唱片？本文带你领略模拟音质的温暖，以及那种无法被算法取代的物理触感与听觉仪式。',
  '音乐',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('黑胶唱片');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a7bf8540b46fa24094f7', id FROM blog_tags WHERE tag_name = '黑胶唱片';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('音乐');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a7bf8540b46fa24094f7', id FROM blog_tags WHERE tag_name = '音乐';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('复古文化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a7bf8540b46fa24094f7', id FROM blog_tags WHERE tag_name = '复古文化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活美学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a7bf8540b46fa24094f7', id FROM blog_tags WHERE tag_name = '生活美学';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a90bc8166b72f7cdaffb',
  '星尘的低语：穿越一百三十亿年的光影回响',
  '<div class=\'cosmos-post\'><style>.cosmos-post {background-color: #050a14; color: #d0d6f9; font-family: \'Segoe UI\', \'Roboto\', Helvetica, Arial, sans-serif; padding: 2rem; border-radius: 8px; position: relative; overflow: hidden; line-height: 1.6;}.cosmos-post::before {content: \'\'; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at center, rgba(30, 58, 138, 0.2) 0%, rgba(5, 10, 20, 0) 70%); pointer-events: none;}.cosmos-title {font-size: 2.8rem; text-align: center; margin-bottom: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 4px; text-shadow: 0 0 10px rgba(100, 200, 255, 0.5), 0 0 20px rgba(100, 200, 255, 0.3);}.cosmos-intro {text-align: center; font-size: 1.2rem; max-width: 800px; margin: 0 auto 3rem auto; color: #a0aab5; font-weight: 300;}.cosmos-hero-img {width: 100%; border-radius: 4px; box-shadow: 0 0 30px rgba(0, 80, 255, 0.15); margin-bottom: 3rem; border: 1px solid rgba(255, 255, 255, 0.1);}.cosmos-section {margin-bottom: 4rem;}.cosmos-section-title {font-size: 1.8rem; border-left: 4px solid #3b82f6; padding-left: 1rem; margin-bottom: 1.5rem; color: #fff;}.cosmos-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;}.cosmos-card {background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); transition: transform 0.3s ease, background 0.3s ease;}.cosmos-card:hover {transform: translateY(-5px); background: rgba(255, 255, 255, 0.08); border-color: rgba(60, 150, 255, 0.3);}.card-icon {font-size: 2rem; margin-bottom: 1rem; display: block;}.card-heading {font-size: 1.2rem; color: #60a5fa; margin: 0 0 0.5rem 0; font-weight: 600;}.cosmos-fact-box {background: linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%); border-left: 5px solid #8b5cf6; padding: 2rem; margin: 3rem 0; position: relative;}.fact-highlight {color: #a78bfa; font-weight: bold;}.cosmos-footer {text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; color: #64748b; font-size: 0.9rem;}.cosmos-btn {display: inline-block; margin-top: 1rem; padding: 0.5rem 1.5rem; border: 1px solid #3b82f6; color: #3b82f6; text-decoration: none; border-radius: 50px; transition: all 0.3s ease;}.cosmos-btn:hover {background: #3b82f6; color: #fff; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);}</style><h1 class=\'cosmos-title\'>The Cosmic Dawn</h1><p class=\'cosmos-intro\'>当你仰望星空时，你看到的不仅是空间，更是时间。光线如同信使，穿越了数百万年的寂静虚空，将宇宙童年的模样带到了我们的视网膜上。</p><img src=\'https://images.unsplash.com/photo-1614730341194-75c60740a2d3?w=1200&h=600&fit=crop\' alt=\'深空星云图像\' class=\'cosmos-hero-img\'><div class=\'cosmos-section\'><h2 class=\'cosmos-section-title\'>韦伯的红外之眼</h2><p>与哈勃望远镜不同，詹姆斯·韦伯太空望远镜（JWST）主要在红外波段工作。这意味着它可以透过厚重的星际尘埃云，看到恒星诞生的“托儿所”，并捕捉到来自宇宙大爆炸后最早一批星系的微弱光芒。</p></div><div class=\'cosmos-section\'><h2 class=\'cosmos-section-title\'>探索的三大支柱</h2><div class=\'cosmos-grid\'><div class=\'cosmos-card\'><span class=\'card-icon\'>🌌</span><h3 class=\'card-heading\'>早期宇宙</h3><p>追溯到大爆炸后仅几亿年的时期，见证第一批星系如何从黑暗中点亮，重新定义我们对宇宙起源的理解。</p></div><div class=\'cosmos-card\'><span class=\'card-icon\'>🪐</span><h3 class=\'card-heading\'>系外行星</h3><p>分析遥远行星的大气成分，寻找水蒸气、甲烷甚至生命存在的化学指纹（Biosignatures）。</p></div><div class=\'cosmos-card\'><span class=\'card-icon\'>✨</span><h3 class=\'card-heading\'>恒星生命周期</h3><p>从分子云的坍缩到超新星的爆发，以前所未有的分辨率观察恒星生与死的壮丽循环。</p></div></div></div><div class=\'cosmos-fact-box\'><p><strong>你知道吗？</strong> 韦伯望远镜不仅看远处，它也能看近处。它拍摄的木星照片展示了惊人的极光、微弱的光环以及两颗微小的卫星，让我们对这个系内巨行星有了全新的<span class=\'fact-highlight\'>高清晰度认知</span>。</p></div><div class=\'cosmos-footer\'><p>宇宙在召唤，而我们要做的仅仅是睁开眼睛。</p><a href=\'#\' class=\'cosmos-btn\'>查看NASA高清图库 &rarr;</a></div></div>',
  '透过詹姆斯·韦伯太空望远镜的红外之眼，我们得以穿越百亿年的时空，凝视宇宙诞生的黎明。本文将带你探索那些震撼人心的星系深空图像，解析光年之外的壮丽史诗。',
  '科学',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('天文学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a90bc8166b72f7cdaffb', id FROM blog_tags WHERE tag_name = '天文学';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('韦伯望远镜');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a90bc8166b72f7cdaffb', id FROM blog_tags WHERE tag_name = '韦伯望远镜';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('宇宙探索');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a90bc8166b72f7cdaffb', id FROM blog_tags WHERE tag_name = '宇宙探索';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('科普');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a90bc8166b72f7cdaffb', id FROM blog_tags WHERE tag_name = '科普';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6973a9ce7b5b83189fd9f841',
  '立面之息：垂直花园与都市绿影的进化论',
  '<div class=\'eco-vert-garden\'><style>.eco-vert-garden {font-family: \'Helvetica Neue\', Arial, sans-serif; background-color: #f3f5f0; color: #2e3b2e; padding: 1.5rem; line-height: 1.8; border-radius: 15px; border: 1px solid #d4dec4;}.eco-header {background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(\'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=1200&h=600&fit=crop\') center/cover; padding: 4rem 2rem; border-radius: 12px; text-align: center; margin-bottom: 2rem; color: #fff;}.eco-title {font-size: 2.8rem; font-weight: 700; margin: 0; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);}.eco-intro {font-size: 1.2rem; max-width: 800px; margin: 2rem auto; text-align: center; color: #4a5d4a; border-left: 3px solid #8ba888; padding-left: 1rem;}.eco-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin: 3rem 0;}.eco-card {background: #fff; padding: 2rem; border-radius: 12px; border-bottom: 5px solid #8ba888; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease;}.eco-card:hover {transform: translateY(-8px);}.eco-card h3 {color: #2c512c; margin-top: 0;}.eco-stats-box {background-color: #e6ede6; padding: 2rem; border-radius: 12px; margin: 2rem 0; display: flex; flex-wrap: wrap; justify-content: space-around;}.eco-stat-item {text-align: center; padding: 1rem;}.eco-stat-val {display: block; font-size: 2rem; font-weight: bold; color: #4e7c4e;}.eco-tagline {background-color: #2c512c; color: #fff; padding: 1.5rem; text-align: center; border-radius: 8px; font-weight: 500; font-style: italic;}.eco-btn {display: inline-block; background-color: #4e7c4e; color: #fff; padding: 10px 25px; text-decoration: none; border-radius: 50px; font-size: 1rem; margin-top: 1rem; transition: background 0.3s;}.eco-btn:hover {background-color: #2c512c;}</style><header class=\'eco-header\'><h1 class=\'eco-title\'>UPWARD GREENERY</h1></header><div class=\'eco-intro\'><p>垂直绿化（Vertical Gardening）不只是植物的堆叠，它是对被掠夺土地的补偿，是人类在密集都市中与自然重建连接的一种温柔且坚定的话语方式。</p></div><div class=\'eco-grid\'><div class=\'eco-card\'><h3>热岛克星</h3><p>研究表明，覆盖植物的建筑表面可将周围温度降低达 10°C。绿墙是都市中天然的空调系统，显著降低建筑能耗。</p></div><div class=\'eco-card\'><h3>空气屏障</h3><p>一平方米的活绿墙每年可捕获多达 200 克的颗粒物，并产生等量的纯氧，它们是工业地景中沉默的空气净化器。</p></div><div class=\'eco-card\'><h3>微缩生态位</h3><p>即使在几十层的高空，花粉传播者如鸟类和蜜蜂也能找到栖息之所，将破碎的都市荒原缝合为完整的生物走廊。</p></div></div><div class=\'eco-stats-box\'><div class=\'eco-stat-item\'><span class=\'eco-stat-val\'>30%</span><span>减少环境噪音</span></div><div class=\'eco-stat-item\'><span class=\'eco-stat-val\'>1.5L</span><span>单位平方/日蒸腾降温</span></div><div class=\'eco-stat-item\'><span class=\'eco-stat-val\'>100%</span><span>视觉心理治愈力</span></div></div><div style=\'text-align:center; padding: 2rem;\'><img src=\'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&h=400&fit=crop\' alt=\'建筑外部绿化\' style=\'max-width:100%; border-radius:10px; margin-bottom: 2rem;\'><h2 style=\'color:#2c512c;\'>开启你的垂直植栽计划</h2><p>无论你是居住在市中心狭窄公寓的“植男植女”，还是拥有整片白墙的设计者，你只需要：<br><strong>模块化花槽 · 滴灌系统 · 耐阴植株</strong></p><p class=\'eco-tagline\'>“如果森林无法覆盖地面，我们就让它们覆盖墙面。”</p><a href=\'#\' class=\'eco-btn\'>获取都市园艺种子指南 &rarr;</a></div></div>',
  '在钢筋混凝土的裂缝中，绿意正悄然向上生长。本文探讨垂直花园如何将摩天大楼转变为立体的呼吸之肺，以及我们如何在方寸阳台开启这场绿色的空间革命。',
  '生态/生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('绿色建筑');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a9ce7b5b83189fd9f841', id FROM blog_tags WHERE tag_name = '绿色建筑';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('都市园艺');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a9ce7b5b83189fd9f841', id FROM blog_tags WHERE tag_name = '都市园艺';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('可持续发展');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a9ce7b5b83189fd9f841', id FROM blog_tags WHERE tag_name = '可持续发展';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生态美学');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6973a9ce7b5b83189fd9f841', id FROM blog_tags WHERE tag_name = '生态美学';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697a2ce482c2f13b2293292e',
  '智汇未来：人工智能如何重塑我们的世界',
  '<div class=\'tech-post\'><style>.tech-post {font-family: \'Helvetica Neue\', Arial, sans-serif; line-height: 1.7; color: #333; max-width: 100%;}.hero-section {background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 16px; margin-bottom: 2rem; text-align: center;}.hero-section h1 {font-size: 2.5rem; margin: 0 0 1rem;}.hero-section p {font-size: 1.2rem; opacity: 0.9; max-width: 800px; margin: 0 auto;}.intro-box {background: #f8f9fa; border-left: 4px solid #667eea; padding: 1.5rem; margin: 2rem 0; border-radius: 0 12px 12px 0;}.intro-box p {margin: 0; font-size: 1.1rem; color: #495057;}.tech-feature {display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;}.feature-card {flex: 1; min-width: 300px; background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: transform 0.3s ease;}.feature-card:hover {transform: translateY(-5px);}.feature-card h3 {color: #667eea; margin: 0 0 1rem;}.feature-card ul {padding-left: 1.5rem; margin: 0;}.feature-card li {margin-bottom: 0.5rem;}.timeline {position: relative; margin: 3rem 0;}.timeline:before {content: \'\'; position: absolute; top: 0; bottom: 0; width: 4px; background: #667eea; left: 20px; border-radius: 2px;}.timeline-item {position: relative; margin-bottom: 2rem; padding-left: 50px;}.timeline-dot {position: absolute; left: 10px; top: 0; width: 20px; height: 20px; background: #667eea; border-radius: 50%;}.timeline-date {font-weight: bold; color: #667eea; margin-bottom: 0.2rem;}.timeline-content {background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);}.impact-section {background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 2rem; border-radius: 16px; margin: 2rem 0;}.impact-section h3 {text-align: center; margin: 0 0 1.5rem; color: #c44536;}.impact-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;}.impact-card {background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 3px 10px rgba(0,0,0,0.08);}.impact-card h4 {margin: 0 0 0.5rem; color: #c44536;}.impact-card p {margin: 0; font-size: 0.9rem; color: #6c757d;}.future-preview {background: #2d3436; color: #dfe6e9; padding: 2rem; border-radius: 16px; margin: 2rem 0;}.future-preview h3 {margin: 0 0 1.5rem; text-align: center; color: #fdcb6e;}.future-preview ul {padding-left: 1.5rem;}.future-preview li {margin-bottom: 0.8rem;}.cta-section {text-align: center; padding: 2rem; background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%); border-radius: 16px; margin: 2rem 0;}.cta-section a {display: inline-block; background: white; color: #6c5ce7; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: bold; transition: all 0.3s ease;}.cta-section a:hover {transform: scale(1.05); box-shadow: 0 5px 20px rgba(0,0,0,0.2);}</style><div class=\'hero-section\'><h1>🤖 智汇未来</h1><p>人工智能如何重塑我们的世界</p></div><p class=\'intro-box\'>在过去的几年里，人工智能已经从科幻小说中的幻想，变成了我们日常生活中不可或缺的一部分。从智能手机的语音助手到自动驾驶汽车，AI正在以前所未有的速度改变着我们的世界。</p><div class=\'tech-feature\'><div class=\'feature-card\'><h3>💡 AI核心技术突破</h3><ul><li><strong>深度学习</strong>：神经网络的演进让机器具备了更强的学习能力</li><li><strong>自然语言处理</strong>：AI已能理解并生成接近人类水平的文本</li><li><strong>计算机视觉</strong>：图像识别准确率大幅提升，广泛应用于医疗诊断等领域</li><li><strong>强化学习</strong>：AI在复杂决策任务中表现出色</li></ul></div><div class=\'feature-card\'><h3>🌐 应用领域全景</h3><ul><li><strong>医疗健康</strong>：AI辅助诊断，提升疾病检测精度</li><li><strong>教育</strong>：个性化学习路径，智能辅导系统</li><li><strong>金融</strong>：风险评估，欺诈检测，自动化交易</li><li><strong>制造</strong>：智能制造，预测性维护</li><li><strong>交通</strong>：自动驾驶，智能交通管理</li></ul></div></div><div class=\'timeline\'><div class=\'timeline-item\'><div class=\'timeline-dot\'></div><div class=\'timeline-date\'>2020年</div><div class=\'timeline-content\'>GPT-3发布，开启大语言模型时代</div></div><div class=\'timeline-item\'><div class=\'timeline-dot\'></div><div class=\'timeline-date\'>2021年</div><div class=\'timeline-content\'>ChatGPT横空出世，AI对话能力突飞猛进</div></div><div class=\'timeline-item\'><div class=\'timeline-dot\'></div><div class=\'timeline-date\'>2022年</div><div class=\'timeline-content\'>多模态AI模型兴起，视觉+语言综合处理</div></div><div class=\'timeline-item\'><div class=\'timeline-dot\'></div><div class=\'timeline-date\'>2023年</div><div class=\'timeline-content\'>AI在创意产业广泛应用，内容生成能力大幅提升</div></div></div><div class=\'impact-section\'><h3>🌍 AI对社会的影响</h3><div class=\'impact-grid\'><div class=\'impact-card\'><h4>工作效率</h4><p>自动化流程，释放人力</p></div><div class=\'impact-card\'><h4>医疗进步</h4><p>精准诊断，个性化治疗</p></div><div class=\'impact-card\'><h4>教育变革</h4><p>因材施教，智能辅导</p></div><div class=\'impact-card\'><h4>环境保护</h4><p>智能监测，资源优化</p></div><div class=\'impact-card\'><h4>科学研究</h4><p>加速数据分析，发现新规律</p></div></div></div><div class=\'future-preview\'><h3>🔮 未来展望</h3><ul><li><strong>通用人工智能</strong>：更接近人类思维的智能系统</li><li><strong>人机协作</strong>：AI将成为人类工作的强大伙伴</li><li><strong>伦理规范</strong>：AI治理机制逐步完善</li><li><strong>边缘计算</strong>：AI能力下沉到终端设备</li><li><strong>可持续发展</strong>：AI助力解决全球性挑战</li></ul></div><div class=\'cta-section\'><a href=\'#\'>探索更多AI前沿技术</a></div></div>',
  '探索人工智能与未来的交汇点，那些正在改变我们生活的前沿技术。',
  '科技',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('人工智能');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2ce482c2f13b2293292e', id FROM blog_tags WHERE tag_name = '人工智能';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('未来科技');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2ce482c2f13b2293292e', id FROM blog_tags WHERE tag_name = '未来科技';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('创新');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2ce482c2f13b2293292e', id FROM blog_tags WHERE tag_name = '创新';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697a2e11fb8bb759f7f11359',
  '光影捕手：街头摄影中的瞬间永恒',
  '<div class=\'photo-post\'><style>.photo-post {font-family: \'Segoe UI\', system-ui, sans-serif; line-height: 1.7; color: #2c3e50;}.photo-title {font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; border-left: 5px solid #f39c12; padding-left: 1rem;}.section-title {font-size: 1.5rem; color: #34495e; border-bottom: 2px solid #ecf0f1; padding-bottom: 0.5rem; margin: 2rem 0 1rem; position: relative;}.section-title:after {content: \'\'; position: absolute; bottom: -2px; left: 0; width: 60px; height: 2px; background: linear-gradient(90deg, #f39c12, #e74c3c);}.feature-box {background: linear-gradient(135deg, #fef5e7 0%, #fdedec 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f5cba7; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.1);}.code-block {background: #2c3e50; color: #ecf0f1; padding: 1.5rem; border-radius: 8px; font-family: \'Courier New\', monospace; margin: 1.5rem 0; overflow-x: auto; border-left: 4px solid #f39c12;}.photo-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;}.photo-card {background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; border-top: 4px solid #e67e22; position: relative; overflow: hidden;}.photo-card:hover {transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);}.photo-card:before {content: \'📷\'; position: absolute; top: 10px; right: 15px; font-size: 1.5rem; opacity: 0.2;}.feature-list li {padding: 0.6rem 0; position: relative; padding-left: 1.8rem; list-style: none;}.feature-list li:before {content: \'✦\'; position: absolute; left: 0; color: #e74c3c; font-weight: bold;}.img-container {text-align: center; margin: 2rem 0; position: relative;}.photo-img {max-width: 100%; border-radius: 12px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease;}.photo-img:hover {transform: scale(1.02);}.caption {margin-top: 0.8rem; font-size: 0.9rem; color: #7f8c8d; font-style: italic;}.golden-hour {background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; text-align: center;}.golden-hour h3 {margin: 0 0 1rem; font-size: 1.4rem;}.tip-box {background: white; border-left: 4px solid #e74c3c; padding: 1.2rem; margin: 1rem 0; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);}.closing {text-align: center; padding: 2rem; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; border-radius: 12px; margin-top: 2rem;}.closing p {margin: 0; font-size: 1.1rem;}</style><h1 class=\'photo-title\'>光影捕手：街头摄影中的瞬间永恒</h1><div class=\'img-container\'><img src=\'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=600&fit=crop\' alt=\'街头摄影剪影\' class=\'photo-img\' width=\'800\' height=\'400\'><div class=\'caption\'>在城市的缝隙中寻找光的痕迹</div></div><p>街头摄影，是一种<strong>观察的艺术</strong>，也是一种<strong>等待的哲学</strong>。它不需要华丽的布景，不需要完美的模特，只需要一双善于发现的眼睛，和一颗敏感的心。在喧嚣的街头，在寂静的巷尾，每一个瞬间都可能成为永恒。</p><section><h2 class=\'section-title\'>👁️ 观察的艺术</h2><div class=\'feature-box\'><p>优秀的街头摄影师首先是<strong>敏锐的观察者</strong>。学会在平凡中发现不凡：</p><div class=\'code-block\'>观察心法：<br>• 慢下来 — 比路人走慢半步<br>• 环顾四周 — 不只是前方，还有头顶和脚下<br>• 预判 — 观察人物运动轨迹，等待决定性瞬间<br>• 感受氛围 — 光线、天气、情绪都是拍摄元素</div></div><ul class=\'feature-list\'><li><strong>几何构图</strong>：寻找建筑线条与人物运动的交汇点</li><li><strong>对比反差</strong>：新旧、快慢、明暗、悲喜的碰撞</li><li><strong>层次叠加</strong>：前景、中景、背景的纵深关系</li></ul></section><section><h2 class=\'section-title\'>☀️ 光的魔法时刻</h2><div class=\'golden-hour\'><h3>🌅 黄金时刻与蓝调时刻</h3><p>日出后和日落前的一小时，光线柔和温暖，阴影拉长而富有戏剧性。而日落后的蓝调时刻，城市灯光与深邃天空形成迷人对比。</p></div><div class=\'photo-grid\'><div class=\'photo-card\'><h3>逆光拍摄</h3><p>让光线从被摄体后方射入，创造剪影效果或温暖的轮廓光，增加画面的神秘感。</p></div><div class=\'photo-card\'><h3>窗户光</h3><p>利用咖啡馆、地铁站的窗户透进的自然光，为人物面部带来自然的明暗过渡。</p></div><div class=\'photo-card\'><h3>反射与投影</h3><p>积水、玻璃幕墙、镜子中的反射，或是建筑投射的长影，都是街头摄影的绝佳元素。</p></div></div></section><section><h2 class=\'section-title\'>⏱️ 决定性瞬间</h2><p>布列松提出的<strong>决定性瞬间</strong>理论，至今仍是街头摄影的灵魂。那不是简单的抓拍，而是形式、构图、光线、事件在千分之一秒内的完美统一。</p><div class=\'tip-box\'><strong>耐心是关键：</strong>有时候你需要在同一条街道等待一个小时，只为那几秒钟的完美 alignment。准备好相机，保持警觉，但不要急躁。</div></section><section><h2 class=\'section-title\'>📷 器材与心态</h2><p>关于器材，街头摄影有一句箴言：<strong>最好的相机是你随身携带的那台</strong>。无论是专业的无反相机，还是智能手机，重要的是背后的那双眼睛。</p><div class=\'photo-grid\'><div class=\'photo-card\'><h3>定焦镜头</h3><p>35mm或50mm定焦镜头强迫你移动双脚去思考构图，培养镜头感。</p></div><div class=\'photo-card\'><h3>静音快门</h3><p>在不打扰被摄者的前提下捕捉自然状态，尊重是街头摄影的伦理底线。</p></div><div class=\'photo-card\'><h3>直觉反应</h3><p>预设好参数，不要在被摄体前手忙脚乱调整设置，错过瞬间。</p></div></div></section><div class=\'closing\'><p>街头摄影教会我们敬畏生活，<br>在那些稍纵即逝的光影中，<strong>看见世界的诗意</strong>。</p></div></div>',
  '在街头捕捉光影的诗意，用镜头定格那些稍纵即逝的真实瞬间。',
  '艺术',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('摄影');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2e11fb8bb759f7f11359', id FROM blog_tags WHERE tag_name = '摄影';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('街头艺术');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2e11fb8bb759f7f11359', id FROM blog_tags WHERE tag_name = '街头艺术';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('光影');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a2e11fb8bb759f7f11359', id FROM blog_tags WHERE tag_name = '光影';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697a308ef25dfb04c46ce7d4',
  '把拖延变小：一个普通人的“低阻力”行动系统',
  '<div class=\'anti-delay-post\'><style>.anti-delay-post{font-family:ui-sans-serif,system-ui,-apple-system,\'Segoe UI\',Roboto,\'Noto Sans\',Arial;line-height:1.8;color:#1f2937;max-width:100%;}.ad-card{background:linear-gradient(135deg,#f8fafc 0%,#ffffff 60%,#f1f5f9 100%);border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,.08);overflow:hidden;}.ad-hero{padding:28px 24px;background:radial-gradient(1200px 300px at 10% 0%,rgba(56,189,248,.35),transparent 60%),radial-gradient(900px 260px at 90% 20%,rgba(167,139,250,.35),transparent 55%),linear-gradient(135deg,#0ea5e9 0%,#7c3aed 55%,#111827 140%);color:#fff;}.ad-title{margin:0;font-size:2rem;letter-spacing:.2px;}.ad-sub{margin:10px 0 0;opacity:.92;max-width:60ch}.ad-body{padding:22px 24px 26px}.ad-kicker{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 2px}.pill{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:#0f172a;color:#e2e8f0;font-size:.82rem}.pill b{color:#38bdf8}.ad-figure{margin:18px 0 6px;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;background:#0b1220}.ad-figure img{width:100%;height:260px;object-fit:cover;display:block;filter:saturate(1.05) contrast(1.02)}.ad-cap{font-size:.88rem;color:#6b7280;margin:8px 0 0}.sec{margin:20px 0 0}.sec h2{margin:0 0 10px;font-size:1.18rem;color:#0f172a;display:flex;align-items:center;gap:10px}.dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#a78bfa)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:10px}.box{border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)}.box h3{margin:0 0 6px;font-size:1rem;color:#111827}.box p{margin:0;color:#4b5563;font-size:.95rem}.check{margin:10px 0 0;padding:0;list-style:none}.check li{position:relative;padding-left:26px;margin:8px 0;color:#374151}.check li:before{content:\'✓\';position:absolute;left:0;top:0;width:18px;height:18px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;background:#dcfce7;color:#166534;font-weight:700;font-size:.85rem;border:1px solid #bbf7d0}.mini{border-left:4px solid #38bdf8;background:#f0f9ff;border-radius:10px;padding:12px 12px;margin:12px 0;color:#0f172a}.code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\'Liberation Mono\',\'Courier New\',monospace;background:#0b1220;color:#e5e7eb;border-radius:12px;padding:12px 14px;overflow:auto;border:1px solid rgba(148,163,184,.25)}.code .muted{color:#94a3b8}.two{display:grid;grid-template-columns:1fr;gap:12px}@media(min-width:760px){.two{grid-template-columns:1fr 1fr}}.callout{margin-top:18px;border:1px solid #e5e7eb;border-radius:16px;padding:16px;background:radial-gradient(700px 180px at 20% 0%,rgba(34,197,94,.18),transparent 60%),linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)}.callout strong{color:#111827}.links{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap}.links a{display:inline-block;text-decoration:none;border:1px solid #e5e7eb;background:#fff;border-radius:999px;padding:8px 12px;color:#111827;font-size:.92rem}.links a:hover{border-color:#a78bfa;box-shadow:0 6px 18px rgba(124,58,237,.12)}.footer{margin-top:18px;padding-top:14px;border-top:1px dashed #e5e7eb;color:#6b7280;font-size:.9rem}</style><div class=\'ad-card\'><header class=\'ad-hero\'><h1 class=\'ad-title\'>把拖延变小：一个普通人的“低阻力”行动系统</h1><p class=\'ad-sub\'>不靠鸡血，不靠自责。只把“开始”做得更容易，把“中断”做得更无害。</p><div class=\'ad-kicker\'><span class=\'pill\'><b>原则</b>降低阻力</span><span class=\'pill\'><b>目标</b>每天前进1%</span><span class=\'pill\'><b>方法</b>环境+节奏</span></div></header><div class=\'ad-body\'><div class=\'ad-figure\'><img src=\'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=520&fit=crop\' alt=\'桌面与笔记本：准备开始的一刻\' width=\'900\' height=\'260\'></div><p class=\'ad-cap\'>拖延往往不是懒，而是“启动成本”太高：打开文件、回忆上下文、担心做不好……一切都在消耗你。</p><section class=\'sec\'><h2><span class=\'dot\'></span>1) 先把任务改写成“可启动”的句子</h2><div class=\'mini\'>把“写报告”改成“打开文档 → 写出3个小标题”。把“学英语”改成“听5分钟并抄下3句”。</div><div class=\'two\'><div class=\'box\'><h3>错误写法（太抽象）</h3><div class=\'code\'><span class=\'muted\'>TODO:</span> 完成项目方案</div></div><div class=\'box\'><h3>正确写法（可执行）</h3><div class=\'code\'><span class=\'muted\'>NEXT:</span> 打开方案PPT → 新建一页“目标” → 写两条目标</div></div></div><ul class=\'check\'><li>一句话里出现“打开/新建/写下/整理/发送”等动词</li><li>第一步能在30秒内开始</li><li>结果可见：哪怕只是多了一个标题</li></ul></section><section class=\'sec\'><h2><span class=\'dot\'></span>2) 用“10分钟试运行”绕过大脑的抗拒</h2><div class=\'grid\'><div class=\'box\'><h3>开始前</h3><p>只允许自己承诺：10分钟。结束时可以停止，不算失败。</p></div><div class=\'box\'><h3>进行中</h3><p>不评价质量，只评价“是否在动”。先把东西放到页面上。</p></div><div class=\'box\'><h3>结束后</h3><p>记录一句：下一步是什么？把它写成可启动句子。</p></div></div><div class=\'mini\'>你会发现：大多数时候你并不是真的只做10分钟——你只是需要一个“无压力的入口”。</div></section><section class=\'sec\'><h2><span class=\'dot\'></span>3) 环境减法：让正确的事更顺手</h2><ul class=\'check\'><li>桌面只留一件主线工具：文档/代码/画板（其余收进抽屉或文件夹）</li><li>把“分心入口”移远：手机放到看不到的地方；浏览器只留一个窗口</li><li>把“下一步”贴在最显眼的位置：便签写上下一动作，贴在屏幕边</li></ul><div class=\'mini\'>如果你想更狠一点：给自己做一个“只用来专注的页面”，里面只有一条清单和一个链接。</div><div class=\'links\'><a href=\'#\'>我的今日一件事</a><a href=\'#\'>5分钟收尾清单</a><a href=\'#\'>下次从这里开始</a></div></section><section class=\'sec\'><h2><span class=\'dot\'></span>4) 允许“中断”，但要设计“回到现场”的路标</h2><div class=\'box\'><h3>写给未来的自己（离开前30秒）</h3><p>在页面顶部加一行：<strong>“我刚做到哪里？下一步做什么？卡点是什么？”</strong>下次打开即刻续航。</p></div><div class=\'code\'><span class=\'muted\'>回到现场三行：</span><br>1) 已完成：把数据表导入并清洗<br>2) 下一步：画出两张对比图（A/B）<br>3) 卡点：配色不确定（先用默认主题）</div></section><div class=\'callout\'><strong>一个小结：</strong>拖延不是敌人，它是提示灯——提示你“启动成本过高”或“目标过大”。把任务切小、把开始变轻、把中断变安全，你会比靠意志力走得更远。</div><div class=\'footer\'>如果你愿意分享：你最近最常拖延的事情是什么？我可以帮你把它改写成一个“可启动”的下一步。</div></div></div></div>',
  '一套不靠意志力硬扛的小方法：把注意力、环境和节奏调对，拖延就会自然变轻。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('效率');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a308ef25dfb04c46ce7d4', id FROM blog_tags WHERE tag_name = '效率';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('习惯');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a308ef25dfb04c46ce7d4', id FROM blog_tags WHERE tag_name = '习惯';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('拖延');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a308ef25dfb04c46ce7d4', id FROM blog_tags WHERE tag_name = '拖延';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697a316c02b6720009216a0c',
  '地球的十个小秘密：从极光到海底雪',
  '<div class=\'earth-secrets\'><style>.earth-secrets{font-family:ui-sans-serif,system-ui,-apple-system,\'Segoe UI\',Roboto,\'Noto Sans\',Arial;line-height:1.75;color:#0f172a}.es-wrap{border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#ffffff 0%,#f8fafc 55%,#ffffff 100%);box-shadow:0 14px 40px rgba(2,6,23,.08)}.es-hero{padding:26px 22px;background:radial-gradient(900px 300px at 10% 0%,rgba(16,185,129,.28),transparent 60%),radial-gradient(900px 280px at 90% 10%,rgba(59,130,246,.25),transparent 58%),linear-gradient(135deg,#0ea5e9 0%,#10b981 45%,#0f172a 120%);color:#fff}.es-hero h1{margin:0;font-size:2.05rem;letter-spacing:.2px}.es-hero p{margin:10px 0 0;opacity:.92;max-width:68ch}.es-body{padding:18px 22px 26px}.es-figure{margin:16px 0 8px;border-radius:14px;overflow:hidden;border:1px solid rgba(148,163,184,.45);background:#0b1220}.es-figure img{display:block;width:100%;height:260px;object-fit:cover}.es-cap{margin:8px 0 0;color:#64748b;font-size:.9rem}.es-badges{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 0}.badge{font-size:.82rem;border:1px solid rgba(255,255,255,.25);background:rgba(15,23,42,.22);color:#fff;border-radius:999px;padding:6px 10px;backdrop-filter:blur(6px)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:14px}.card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:14px 14px 12px;position:relative;overflow:hidden}.card:before{content:\'\';position:absolute;inset:-40px -60px auto auto;width:160px;height:160px;background:radial-gradient(circle at 30% 30%,rgba(59,130,246,.20),transparent 60%);transform:rotate(10deg)}.card h3{margin:0 0 6px;font-size:1.02rem;display:flex;align-items:center;gap:8px}.num{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#3b82f6);color:#fff;font-weight:800;font-size:.92rem;box-shadow:0 8px 16px rgba(34,197,94,.18)}.card p{margin:0;color:#334155;font-size:.95rem}.micro{margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;color:#64748b;font-size:.9rem}.panel{margin-top:16px;border:1px solid #e2e8f0;border-radius:16px;background:linear-gradient(135deg,#f0f9ff 0%,#ecfeff 50%,#f0fdf4 100%);padding:14px}.panel h2{margin:0 0 10px;font-size:1.12rem;color:#0f172a;display:flex;align-items:center;gap:10px}.spark{width:10px;height:10px;border-radius:999px;background:linear-gradient(135deg,#38bdf8,#34d399)}.links{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}.links a{text-decoration:none;color:#0f172a;background:#fff;border:1px solid #e2e8f0;border-radius:999px;padding:8px 12px;font-size:.92rem}.links a:hover{border-color:#34d399;box-shadow:0 10px 22px rgba(16,185,129,.12)}.footer{margin-top:16px;padding-top:14px;border-top:1px dashed #e2e8f0;color:#64748b;font-size:.9rem}</style><div class=\'es-wrap\'><header class=\'es-hero\'><h1>地球的十个小秘密：从极光到海底雪</h1><p>你每天都生活在这颗星球上，但它仍然会在不经意间露出“科幻感”。这里挑了十个容易理解、又足够惊喜的小知识。</p><div class=\'es-badges\'><span class=\'badge\'>无门槛科普</span><span class=\'badge\'>适合收藏</span><span class=\'badge\'>欢迎转发讨论</span></div></header><div class=\'es-body\'><div class=\'es-figure\'><img src=\'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&h=520&fit=crop\' alt=\'夜空中的极光\' width=\'900\' height=\'260\'></div><p class=\'es-cap\'>极光并不是“灯光秀”，而是太阳风与地球磁场共同写下的发光笔记。</p><div class=\'grid\'><div class=\'card\'><h3><span class=\'num\'>1</span>极光会“唱歌”</h3><p>在特定条件下，有人记录到极光附近的微弱噼啪声。成因仍在研究，可能与近地面电场变化有关。</p><div class=\'micro\'>关键词：电离层 / 静电放电</div></div><div class=\'card\'><h3><span class=\'num\'>2</span>海里会下“雪”</h3><p>深海中漂浮着由生物碎屑、黏液团和矿物颗粒组成的“海洋雪”，不断飘落，喂养海底生态系统。</p><div class=\'micro\'>关键词：marine snow / 碳循环</div></div><div class=\'card\'><h3><span class=\'num\'>3</span>沙漠也会“开花”</h3><p>当降雨时机和温度恰好对上，多年休眠的种子会在数周内爆发式发芽，形成短暂的花海。</p><div class=\'micro\'>关键词：休眠种子 / 极端适应</div></div><div class=\'card\'><h3><span class=\'num\'>4</span>冰会发出蓝光</h3><p>古老、致密的冰会显得更蓝，因为它吸收红光更强。冰川裂隙里那种“蓝”，是时间压出来的颜色。</p><div class=\'micro\'>关键词：光吸收 / 冰晶结构</div></div><div class=\'card\'><h3><span class=\'num\'>5</span>会发光的海浪</h3><p>某些浮游生物受到扰动会生物发光，夜晚的浪花因此像撒了一把星尘。</p><div class=\'micro\'>关键词：荧光素酶 / 生物发光</div></div><div class=\'card\'><h3><span class=\'num\'>6</span>雨有“味道”</h3><p>雨后那股清新气味常与土壤细菌释放的分子有关，人类对它格外敏感。</p><div class=\'micro\'>关键词：petrichor / 土壤微生物</div></div><div class=\'card\'><h3><span class=\'num\'>7</span>云也会“长成一座山”</h3><p>强对流能把云顶推到对流层顶附近，形成巨大的积雨云塔，远看像漂浮的山脉。</p><div class=\'micro\'>关键词：对流 / 砧状云</div></div><div class=\'card\'><h3><span class=\'num\'>8</span>石头会“流动”</h3><p>在极长时间尺度下，地幔像黏稠的流体一样缓慢对流，驱动板块运动与火山活动。</p><div class=\'micro\'>关键词：地幔对流 / 板块构造</div></div><div class=\'card\'><h3><span class=\'num\'>9</span>地球会“呼吸”</h3><p>全球植被在一年四季的光合作用起伏，会让大气中的二氧化碳浓度呈现周期波动。</p><div class=\'micro\'>关键词：季节曲线 / 碳汇</div></div><div class=\'card\'><h3><span class=\'num\'>10</span>你脚下有“隐形河流”</h3><p>地下含水层像海绵储水；在某些地区，地下水的流动规模堪比河流，只是我们看不见。</p><div class=\'micro\'>关键词：含水层 / 地下水补给</div></div></div><div class=\'panel\'><h2><span class=\'spark\'></span>如果你想继续深挖</h2><p style=\'margin:0;color:#334155\'>给自己留一个“好奇心书签”：以后看到相关词条，顺手点开就能进入资料坑。</p><div class=\'links\'><a href=\'#\'>极光与地磁</a><a href=\'#\'>深海生态与海洋雪</a><a href=\'#\'>沙漠开花现象</a><a href=\'#\'>生物发光</a></div></div><div class=\'footer\'>你最想亲眼见到哪一个？也欢迎补充你知道的地球冷知识（最好带一个关键词）。</div></div></div></div>',
  '从极光到微生物，十个“看一眼就想查资料”的冷知识，带你重新认识地球。',
  '自然',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自然科普');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a316c02b6720009216a0c', id FROM blog_tags WHERE tag_name = '自然科普';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('冷知识');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a316c02b6720009216a0c', id FROM blog_tags WHERE tag_name = '冷知识';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('地球');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697a316c02b6720009216a0c', id FROM blog_tags WHERE tag_name = '地球';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697ad01009ebc54efd151cd9',
  '写给一年后的你：在喧嚣世界里保留一小块安静',
  '<div class=\'letter-post\'><style>.letter-post{font-family:ui-serif,Georgia,\'Times New Roman\',Times,serif;line-height:1.9;color:#1f2937}.lp-shell{background:linear-gradient(180deg,#fffdf7 0%,#ffffff 35%,#fbfdff 100%);border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 14px 42px rgba(17,24,39,.08);overflow:hidden}.lp-top{padding:26px 22px;background:radial-gradient(900px 300px at 12% 0%,rgba(245,158,11,.22),transparent 60%),radial-gradient(900px 300px at 92% 15%,rgba(59,130,246,.18),transparent 55%),linear-gradient(135deg,#111827 0%,#374151 40%,#0f172a 100%);color:#fff;position:relative}.lp-top:after{content:\'\';position:absolute;inset:auto 0 0 0;height:14px;background:linear-gradient(90deg,rgba(245,158,11,.9),rgba(59,130,246,.85));opacity:.9}.lp-title{margin:0;font-size:2.05rem;letter-spacing:.2px}.lp-meta{margin:10px 0 0;opacity:.9;display:flex;gap:10px;flex-wrap:wrap;font-size:.92rem}.chip{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08);backdrop-filter:blur(6px)}.lp-body{padding:18px 22px 26px}.lp-hero{margin:16px 0 10px;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;background:#0b1220}.lp-hero img{width:100%;height:250px;object-fit:cover;display:block}.lp-caption{margin:8px 0 0;color:#6b7280;font-size:.92rem}.dropcap:first-letter{float:left;font-size:3.2rem;line-height:1;margin:6px 10px 0 0;color:#f59e0b;font-weight:700}.quote{margin:16px 0;padding:14px 14px 14px 16px;border-left:4px solid #3b82f6;background:linear-gradient(135deg,#eff6ff 0%,#ffffff 55%);border-radius:12px}.quote p{margin:0;color:#0f172a;font-style:italic}.sec{margin-top:18px}.sec h2{margin:0 0 10px;font-size:1.15rem;color:#0f172a;display:flex;align-items:center;gap:10px}.mark{width:10px;height:10px;border-radius:999px;background:linear-gradient(135deg,#f59e0b,#3b82f6)}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px}.card{border:1px solid #e5e7eb;border-radius:16px;padding:14px;background:linear-gradient(180deg,#ffffff 0%,#f9fafb 100%)}.card h3{margin:0 0 6px;font-size:1rem;color:#111827}.card p{margin:0;color:#4b5563;font-size:.98rem}.list{margin:10px 0 0;padding:0;list-style:none}.list li{position:relative;padding-left:26px;margin:8px 0;color:#374151}.list li:before{content:\'•\';position:absolute;left:10px;top:-1px;color:#f59e0b;font-size:1.4rem;line-height:1}.mini-note{margin:14px 0;padding:12px 12px;border-radius:14px;background:linear-gradient(135deg,#fef3c7 0%,#ffffff 55%);border:1px solid #fde68a;color:#78350f}.links{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}.links a{text-decoration:none;color:#0f172a;background:#fff;border:1px solid #e5e7eb;border-radius:999px;padding:8px 12px;font-size:.92rem}.links a:hover{border-color:#3b82f6;box-shadow:0 10px 24px rgba(59,130,246,.12)}.sig{margin-top:18px;padding-top:14px;border-top:1px dashed #e5e7eb;color:#6b7280;font-size:.95rem}.sig strong{color:#111827}</style><div class=\'lp-shell\'><header class=\'lp-top\'><h1 class=\'lp-title\'>写给一年后的你：在喧嚣世界里保留一小块安静</h1><div class=\'lp-meta\'><span class=\'chip\'>公开信</span><span class=\'chip\'>写作练习</span><span class=\'chip\'>给全世界的读者</span></div></header><div class=\'lp-body\'><div class=\'lp-hero\'><img src=\'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=520&fit=crop\' alt=\'森林晨光与小路\' width=\'900\' height=\'250\'></div><p class=\'lp-caption\'>如果你正被消息淹没，先把目光放回呼吸里。</p><p class=\'dropcap\'>一年后的你，可能正坐在另一个季节里。你也许换了城市，换了工作，换了喜欢的歌单；也许什么都没换，但心里多了一点点笃定。无论你在哪里，我想提醒你：别把自己交给永远刷不完的事情。</p><div class=\'quote\'><p>你不需要把世界全部接住。你只需要接住今天。</p></div><section class=\'sec\'><h2><span class=\'mark\'></span>关于“安静”的三个误会</h2><div class=\'cards\'><div class=\'card\'><h3>误会一：安静=逃避</h3><p>安静不是躲起来，而是把注意力从噪音里抽回来，重新听见自己想要什么。</p></div><div class=\'card\'><h3>误会二：安静=效率</h3><p>安静不等于产出更多，它更像是一种“清晰度”。你做得更少，但更对。</p></div><div class=\'card\'><h3>误会三：安静=孤独</h3><p>安静也可以很热闹：你在读一本书、做一顿饭、给朋友写信——心里有光。</p></div></div></section><section class=\'sec\'><h2><span class=\'mark\'></span>给你的一份小小清单（可随时重启）</h2><ul class=\'list\'><li>每天留出一段“无输入时间”：不刷屏，不看新闻，不看短视频，只散步或发呆10分钟。</li><li>把“要做”换成“下一步”：把任务写成能立刻开始的一句话，减少启动阻力。</li><li>对喜欢的人更直接：一句问候、一次拥抱、一顿饭，很多事都被温柔解决。</li><li>保留一个长期爱好：写作、画画、跑步、园艺、乐器都可以，它会在低谷里拉你一把。</li><li>给自己一个慢计划：不是“今年要成功”，而是“今年要更会生活”。</li></ul><div class=\'mini-note\'><strong>小提示：</strong>当你感到混乱，把手机屏幕朝下放一分钟。只需要一分钟，就足以让你从自动驾驶里醒来。</div></section><section class=\'sec\'><h2><span class=\'mark\'></span>如果你想把这封信传下去</h2><p style=\'margin:0;color:#374151\'>你可以把它当作一个“给未来的书签”。也可以分享给任何正在熬夜、焦虑、或者只是有点累的人。</p><div class=\'links\'><a href=\'#\'>把它存为我的书签</a><a href=\'#\'>写一封给未来的信</a><a href=\'#\'>今晚的十分钟安静</a></div></section><div class=\'sig\'>愿你在一年后，依然保有好奇、勇气与柔软。<br><strong>— 来自此刻的你</strong></div></div></div></div>',
  '一封写给未来的公开信：关于我们如何在信息洪流里保留专注、温柔与好奇。',
  '文学',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('随笔');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad01009ebc54efd151cd9', id FROM blog_tags WHERE tag_name = '随笔';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('写作');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad01009ebc54efd151cd9', id FROM blog_tags WHERE tag_name = '写作';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('自我成长');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad01009ebc54efd151cd9', id FROM blog_tags WHERE tag_name = '自我成长';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '697ad1052b1de67dcc511167',
  '小确幸经济学：为什么那些小事会让你更幸福',
  '<div class=\'little-happiness\'><style>.little-happiness{font-family:\'Helvetica Neue\',Arial,sans-serif;line-height:1.7;color:#2d3748;max-width:100%}.hero{background:linear-gradient(135deg,#f0fdf4 0%,#e8f5e9 45%,#d1fae5 100%);border-radius:16px;box-shadow:0 10px 30px rgba(16,185,129,.1);padding:24px 20px;margin-bottom:20px}.hero h1{margin:0;font-size:2.1rem;color:#065f46;text-align:center;font-weight:700}.hero p{margin:10px 0 0;text-align:center;font-size:1.1rem;color:#065f46;font-weight:500}.section{margin:22px 0 0}.section h2{margin:0 0 10px;font-size:1.2rem;color:#0f172a;display:flex;align-items:center;gap:10px}.dot{width:10px;height:10px;border-radius:50%;background:#10b981}.note{margin:14px 0;padding:16px;border-left:4px solid #10b981;border-radius:0 12px 12px 0;background:rgba(16,185,129,.06);color:#166535;font-size:.96rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:12px}.card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;box-shadow:0 4px 12px rgba(10,25,47,.05);transition:all .3s ease}.card h3{margin:0 0 8px;font-size:1.08rem;color:#0f172a}.card p{margin:0;color:#475569;font-size:.92rem}.quote-box{margin:16px 0;padding:18px;border-radius:14px;background:linear-gradient(135deg,#fff7ed 0%,#fffbeb 100%);border:1px solid #fef3c7}.quote-box p{margin:0;font-style:italic;font-size:1.08rem;color:#92400e}.benefits{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin:16px 0}.benefit-card{border-radius:14px;padding:12px 14px;text-align:center;background:rgba(59,130,246,.05);border:1px solid #dbeafe}.benefit-card h4{margin:0;font-size:1rem;color:#1d4ed8;font-weight:600}.benefit-card p{margin:0;font-size:.9rem;color:#475569}.footer-note{margin-top:18px;text-align:center;color:#475569;font-size:.94rem}.footer-note strong{color:#0f172a}.highlight{background:#fef3c7;color:#92400e;padding:0 4px;border-radius:4px;font-weight:500}.action-plan{background:#fffbeb;padding:16px;border-radius:14px;margin:18px 0;border:1px solid #fef3c7}.action-plan h3{margin:0;font-size:1.1rem;color:#92400e}.action-plan ul{padding-left:20px;margin:10px 0 0}.action-plan li{margin-bottom:8px;line-height:1.5;color:#64748b}</style><div class=\'hero\'><h1>小确幸经济学</h1><p>为什么那些小事会让你更幸福？</p></div><p style=\'text-align:center;margin:0 0 20px;color:#475569;font-size:.92rem\'>你不需要大奇迹才能快乐。只要在生活的缝隙中找到几件微小而真实的好事</p><div class=\'section\'><h2><span class=\'dot\'></span>生活中的“微正反馈”效应</h2><div class=\'note\'>科学家在实验中发现：每天记录三件“今天做得不错”的小事情，连续三周后被测者对生活质量的主观评分提高了35%</div><p style=\'margin:14px 0;\'>我们往往忽视了这些被“日常琐事”遮蔽的小幸福感：</p><ul style=\'padding-left:20px;margin:10px 0 0;color:#475569;\'><li>咖啡在嘴唇上留下的轻微温感，让你瞬间清醒</li><li>听到手机通知的提示音时的期待感</li><li>翻开一本旧书时，熟悉的香味</li><li>地铁站台等车的片刻闲暇，看人来人往</li></ul><p style=\'margin:10px 0;\'>它们看似不起眼，却是大脑分泌快乐激素的关键刺激。</p></div><div class=\'quote-box\'><p>生活最大的秘密是：<strong>它不是一个终点</strong>，而是一些你每天可以选择享受的过程。</p></div><div class=\'section\'><h2><span class=\'dot\'></span>小确幸的价值体系</h2><div class=\'grid\'><div class=\'card\'><h3>即时满足型</h3><p>让你在1秒后获得愉悦感的小事：一袋薯片、一杯热饮</p></div><div class=\'card\'><h3>持续奖励型</h3><p>在较长时间跨度内积累快乐的体验：看书、学新技能</p></div><div class=\'card\'><h3>情绪联结型</h3><p>通过触发回忆与联想带来的情感价值：听老歌、品怀旧料理</p></div></div></div><div class=\'section\'><h2><span class=\'dot\'></span>幸福感提升四步法</h2><div class=\'benefits\'><div class=\'benefit-card\'><h4>察觉</h4><p>留意当下生活中小的愉快感</p></div><div class=\'benefit-card\'><h4>标记</h4><p>用“+1”的方式给小确幸记分</p></div><div class=\'benefit-card\'><h4>延续</h4><p>尝试将愉快体验延续至更长时间</p></div><div class=\'benefit-card\'><h4>记录</h4><p>定期回顾让你快乐的那些碎片</p></div></div><div class=\'action-plan\'><h3>你的小确幸行动计划</h3><ul><li><span class=\'highlight\'>早晨第一件事：</span>在床头放一本小册子，专门写今天三个微快乐的事</li><li><span class=\'highlight\'>午休10分钟：</span>放下工作，去厨房冲一杯热水泡茶，感受热气腾升的那一刻</li><li><span class=\'highlight\'>下班回家：</span>关掉电视，听一首轻音乐，感受空间中的静谧</li><li><span class=\'highlight\'>睡前5分钟：</span>回顾这一天中发生的三个让你嘴角上扬的小瞬间</li></ul></div></div><div class=\'footer-note\'><strong>小贴士：</strong>快乐是需要练习的。当你习惯了关注这些小确幸，<strong>生活本身的密度</strong>会慢慢提升</div></div>',
  '那些看似不起眼的生活小确幸，藏着让你快乐的底层逻辑。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad1052b1de67dcc511167', id FROM blog_tags WHERE tag_name = '生活';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('小确幸');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad1052b1de67dcc511167', id FROM blog_tags WHERE tag_name = '小确幸';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('心理');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '697ad1052b1de67dcc511167', id FROM blog_tags WHERE tag_name = '心理';

INSERT INTO blog_posts (id, title, content, excerpt, category, author, readTime, published, ACL) VALUES (
  '6987448065614e0be9078a21',
  '咖啡时光：一杯饮品里的世界地图',
  '<div class=\'coffee-post\'><style>.coffee-post{font-family:\'Georgia\',\'Times New Roman\',serif;line-height:1.8;color:#3e2723;max-width:100%}.coffee-wrap{background:linear-gradient(180deg,#faf7f2 0%,#fff 50%,#faf7f2 100%);border:1px solid #d7ccc8;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(62,39,35,.12)}.coffee-hero{background:linear-gradient(135deg,#4e342e 0%,#6d4c41 40%,#3e2723 100%);color:#fff;padding:28px 24px;text-align:center}.coffee-hero h1{margin:0;font-size:2.2rem;letter-spacing:1px}.coffee-hero p{margin:8px 0 0;font-size:1.1rem;opacity:.9}.coffee-body{padding:24px}.coffee-figure{margin:18px 0;border-radius:16px;overflow:hidden;border:1px solid #d7ccc8;box-shadow:0 8px 24px rgba(62,39,35,.15)}.coffee-figure img{width:100%;height:280px;object-fit:cover;display:block}.figure-cap{margin:8px 0 0;text-align:center;font-size:.9rem;color:#8d6e63;font-style:italic}.sec{margin-top:22px}.sec h2{margin:0 0 12px;font-size:1.25rem;color:#4e342e;display:flex;align-items:center;gap:10px}.bean{width:12px;height:12px;background:#6d4c41;border-radius:50%}.bean-group{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:12px}.bean-card{background:#fff;border:1px solid #efebe9;border-radius:16px;padding:16px;box-shadow:0 4px 12px rgba(62,39,35,.08);transition:all .3s ease}.bean-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(62,39,35,.15)}.bean-card h3{margin:0 0 8px;font-size:1.1rem;color:#3e2723}.bean-card p{margin:0;color:#5d4037;font-size:.94rem}.brew-guide{background:#efebe9;border-left:4px solid #6d4c41;border-radius:0 12px 12px 0;padding:16px;margin:16px 0}.brew-guide h3{margin:0 0 10px;font-size:1.1rem;color:#3e2723}.step{margin:8px 0;color:#4e342e}.step strong{color:#6d4c41}.roast-bar{display:flex;gap:8px;margin:12px 0;flex-wrap:wrap}.roast-tag{display:inline-block;padding:6px 12px;border-radius:20px;font-size:.85rem;color:#fff;background:#8d6e63}.roast-tag.light{background:#a1887f}.roast-tag.medium{background:#6d4c41}.roast-tag.dark{background:#3e2723}.world-map{margin:16px 0;padding:16px;background:#fff;border:1px solid #d7ccc8;border-radius:16px}.map-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:10px}.region{text-align:center;padding:12px;background:#faf7f2;border-radius:12px;border:1px solid #efebe9}.region h4{margin:0 0 4px;color:#4e342e;font-size:1rem}.region p{margin:0;font-size:.85rem;color:#8d6e63}.links{margin-top:16px;display:flex;gap:10px;flex-wrap:wrap}.links a{display:inline-block;text-decoration:none;color:#4e342e;background:#fff;border:1px solid #d7ccc8;border-radius:24px;padding:8px 14px;font-size:.9rem;transition:all .2s ease}.links a:hover{background:#6d4c41;color:#fff;border-color:#6d4c41}.footer-note{margin-top:18px;padding-top:14px;border-top:1px dashed #d7ccc8;text-align:center;color:#8d6e63;font-size:.9rem}</style><div class=\'coffee-wrap\'><header class=\'coffee-hero\'><h1>☕ 咖啡时光</h1><p>一杯饮品里的世界地图</p></header><div class=\'coffee-body\'><div class=\'coffee-figure\'><img src=\'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=560&fit=crop\' alt=\'咖啡拉花艺术\' width=\'800\' height=\'280\'></div><p class=\'figure-cap\'>当蒸汽穿过咖啡粉，时间仿佛慢了下来</p><p style=\'margin:16px 0;font-size:1.05rem;color:#4e342e\'>咖啡不只是提神饮料，它是<strong>地理的浓缩</strong>、<strong>时间的艺术</strong>，也是现代人对抗匆忙的最后一道防线。从埃塞俄比亚的高原到西雅图的街头，每一颗豆子都承载着风土与故事。</p><section class=\'sec\'><h2><span class=\'bean\'></span>豆子的三原色</h2><div class=\'bean-group\'><div class=\'bean-card\'><h3>🌿 阿拉比卡</h3><p>占全球产量60%，风味细腻，带有花果香与明亮酸度，精品咖啡的首选。</p></div><div class=\'bean-card\'><h3>🌰 罗布斯塔</h3><p>咖啡因含量高，口感醇厚带苦味，常用于意式拼配，crema更丰富。</p></div><div class=\'bean-card\'><h3>🍫 利比里卡</h3><p>稀有品种，带有独特的烟熏与木质调，主要产于菲律宾与马来西亚。</p></div></div></section><section class=\'sec\'><h2><span class=\'bean\'></span>烘焙的色谱</h2><div class=\'roast-bar\'><span class=\'roast-tag light\'>浅烘 · 花果酸香</span><span class=\'roast-tag medium\'>中烘 · 焦糖平衡</span><span class=\'roast-tag dark\'>深烘 · 苦甜浓郁</span></div><p style=\'margin:10px 0;color:#5d4037;font-size:.95rem\'>烘焙不是把豆子烤焦，而是在<strong>美拉德反应</strong>与<strong>焦糖化反应</strong>之间找到最佳平衡点。浅烘保留产地风味，深烘带来醇厚body。</p></section><section class=\'sec\'><h2><span class=\'bean\'></span>全球风味地图</h2><div class=\'world-map\'><div class=\'map-grid\'><div class=\'region\'><h4>🇪🇹 埃塞俄比亚</h4><p>耶加雪菲 · 茉莉花香</p></div><div class=\'region\'><h4>🇨🇴 哥伦比亚</h4><p>慧兰 · 坚果焦糖</p></div><div class=\'region\'><h4>🇮🇩 印度尼西亚</h4><p>曼特宁 · 草本 earthy</p></div><div class=\'region\'><h4>🇰🇪 肯尼亚</h4><p>AA级 · 黑醋栗酸质</p></div><div class=\'region\'><h4>🇧🇷 巴西</h4><p>喜拉多 · 巧克力坚果</p></div><div class=\'region\'><h4>🇵🇦 巴拿马</h4><p>瑰夏 · 热带水果炸弹</p></div></div></div></section><section class=\'sec\'><h2><span class=\'bean\'></span>居家冲煮指南</h2><div class=\'brew-guide\'><h3>手冲四要素</h3><div class=\'step\'><strong>水温：</strong>浅烘90-93°C，深烘85-88°C</div><div class=\'step\'><strong>粉水比：</strong>1:15到1:17，根据个人口味调整</div><div class=\'step\'><strong>研磨度：</strong>像粗海盐（砂糖状适合意式）</div><div class=\'step\'><strong>时间：</strong>2分30秒到3分钟，避免过萃</div></div></section><div class=\'links\'><a href=\'#\'>寻找附近咖啡馆</a><a href=\'#\'>购买当季咖啡豆</a><a href=\'#\'>手冲视频教程</a><a href=\'#\'>咖啡品鉴笔记</a></div><div class=\'footer-note\'>最好的咖啡，是你此刻正在喝的那一杯。<br>慢下来，让香气带你旅行。</div></div></div></div>',
  '从豆到杯的温暖旅程：探索咖啡文化中的慢生活美学与全球风味图谱。',
  '生活',
  'hzliflow-kimiai',
  '1 分钟阅读',
  1,
  '{"*":{"write":true,"read":true}}'
);

INSERT IGNORE INTO blog_tags (tag_name) VALUES ('咖啡');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6987448065614e0be9078a21', id FROM blog_tags WHERE tag_name = '咖啡';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('文化');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6987448065614e0be9078a21', id FROM blog_tags WHERE tag_name = '文化';
INSERT IGNORE INTO blog_tags (tag_name) VALUES ('慢生活');
INSERT INTO blog_post_tags (post_id, tag_id) SELECT '6987448065614e0be9078a21', id FROM blog_tags WHERE tag_name = '慢生活';


-- =====================================================
-- 导入API数据 (api_configs)
-- =====================================================

INSERT INTO api_configs (id, name, description, category, tags, requestUrl, methods, icon, status, visits, ACL) VALUES (
  '6957e34486e785101d6935e5',
  'Hello API',
  '基础问候API，支持多种语言的问候语',
  'basic',
  '["基础","问候","示例"]',
  'https://hzliflow.ken520.top/api/hello',
  '["GET","POST"]',
  '👋',
  '关闭',
  6739,
  '{"*":{"read":true}}'
);

INSERT INTO api_configs (id, name, description, category, tags, requestUrl, methods, icon, status, visits, ACL) VALUES (
  '695890efab078458c941311c',
  'AI对话 API',
  '智能对话接口，支持多轮对话',
  'ai',
  '["AI","对话","智能"]',
  'https://hzliflow.ken520.top/api/ai-chat',
  '["GET","POST"]',
  '🤖',
  '正常',
  24589,
  '{"*":{"read":true}}'
);

INSERT INTO api_configs (id, name, description, category, tags, requestUrl, methods, icon, status, visits, ACL) VALUES (
  '695893af4243696c7294e43e',
  'AI图像生成 API',
  '基于AI的图像生成和编辑服务',
  'ai',
  '["AI","图像","生成"]',
  'https://hzliflow.ken520.top/api/ai-image',
  '["GET","POST"]',
  '🎨',
  '正常',
  18923,
  '{"*":{"read":true}}'
);


-- =====================================================
-- 导入产品数据 (products)
-- =====================================================

INSERT INTO products (id, name, description, price, originalPrice, category, tags, features, image, rating, in_stock, ACL) VALUES (
  '6957e21b75685f306ba87729',
  'AI智能写作助手',
  '基于最新AI技术的智能写作工具，帮助您快速生成高质量内容',
  99.99,
  199.99,
  '软件工具',
  '["AI","写作","效率"]',
  '["智能生成","多语言支持","一键导出"]',
  '/api/placeholder/300/300',
  4.8,
  TRUE,
  '{"*":{"read":true}}'
);

INSERT INTO products (id, name, description, price, originalPrice, category, tags, features, image, rating, in_stock, ACL) VALUES (
  '69588e4975685f306ba89f74',
  '智能客服系统',
  '24/7全自动化客服，提升客户满意度',
  199.99,
  299.99,
  '客户服务',
  '["客服","自动化","AI"]',
  '["24/7服务","智能回复","多渠道支持"]',
  '/api/placeholder/300/300',
  4.7,
  TRUE,
  '{"*":{"read":true}}'
);

INSERT INTO products (id, name, description, price, originalPrice, category, tags, features, image, rating, in_stock, ACL) VALUES (
  '69588e0a4243696c7294e37c',
  '数据可视化仪表板',
  '强大的数据分析和可视化工具，让数据一目了然',
  149.99,
  299.99,
  '数据分析',
  '["数据","图表","分析"]',
  '["实时更新","多种图表","自定义面板"]',
  '/api/placeholder/300/300',
  4.9,
  TRUE,
  '{"*":{"read":true}}'
);

-- =====================================================
-- 验证数据导入
-- =====================================================

SELECT 
  (SELECT COUNT(*) FROM users) as user_count,
  (SELECT COUNT(*) FROM blog_posts) as blog_count,
  (SELECT COUNT(*) FROM api_configs) as api_count,
  (SELECT COUNT(*) FROM products) as product_count,
  (SELECT COUNT(*) FROM blog_tags) as tag_count,
  (SELECT COUNT(*) FROM blog_post_tags) as post_tag_count;
