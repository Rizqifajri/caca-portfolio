import { NextResponse } from 'next/server';

function extractEmbedUrl(targetUrl: string): string | null {
  if (!targetUrl) return null;

  if (targetUrl.includes('instagram.com')) {
    const match = targetUrl.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
    if (match && match[2]) {
      return `https://www.instagram.com/reel/${match[2]}/embed/`;
    }
  }

  if (targetUrl.includes('tiktok.com')) {
    const match = targetUrl.match(/\/video\/(\d+)/);
    if (match && match[1]) {
      return `https://www.tiktok.com/embed/v2/${match[1]}?lang=en&autoplay=1`;
    }
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 });
  }

  // Fast path if URL already has an extractable ID
  const directEmbed = extractEmbedUrl(url);
  if (directEmbed) {
    return NextResponse.json({ embedUrl: directEmbed });
  }

  // Resolve shortlinks (e.g., vt.tiktok.com / vm.tiktok.com)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      },
      next: { revalidate: 86400 },
    });

    const resolvedFromFinalUrl = extractEmbedUrl(res.url);
    if (resolvedFromFinalUrl) {
      return NextResponse.json({ embedUrl: resolvedFromFinalUrl });
    }

    // Fallback: inspect HTML for canonical or og:url
    const html = await res.text();
    const canonicalMatch =
      html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ||
      html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i);

    if (canonicalMatch && canonicalMatch[1]) {
      const resolvedFromHtml = extractEmbedUrl(canonicalMatch[1]);
      if (resolvedFromHtml) {
        return NextResponse.json({ embedUrl: resolvedFromHtml });
      }
    }

    return NextResponse.json({ embedUrl: null });
  } catch (e) {
    console.error('Error resolving embed URL:', e);
    return NextResponse.json({ embedUrl: null });
  }
}
