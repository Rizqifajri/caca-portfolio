import React from 'react';
import Link from 'next/link';

export default function GalleryPage() {
  // Generate an array of placeholders for the gallery (e.g., 24 images)
  const placeholders = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24 px-4 md:px-8 relative overflow-hidden text-gray-900 font-sans">
      <div className="max-w-[1600px] mx-auto z-10 relative">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-16 md:mb-32 group font-medium text-sm">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-12">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium font-cursive italic tracking-tight text-[#a82525] leading-none">
            Gallery<span className="text-2xl md:text-4xl align-top">º</span>
          </h1>
          <div className="flex justify-between w-full md:w-auto md:flex-1 md:ml-16 lg:ml-32">
            <div className="max-w-xs text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
              <p>
                Gallery is a curated collection dedicated to photography that delivers real outcomes, meaningful, measurable, and human.
              </p>
            </div>
            <div className="hidden lg:flex gap-4 text-xs font-medium text-gray-500 items-end">
               <span className="cursor-pointer hover:text-black">LinkedIn</span>
               <span className="cursor-pointer hover:text-black">Instagram</span>
               <span className="cursor-pointer hover:text-black">X</span>
            </div>
          </div>
        </div>

        {/* Middle Section (Title & Filters) */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-[#222]">
            Selected Works<span className="text-xs font-normal text-gray-500 align-super ml-1">({placeholders.length})</span>
          </h2>
          <div className="flex gap-8 mt-6 md:mt-0 text-xl md:text-2xl font-medium text-gray-300">
            <span className="text-black cursor-pointer transition-colors">Grid</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">List</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">Feed</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">Full</span>
          </div>
        </div>

        {/* Gallery Grid - Touching images with thin white separation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white border border-white">
          {placeholders.map((num) => (
            <div key={num} className="group relative w-full aspect-square bg-[#e5e5e5] overflow-hidden cursor-pointer">
              {/* Skeleton loading animation */}
              <div className={`w-full h-full animate-pulse ${num % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}></div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
