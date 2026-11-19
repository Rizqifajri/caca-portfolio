'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { VideoCardSkeleton } from './video-skeleton';
import { Play, Eye, Video, X, ExternalLink, Loader2, RotateCcw } from 'lucide-react';

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

export const getDirectEmbedUrl = (rawUrl: string): string | null => {
  if (!rawUrl) return null;
  if (rawUrl.includes('instagram.com')) {
    const match = rawUrl.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
    if (match && match[2]) {
      return `https://www.instagram.com/reel/${match[2]}/embed/`;
    }
  }
  if (rawUrl.includes('tiktok.com')) {
    const match = rawUrl.match(/\/video\/(\d+)/);
    if (match && match[1]) {
      return `https://www.tiktok.com/embed/v2/${match[1]}?lang=en&autoplay=1`;
    }
  }
  return null;
};

// Global in-memory caches
const thumbnailCache = new Map<string, string>();
const embedCache = new Map<string, string>();

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
  const canEmbedTikTok = embed && isTikTok && Boolean(tiktokId);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState<number>(0);

  const cachedThumb = thumbnailCache.get(url);
  const [thumb, setThumb] = useState<string | null>(cachedThumb || null);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedThumb && !canEmbedTikTok);
  const [isError, setIsError] = useState<boolean>(false);

  // Modal player states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(
    getDirectEmbedUrl(url) || embedCache.get(url) || null
  );
  const [isResolvingEmbed, setIsResolvingEmbed] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  // Fetch thumbnail for non-inline-embedded cards
  useEffect(() => {
    if (canEmbedTikTok) return;

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
  }, [url, canEmbedTikTok]);

  // Close modal on Escape key & lock body scroll when open
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenPreview = async () => {
    setIsModalOpen(true);
    setIframeLoaded(false);

    const direct = getDirectEmbedUrl(url) || embedCache.get(url);
    if (direct) {
      setEmbedUrl(direct);
      return;
    }

    // Resolve shortlinks like vt.tiktok.com
    setIsResolvingEmbed(true);
    try {
      const res = await fetch(`/api/embed?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.embedUrl) {
        embedCache.set(url, data.embedUrl);
        setEmbedUrl(data.embedUrl);
      }
    } catch (err) {
      console.error('Embed resolve error:', err);
    } finally {
      setIsResolvingEmbed(false);
    }
  };

  const tag = getTag(url);

  // CASE 1: TikTok Autoplay & Auto-Retry Loop Embed
  if (canEmbedTikTok && tiktokId) {
    const embedSrc = `https://www.tiktok.com/embed/v2/${tiktokId}?lang=en&autoplay=1&loop=1`;

    const handleRetry = () => {
      setIframeLoaded(false);
      setKey((prev) => prev + 1);
    };

    return (
      <div
        className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${isTopViewer ? 'border-2 border-[#a82525]' : 'border-neutral-800'
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
          className={`w-full h-full border-0 absolute inset-0 object-cover transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'
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
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenPreview}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenPreview();
          }
        }}
        className={`block w-full aspect-[9/16] rounded-none overflow-hidden relative group cursor-pointer shadow-sm bg-black transition-all duration-300 hover:shadow-lg ${className}`}
      >
        {/* Thumbnail or Fallback */}
        {thumb && !isError ? (
          <img
            src={thumb}
            alt={title}
            onError={() => setIsError(true)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
            <Video className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}

        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Top Views Badge */}
        {views && (
          <div className="absolute top-0 left-0 w-full p-2.5 sm:p-3 flex justify-between items-start z-10">
            <div className="bg-[#a82525] text-white px-2 py-0.5 rounded-none text-[10px] sm:text-xs font-bold shadow flex items-center gap-1 backdrop-blur-xs">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
          </div>
        )}

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300 shadow-md border border-white/30">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Metadata (Tag & Title) */}
        <div className="absolute bottom-0 left-0 p-2.5 sm:p-3 w-full text-white z-10">
          <div
            className={`${isTopViewer ? 'bg-[#a82525]' : 'bg-white/20'
              } backdrop-blur-md px-1.5 py-0.5 text-[8px] sm:text-[9px] rounded-none uppercase font-bold tracking-wider inline-block mb-1 text-white`}
          >
            {tag}
          </div>
          <h4 className="font-semibold text-xs sm:text-sm leading-tight line-clamp-2 drop-shadow-sm text-white/95">
            {title}
          </h4>
        </div>
      </div>

      {/* In-Page Video Preview Modal */}
      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-[400px] aspect-[9/16] max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Controls */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open original link"
                  aria-label="Open original link"
                  className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white/90 flex items-center justify-center hover:bg-[#a82525] hover:text-white transition-all border border-white/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close preview"
                  className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#a82525] transition-all border border-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Loading State */}
              {(isResolvingEmbed || (embedUrl && !iframeLoaded)) && (
                <div className="absolute inset-0 z-20 bg-neutral-950 flex flex-col items-center justify-center gap-3 text-white/70">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FAA5B9]" />
                  <span className="text-xs font-mono tracking-wider uppercase">Loading Video...</span>
                </div>
              )}

              {/* Embedded Player */}
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIframeLoaded(true)}
                  className={`w-full h-full border-0 transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ) : (
                !isResolvingEmbed && (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white">
                    <Video className="w-12 h-12 text-white/30 mb-3" />
                    <p className="text-sm font-medium mb-2">Preview embed tidak tersedia untuk link ini.</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a82525] text-white text-xs font-semibold hover:bg-[#8a1e1e] transition-colors"
                    >
                      Buka Video Asli <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
