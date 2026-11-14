'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface FeaturedAutoplayCardProps {
  videoSrc?: string;
  className?: string;
}

export const FeaturedAutoplayCard: React.FC<FeaturedAutoplayCardProps> = ({
  videoSrc = '/IMG_1338.MP4',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className={`relative w-full aspect-[9/16] rounded-none overflow-hidden bg-black shadow-md group ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-[#a82525] transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Left Status Badge */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] md:text-xs font-mono tracking-wider font-semibold border border-white/10">
          <Sparkles className="w-3 h-3 text-amber-300" />
          LATEST EDIT
        </span>
      </div>

      {/* Top Right Sound Toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute top-3.5 right-3.5 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#a82525] transition-all duration-300 hover:scale-105 shadow-md border border-white/15 cursor-pointer"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Center Play/Pause Indicator on Hover / Paused */}
      <div
        onClick={togglePlay}
        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
          !isPlaying ? 'bg-black/45 opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-300">
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-0.5" />
          )}
        </div>
      </div>

      {/* Bottom Gradient with Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#a82525] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">
          Featured Project
        </div>
        <h4 className="text-white text-sm sm:text-base md:text-lg font-semibold leading-tight drop-shadow-sm">
          Motion & Visual Pacing Reel
        </h4>
        <p className="text-white/70 text-xs font-mono mt-1 hidden sm:block">
          Tap video to pause • Audio toggle on top right
        </p>
      </div>
    </div>
  );
};
