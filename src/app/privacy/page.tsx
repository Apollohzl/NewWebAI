import Link from 'next/link';

export default function Privacy() {
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

      {/* 隐私政策内容 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              NewWebAI 隐私政策
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-black mb-6">
                小黄の数字宇宙工作室（以下简称"我们"）深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最小必要原则、确保安全原则、主体参与原则、公开透明原则等。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">1. 我们如何收集和使用您的个人信息</h2>
              <p className="text-black mb-4">
                我们会遵循正当、合法、必要的原则，仅为实现产品功能，向您提供服务之目的，收集和使用您的个人信息。
              </p>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.1 账户注册与登录</h3>
              <p className="text-black mb-4">
                当您注册和登录NewWebAI账户时，我们需要收集您的：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>用户名：用于创建您的唯一身份标识</li>
                <li>邮箱地址：用于账户验证、登录和重要通知</li>
                <li>密码：用于保护您的账户安全</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.2 AI服务使用</h3>
              <p className="text-black mb-4">
                当您使用我们的AI服务时，我们可能收集：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>您的输入内容：用于AI模型处理和生成响应</li>
                <li>交互记录：用于改善服务质量和用户体验</li>
                <li>使用偏好：用于个性化服务推荐</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.3 技术信息收集</h3>
              <p className="text-black mb-4">
                我们会自动收集您访问和使用我们服务的技术信息，包括：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>设备信息：设备型号、操作系统版本、唯一设备标识符</li>
                <li>网络信息：IP地址、网络类型、运营商信息</li>
                <li>服务使用信息：访问时间、访问页面、点击记录、错误日志</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">2. 我们如何使用Cookie和同类技术</h2>
              <p className="text-black mb-4">
                我们使用Cookie和类似技术来改善您的用户体验。Cookie可以帮助我们：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>记住您的登录状态和偏好设置</li>
                <li>分析网站流量和使用情况</li>
                <li>提供个性化内容和广告</li>
                <li>确保网站安全运行</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">3. 我们如何共享、转让、公开披露您的个人信息</h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.1 共享</h3>
              <p className="text-black mb-4">
                我们不会向其他任何公司、组织和个人分享您的个人信息，但以下情况除外：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>在获取明确同意的情况下分享</li>
                <li>根据法律法规、法律程序的要求</li>
                <li>在涉及合并、收购或破产清算时</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.2 转让</h3>
              <p className="text-black mb-4">
                我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>获得您的明确同意</li>
                <li>根据适用的法律法规、法律程序的要求</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">4. 我们如何保护您的个人信息</h2>
              <p className="text-black mb-4">
                我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">5. 您的权利</h2>
              <p className="text-black mb-4">
                按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>访问您的个人信息</li>
                <li>更正您的个人信息</li>
                <li>删除您的个人信息</li>
                <li>改变您授权同意的范围</li>
                <li>注销账户</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">6. 我们如何处理儿童的个人信息</h2>
              <p className="text-black mb-4">
                我们非常重视对未成年人个人信息的保护。如果您是18周岁以下的未成年人，在使用我们的产品和服务前，应事先取得您家长或法定监护人的同意。如您是未成年人的监护人，当您对您所监护的未成年人的个人信息处理存在疑问时，请通过本隐私政策公布的联系方式与我们联系。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">7. 隐私政策的更新</h2>
              <p className="text-black mb-4">
                我们可能适时更新本隐私政策的条款，该等更新构成本隐私政策的一部分。如该等更新造成您在本隐私政策下权利的实质减少，我们将在更新生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您，在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本隐私政策的约束。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">8. 如何联系我们</h2>
              <p className="text-black mb-4">
                如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：<br/>
                邮箱：privacy@newwebai.com<br/>
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
            <Link href="/terms" className="text-black hover:text-blue-400 transition">服务条款</Link>
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition">隐私政策</Link>
            <Link href="/disclaimer" className="text-black hover:text-blue-400 transition">免责声明</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}