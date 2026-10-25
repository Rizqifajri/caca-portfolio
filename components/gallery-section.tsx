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
    <section ref={containerRef} className="relative pt-24 pb-28 md:pb-36 overflow-hidden bg-[#EFD3E1]/25">
      <div className="w-full px-6 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[#a82525] text-5xl md:text-7xl font-cursive italic tracking-wide">
            Calu Gallery
          </h2>
        </div>

        {/* Gallery Content Wrapper */}
        <div className="relative w-full md:w-[90%] mx-auto">

          {/* Decorative Camera and Film */}
          <div ref={cameraRef} className="hidden md:block absolute top-[-15%] -left-[5%] z-20 pointer-events-none">
            {/* Red Film (Behind) */}
            <img src="/icons/film.svg" className="absolute -top-[35%] -left-5 w-[300px] h-[300px] lg:w-[700px] lg:h-[700px] object-contain transform rotate-70 drop-shadow-xl -z-10" alt="red film decoration" />
            {/* Camera (Front) */}
            <img src="/icons/camera-pocket.svg" className="relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] object-contain transform -rotate-12 drop-shadow-2xl z-10" alt="camera decoration" />
          </div>

          {/* Gallery Grid */}
          <div className="flex flex-col gap-6 md:gap-8 mb-8 z-10 relative">

            {/* Top Row */}
            <div className="flex justify-start md:justify-end w-full overflow-hidden">
              <div ref={topRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[75%]">
                <div className="aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF0021.JPG" alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF0071.JPG" alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF0469.JPG" alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-end w-full overflow-hidden mt-4 md:mt-0">
              <div ref={bottomRowRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-[95%]">
                <div className="aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF0884.JPG" alt="Gallery 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF1032.JPG" alt="Gallery 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block aspect-square shadow-md overflow-hidden relative">
                  <img src="/gallery/DSCF1459.JPG" alt="Gallery 6" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Text and See More */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:pl-[5%]">
            <p className="text-gray-700 max-w-xs text-xs md:text-sm font-sans mb-4 md:mb-0 leading-relaxed">
              Explore a curated collection of my visual memories, behind-the-scenes moments, and photography.
            </p>
            <Link href="/gallery" className="group inline-flex items-center gap-2 bg-[#a82525] text-white px-6 py-2.5 rounded-full font-medium text-sm md:text-base hover:bg-[#8a1e1e] transition-all hover:scale-105 shadow-md whitespace-nowrap">
              See more
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Smooth Organic Wave Divider into Experience Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-16 md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C320,120 480,20 720,70 C960,120 1200,30 1440,80 L1440,120 L0,120 Z"
            fill="#EFD3E1"
            opacity="0.4"
          />
          <path
            d="M0,45 C280,110 520,10 760,65 C1000,115 1240,25 1440,75 L1440,120 L0,120 Z"
            fill="#FAF9F6"
          />
        </svg>
      </div>
    </section>
  );
};
