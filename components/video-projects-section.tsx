'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/app/libs/data.projects';
import { VideoCard } from '@/components/ui/video-card';
import { FeaturedAutoplayCard } from '@/components/ui/featured-autoplay-card';

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

  // Combine and sort top videos if needed
  const viralVideos = [
    ...(projectsData.cretivox?.igTopViewers || []),
    ...(projectsData.cretivox?.tiktokTopViewers || [])
  ];

  // Top 4 right beside the big video (2x2 grid)
  const asideVideos = viralVideos.slice(0, 4);
  // Next 4 videos placed below in the bottom row
  const bottomVideos = viralVideos.slice(4, 8);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Decorative Sunflowers */}
      <img src="/icons/sun-flower.svg" className="absolute top-[20%] right-[-5%] w-48 h-48 object-contain z-0" alt="sunflower" />
      <img src="/icons/sun-flower.svg" className="absolute bottom-[20%] left-[-5%] w-64 h-64 object-contain z-0" alt="sunflower" />

      <div className="w-full px-6 md:px-16 z-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
          <h2 className="text-[#a82525] text-5xl md:text-9xl font-cursive italic tracking-wide">
            Projects
          </h2>
          <p className="text-gray-700 max-w-sm text-right text-sm md:text-base mt-4 md:mt-0 font-sans">
            I'm a passionate video editor specializing in creating captivating visual stories.
          </p>
        </div>

        {/* Agency Creative Layout: Big Video on the Left, Others on the Right and Below */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Main Showcase Row: Big Video (Left) + 2x2 Video Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Big Video Card on the Left */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
              <div className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-none">
                <FeaturedAutoplayCard videoSrc="/IMG_1338.MP4" />
              </div>
            </div>

            {/* Content Beside on the Right: 2x2 Grid */}
            <div ref={topRowRef} className="lg:col-span-7 xl:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
              {asideVideos.map((item, index) => (
                <VideoCard
                  key={`aside-${index}`}
                  url={item.url}
                  views={item.views}
                  title="Viral Project Edit"
                  isTopViewer
                  embed
                />
              ))}
            </div>
          </div>

          {/* Further Content Below: 4 Column Grid */}
          <div ref={bottomRowRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-4">
            {bottomVideos.map((item, index) => (
              <VideoCard
                key={`bottom-${index}`}
                url={item.url}
                views={item.views}
                title="Top Viral Video"
                isTopViewer
                embed
              />
            ))}
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
