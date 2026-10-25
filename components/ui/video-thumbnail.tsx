'use client';
import React, { useState, useEffect } from 'react';

const thumbnailCache = new Map<string, string>();

export const VideoThumbnail = ({ url }: { url: string }) => {
  const cached = thumbnailCache.get(url);
  const [thumb, setThumb] = useState<string | null>(cached || null);
  const [isLoading, setIsLoading] = useState(!cached);
  const [isError, setIsError] = useState(false);

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
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.thumbnailUrl) {
          thumbnailCache.set(url, data.thumbnailUrl);
          setThumb(data.thumbnailUrl);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        console.error(e);
        if (isMounted) setIsError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-[#FFF0F4] animate-pulse flex flex-col justify-between p-2.5 sm:p-3">
        <div className="w-full flex-1 rounded-xl bg-[#FAA5B9]" />
        <div className="w-full pt-2.5 pb-0.5 flex flex-col gap-2">
          <div className="w-[85%] h-2.5 rounded-full bg-[#FAA5B9]" />
          <div className="w-[50%] h-2.5 rounded-full bg-[#FAA5B9]" />
        </div>
      </div>
    );
  }

  if (isError || !thumb) {
    return (
      <div className="absolute inset-0 bg-[#FFF0F4] flex items-center justify-center" />
    );
  }

  return (
    <img 
      src={thumb} 
      alt="Video thumbnail" 
      onError={() => setIsError(true)}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
    />
  );
};
