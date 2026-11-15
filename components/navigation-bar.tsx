'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className="hidden md:block fixed bottom-7 right-8 lg:bottom-9 lg:right-12 z-50 font-sans"
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

      {/* Mobile Floating Hamburger Button at Bottom-Right Corner */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col justify-center items-center w-12 h-12 bg-[#FAF9F6]/95 backdrop-blur-md rounded-full border border-[#014421]/20 shadow-lg text-[#014421] focus:outline-none transition-transform active:scale-95"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <div className="relative w-4 h-3.5 flex flex-col justify-between">
          <span
            className={`w-full h-[2px] bg-[#014421] rounded-full transform transition-all duration-300 origin-left ${
              isMenuOpen
                ? 'rotate-45 translate-x-[1px] -translate-y-[1px] bg-[#a82525]'
                : ''
            }`}
          />
          <span
            className={`w-full h-[2px] bg-[#014421] rounded-full transform transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-full h-[2px] bg-[#014421] rounded-full transform transition-all duration-300 origin-left ${
              isMenuOpen
                ? '-rotate-45 translate-x-[1px] translate-y-[1px] bg-[#a82525]'
                : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#FAF9F6]/98 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out flex flex-col justify-center items-center font-sans ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-10'
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <li
              key={link.name}
              style={{
                transitionDelay: `${isMenuOpen ? index * 80 : 0}ms`,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
              className="transition-all duration-500 ease-out"
            >
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-[#014421] hover:text-[#a82525] transition-colors"
              >
                <span className="text-xs font-mono text-[#a82525]">
                  {link.num}
                </span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Decorative element for mobile menu */}
        <div
          className={`absolute bottom-16 transition-all duration-700 delay-300 ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <img
            src="/icons/sun-flower.svg"
            alt="flower"
            className="w-14 h-14 opacity-80"
          />
        </div>
      </div>
    </>
  );
};
