'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Removed module-level registerPlugin

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  const aboutText = "I'm a passionate video editor specializing in creating captivating visual stories. I build edits that are modern, engaging, beautiful, and dynamic. Furthermore, I believe that good results come from close collaboration, shared ambition, and mutual respect. I create videos which make a positive impact on audiences.";
  const aboutWords = aboutText.split(' ');

  const assets = [
    {
      id: 1, src: '/icons/yellow-button.svg', rotation: -5, zIndex: 10,
      desktop: { size: 300, top: 16, left: 22 },
      macbook: { size: 250, top: 16, left: 17 },
      tablet: { size: 200, top: 30, left: 15 },
      mobile: { size: 100, top: 10, left: 10 },
    },
    {
      id: 2, src: '/icons/red-star.svg', rotation: 12, zIndex: 11,
      desktop: { size: 400, top: 5, left: 27 },
      macbook: { size: 300, top: 5, left: 24 },
      tablet: { size: 250, top: 24, left: 23 },
      mobile: { size: 120, top: 10, left: 10 },
    },
    {
      id: 3, src: '/icons/ribbon-green.svg', rotation: -8, zIndex: 12,
      desktop: { size: 300, top: 35, left: 20 },
      macbook: { size: 220, top: 35, left: 15 },
      tablet: { size: 160, top: 40, left: 10 },
      mobile: { size: 100, top: 10, left: 10 },
    },
    {
      id: 4, src: '/icons/teratai.svg', rotation: 5, zIndex: 9,
      desktop: { size: 350, top: 53, left: 17 },
      macbook: { size: 260, top: 53, left: 17 },
      tablet: { size: 200, top: 48, left: 10 },
      mobile: { size: 120, top: 48, left: 5 },
    },
    {
      id: 5, src: '/icons/love-cookies.svg', rotation: -18, zIndex: 14,
      desktop: { size: 350, top: 49, left: 28 },
      macbook: { size: 260, top: 49, left: 25 },
      tablet: { size: 200, top: 55, left: 22 },
      mobile: { size: 120, top: 45, left: 15 },
    },
    {
      id: 6, src: '/icons/tomato.svg', rotation: 12, zIndex: 15,
      desktop: { size: 300, top: 60, left: 37 },
      macbook: { size: 220, top: 60, left: 35 },
      tablet: { size: 160, top: 60, left: 35 },
      mobile: { size: 100, top: 55, left: 25 },
    },
    {
      id: 7, src: '/icons/sun-flower.svg', rotation: 15, zIndex: 13,
      desktop: { size: 300, top: 50, left: 55 },
      macbook: { size: 220, top: 50, left: 60 },
      tablet: { size: 160, top: 50, left: 62 },
      mobile: { size: 100, top: 55, left: 65 },
    },
    {
      id: 8, src: '/icons/camera-pocket.svg', rotation: -8, zIndex: 20,
      desktop: { size: 600, top: 20, left: 60 },
      macbook: { size: 450, top: 20, left: 63 },
      tablet: { size: 300, top: 28, left: 55 },
      mobile: { size: 180, top: 25, left: 60 },
    },
    {
      id: 9, src: '/icons/film.svg', rotation: -15, zIndex: 12,
      desktop: { size: 400, top: 22, left: 60 },
      macbook: { size: 300, top: 12, left: 65 },
      tablet: { size: 250, top: 23, left: 55 },
      mobile: { size: 120, top: 15, left: 70 },
    },
    {
      id: 10, src: '/icons/red-flower.svg', rotation: 10, zIndex: 11,
      desktop: { size: 400, top: 6, left: 56 },
      macbook: { size: 300, top: 6, left: 56 },
      tablet: { size: 250, top: 20, left: 40 },
      mobile: { size: 120, top: 5, left: 65 },
    },
    {
      id: 11, src: '/icons/red-pin.svg', rotation: 50, zIndex: 25,
      desktop: { size: 200, top: 30, left: 55 },
      macbook: { size: 150, top: 25, left: 55 },
      tablet: { size: 100, top: 30, left: 60 },
      mobile: { size: 60, top: 35, left: 75 },
    },
    {
      id: 12, src: '/icons/c.svg', rotation: -15, zIndex: 16,
      desktop: { size: 70, top: 72, left: 49 },
      macbook: { size: 55, top: 72, left: 49 },
      tablet: { size: 45, top: 70, left: 47 },
      mobile: { size: 30, top: 68, left: 40 },
    },
    {
      id: 13, src: '/icons/a.svg', rotation: -5, zIndex: 16,
      desktop: { size: 70, top: 70, left: 52 },
      macbook: { size: 55, top: 70, left: 52 },
      tablet: { size: 45, top: 68, left: 51 },
      mobile: { size: 30, top: 65, left: 46 },
    },
    {
      id: 14, src: '/icons/love.svg', rotation: -10, zIndex: 16,
      desktop: { size: 80, top: 61, left: 52 },
      macbook: { size: 65, top: 63, left: 52 },
      tablet: { size: 50, top: 60, left: 52 },
      mobile: { size: 35, top: 58, left: 50 },
    },
    {
      id: 15, src: '/icons/l.svg', rotation: -10, zIndex: 16,
      desktop: { size: 70, top: 70, left: 55 },
      macbook: { size: 55, top: 70, left: 55 },
      tablet: { size: 45, top: 68, left: 55 },
      mobile: { size: 30, top: 65, left: 53 },
    },
    {
      id: 16, src: '/icons/u.svg', rotation: 15, zIndex: 16,
      desktop: { size: 70, top: 66, left: 58 },
      macbook: { size: 55, top: 66, left: 58 },
      tablet: { size: 45, top: 65, left: 59 },
      mobile: { size: 30, top: 63, left: 60 },
    },
    {
      id: 17, src: '/icons/star.svg', rotation: -5, zIndex: 16,
      desktop: { size: 70, top: 71, left: 60 },
      macbook: { size: 55, top: 71, left: 60 },
      tablet: { size: 45, top: 69, left: 63 },
      mobile: { size: 30, top: 67, left: 65 },
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll('.scrapbook-item');

      // Set initial rotations
      elements.forEach((el, index) => {
        gsap.set(el, { rotation: assets[index]?.rotation });
      });

      // Fall and scatter animation on load
      gsap.fromTo(elements,
        { y: -300, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "bounce.out"
        }
      );

      // Make them draggable
      Draggable.create(elements, {
        type: "x,y",
        bounds: containerRef.current,
      });

      // About Section Text Animation
      if (aboutTextRef.current) {
        const chars = aboutTextRef.current.querySelectorAll('.split-char');
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutTextRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1, // Adding smoothing to prevent sudden jumps
          }
        });
      }

      // About Section Heading Animation
      if (aboutHeadingRef.current) {
        gsap.fromTo(aboutHeadingRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutHeadingRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 1,
            }
          }
        );
      }

      // About Section Image Animation
      if (aboutImageRef.current) {
        gsap.fromTo(aboutImageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutImageRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="flex flex-col min-h-[calc(100vh-90px)] bg-ivory-mist text-forest-green relative overflow-hidden font-sans items-center justify-center"
      >
        {/* Center Text Composition */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none w-full px-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-forest-green mb-0 md:mb-2 tracking-wide">
            Hello, im
          </p>
          <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-crimson-red tracking-normal normal-case mb-2 md:mb-4">
            Cantika Fitriani
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-forest-green tracking-wide">
            Creative Video Editor
          </p>
        </div>

        {/* Responsive Styles for Assets */}
        <style dangerouslySetInnerHTML={{
          __html: assets.map(asset => `
            .asset-${asset.id} {
              width: ${asset.mobile.size}px;
              height: ${asset.mobile.size}px;
              top: ${asset.mobile.top}%;
              left: ${asset.mobile.left}%;
            }
            @media (min-width: 768px) {
              .asset-${asset.id} {
                width: ${asset.tablet.size}px;
                height: ${asset.tablet.size}px;
                top: ${asset.tablet.top}%;
                left: ${asset.tablet.left}%;
              }
            }
            @media (min-width: 1024px) {
              .asset-${asset.id} {
                width: ${asset.macbook.size}px;
                height: ${asset.macbook.size}px;
                top: ${asset.macbook.top}%;
                left: ${asset.macbook.left}%;
              }
            }
            @media (min-width: 1440px) {
              .asset-${asset.id} {
                width: ${asset.desktop.size}px;
                height: ${asset.desktop.size}px;
                top: ${asset.desktop.top}%;
                left: ${asset.desktop.left}%;
              }
            }
          `).join('\\n')
        }} />

        {/* Draggable Scrapbook Items */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={`scrapbook-item asset-${asset.id} absolute cursor-grab active:cursor-grabbing pointer-events-auto`}
              style={{
                zIndex: asset.zIndex
              }}
            >
              <div className="relative w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] transition-shadow duration-300">
                <Image
                  src={asset.src}
                  alt="Scrapbook Asset"
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="text-[#333333] px-6 md:px-16 py-12 md:py-24 relative z-40 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-stretch bg-[#EFD3E1]">
          {/* Text Container (Left) */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left px-8 md:px-12 lg:px-16 py-12 md:py-16">
            <h2 ref={aboutHeadingRef} className="text-4xl md:text-5xl lg:text-6xl text-[#a82525] font-sans mb-6">
              Hi, its me Calu!
            </h2>
            <p ref={aboutTextRef} className="text-[#333333] text-sm md:text-base lg:text-lg leading-relaxed flex flex-wrap gap-x-[4px] italic">
              {aboutWords.map((word, i) => (
                <span key={i} className="inline-flex">
                  {word.split('').map((char, j) => (
                    <span key={j} className="split-char inline-block opacity-20">{char}</span>
                  ))}
                </span>
              ))}
            </p>
          </div>

          {/* Image Container (Right) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative min-h-[330px] sm:min-h-[400px] md:min-h-[500px]">
            <div ref={aboutImageRef} className="absolute inset-0 w-full h-full" >
              <Image
                src="/profile/caca-profile-v2.jpeg"
                alt="Profile of Calu"
                fill
                className="object-cover object-right"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
