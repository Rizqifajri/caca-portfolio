import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#FAF9F6] text-gray-900 py-16 relative overflow-hidden">
      {/* Decorative Sunflowers */}
      <img src="/icons/sun-flower.svg" className="absolute -top-10 -right-10 w-40 h-40 object-contain opacity-20 z-0" alt="decoration" />
      <img src="/icons/red-flower.svg" className="absolute -bottom-10 -left-10 w-32 h-32 object-contain opacity-20 z-0" alt="decoration" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-[#008000] text-4xl font-cursive italic tracking-widest mb-2">
              Portfolio
            </h2>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              Crafting visual stories through creative video editing and animation. Let's make something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[#a82525] font-bold text-lg mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-center md:text-left">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#008000] transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-[#008000] transition-colors duration-300">Projects</Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-600 hover:text-[#008000] transition-colors duration-300">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#008000] transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[#a82525] font-bold text-lg mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#008000]/10 text-[#008000] flex items-center justify-center hover:bg-[#a82525] hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#008000]/10 text-[#008000] flex items-center justify-center hover:bg-[#a82525] hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="mailto:hello@example.com" className="w-10 h-10 rounded-full bg-[#008000]/10 text-[#008000] flex items-center justify-center hover:bg-[#a82525] hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#008000]/20 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Caca's Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <svg className="w-4 h-4 text-[#a82525] fill-[#a82525]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> by Creativity
          </p>
        </div>
      </div>
    </footer>
  );
};
