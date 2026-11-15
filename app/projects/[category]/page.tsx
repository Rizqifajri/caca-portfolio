import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/app/libs/data.projects';
import { VideoCard } from '@/components/ui/video-card';

const getTag = (url: string) => url.includes('instagram.com') ? 'INSTAGRAM' : (url.includes('tiktok.com') ? 'TIKTOK' : 'VIDEO');

export default async function ProjectDetail({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  let title = '';
  let urls: string[] = [];
  let topViewers: { url: string; views: string }[] = [];

  // Dynamic matching based on slug
  if (category === 'cretivox') {
    title = 'Cretivox';
    urls = [
      ...(projectsData.cretivox.igAssets || []),
      ...(projectsData.cretivox.tiktokAssets || []),
    ];
    topViewers = [
      ...(projectsData.cretivox.igTopViewers || []),
      ...(projectsData.cretivox.tiktokTopViewers || []),
    ];
  } else if (category === 'imCoco') {
    title = 'ImCoco';
    urls = projectsData.imCoco || [];
  } else if (category === 'otherProjects') {
    title = 'Other Projects';
    urls = projectsData.otherProjects || [];
  } else if (projectsData.brands) {
    const brands = projectsData.brands as Record<string, any>;
    // Check in brands
    if (brands[category] && Array.isArray(brands[category])) {
      title = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
      urls = brands[category];
    } else if (brands.inaco && brands.inaco[category] && Array.isArray(brands.inaco[category])) {
      // Check inside inaco specifically
      title = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
      urls = brands.inaco[category];
    }
  }

  if (urls.length === 0 && topViewers.length === 0) {
    notFound();
  }

  const totalVideos = urls.length + topViewers.length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24 px-4 md:px-8 relative overflow-hidden text-gray-900 font-sans">
      <div className="max-w-[1600px] mx-auto z-10 relative">
        {/* Navigation */}
        <Link href="/projects" className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-16 md:mb-32 group font-medium text-sm">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Projects
        </Link>

        {/* Top Section (Same layout as Gallery) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-12">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium font-cursive italic tracking-tight text-[#a82525] leading-none capitalize">
            {title}<span className="text-2xl md:text-4xl align-top">º</span>
          </h1>
          <div className="flex justify-between w-full md:w-auto md:flex-1 md:ml-16 lg:ml-32">
            <div className="max-w-xs text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
              <p>
                A curated collection of video editing projects for {title}, crafted to deliver real outcomes, meaningful, measurable, and human.
              </p>
            </div>
            <div className="hidden lg:flex gap-4 text-xs font-medium text-gray-500 items-end">
              <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
              <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-black transition-colors">X</span>
            </div>
          </div>
        </div>

        {/* Middle Section (Title & Filters) */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-[#222]">
            Selected Works<span className="text-xs font-normal text-gray-500 align-super ml-1">({totalVideos})</span>
          </h2>
          <div className="flex gap-8 mt-6 md:mt-0 text-xl md:text-2xl font-medium text-gray-300">
            <span className="text-black cursor-pointer transition-colors">Grid</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">List</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">Feed</span>
            <span className="cursor-pointer hover:text-gray-700 transition-colors">Full</span>
          </div>
        </div>

        {/* Top Viewers Section */}
        {topViewers.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-start mb-8">
              <div className="inline-block relative">
                <h2 className="text-[#a82525] text-3xl md:text-4xl font-cursive italic tracking-wide pb-1">
                  Top Viewers
                </h2>
                <div className="absolute bottom-0 left-0 w-full border-b-[2px] border-dashed border-[#008000]/40"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {topViewers.map((item, index) => (
                <VideoCard
                  key={`top-${index}`}
                  url={item.url}
                  views={item.views}
                  title="Top Viral Video"
                  isTopViewer
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Videos Grid */}
        {urls.length > 0 && (
          <div>
            {topViewers.length > 0 && (
              <div className="flex justify-start mb-8">
                <div className="inline-block relative">
                  <h2 className="text-[#a82525] text-3xl md:text-4xl font-cursive italic tracking-wide pb-1">
                    All Projects
                  </h2>
                  <div className="absolute bottom-0 left-0 w-full border-b-[2px] border-dashed border-[#008000]/40"></div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {urls.map((url, index) => (
                <VideoCard
                  key={index}
                  url={url}
                  title={`${title} Video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
