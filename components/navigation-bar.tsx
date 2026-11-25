'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // GSAP circular expanding reveal transition for mobile menu
  useEffect(() => {
    const overlay = mobileOverlayRef.current;
    if (!overlay) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(overlay, {
        clipPath: 'circle(0px at calc(100% - 48px) calc(100% - 48px))',
        visibility: 'hidden',
        pointerEvents: 'none',
      });
      return;
    }

    if (isMenuOpen) {
      gsap.set(overlay, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.fromTo(
        overlay,
        { clipPath: 'circle(24px at calc(100% - 48px) calc(100% - 48px))' },
        {
          clipPath: 'circle(150% at calc(100% - 48px) calc(100% - 48px))',
          duration: 0.65,
          ease: 'expo.inOut',
          overwrite: 'auto',
        }
      );

      gsap.fromTo(
        overlay.querySelectorAll('.mobile-nav-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          delay: 0.2,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );

      gsap.fromTo(
        overlay.querySelectorAll('.mobile-nav-meta'),
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          delay: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    } else {
      gsap.to(overlay.querySelectorAll('.mobile-nav-item, .mobile-nav-meta'), {
        y: 16,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
      });

      gsap.to(overlay, {
        clipPath: 'circle(0px at calc(100% - 48px) calc(100% - 48px))',
        duration: 0.5,
        delay: 0.05,
        ease: 'expo.inOut',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' });
        },
      });
    }
  }, [isMenuOpen]);

  const navLinks = [
    { num: '01', name: 'Home', href: '/' },
    { num: '02', name: 'Project', href: '/projects' },
    { num: '03', name: 'Gallery', href: '/gallery' },
    { num: '04', name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Desktop Floating Pill Navigation at Bottom-Right Corner */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:block fixed bottom-7 right-8 lg:bottom-9 lg:right-12 z-[100] font-sans"
      >
        <ul className="flex items-center gap-1 lg:gap-1.5 bg-[#FAF9F6]/85 border border-[#014421]/15 rounded-full px-2.5 py-1.5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs lg:text-[13px] font-medium tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'bg-[#a82525] text-white shadow-sm'
                      : 'text-[#014421]/85 hover:text-[#014421] hover:bg-[#014421]/[0.06]'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-white/80' : 'text-[#a82525]/75'
                    }`}
                  >
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Floating Circular Arrow Button at Bottom-Right Corner */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        className={`md:hidden fixed bottom-6 right-6 z-[110] flex items-center justify-center w-12 h-12 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.18)] focus:outline-none transition-all duration-300 active:scale-90 cursor-pointer ${
          isMenuOpen
            ? 'bg-[#014421] text-[#FAF9F6]'
            : 'bg-[#a82525] text-[#FAF9F6] border border-white/20'
        }`}
      >
        <ArrowUpLeft
          className={`w-5 h-5 transition-transform duration-300 ${
            isMenuOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Mobile Fullscreen Circular-Reveal Menu */}
      <div
        ref={mobileOverlayRef}
        className="md:hidden fixed inset-0 z-[105] bg-[#FAF9F6] flex flex-col justify-between px-7 pt-10 pb-24 font-sans overflow-hidden"
      >
        {/* Top Editorial Meta */}
        <div className="mobile-nav-meta flex items-center justify-between border-b border-[#014421]/15 pb-4">
          <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#014421]/60">
            Navigation
          </span>
          <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#a82525]">
            Cantika Portfolio
          </span>
        </div>

        {/* Large Bold Editorial Menu Items */}
        <ul className="flex flex-col gap-5 my-auto">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname?.startsWith(link.href));

            return (
              <li key={link.name} className="mobile-nav-item">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-baseline justify-between py-1 border-b border-[#014421]/10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-sans font-semibold text-[#a82525]">
                      {link.num}
                    </span>
                    <span
                      className={`text-5xl sm:text-6xl font-cursive italic tracking-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-[#a82525]'
                          : 'text-[#014421] group-hover:text-[#a82525]'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>

                  <ArrowUpRight
                    className={`w-6 h-6 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      isActive ? 'text-[#a82525]' : 'text-[#014421]/40'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom Identity & Sunflower Accent */}
        <div className="mobile-nav-meta flex items-center justify-between pt-4 border-t border-[#014421]/15">
          <div>
            <p className="text-sm font-semibold text-[#014421]">Cantika Fitriani</p>
            <p className="text-xs text-[#014421]/60">Creative Video Editor</p>
          </div>
          <img
            src="/icons/sun-flower.svg"
            alt="Sunflower"
            className="w-10 h-10 opacity-85"
          />
        </div>
      </div>
    </>
  );
};
