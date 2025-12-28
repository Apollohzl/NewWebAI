// 翻译服务
export async function translateToEnglish(text: string): Promise<string> {
  try {
    // 检测是否包含中文字符
    const chineseRegex = /[\u4e00-\u9fa5]/;
    if (!chineseRegex.test(text)) {
      // 如果没有中文字符，直接返回原文
      return text;
    }

    // 调用翻译API
    const response = await fetch('https://uapis.cn/api/translate/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to_lang: 'en',
        text: text
      })
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      // 如果翻译失败，返回原文
      return text;
    }

    const data = await response.json();
    
    // 返回翻译结果
    return data.data?.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    // 如果翻译出错，返回原文
    return text;
  }
}