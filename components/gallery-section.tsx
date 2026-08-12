'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Removed module-level registerPlugin

export const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Fade in from left for the top row
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

      // Fade in from right for the bottom row
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

      // Add a slight bounce/fade for the camera
      gsap.fromTo(
        cameraRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cameraRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[#a82525] text-5xl md:text-7xl font-cursive italic tracking-wide">
            Calu Gallery
          </h2>
        </div>

        {/* Gallery Content Wrapper */}
        <div className="relative w-full md:w-[90%] mx-auto">
          
          {/* Decorative Camera */}
          <div ref={cameraRef} className="hidden md:block absolute top-[-15%] left-[-25%] z-20 pointer-events-none">
             <img src="/icons/camera-pocket.svg" className="w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] object-contain transform -rotate-12 drop-shadow-2xl" alt="camera decoration" />
          </div>

          {/* Gallery Grid */}
          <div className="flex flex-col gap-6 md:gap-8 mb-8 z-10 relative">
            
            {/* Top Row */}
            <div className="flex justify-start md:justify-end w-full overflow-hidden">
              <div ref={topRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[75%]">
                <div className="aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
                <div className="aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
                <div className="hidden md:block aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="flex justify-end w-full overflow-hidden mt-4 md:mt-0">
              <div ref={bottomRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[95%]">
                <div className="aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
                <div className="aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
                <div className="hidden md:block aspect-square bg-[#d9d9d9] shadow-md border-4 border-white"></div>
              </div>
            </div>

          </div>

          {/* Footer Text and See More */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:pl-[5%]">
            <p className="text-gray-700 max-w-xs text-xs md:text-sm font-sans mb-4 md:mb-0 leading-relaxed">
              Explore a curated collection of my visual memories, behind-the-scenes moments, and photography.
            </p>
            <Link href="/gallery" className="text-[#a82525] hover:underline font-medium text-sm md:text-base whitespace-nowrap">
              See more
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};
