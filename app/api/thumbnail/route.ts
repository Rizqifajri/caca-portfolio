import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  try {
    let imgUrl: string | null = null;

    if (url.includes('tiktok.com')) {
      // Fetch using social crawler user-agent to extract og:image reliably
      const ttRes = await fetch(url, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        next: { revalidate: 86400 },
      });

      if (ttRes.ok) {
        const html = await ttRes.text();
        const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (ogMatch && ogMatch[1]) {
          imgUrl = ogMatch[1].replace(/&amp;/g, '&');
        }
      }

      // Fallback: TikTok oEmbed if og:image fails
      if (!imgUrl) {
        const oembedRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, { next: { revalidate: 86400 } });
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          imgUrl = oembedData.thumbnail_url || null;
        }
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
        const imgMatch =
          html.match(/class="EmbeddedMediaImage"[^>]+src="([^"]+)"/i) ||
          html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (imgMatch && imgMatch[1]) {
          imgUrl = imgMatch[1].replace(/&amp;/g, '&');
        }
      }
    }

    // Universal fallback: Microlink
    if (!imgUrl) {
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
