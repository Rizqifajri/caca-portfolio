'use client';

import React, { useState, useEffect } from 'react';
import { VideoCardSkeleton } from './video-skeleton';
import { Play, Eye, Video } from 'lucide-react';

export interface VideoCardProps {
  url: string;
  title?: string;
  views?: string;
  isTopViewer?: boolean;
  className?: string;
}

// Global in-memory cache to prevent re-fetching already fetched thumbnails
const thumbnailCache = new Map<string, string>();

export const getTag = (url: string) => {
  if (url.includes('instagram.com')) return 'INSTAGRAM';
  if (url.includes('tiktok.com')) return 'TIKTOK';
  return 'VIDEO';
};

export const VideoCard: React.FC<VideoCardProps> = ({
  url,
  title = 'Video Project',
  views,
  isTopViewer = false,
  className = '',
}) => {
  const cachedThumb = thumbnailCache.get(url);
  const [thumb, setThumb] = useState<string | null>(cachedThumb || null);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedThumb);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
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
  }, [url]);

  // While fetching thumbnail, show the dedicated skeleton loading component
  if (isLoading) {
    return <VideoCardSkeleton isTopViewer={isTopViewer} className={className} />;
  }

  const tag = getTag(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full aspect-[9/16] rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isTopViewer
          ? 'bg-[#a82525]/20 border-2 border-[#a82525]'
          : 'bg-neutral-900 border border-neutral-700/30'
      } ${className}`}
    >
      {/* Thumbnail or Stylish Fallback */}
      {thumb && !isError ? (
        <img
          src={thumb}
          alt={title}
          onError={() => setIsError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A101D] via-[#2A080F] to-black flex items-center justify-center">
          <Video className="w-16 h-16 text-pink-300/15 group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Top Views Badge (if provided or top viewer) */}
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
        <div className="w-11 h-11 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
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

