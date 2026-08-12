'use client';
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

export const VideoThumbnail = ({ url }: { url: string }) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        if (data.thumbnailUrl) {
          setThumb(data.thumbnailUrl);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-gray-200 animate-pulse flex flex-col items-center justify-center">
        <ImageIcon className="w-8 h-8 text-gray-400 mb-2 animate-bounce" />
        <div className="w-1/2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  if (isError || !thumb) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
        <VideoIcon className="w-10 h-10 text-gray-400 mb-2" />
        <span className="text-xs text-gray-500 font-medium">Preview Unavailable</span>
      </div>
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
