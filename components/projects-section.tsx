'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const projectCategories = [
    { 
      title: 'Cretivox', 
      total: 8,
      videos: [
        { title: 'Chief Campaign', tag: 'INSTAGRAM' },
        { title: 'Red Bull x MotoGP', tag: 'INSTAGRAM' },
        { title: 'SAFF & CO', tag: 'INSTAGRAM' },
        { title: 'Aqua', tag: 'INSTAGRAM' },
      ]
    },
    { 
      title: 'Infinix', 
      total: 12,
      videos: [
        { title: 'Note 30 Launch', tag: 'TIKTOK' },
        { title: 'Zero 30 5G', tag: 'YOUTUBE' },
        { title: 'GT 10 Pro', tag: 'INSTAGRAM' },
        { title: 'Smart 8 Campaign', tag: 'TIKTOK' },
      ]
    },
    { 
      title: 'Short Films', 
      total: 5,
      videos: [
        { title: 'The Echoes', tag: 'VIMEO' },
        { title: 'Silent Steps', tag: 'YOUTUBE' },
        { title: 'Midnight Coffee', tag: 'FESTIVAL' },
        { title: 'Lost in Tokyo', tag: 'VIMEO' },
      ]
    },
    { 
      title: 'Music Videos', 
      total: 15,
      videos: [
        { title: 'Neon Nights', tag: 'YOUTUBE' },
        { title: 'Summer Breeze', tag: 'YOUTUBE' },
        { title: 'Urban Pulse', tag: 'INSTAGRAM' },
        { title: 'Electric Dreams', tag: 'TIKTOK' },
      ]
    },
    { 
      title: 'Commercials', 
      total: 9,
      videos: [
        { title: 'Nike Active', tag: 'INSTAGRAM' },
        { title: 'Sony Audio', tag: 'YOUTUBE' },
        { title: 'Gojek Promo', tag: 'TIKTOK' },
        { title: 'Traveloka', tag: 'YOUTUBE' },
      ]
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Simple float animation for the decorative icons
    const decorations = containerRef.current.querySelectorAll('.decoration-icon');
    gsap.to(decorations, {
      y: 'random(-20, 20)',
      rotation: 'random(-15, 15)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#FAF9F6] py-24 overflow-hidden">
      
      {/* Decorative Icons */}
      <img src="/icons/sun-flower.svg" className="decoration-icon absolute top-[5%] left-[5%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/red-flower.svg" className="decoration-icon absolute top-[15%] right-[8%] w-20 h-20 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/tomato.svg" className="decoration-icon absolute top-[30%] left-[3%] w-16 h-16 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/love-cookies.svg" className="decoration-icon absolute top-[45%] right-[5%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/teratai.svg" className="decoration-icon absolute top-[65%] left-[6%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/star.svg" className="decoration-icon absolute top-[80%] right-[10%] w-12 h-12 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/camera-pocket.svg" className="decoration-icon absolute bottom-[5%] left-[8%] w-20 h-20 object-contain opacity-50 z-0" alt="decoration" />

      {/* Main Title */}
      <div className="text-center z-10 mb-20 flex justify-center relative">
        <h2 className="text-[#a82525] text-6xl md:text-8xl font-cursive italic tracking-wide">
          Projects
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 z-10 relative">
        {projectCategories.map((category, index) => (
          <div key={index} className="mb-24 last:mb-0">
            
            {/* Category Title with Dashed Underline */}
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h3 className="text-[#008000] text-3xl md:text-4xl font-serif font-medium pb-2">
                  {category.title}
                </h3>
                <div className="absolute bottom-0 left-0 w-full border-b-[2px] border-dashed border-[#a82525]/50"></div>
              </div>
            </div>
            
            {/* Video Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {category.videos.map((vid, vIndex) => (
                <div key={vIndex} className="w-full aspect-[9/16] bg-gray-300 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
                   
                   {/* Background Image Placeholder (using gradient for now, can be replaced with real images) */}
                   <div className="absolute inset-0 bg-[#d4d4d4] group-hover:scale-105 transition-transform duration-500">
                     {/* In a real scenario, put next/image here */}
                   </div>
                   
                   {/* Gradient Overlay for Text Visibility */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                   
                   {/* Play Button */}
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>

                   {/* Video Info (Tag & Title) */}
                   <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                     <div className="bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] md:text-xs rounded uppercase font-bold tracking-wider inline-block mb-2 text-white/90">
                       {vid.tag}
                     </div>
                     <h4 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
                       {vid.title}
                     </h4>
                   </div>
                   
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-2 rounded-full border border-[#008000]/40 text-[#008000] text-sm font-medium hover:bg-[#008000] hover:text-white transition-colors duration-300">
                Lihat semua ({category.total}) →
              </button>
            </div>

          </div>
        ))}
      </div>
      
    </section>
  );
};
