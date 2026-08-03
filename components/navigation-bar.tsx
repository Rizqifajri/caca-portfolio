'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide if scrolling down and past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 py-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${lastScrollY > 50 ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div>
        <Link href="/" className="font-cursive text-4xl text-crimson-red tracking-normal normal-case">
          Cantika Fitriani
        </Link>
      </div>

      <ul className="hidden md:flex gap-10 text-forest-green/60 text-lg font-medium tracking-wide">
        <li>
          <Link href="/" className="hover:text-forest-green transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/#projects" className="hover:text-forest-green transition-colors">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-forest-green transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};