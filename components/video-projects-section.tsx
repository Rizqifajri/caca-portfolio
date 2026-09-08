'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/app/libs/data.projects';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';

// Removed module-level registerPlugin

const getTag = (url: string) => url.includes('instagram.com') ? 'INSTAGRAM' : (url.includes('tiktok.com') ? 'TIKTOK' : 'VIDEO');

export const VideoProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        topRowRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: topRowRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        bottomRowRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomRowRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Combine and sort top videos if needed (just slicing top 6 for now)
  const viralVideos = [
    ...(projectsData.cretivox?.igTopViewers || []),
    ...(projectsData.cretivox?.tiktokTopViewers || [])
  ].slice(0, 6);

  const topRowVideos = viralVideos.slice(0, 3);
  const bottomRowVideos = viralVideos.slice(3, 6);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Decorative Sunflowers */}
      <img src="/icons/sun-flower.svg" className="absolute top-[20%] right-[-5%] w-48 h-48 object-contain z-0" alt="sunflower" />
      <img src="/icons/sun-flower.svg" className="absolute bottom-[20%] left-[-5%] w-64 h-64 object-contain z-0" alt="sunflower" />

      <div className="w-full px-6 md:px-16 z-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h2 className="text-[#a82525] text-5xl md:text-9xl font-cursive italic tracking-wide">
            Projects
          </h2>
          <p className="text-gray-700 max-w-sm text-right text-sm md:text-base mt-4 md:mt-0 font-sans">
            I'm a passionate video editor specializing in creating captivating visual stories.
          </p>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Top Row - Aligned Left */}
          <div className="flex justify-start overflow-hidden">
            <div ref={topRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[85%]">
              {topRowVideos.map((item, index) => (
                <a key={`top-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[9/16] bg-[#a82525]/20 rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl border-2 border-[#a82525]">
                   <VideoThumbnail url={item.url} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                   
                   <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
                      <div className="bg-[#a82525] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        {item.views}
                      </div>
                   </div>

                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>

                   <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                     <div className="bg-[#a82525]/80 backdrop-blur-md px-2 py-1 text-[8px] md:text-xs text-white rounded uppercase font-bold tracking-wider inline-block mb-2">
                       {getTag(item.url)}
                     </div>
                     <h4 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2">
                       Top Viral Video
                     </h4>
                   </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Row - Aligned Right */}
          <div className="flex justify-end overflow-hidden">
            <div ref={bottomRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[85%]">
              {bottomRowVideos.map((item, index) => (
                <a key={`bottom-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[9/16] bg-[#a82525]/20 rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl border-2 border-[#a82525]">
                   <VideoThumbnail url={item.url} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                   
                   <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
                      <div className="bg-[#a82525] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        {item.views}
                      </div>
                   </div>

                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>

                   <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                     <div className="bg-[#a82525]/80 backdrop-blur-md px-2 py-1 text-[8px] md:text-xs text-white rounded uppercase font-bold tracking-wider inline-block mb-2">
                       {getTag(item.url)}
                     </div>
                     <h4 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2">
                       Top Viral Video
                     </h4>
                   </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* See More */}
        <div className="flex justify-end mt-8">
          <Link href="/projects" className="group inline-flex items-center gap-2 bg-[#a82525] text-white px-6 py-2.5 rounded-full font-medium text-sm md:text-base hover:bg-[#8a1e1e] transition-all hover:scale-105 shadow-md">
            See more
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
