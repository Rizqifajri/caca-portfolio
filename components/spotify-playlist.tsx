'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Disc3,
  ChevronUp,
  ChevronDown,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
} from 'lucide-react';

const TRACK = {
  title: '360',
  artist: 'Charli xcx',
  album: 'BRAT',
  youtubeId: 'O_HoOpJ60C0',
  coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f88b43d15fd14e9525338b59',
  spotifyUrl: 'https://open.spotify.com/track/4w2GLmK2wnioVnb5CPQeex',
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          height?: string | number;
          width?: string | number;
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const SpotifyPlaylist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // GSAP open / close animation for the player card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(card, { autoAlpha: 0, y: 16, scale: 0.92, display: 'none' });
      return;
    }

    if (isOpen) {
      gsap.set(card, { display: 'block' });
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 18, scale: 0.92, transformOrigin: 'bottom left' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        }
      );
      gsap.fromTo(
        card.querySelectorAll('.player-stagger'),
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.05,
          delay: 0.08,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    } else {
      gsap.to(card, {
        autoAlpha: 0,
        y: 14,
        scale: 0.94,
        duration: 0.28,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(card, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !playerHostRef.current || !window.YT?.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(playerHostRef.current, {
        height: '1',
        width: '1',
        videoId: TRACK.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            if (!isMounted) return;
            setIsReady(true);
            const dur = event.target.getDuration();
            if (dur) setDuration(dur);
          },
          onStateChange: (event) => {
            if (!isMounted) return;
            const YTState = window.YT?.PlayerState;
            if (event.data === (YTState?.PLAYING ?? 1)) {
              setIsPlaying(true);
              const dur = event.target.getDuration();
              if (dur) setDuration(dur);
            } else if (event.data === (YTState?.PAUSED ?? 2)) {
              setIsPlaying(false);
            } else if (event.data === (YTState?.ENDED ?? 0)) {
              setIsPlaying(false);
              event.target.seekTo(0, true);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup error
        }
        playerRef.current = null;
      }
    };
  }, []);

  // Poll playback progress while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const cur = player.getCurrentTime?.() ?? 0;
      const dur = player.getDuration?.() ?? 0;
      setCurrentTime(cur);
      if (dur > 0) setDuration(dur);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !isReady) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player || !isReady) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player || !isReady || !duration) return;
    const nextTime = Number(e.target.value);
    setCurrentTime(nextTime);
    player.seekTo(nextTime, true);
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="fixed bottom-6 left-6 md:bottom-7 md:left-8 lg:bottom-9 lg:left-12 z-[100] font-sans">
      {/* Hidden 1x1 Audio-Only YouTube Player */}
      <div
        aria-hidden="true"
        className="fixed -left-[9999px] -top-[9999px] w-px h-px opacity-0 pointer-events-none overflow-hidden"
      >
        <div ref={playerHostRef} />
      </div>

      {/* Expanded Spotify-Style Audio Player Card (animated with GSAP) */}
      <div
        ref={cardRef}
        className="mb-3 w-[calc(100vw-3rem)] max-w-[325px] bg-[#FAF9F6]/95 backdrop-blur-xl border border-[#014421]/15 rounded-2xl shadow-[0_16px_45px_rgba(0,0,0,0.14)] overflow-hidden will-change-transform"
      >
        {/* Header */}
        <div className="player-stagger flex items-center justify-between px-4 py-2.5 border-b border-[#014421]/10">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-[#a82525] animate-pulse' : 'bg-[#014421]/30'
                }`}
              />
              <span className="font-cursive italic text-lg text-[#a82525] leading-none">
                Now Playing
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href={TRACK.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Spotify"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-[#014421]/80 bg-[#014421]/[0.06] hover:bg-[#014421] hover:text-white transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize player"
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#014421]/70 hover:text-[#a82525] hover:bg-[#a82525]/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Album Cover + Track Details */}
          <div className="player-stagger p-4 flex items-center gap-3.5">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-[#014421]/10">
              <img
                src={TRACK.coverUrl}
                alt={`${TRACK.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#014421] truncate leading-tight">
                {TRACK.title}
              </p>
              <p className="text-xs text-[#014421]/70 truncate mt-0.5">
                {TRACK.artist}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#a82525]/80 mt-1">
                {TRACK.album}
              </p>
            </div>

            {/* Main Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              disabled={!isReady}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-11 h-11 rounded-full bg-[#a82525] hover:bg-[#8a1e1e] disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Interactive Progress Bar & Volume */}
          <div className="player-stagger px-4 pb-4">
            <div className="relative flex items-center">
              <div className="w-full h-1.5 bg-[#014421]/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#a82525] transition-[width] duration-200"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek track"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-[#014421]/60">
              <span>{formatTime(currentTime)}</span>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-[#014421]/70 hover:text-[#a82525] transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
      </div>

      {/* Floating Collapsed Pill Trigger */}
      <div className="inline-flex w-fit items-center gap-1 bg-[#FAF9F6]/85 hover:bg-[#FAF9F6] border border-[#014421]/15 rounded-full p-1.5 pr-3 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
        <button
          type="button"
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pause 360' : 'Play 360'}
          className="w-7 h-7 rounded-full bg-[#a82525] hover:bg-[#8a1e1e] disabled:opacity-40 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 fill-white" />
          ) : (
            <Play className="w-3 h-3 fill-white ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Music Player"
          className="flex items-center gap-2 pl-1 cursor-pointer group"
        >
          <Disc3
            className={`w-4 h-4 text-[#014421] ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          />
          <div className="text-left hidden sm:block max-w-[120px]">
            <p className="text-xs font-semibold text-[#014421] truncate leading-none">
              {TRACK.title}
            </p>
            <p className="text-[10px] text-[#014421]/60 truncate mt-0.5 leading-none">
              {TRACK.artist}
            </p>
          </div>
          <span className="text-xs font-medium text-[#014421] sm:hidden">
            {TRACK.title}
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-[#014421]/60 group-hover:text-[#a82525] transition-colors" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-[#014421]/60 group-hover:text-[#a82525] transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
};
