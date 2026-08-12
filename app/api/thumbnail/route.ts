import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  try {
    let imgUrl: string | null = null;

    if (url.includes('tiktok.com')) {
      // Use TikTok's official oembed API
      const oembedRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, { next: { revalidate: 86400 } });
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        imgUrl = oembedData.thumbnail_url || null;
      }
    } else if (url.includes('instagram.com')) {
      // Clean up the URL to hit the /embed endpoint
      const urlObj = new URL(url);
      urlObj.search = ''; // Remove tracking params
      let cleanUrl = urlObj.toString();
      if (!cleanUrl.endsWith('/')) cleanUrl += '/';
      const embedUrl = cleanUrl + 'embed/';
      
      const igRes = await fetch(embedUrl, { next: { revalidate: 86400 } });
      if (igRes.ok) {
        const html = await igRes.text();
        const imgMatch = html.match(/class="EmbeddedMediaImage"[^>]+src="([^"]+)"/i) || html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (imgMatch && imgMatch[1]) {
          imgUrl = imgMatch[1].replace(/&amp;/g, '&');
        }
      }
    }
    
    if (!imgUrl) {
      // Use Microlink API for fallback
      const microRes = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, { next: { revalidate: 86400 } });
      if (microRes.ok) {
        const microData = await microRes.json();
        if (microData.status === 'success' && microData.data?.image?.url) {
          imgUrl = microData.data.image.url;
        }
      }
    }

    return NextResponse.json({ thumbnailUrl: imgUrl });
  } catch (e) {
    console.error('Error fetching thumbnail:', e);
    return NextResponse.json({ thumbnailUrl: null });
  }
}
