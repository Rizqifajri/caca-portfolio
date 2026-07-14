import React from 'react';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <>
      <section className="flex flex-col px-6 md:px-16 min-h-[calc(100vh-90px)] bg-white text-[#1a3a2a] relative overflow-hidden font-sans">

        {/* Top Left Title - Stacked */}
        <div className="absolute top-10 left-6 md:left-16 z-20">
          <h1 className="text-[10vw] md:text-[5vw] leading-[0.9] font-light tracking-tighter m-0 text-[#1a3a2a]">
            Creative<br />
            Video<br />
            Editor
          </h1>
        </div>

        {/* Center/Right Content: Photo & Name */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center h-full w-full mt-48 md:mt-0 relative z-10 gap-8">

          {/* Center Photo */}
          <div className="relative">
            <div className="relative w-[280px] md:w-[350px] lg:w-[400px] aspect-[4/5] bg-[#eef3f0] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/profile/CACA 2.jpg"
                alt="Cantika Fitriani"
                fill
                className="object-cover transition-all duration-700"
                priority
              />
            </div>
            
            {/* Custom Flower PNG Decoration */}
            <div className="absolute -bottom-8 -right-8 md:bottom-24 md:-right-32 w-24 h-24 md:w-56 md:h-56 opacity-90">
              <Image 
                src="/icons/flower.png" 
                alt="Flower Decoration" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="absolute -top-10 -left-10 md:-bottom-16 md:-right-16 w-16 h-16 md:w-20 md:h-20 opacity-80">
              <Image 
                src="/icons/flower.png" 
                alt="Flower Decoration" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Name */}
          <div className="text-left md:text-right flex-shrink-0 mt-8 md:mt-0 md:self-end md:mb-4">
            <h2 className="text-[16vw] md:text-[9vw] leading-[0.85] font-semibold tracking-tighter m-0 text-[#1a3a2a]">
              Cantika
              <br />
              Fitriani
            </h2>
          </div>

        </div>
      </section>

      {/* About Me Section (Shows on scroll) */}
      <section id="about" className="min-h-[50vh] bg-white text-[#1a3a2a] px-6 md:px-16 flex items-center justify-end py-24">
        <div className="w-full max-w-5xl">
          <p className="text-right text-sm md:text-base lg:text-xl leading-relaxed font-normal tracking-[0.15em] text-[#3d5a49]">
            I'm a passionate video editor specializing in creating captivating visual stories.
            I build edits that are modern, engaging, beautiful, and dynamic.
            Furthermore, I believe that good results come from close collaboration,
            shared ambition, and mutual respect. I create videos which make a
            positive impact on audiences.
          </p>
        </div>
      </section>
    </>
  );
};
