import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');
  const artist = searchParams.get('artist');
  
  // 检查必需参数
  if (!title || !artist) {
    return Response.json({
      error: 'Missing required parameters',
      message: 'title和artist参数都是必需的'
    }, { status: 400 });
  }
  
  try {
    // 构建目标URL
    const targetUrl = `https://api.lrc.cx/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;
    
    // URL编码
    const encodedUrl = encodeURIComponent(targetUrl);
    
    // 使用CORS代理获取数据
    const corsUrl = `https://hzliflow.ken520.top/api/cors?url=${encodedUrl}`;
    
    const response = await fetch(corsUrl);
    
    if (!response.ok) {
      return Response.json({
        error: 'Failed to fetch lyrics',
        message: `请求失败，状态码: ${response.status}`
      }, { status: response.status });
    }
    
    // 获取纯文本歌词
    const lyricsText = await response.text();
    
    // 解析歌词文本，提取信息
    const parsedLyrics = parseLyrics(lyricsText);
    
    // 返回JSON格式的响应
    return Response.json({
      success: true,
      data: {
        title: parsedLyrics.title || title,
        artist: parsedLyrics.artist || artist,
        album: parsedLyrics.album || '',
        lyrics: parsedLyrics.lyrics || lyricsText,
        metadata: parsedLyrics.metadata || {}
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Lyrics API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist } = body;
    
    // 检查必需参数
    if (!title || !artist) {
      return Response.json({
        error: 'Missing required parameters',
        message: 'title和artist参数都是必需的'
      }, { status: 400 });
    }
    
    // 构建目标URL
    const targetUrl = `https://api.lrc.cx/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;
    
    // URL编码
    const encodedUrl = encodeURIComponent(targetUrl);
    
    // 使用CORS代理获取数据
    const corsUrl = `https://hzliflow.ken520.top/api/cors?url=${encodedUrl}`;
    
    const response = await fetch(corsUrl);
    
    if (!response.ok) {
      return Response.json({
        error: 'Failed to fetch lyrics',
        message: `请求失败，状态码: ${response.status}`
      }, { status: response.status });
    }
    
    // 获取纯文本歌词
    const lyricsText = await response.text();
    
    // 解析歌词文本，提取信息
    const parsedLyrics = parseLyrics(lyricsText);
    
    // 返回JSON格式的响应
    return Response.json({
      success: true,
      data: {
        title: parsedLyrics.title || title,
        artist: parsedLyrics.artist || artist,
        album: parsedLyrics.album || '',
        lyrics: parsedLyrics.lyrics || lyricsText,
        metadata: parsedLyrics.metadata || {}
      },
      timestamp: new Date().toISOString(),
      method: 'POST'
    });
    
  } catch (error: any) {
    console.error('Lyrics API Error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}

// 解析歌词文本的辅助函数
function parseLyrics(text: string) {
  const lines = text.split('\n');
  const metadata: any = {};
  let lyricsLines: string[] = [];
  let title = '';
  let artist = '';
  let album = '';
  
  for (const line of lines) {
    // 解析元数据标签
    if (line.startsWith('[id:')) {
      metadata.id = line.slice(4, -1);
    } else if (line.startsWith('[ar:')) {
      artist = line.slice(4, -1);
      metadata.artist = artist;
    } else if (line.startsWith('[ti:')) {
      title = line.slice(4, -1);
      metadata.title = title;
    } else if (line.startsWith('[al:')) {
      album = line.slice(4, -1);
      metadata.album = album;
    } else if (line.startsWith('[by:')) {
      metadata.by = line.slice(4, -1);
    } else if (line.startsWith('[hash:')) {
      metadata.hash = line.slice(6, -1);
    } else if (line.startsWith('[sign:')) {
      metadata.sign = line.slice(6, -1);
    } else if (line.startsWith('[qq:')) {
      metadata.qq = line.slice(4, -1);
    } else if (line.startsWith('[total:')) {
      metadata.total = line.slice(7, -1);
    } else if (line.startsWith('[offset:')) {
      metadata.offset = line.slice(8, -1);
    } else if (line.match(/^\[\d{2}:\d{2}\.\d{3}\]/)) {
      // 这是歌词行，包含时间戳
      lyricsLines.push(line);
    } else if (line.trim() && !line.startsWith('[')) {
      // 这是纯文本歌词行（没有时间戳）
      lyricsLines.push(line);
    }
  }
  
  return {
    title,
    artist,
    album,
    lyrics: lyricsLines.join('\n'),
    metadata
  };
}