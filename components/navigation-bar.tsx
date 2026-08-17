'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down and past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50 && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Close menu when clicking outside or resizing
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
    { name: 'Home', href: '/' },
    { name: 'Project', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 py-6 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${lastScrollY > 50 || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      >
        <div className="z-50">
          <Link href="/" className="font-cursive text-4xl text-[#a82525] tracking-normal normal-case">
            Cantika Fitriani
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-[#2b5a2b] text-lg font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-[#a82525] hover:underline transition-all duration-300 font-light italic text-xl opacity-80">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button (Cute Animated) */}
        <button 
          className="md:hidden z-50 flex flex-col justify-center items-center w-10 h-10 bg-[#fff5f5] rounded-full border-2 border-[#a82525] text-[#a82525] focus:outline-none transition-transform active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="relative w-5 h-4 flex flex-col justify-between">
            <span className={`w-full h-[2.5px] bg-[#a82525] rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`}></span>
            <span className={`w-full h-[2.5px] bg-[#a82525] rounded-full transform transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-[2.5px] bg-[#a82525] rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-[#FAF9F6]/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out flex flex-col justify-center items-center ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 mt-12">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              style={{
                transitionDelay: `${isMenuOpen ? index * 100 : 0}ms`,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
              className="transition-all duration-500 ease-out"
            >
              <Link 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-cursive italic text-[#2b5a2b] hover:text-[#a82525] transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Cute decorative elements for mobile menu */}
        <div className={`absolute bottom-20 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
           <img src="/icons/sun-flower.svg" alt="flower" className="w-16 h-16 animate-spin-slow opacity-80" />
        </div>
      </div>
    </>
  );
};