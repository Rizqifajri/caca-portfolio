'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VideoCardSkeleton } from './video-skeleton';
import { Play, Eye, Video, RotateCcw } from 'lucide-react';

export interface VideoCardProps {
  url: string;
  title?: string;
  views?: string;
  isTopViewer?: boolean;
  className?: string;
  embed?: boolean;
}

export const getTag = (url: string) => {
  if (url.includes('instagram.com')) return 'INSTAGRAM';
  if (url.includes('tiktok.com')) return 'TIKTOK';
  return 'VIDEO';
};

export const getTikTokId = (rawUrl: string): string | null => {
  if (!rawUrl || !rawUrl.includes('tiktok.com')) return null;
  const match = rawUrl.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
};

// Global in-memory cache to prevent re-fetching already fetched thumbnails
const thumbnailCache = new Map<string, string>();

export const VideoCard: React.FC<VideoCardProps> = ({
  url,
  title = 'Video Project',
  views,
  isTopViewer = false,
  className = '',
  embed = false,
}) => {
  const isTikTok = url.includes('tiktok.com');
  const tiktokId = getTikTokId(url);

  // TikTok embed states
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0); // For auto-retry / reload

  // Instagram / standard thumbnail states
  const cachedThumb = thumbnailCache.get(url);
  const [thumb, setThumb] = useState<string | null>(cachedThumb || null);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedThumb && !isTikTok);
  const [isError, setIsError] = useState<boolean>(false);

  // Fetch thumbnail for Instagram or non-tiktok cards
  useEffect(() => {
    if (isTikTok) return;

    if (thumbnailCache.has(url)) {
      setThumb(thumbnailCache.get(url)!);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.thumbnailUrl) {
          thumbnailCache.set(url, data.thumbnailUrl);
          setThumb(data.thumbnailUrl);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        console.error('Thumbnail fetch error:', e);
        if (isMounted) setIsError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url, isTikTok]);

  const tag = getTag(url);

  // CASE 1: TikTok Autoplay & Auto-Retry Loop Embed
  if (isTikTok && tiktokId) {
    const embedSrc = `https://www.tiktok.com/embed/v2/${tiktokId}?lang=en&autoplay=1&loop=1`;

    const handleRetry = () => {
      setIframeLoaded(false);
      setKey((prev) => prev + 1);
    };

    return (
      <div
        className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${
          isTopViewer ? 'border-2 border-[#a82525]' : 'border-neutral-800'
        } ${className}`}
      >
        {/* Loading skeleton until iframe loads */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <VideoCardSkeleton isTopViewer={isTopViewer} />
          </div>
        )}

        {/* TikTok Official Autoplay Embed iFrame */}
        <iframe
          key={key}
          ref={iframeRef}
          src={embedSrc}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          className={`w-full h-full border-0 absolute inset-0 object-cover transition-opacity duration-500 ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges & Retry Control */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-20 pointer-events-none">
          {views && (
            <div className="bg-[#a82525] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow flex items-center gap-1 backdrop-blur-xs">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 ml-auto pointer-events-auto">
            {/* Auto-retry replay button */}
            <button
              type="button"
              onClick={handleRetry}
              aria-label="Replay / Retry video"
              title="Replay / Retry video"
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/90 flex items-center justify-center hover:bg-[#a82525] hover:text-white transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CASE 2: Instagram (No autoplay, back to original interactive card)
  if (isLoading) {
    return <VideoCardSkeleton isTopViewer={isTopViewer} className={className} />;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full aspect-[9/16] rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isTopViewer
          ? 'bg-[#FFF0F4] border-2 border-[#a82525]'
          : 'bg-[#FFF0F4] border border-[#FFD6E0]'
      } ${className}`}
    >
      {/* Thumbnail or Light Pastel Fallback */}
      {thumb && !isError ? (
        <img
          src={thumb}
          alt={title}
          onError={() => setIsError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-[#FFF0F4] flex items-center justify-center">
          <Video className="w-16 h-16 text-[#FAA5B9]/40 group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Top Views Badge */}
      {views && (
        <div className="absolute top-0 left-0 w-full p-3 md:p-4 flex justify-between items-start z-10">
          <div className="bg-[#a82525] text-white px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold shadow flex items-center gap-1.5 backdrop-blur-xs">
            <Eye className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{views}</span>
          </div>
        </div>
      )}

      {/* Center Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-11 h-11 md:w-14 md:h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/30">
          <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom Metadata (Tag & Title) */}
      <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full text-white z-10">
        <div
          className={`${
            isTopViewer ? 'bg-[#a82525]/85' : 'bg-white/20'
          } backdrop-blur-md px-2 py-0.5 md:py-1 text-[9px] md:text-xs rounded uppercase font-bold tracking-wider inline-block mb-1.5 text-white/95`}
        >
          {tag}
        </div>
        <h4 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2 drop-shadow-sm">
          {title}
        </h4>
      </div>
    </a>
  );
};
