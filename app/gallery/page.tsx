import React from 'react';
import Link from 'next/link';

export default function GalleryPage() {
  // Generate an array of placeholders for the gallery (e.g., 24 images)
  const placeholders = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <img src="/icons/sun-flower.svg" className="absolute top-[5%] left-[5%] w-24 h-24 object-contain opacity-50 z-0 pointer-events-none" alt="decoration" />
      <img src="/icons/red-flower.svg" className="absolute bottom-[10%] right-[8%] w-20 h-20 object-contain opacity-50 z-0 pointer-events-none" alt="decoration" />
      <div className="hidden md:block absolute top-[15%] right-[10%] z-0 pointer-events-none opacity-20">
         <img src="/icons/camera-pocket.svg" className="w-[200px] h-[200px] object-contain transform rotate-12" alt="camera decoration" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <Link href="/" className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-12 group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h1 className="text-[#a82525] text-5xl md:text-7xl font-cursive italic tracking-wide pb-2">
              Photo Gallery
            </h1>
            <div className="absolute bottom-0 left-0 w-full border-b-[2px] border-dashed border-[#a82525]/50"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">A collection of my finest visual works and photography.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {placeholders.map((num) => (
            <div key={num} className="group relative w-full aspect-square bg-[#d9d9d9] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#008000]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
