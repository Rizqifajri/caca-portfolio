'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Removed module-level registerPlugin

export const ToolsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const logos = containerRef.current!.querySelectorAll('.software-logo');
      gsap.fromTo(logos,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%', // Trigger when the top of the section hits 70% down the viewport
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center pt-20 pb-40 px-6 md:px-16 lg:px-24">

      {/* Title (Left Side) */}
      <div className="w-full md:w-1/2 text-center z-10 mb-20 md:mb-0 flex flex-col items-center justify-center">
        <h2 className="text-[#008000] text-5xl md:text-7xl lg:text-9xl font-cursive italic">
          Skills
        </h2>
        <span className="text-red-600 text-xl md:text-2xl lg:text-3xl font-sans -my-1 md:-my-2 z-10">and</span>
        <h2 className="text-[#008000] text-5xl md:text-7xl lg:text-9xl font-cursive italic">
          Software
        </h2>
      </div>

      {/* Envelope and Logos (Right Side) */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center h-[300px] md:h-[400px]">

        {/* The Envelope */}
        <div className="relative w-full max-w-[400px] md:max-w-[600px] aspect-square flex flex-col items-center justify-end">

          {/* The white paper */}
          <div className="absolute bottom-16 md:bottom-32 w-[70%] h-[70%] z-50 flex flex-wrap justify-center content-start gap-4 md:gap-8">
            <img src="/icons/canva-logo.svg" alt="Canva" className="software-logo w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain -rotate-12" />
            <img src="/icons/AE-logo.svg" alt="After Effects" className="software-logo w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain relative top-4 md:top-8" />
            <img src="/icons/davinci-logo.svg" alt="DaVinci Resolve" className="software-logo w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rotate-12" />

            <img src="/icons/ai-logo.svg" alt="Illustrator" className="software-logo w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain -rotate-6 mt-4 md:mt-8 ml-4 md:ml-8" />
            <img src="/icons/capcut-logo.svg" alt="CapCut" className="software-logo w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rotate-6 mt-4 md:mt-8 mr-4 md:mr-8" />
          </div>

          <img src="/icons/red-letter.svg" alt="Envelope" className="absolute bottom-0 w-full h-full z-20 object-contain drop-shadow-xl" />
        </div>
      </div>

      {/* Bottom Border */}
      <div
        className="absolute bottom-40 md:bottom-50 left-0 w-full h-32 md:h-[150px] z-30 pointer-events-none"
        style={{
          backgroundImage: 'url(/icons/kain-green.svg)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom left'
        }}
      />

    </section>
  );
};
