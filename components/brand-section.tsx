'use client';

import React from 'react';
import Image from 'next/image';

const logosRow1 = [
  { src: '/logo/aqua-logo.png',      alt: 'Aqua'      },
  { src: '/logo/axe-logo.png',       alt: 'AXE'       },
  { src: '/logo/chief-logo.png',     alt: 'Chief'     },
  { src: '/logo/kemenkes.png',       alt: 'Kemenkes'  },
];

const logosRow2 = [
  { src: '/logo/safnco-logo.png',    alt: 'Safnco',   forceGray: true },
  { src: '/logo/teh-gelas-logo.png', alt: 'Teh Gelas' },
  { src: '/logo/tiktok.png',         alt: 'TikTok'    },
  { src: '/logo/aqua-logo.png',      alt: 'Aqua'      },
  { src: '/logo/axe-logo.png',       alt: 'AXE'       },
];

// Triplicate for seamless infinite loop
const trackRow1 = [...logosRow1, ...logosRow1, ...logosRow1, ...logosRow1];
const trackRow2 = [...logosRow2, ...logosRow2, ...logosRow2, ...logosRow2];

const LOGO_W = 180;
const LOGO_H = 100;
const GAP    = 56; // px gap between logos

export const BrandSection = () => {
  return (
    <section
      id="brands"
      className="w-full py-16 md:py-24 overflow-hidden bg-[#FAF9F6]"
    >
      {/* Heading */}
      <div className="flex gap-4 items-center justify-center text-center mb-12 md:mb-16 px-4">
        <p className="text-[#C80000] font-cursive italic text-5xl md:text-9xl leading-tight">
          Brand
        </p>
        <p className="text-[#014421] font-sans text-sm md:text-base font-semibold mb-4 flex items-end">
          I Work with
        </p>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="relative w-full overflow-hidden mb-8 md:mb-10">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-28 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #FAF9F6 30%, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-28 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #FAF9F6 30%, transparent)' }} />

        <div
          className="flex items-center marquee-left whitespace-nowrap gap-8 md:gap-[56px]"
        >
          {trackRow1.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-[100px] md:w-[180px] h-[60px] md:h-[100px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={LOGO_W}
                height={LOGO_H}
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 select-none w-full h-full max-w-[100px] md:max-w-[180px] max-h-[60px] md:max-h-[100px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-28 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #FAF9F6 30%, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-28 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #FAF9F6 30%, transparent)' }} />

        <div
          className="flex items-center marquee-right whitespace-nowrap gap-8 md:gap-[56px]"
        >
          {trackRow2.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-[100px] md:w-[180px] h-[60px] md:h-[100px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={LOGO_W}
                height={LOGO_H}
                className="object-contain transition-all duration-300 select-none opacity-50 hover:opacity-100 w-full h-full max-w-[100px] md:max-w-[180px] max-h-[60px] md:max-h-[100px]"
                style={{
                  filter: logo.forceGray
                    ? 'brightness(0) opacity(0.55)'
                    : 'grayscale(1)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Row 1: scroll to the left */
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 4)); }
        }
        .marquee-left {
          animation: marquee-left 32s linear infinite;
          will-change: transform;
        }
        .marquee-left:hover {
          animation-play-state: paused;
        }

        /* Row 2: scroll to the right (reverse direction) */
        @keyframes marquee-right {
          0%   { transform: translateX(calc(-100% / 4)); }
          100% { transform: translateX(0); }
        }
        .marquee-right {
          animation: marquee-right 32s linear infinite;
          will-change: transform;
        }
        .marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
