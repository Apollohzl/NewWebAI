import Link from 'next/link';

export default function Disclaimer() {
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

      {/* 免责声明内容 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              免责声明
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-black mb-6 text-center font-semibold">
                请仔细阅读以下免责声明
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-black">
                  <strong>重要提示：</strong>使用NewWebAI平台前，请务必仔细阅读并充分理解本免责声明的全部内容。您开始使用本平台，即表示您已充分理解并同意本免责声明的全部内容。
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">1. AI服务性质说明</h2>
              <p className="text-black mb-4">
                NewWebAI平台提供的人工智能服务是基于机器学习和深度学习技术构建的。AI生成的内容可能包含不准确、不完整或有误导性的信息。用户在使用AI服务时应保持批判性思维，独立判断信息的真实性和适用性。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">2. 内容准确性免责</h2>
              <p className="text-black mb-4">
                2.1 我们不对AI生成的内容的准确性、完整性、可靠性或适用性作任何保证。<br/>
                2.2 AI生成的内容不应被视为专业建议，包括但不限于医疗、法律、金融、技术等专业领域的建议。<br/>
                2.3 用户不应依赖AI生成的内容做出重要决策，如有需要，应咨询相关领域的专业人士。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">3. 服务可用性免责</h2>
              <p className="text-black mb-4">
                3.1 我们不保证服务的持续可用性，服务可能因系统维护、技术故障、不可抗力等因素暂时或永久中断。<br/>
                3.2 对于因服务中断、延迟或不可用而导致的任何损失，我们不承担责任。<br/>
                3.3 我们保留随时修改、暂停或终止全部或部分服务的权利，无需事先通知用户。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">4. 数据安全免责</h2>
              <p className="text-black mb-4">
                4.1 虽然我们采取了合理的安全措施保护用户数据，但无法保证数据的绝对安全。<br/>
                4.2 对于因黑客攻击、病毒感染、系统漏洞等不可控因素导致的数据泄露或损失，我们在法律允许的范围内不承担责任。<br/>
                4.3 用户应对自己的账户信息保密，并对因账户泄露导致的损失承担责任。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">5. 第三方链接免责</h2>
              <p className="text-black mb-4">
                我们的网站可能包含指向第三方网站或资源的链接。这些第三方网站不受我们控制，我们不对这些第三方网站的内容、隐私政策或做法承担责任。访问任何第三方网站的风险由用户自行承担。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">6. 知识产权免责</h2>
              <p className="text-black mb-4">
                6.1 用户在使用AI服务时输入的内容，应确保不侵犯任何第三方的知识产权。<br/>
                6.2 AI生成的内容可能包含与现有作品相似的内容，用户应自行判断是否存在侵权风险。<br/>
                6.3 对于用户因使用AI生成内容而引发的知识产权纠纷，我们不承担责任。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">7. 损害责任限制</h2>
              <p className="text-black mb-4">
                在法律允许的最大范围内，我们不对以下情况承担责任：
              </p>
              <ul className="list-disc pl-6 text-black mb-4">
                <li>间接、偶然、特殊或后果性损害</li>
                <li>利润损失、数据丢失、商誉损失</li>
                <li>因使用或无法使用服务而导致的任何损失</li>
                <li>因第三方行为而导致的任何损失</li>
              </ul>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">8. 用户行为责任</h2>
              <p className="text-black mb-4">
                8.1 用户应对其使用本平台的行为独立承担责任。<br/>
                8.2 用户不得利用本平台从事任何违法或不当行为。<br/>
                8.3 如因用户行为导致任何第三方损失或法律纠纷，用户应自行承担全部责任。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">9. 法律适用与争议解决</h2>
              <p className="text-black mb-4">
                9.1 本免责声明适用中华人民共和国法律。<br/>
                9.2 如因使用本平台产生争议，应首先友好协商解决；协商不成的，任何一方均可向被告所在地人民法院提起诉讼。
              </p>

              <h2 className="text-2xl font-semibold text-black mt-8 mb-4">10. 其他条款</h2>
              <p className="text-black mb-4">
                10.1 本免责声明构成用户与我们就使用NewWebAI平台达成的完整协议。<br/>
                10.2 如本免责声明的任何条款被认定为无效或不可执行，不影响其他条款的效力。<br/>
                10.3 我们保留随时修改本免责声明的权利，修改后的声明将在本页面发布并立即生效。
              </p>

              <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
                <p className="text-black font-semibold">
                  特别声明：本免责声明的解释权归小黄の数字宇宙工作室所有。
                </p>
              </div>

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
            <Link href="/privacy" className="text-black hover:text-blue-400 transition">隐私政策</Link>
            <Link href="/disclaimer" className="text-blue-400 hover:text-blue-300 transition">免责声明</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}