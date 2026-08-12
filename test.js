async function test() {
  const url = 'https://www.instagram.com/reel/DPbYRltET89/embed/';
  const res = await fetch(url);
  const text = await res.text();
  console.log('Includes EmbeddedMediaImage:', text.includes('EmbeddedMediaImage'));
  console.log('Includes og:image:', text.includes('og:image'));
  
  const ogImage = text.match(/<meta property="og:image" content="([^"]+)"/i);
  console.log('ogImage:', ogImage ? ogImage[1] : null);
  
  const imgMatch = text.match(/class="EmbeddedMediaImage"[^>]+src="([^"]+)"/i);
  console.log('imgMatch:', imgMatch ? imgMatch[1] : null);
}
test();
