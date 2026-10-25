import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#a82525] text-white pt-16 pb-16 relative overflow-visible">
      {/* Wavy Scalloped Top Edge matching reference */}
      <div className="absolute -top-5 sm:-top-7 md:-top-11 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-6 sm:h-8 md:h-12"
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,48 A 75,48 0 0,1 150,48 A 75,48 0 0,1 300,48 A 75,48 0 0,1 450,48 A 75,48 0 0,1 600,48 A 75,48 0 0,1 750,48 A 75,48 0 0,1 900,48 A 75,48 0 0,1 1050,48 A 75,48 0 0,1 1200,48 L 1200,48 L 0,48 Z"
            fill="#a82525"
          />
        </svg>
      </div>

      <div className="w-full px-6 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-white text-4xl font-cursive italic tracking-widest mb-2">
              Cantika Fitriani
            </h2>
            <p className="text-white/85 text-sm max-w-xs leading-relaxed">
              Crafting visual stories through creative video editing and animation. Let's make something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-center md:text-left">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/80 hover:text-white transition-colors duration-300">Projects</Link>
              </li>
              <li>
                <Link href="#gallery" className="text-white/80 hover:text-white transition-colors duration-300">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">Contact</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#a82525] transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#a82525] transition-all duration-300 hover:scale-110" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="mailto:hello@example.com" className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white hover:text-[#a82525] transition-all duration-300 hover:scale-110" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© {new Date().getFullYear()} Calu Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
