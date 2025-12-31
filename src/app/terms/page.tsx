import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="NewWebAI" className="h-8 w-8" />
            <span className="text-xl font-bold text-black">NewWebAI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-black hover:text-blue-600 transition">首页</Link>
            <Link href="/blog" className="text-black hover:text-blue-600 transition">博客</Link>
            <Link href="/store" className="text-black hover:text-blue-600 transition">产品</Link>
            <Link href="/ai-tools" className="text-black hover:text-blue-600 transition">AI工具</Link>
            <Link href="/api-docs" className="text-black hover:text-blue-600 transition">API</Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition">关于</Link>
          </div>
          <div className="flex space-x-3">
            <Link href="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              登录
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              注册
            </Link>
          </div>
        </div>
      </nav>

      {/* 服务条款内容 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              NewWebAI 服务条款
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-black mb-6">
                欢迎使用NewWebAI平台。本服务条款（以下简称"条款"）是您（以下简称"用户"）与小黄の数字宇宙工作室（以下简称"我们"）之间关于使用NewWebAI服务的法律协议。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">1. 服务说明</h2>
              <p className="text-black mb-4">
                NewWebAI是一个由人工智能技术驱动的综合性平台，提供包括但不限于AI智能博客、智能电商平台、数据分析、AI工具等服务。我们保留随时修改、暂停或终止全部或部分服务的权利。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">2. 用户注册与账户</h2>
              <p className="text-black mb-4">
                2.1 用户在注册过程中必须提供真实、准确、完整的个人信息。<br/>
                2.2 用户有责任维护账户和密码的保密性，并对在账户下的所有活动承担责任。<br/>
                2.3 如发现任何未经授权使用账户的情况，应立即通知我们。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">3. 用户行为规范</h2>
              <p className="text-black mb-4">
                用户同意不会：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>违反任何适用的法律法规</li>
                <li>侵犯他人的知识产权、隐私权或其他合法权益</li>
                <li>发布、传播违法、有害、威胁、辱骂、骚扰、诽谤、淫秽或其他不当内容</li>
                <li>干扰或破坏服务的正常运行</li>
                <li>试图获取未经授权访问系统或数据</li>
                <li>使用服务进行任何商业目的，除非获得我们明确的书面许可</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">4. 知识产权</h2>
              <p className="text-black mb-4">
                4.1 NewWebAI平台及其所有内容、功能、特性均受知识产权法保护，包括但不限于著作权、商标权、专利权等。<br/>
                4.2 用户在使用服务过程中生成的内容，用户保留知识产权，但授予我们在平台运营所需的范围内的使用权。<br/>
                4.3 用户不得复制、修改、分发、展示、执行、创建衍生作品或以任何方式利用我们的知识产权。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">5. 隐私保护</h2>
              <p className="text-black mb-4">
                我们重视用户隐私，个人信息的收集、使用和保护将遵循我们的隐私政策。使用本服务即表示您同意按照隐私政策处理您的个人信息。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">6. 服务可用性</h2>
              <p className="text-black mb-4">
                6.1 我们努力确保服务的持续可用性，但不保证服务不会中断或无错误。<br/>
                6.2 我们可能定期进行系统维护，可能导致服务暂时中断。<br/>
                6.3 对于因服务不可用而导致的任何损失，我们不承担责任，除非法律另有规定。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">7. 免责声明</h2>
              <p className="text-black mb-4">
                7.1 服务按"现状"提供，我们不提供任何明示或暗示的保证。<br/>
                7.2 对于AI生成的内容，我们不对准确性、完整性或适用性作任何保证。<br/>
                7.3 用户使用AI服务所产生的任何后果由用户自行承担。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">8. 责任限制</h2>
              <p className="text-black mb-4">
                在法律允许的最大范围内，我们不对任何间接、偶然、特殊或后果性损害承担责任，无论是否基于保证、合同、侵权行为或其他法律理论。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">9. 服务变更与终止</h2>
              <p className="text-black mb-4">
                9.1 我们保留随时修改或终止服务的权利，无需事先通知用户。<br/>
                9.2 我们也可能随时修改这些条款。修改后的条款将在本页面发布，并立即生效。<br/>
                9.3 如果您不同意修改后的条款，应停止使用服务。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">10. 争议解决</h2>
              <p className="text-black mb-4">
                10.1 本条款受中华人民共和国法律管辖。<br/>
                10.2 如发生争议，双方应首先友好协商解决；协商不成的，任何一方均可向我们所在地人民法院提起诉讼。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">11. 联系我们</h2>
              <p className="text-black mb-4">
                如您对本服务条款有任何疑问或建议，请通过以下方式联系我们：<br/>
                邮箱：contact@newwebai.com<br/>
                网址：https://hzliflow.ken520.top/
              </p>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-black text-center">
                  最后更新日期：2025年12月31日
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black">© 2025 小黄の数字宇宙工作室. 保留所有权利.</p>
          <div className="mt-4 space-x-4">
            <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition">服务条款</Link>
            <Link href="/privacy" className="text-black hover:text-blue-400 transition">隐私政策</Link>
            <Link href="/disclaimer" className="text-black hover:text-blue-400 transition">免责声明</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}