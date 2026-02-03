export default function Head() {
  return (
    <>
      <title>NewWebAI</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="NewWebAI - 智能AI网站" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="msvalidate.01" content="3F9D7E326332108DCA8DE3E19A88BEA9" />
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