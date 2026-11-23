'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryCategory {
  id: string;
  name: string;
  images: string[];
}

interface GalleryClientProps {
  categories: GalleryCategory[];
}

export const GalleryClient: React.FC<GalleryClientProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; category: string } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Page entrance fade-in animation
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-enter',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Category/section switch fade-in animation
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-section',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
      gsap.fromTo(
        '.gallery-photo-card',
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: { amount: 0.35, from: 'start' },
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }, gridContainerRef);
    return () => ctx.revert();
  }, [selectedCategory]);

  const totalCount = useMemo(
    () => categories.reduce((acc, cat) => acc + cat.images.length, 0),
    [categories]
  );

  const activeCategories = useMemo(() => {
    if (selectedCategory === 'all') return categories;
    return categories.filter((c) => c.id === selectedCategory);
  }, [selectedCategory, categories]);

  const activeCount = useMemo(() => {
    if (selectedCategory === 'all') return totalCount;
    return categories.find((c) => c.id === selectedCategory)?.images.length || 0;
  }, [selectedCategory, categories, totalCount]);

  // Flatten visible images for lightbox next/prev navigation
  const flatVisibleImages = useMemo(
    () =>
      activeCategories.flatMap((cat) =>
        cat.images.map((src) => ({ src, category: cat.name }))
      ),
    [activeCategories]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === 'Escape') {
        setLightboxImage(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = flatVisibleImages.findIndex((img) => img.src === lightboxImage.src);
        if (idx === -1) return;
        const nextIdx =
          e.key === 'ArrowRight'
            ? (idx + 1) % flatVisibleImages.length
            : (idx - 1 + flatVisibleImages.length) % flatVisibleImages.length;
        setLightboxImage(flatVisibleImages[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, flatVisibleImages]);

  const navigateLightbox = (dir: 1 | -1) => {
    if (!lightboxImage) return;
    const idx = flatVisibleImages.findIndex((img) => img.src === lightboxImage.src);
    if (idx === -1) return;
    const nextIdx = (idx + dir + flatVisibleImages.length) % flatVisibleImages.length;
    setLightboxImage(flatVisibleImages[nextIdx]);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F6] pt-8 md:pt-14 pb-16 md:pb-24 px-4 md:px-8 relative overflow-hidden text-gray-900 font-sans">
      <div className="max-w-[1600px] mx-auto z-10 relative">
        {/* Navigation */}
        <Link
          href="/"
          className="gallery-enter inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-8 md:mb-14 group font-medium text-sm"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Top Section */}
        <div className="gallery-enter flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 md:gap-12">
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
              <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
              <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-black transition-colors">X</span>
            </div>
          </div>
        </div>

        {/* Middle Section (Title & Category Filters) */}
        <div className="gallery-enter flex flex-col md:flex-row justify-between items-start md:items-baseline mb-12 gap-6">
          <h2 className="text-2xl md:text-3xl font-medium text-[#222]">
            Selected Works
            <span className="text-xs font-normal text-gray-500 align-super ml-1">
              ({activeCount})
            </span>
          </h2>

          {/* Forest Green Category Filter */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg md:text-xl font-medium text-[#014421]/35">
            <span
              onClick={() => setSelectedCategory('all')}
              className={`cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'text-[#014421] font-semibold underline underline-offset-8 decoration-2 decoration-[#014421]'
                  : 'hover:text-[#014421]'
              }`}
            >
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'text-[#014421] font-semibold underline underline-offset-8 decoration-2 decoration-[#014421]'
                    : 'hover:text-[#014421]'
                }`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Categorized Photo Grids */}
        <div ref={gridContainerRef} className="flex flex-col gap-16">
          {activeCategories.map((category) => {
            if (!category.images || category.images.length === 0) return null;

            return (
              <section key={category.id} className="gallery-section">
                {/* Category Heading */}
                <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-3">
                  <h3 className="text-[#008000] text-3xl md:text-4xl font-cursive italic tracking-wide">
                    {category.name}
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    {category.images.length} Photos
                  </span>
                </div>

                {/* Touching Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-white border border-white">
                  {category.images.map((src, idx) => (
                    <div
                      key={src}
                      onClick={() => setLightboxImage({ src, category: category.name })}
                      className="gallery-photo-card group relative w-full aspect-square bg-[#e5e5e5] overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`${category.name} photography ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Subtle Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close preview"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.category}
              className="max-w-full max-h-[85vh] object-contain select-none"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 md:right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
