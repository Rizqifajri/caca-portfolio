'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      desktop: { size: 300, top: 14, left: 15 },
      macbook: { size: 270, top: 12, left: 7 },
      tablet: { size: 195, top: 12, left: 1 },
      mobile: { size: 100, top: 24, left: 10 },
    },
    {
      id: 2, src: '/icons/red-star.svg', rotation: 12, zIndex: 11,
      desktop: { size: 400, top: 4, left: 20 },
      macbook: { size: 320, top: 1, left: 12 },
      tablet: { size: 235, top: 2, left: 7 },
      mobile: { size: 120, top: 33, left: 25 },
    },
    {
      id: 3, src: '/icons/ribbon-green.svg', rotation: -8, zIndex: 12,
      desktop: { size: 300, top: 35, left: 16 },
      macbook: { size: 250, top: 32, left: 6 },
      tablet: { size: 195, top: 33, left: 2 },
      mobile: { size: 100, top: 10, left: 10 },
    },
    {
      id: 4, src: '/icons/teratai.svg', rotation: 5, zIndex: 9,
      desktop: { size: 350, top: 53, left: 17 },
      macbook: { size: 280, top: 48, left: 12 },
      tablet: { size: 220, top: 49, left: 5 },
      mobile: { size: 120, top: 48, left: 5 },
    },
    {
      id: 5, src: '/icons/love-cookies.svg', rotation: -18, zIndex: 14,
      desktop: { size: 350, top: 49, left: 28 },
      macbook: { size: 270, top: 52, left: 25 },
      tablet: { size: 215, top: 53, left: 19 },
      mobile: { size: 120, top: 45, left: 15 },
    },
    {
      id: 6, src: '/icons/tomato.svg', rotation: 12, zIndex: 15,
      desktop: { size: 300, top: 60, left: 37 },
      macbook: { size: 235, top: 58, left: 35 },
      tablet: { size: 185, top: 59, left: 32 },
      mobile: { size: 100, top: 55, left: 25 },
    },
    {
      id: 7, src: '/icons/sun-flower.svg', rotation: 15, zIndex: 13,
      desktop: { size: 300, top: 50, left: 55 },
      macbook: { size: 240, top: 52, left: 57 },
      tablet: { size: 190, top: 53, left: 59 },
      mobile: { size: 100, top: 55, left: 65 },
    },
    {
      id: 8, src: '/icons/camera-pocket.svg', rotation: -8, zIndex: 20,
      desktop: { size: 600, top: 22, left: 63 },
      macbook: { size: 480, top: 30, left: 65 },
      tablet: { size: 360, top: 32, left: 70 },
      mobile: { size: 180, top: 25, left: 60 },
    },
    {
      id: 9, src: '/icons/film.svg', rotation: -14, zIndex: 12,
      desktop: { size: 400, top: 20, left: 66 },
      macbook: { size: 330, top: 16, left: 76 },
      tablet: { size: 255, top: 17, left: 74 },
      mobile: { size: 120, top: 15, left: 70 },
    },
    {
      id: 10, src: '/icons/red-flower.svg', rotation: 10, zIndex: 11,
      desktop: { size: 400, top: 6, left: 58 },
      macbook: { size: 340, top: 1, left: 62 },
      tablet: { size: 265, top: 7, left: 63 },
      mobile: { size: 120, top: 5, left: 65 },
    },
    {
      id: 11, src: '/icons/red-pin.svg', rotation: 50, zIndex: 25,
      desktop: { size: 200, top: 30, left: 57 },
      macbook: { size: 170, top: 22, left: 75 },
      tablet: { size: 130, top: 23, left: 62 },
      mobile: { size: 60, top: 35, left: 75 },
    },
    {
      id: 12, src: '/icons/c.svg', rotation: -15, zIndex: 16,
      desktop: { size: 70, top: 72, left: 49 },
      macbook: { size: 58, top: 70, left: 47 },
      tablet: { size: 48, top: 70, left: 45 },
      mobile: { size: 30, top: 68, left: 40 },
    },
    {
      id: 13, src: '/icons/a.svg', rotation: -5, zIndex: 16,
      desktop: { size: 70, top: 70, left: 52 },
      macbook: { size: 58, top: 68, left: 50 },
      tablet: { size: 48, top: 68, left: 49 },
      mobile: { size: 30, top: 65, left: 46 },
    },
    {
      id: 14, src: '/icons/love.svg', rotation: -10, zIndex: 16,
      desktop: { size: 80, top: 61, left: 52 },
      macbook: { size: 66, top: 60, left: 50 },
      tablet: { size: 54, top: 60, left: 49 },
      mobile: { size: 35, top: 58, left: 50 },
    },
    {
      id: 15, src: '/icons/l.svg', rotation: -10, zIndex: 16,
      desktop: { size: 70, top: 70, left: 55 },
      macbook: { size: 58, top: 68, left: 53 },
      tablet: { size: 48, top: 68, left: 53 },
      mobile: { size: 30, top: 65, left: 53 },
    },
    {
      id: 16, src: '/icons/u.svg', rotation: 15, zIndex: 16,
      desktop: { size: 70, top: 66, left: 58 },
      macbook: { size: 58, top: 64, left: 56 },
      tablet: { size: 48, top: 64, left: 56 },
      mobile: { size: 30, top: 63, left: 60 },
    },
    {
      id: 17, src: '/icons/star.svg', rotation: -5, zIndex: 16,
      desktop: { size: 70, top: 71, left: 60 },
      macbook: { size: 58, top: 70, left: 58 },
      tablet: { size: 48, top: 70, left: 59 },
      mobile: { size: 30, top: 67, left: 65 },
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
    if (!containerRef.current) return;

    let draggables: globalThis.Draggable[] = [];

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll('.scrapbook-item');
      const nameChars = containerRef.current!.querySelectorAll('.hero-name-char');
      const roleChars = containerRef.current!.querySelectorAll('.hero-role-char');

      // Set initial rotations
      elements.forEach((el, index) => {
        gsap.set(el, { rotation: assets[index]?.rotation });
      });

      // Unique Hero Center Text Reveal Timeline
      // Morphing 3D editorial flip & elastic letter settle
      const heroTl = gsap.timeline({ delay: 0.1 });

      heroTl
        // Name: 3D perspective flip with gentle stagger & glow bloom
        .fromTo(
          nameChars,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -75,
            rotateY: 20,
            scale: 0.8,
            filter: 'blur(8px)',
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            stagger: {
              each: 0.045,
              from: 'center', // Radiates from the center of the name outward
            },
            ease: 'elastic.out(1, 0.65)',
          }
        )
        // Subtitle role: Clean tracking stretch and slide-in
        .fromTo(
          roleChars,
          {
            opacity: 0,
            y: 20,
            letterSpacing: '0.35em',
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.08em',
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.02,
            ease: 'power3.out',
          },
          '-=0.7'
        );

      // Fall and scatter animation for scrapbook assets
      gsap.fromTo(
        elements,
        { y: -300, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.08,
          ease: 'bounce.out',
        }
      );

      // Make them draggable
      draggables = Draggable.create(elements, {
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

    return () => {
      if (draggables && draggables.length > 0) {
        draggables.forEach(d => d.kill());
      }
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="flex flex-col h-[100dvh] min-h-[600px] md:min-h-[700px] bg-ivory-mist text-forest-green relative overflow-hidden font-sans items-center justify-end md:justify-center"
      >
        {/* Aesthetic Scrapbook Background Texture & Ambient Glows */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Soft Warm Ambient Glows */}
          <div className="absolute -top-[10%] -left-[5%] w-[480px] h-[480px] rounded-full bg-[#EFD3E1]/50 blur-[110px]" />
          <div className="absolute top-[15%] -right-[5%] w-[450px] h-[450px] rounded-full bg-[#fce5b6]/45 blur-[110px]" />
          <div className="absolute -bottom-[15%] left-[25%] w-[520px] h-[420px] rounded-full bg-[#014421]/[0.05] blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-[#a82525]/[0.04] blur-[100px]" />

          {/* Subtle Editorial Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(1, 68, 33, 0.055) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(1, 68, 33, 0.055) 1px, transparent 1px)
              `,
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 35%, transparent 100%)',
            }}
          />

          {/* Fine Dot Matrix Overlay */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(168, 37, 37, 0.14) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
        </div>

        {/* In-Page Top Editorial Header (Scrolls with the page, not fixed) */}
        <header className="absolute top-0 left-0 w-full flex items-start justify-between px-5 md:px-8 lg:px-10 pt-5 md:pt-7 lg:pt-8 z-35 pointer-events-none">
          {/* Left: Editorial Split Identity */}
          <Link
            href="/"
            className="pointer-events-auto group flex items-center gap-3.5 md:gap-4 text-sm md:text-base lg:text-lg leading-[1.15] tracking-tight select-none"
          >
            <div className="text-right font-semibold text-[#014421] group-hover:text-[#a82525] transition-colors">
              <span className="block">Cantika</span>
              <span className="block">Fitriani</span>
            </div>
            <div className="h-9 md:h-11 w-[1.5px] bg-[#014421]/30 group-hover:bg-[#a82525]/50 transition-colors" />
            <div className="text-left font-medium text-[#014421]/80">
              <span className="block">Portfolio</span>
              <span className="block text-[#a82525] font-semibold">2026</span>
            </div>
          </Link>

          {/* Right: Bold Stacked "Get In Touch" Lockup with Dot Matrix Accent */}
          <div className="relative pointer-events-auto">
            <div
              className="absolute -right-2 -top-2 w-28 md:w-36 h-16 md:h-20 opacity-35 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#014421 1px, transparent 1px)',
                backgroundSize: '4px 4px',
              }}
            />
            <Link
              href="/contact"
              className="relative group block text-right leading-[0.9] tracking-tighter text-[#014421] hover:text-[#a82525] transition-colors"
            >
              <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold">
                Get In
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-[#a82525] group-hover:text-[#014421] transition-colors">
                Touch
              </span>
            </Link>
          </div>
        </header>

        {/* Mobile Background Image */}
        <div className="block md:hidden absolute inset-0 z-10">
          <Image
            src="/profile/caca-profile-v2.jpeg"
            alt="Cantika Profile"
            fill
            className="object-contain"
            priority
          />
          {/* Optional subtle gradient at bottom for text readability on mobile */}
          <div className="absolute h-1/2 mt-auto" />
        </div>

        {/* Center Text Composition */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none w-full px-4 pb-8 md:pb-0 md:-mt-6 lg:-mt-8" translate="no">
          <h1
            aria-label="Cantika Fitriani"
            className="font-cursive text-6xl md:text-8xl lg:text-[7.5rem] text-crimson-red tracking-normal normal-case mb-3 md:mb-5 flex flex-wrap justify-center gap-x-[0.25em] perspective-[1000px]"
          >
            {['Cantika', 'Fitriani'].map((word, wIdx) => (
              <span
                key={wIdx}
                className="inline-flex overflow-visible py-3 px-1 -my-3 -mx-1"
              >
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="hero-name-char inline-block will-change-transform transform-gpu"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="text-base md:text-lg lg:text-xl font-medium uppercase tracking-[0.08em] text-forest-green flex flex-wrap justify-center overflow-hidden py-1">
            {'Creative Video Editor'.split('').map((char, idx) => (
              <span
                key={idx}
                className="hero-role-char inline-block will-change-transform transform-gpu"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Responsive Styles for Assets */}
        <style>{
          assets.map(asset => `
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
            @media (min-width: 1600px) {
              .asset-${asset.id} {
                width: ${asset.desktop.size}px;
                height: ${asset.desktop.size}px;
                top: ${asset.desktop.top}%;
                left: ${asset.desktop.left}%;
              }
            }
          `).join('\n')
        }</style>

        {/* Draggable Scrapbook Items (Hidden on Mobile) */}
        <div className="hidden md:block absolute inset-0 z-30 pointer-events-none overflow-hidden">
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
      <section id="about" className="text-[#333333] px-6 md:px-16 py-12 md:py-24 relative z-40 overflow-hidden bg-transparent">
        <div className="relative w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-stretch md:bg-[#EFD3E1] bg-transparent">
          {/* Viewfinder Capture Corner Marks */}
          <span className="hidden md:block absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#a82525]/50 pointer-events-none z-10" />
          <span className="hidden md:block absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#a82525]/50 pointer-events-none z-10" />
          <span className="hidden md:block absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#a82525]/50 pointer-events-none z-10" />
          <span className="hidden md:block absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#a82525]/50 pointer-events-none z-10" />

          {/* Text Container (Left) */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left px-4 md:px-12 lg:px-16 py-8 md:py-16">
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

          {/* Image Container (Right) - Hidden on Mobile since it's already in the Hero */}
          <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end relative min-h-[330px] sm:min-h-[400px] md:min-h-[500px]">
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
