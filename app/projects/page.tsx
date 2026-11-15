'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { projectsData } from '@/app/libs/data.projects';
import { VideoCard } from '@/components/ui/video-card';

interface BrandItem {
  id: string;
  name: string;
  count: number;
  urls: string[];
}

export default function ProjectsPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Extract all categories/brands dynamically
  const brandsList: BrandItem[] = useMemo(() => {
    const list: BrandItem[] = [];

    // Cretivox
    if (projectsData.cretivox) {
      const urls = [
        ...(projectsData.cretivox.igAssets || []),
        ...(projectsData.cretivox.tiktokAssets || []),
      ];
      list.push({
        id: 'cretivox',
        name: 'Cretivox',
        count: urls.length,
        urls,
      });
    }

    // Brands
    if (projectsData.brands) {
      const b = projectsData.brands as Record<string, any>;
      Object.keys(b).forEach((key) => {
        if (key === 'inaco') {
          Object.keys(b.inaco).forEach((inacoKey) => {
            const urls = b.inaco[inacoKey] || [];
            list.push({
              id: inacoKey,
              name: inacoKey.charAt(0).toUpperCase() + inacoKey.slice(1).replace(/([A-Z])/g, ' $1').trim(),
              count: urls.length,
              urls,
            });
          });
        } else {
          const urls = b[key] || [];
          list.push({
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
            count: urls.length,
            urls,
          });
        }
      });
    }

    // ImCoco
    if (projectsData.imCoco && projectsData.imCoco.length > 0) {
      list.push({
        id: 'imCoco',
        name: 'ImCoco',
        count: projectsData.imCoco.length,
        urls: projectsData.imCoco,
      });
    }

    // Other Projects
    if (projectsData.otherProjects && projectsData.otherProjects.length > 0) {
      list.push({
        id: 'otherProjects',
        name: 'Other Projects',
        count: projectsData.otherProjects.length,
        urls: projectsData.otherProjects,
      });
    }

    return list;
  }, []);

  // Total videos
  const totalWorksCount = useMemo(() => {
    return brandsList.reduce((acc, item) => acc + item.count, 0);
  }, [brandsList]);

  // Filtered list of categories/videos to display
  const activeItems = useMemo(() => {
    if (selectedBrand === 'all') {
      return brandsList;
    }
    return brandsList.filter((b) => b.id === selectedBrand);
  }, [selectedBrand, brandsList]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 md:pt-14 pb-16 md:pb-24 px-4 md:px-8 relative overflow-hidden text-gray-900 font-sans">
      <div className="max-w-[1600px] mx-auto z-10 relative">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-8 md:mb-14 group font-medium text-sm"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 md:gap-12">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium font-cursive italic tracking-tight text-[#a82525] leading-none">
            Projects<span className="text-2xl md:text-4xl align-top">º</span>
          </h1>
          <div className="flex justify-between w-full md:w-auto md:flex-1 md:ml-16 lg:ml-32">
            <div className="max-w-xs text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
              <p>
                Projects is a curated collection dedicated to video editing and visual storytelling that delivers real outcomes, meaningful, measurable, and human.
              </p>
            </div>
            <div className="hidden lg:flex gap-4 text-xs font-medium text-gray-500 items-end">
              <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
              <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-black transition-colors">X</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Selected Works + Clean Minimal Brand Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-12 gap-6">
          <h2 className="text-2xl md:text-3xl font-medium text-[#222]">
            Selected Works
            <span className="text-xs font-normal text-gray-500 align-super ml-1">
              ({selectedBrand === 'all' ? totalWorksCount : brandsList.find(b => b.id === selectedBrand)?.count || 0})
            </span>
          </h2>

          {/* Simple Minimalist Brand Selector (Hijau Forest Green khas Calu) */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg md:text-xl font-medium text-[#014421]/35">
            <span
              onClick={() => setSelectedBrand('all')}
              className={`cursor-pointer transition-colors ${
                selectedBrand === 'all'
                  ? 'text-[#014421] font-semibold underline underline-offset-8 decoration-2 decoration-[#014421]'
                  : 'hover:text-[#014421]'
              }`}
            >
              All
            </span>
            {brandsList.map((brand) => (
              <span
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`cursor-pointer transition-colors ${
                  selectedBrand === brand.id
                    ? 'text-[#014421] font-semibold underline underline-offset-8 decoration-2 decoration-[#014421]'
                    : 'hover:text-[#014421]'
                }`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        {/* Simple Clean Grid */}
        <div className="flex flex-col gap-16">
          {activeItems.map((brand) => {
            if (!brand.urls || brand.urls.length === 0) return null;

            return (
              <div key={brand.id}>
                {/* Brand Title (jika sedang menampilkan All) */}
                {selectedBrand === 'all' && (
                  <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-3">
                    <h3 className="text-[#008000] text-3xl md:text-4xl font-cursive italic tracking-wide">
                      {brand.name}
                    </h3>
                    <Link
                      href={`/projects/${brand.id}`}
                      className="text-[#a82525] hover:underline font-medium text-sm flex items-center"
                    >
                      See All ({brand.urls.length})
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* Minimal Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {(selectedBrand === 'all' ? brand.urls.slice(0, 10) : brand.urls).map((url, idx) => (
                    <VideoCard
                      key={idx}
                      url={url}
                      title={`${brand.name} Video ${idx + 1}`}
                      className="w-full aspect-[9/16]"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
