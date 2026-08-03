'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ToolsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const logos = containerRef.current.querySelectorAll('.software-logo');
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
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center pt-20 pb-40 px-56">
      
      {/* Title (Left Side) */}
      <div className="w-full md:w-1/2 text-center z-10 mb-20 md:mb-30 flex flex-col items-center justify-center">
        <h2 className="text-[#008000] text-6xl md:text-9xl font-cursive italic">
          Skills
        </h2>
        <span className="text-red-600 text-2xl md:text-3xl font-sans -my-2 z-10">and</span>
        <h2 className="text-[#008000] text-6xl md:text-9xl font-cursive italic">
          Software
        </h2>
      </div>

      {/* Envelope and Logos (Right Side) */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center h-[400px]">

        {/* The Envelope */}
        <div className="relative w-[600px] h-[600px] flex flex-col items-center justify-end">
          
          {/* The white paper */}
          <div className="absolute bottom-32 w-[400px] h-[400px] z-50 flex flex-wrap justify-center content-start gap-8">
            <img src="/icons/canva-logo.svg" alt="Canva" className="software-logo w-24 h-24 object-contain -rotate-12" />
            <img src="/icons/AE-logo.svg" alt="After Effects" className="software-logo w-24 h-24 object-contain relative top-8" />
            <img src="/icons/davinci-logo.svg" alt="DaVinci Resolve" className="software-logo w-24 h-24 object-contain rotate-12" />
            
            <img src="/icons/ai-logo.svg" alt="Illustrator" className="software-logo w-24 h-24 object-contain -rotate-6 mt-8 ml-8" />
            <img src="/icons/capcut-logo.svg" alt="CapCut" className="software-logo w-24 h-24 object-contain rotate-6 mt-8 mr-8" />
          </div>
          
          <img src="/icons/red-letter.svg" alt="Envelope" className="absolute bottom-0 w-[700px] h-[700px] z-20 object-contain drop-shadow-xl" />
        </div>
      </div>

      {/* Bottom Border */}
      <div 
        className="absolute bottom-50 left-0 w-full h-32 md:h-[150px] z-30 pointer-events-none" 
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
