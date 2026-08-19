import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/app/libs/data.projects';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';

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

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 relative overflow-hidden">
      {/* Decorative Icons */}
      <img src="/icons/sun-flower.svg" className="absolute top-[5%] left-[5%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/red-flower.svg" className="absolute bottom-[10%] right-[8%] w-20 h-20 object-contain opacity-50 z-0" alt="decoration" />

      <div className="w-full px-6 md:px-16 z-10 relative">
        <Link href="/projects" className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-12 group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Projects
        </Link>

        <div className="text-left mb-16">
          <div className="inline-block relative">
            <h1 className="text-[#a82525] text-5xl md:text-7xl font-cursive italic tracking-wide pb-2 capitalize">
              {title}
            </h1>
            <div className="absolute bottom-0 left-0 w-full border-b-[2px] border-dashed border-[#a82525]/50"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Showing {urls.length + topViewers.length} videos</p>
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
                <a key={`top-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[9/16] bg-[#a82525]/20 rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl border-2 border-[#a82525]">
                 <VideoThumbnail url={item.url} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                 <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
                    <div className="bg-[#a82525] text-white px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      {item.views}
                    </div>
                   </div>

                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>

                   <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                   <div className="bg-[#a82525]/80 backdrop-blur-md px-2 py-1 text-[10px] text-white rounded uppercase font-bold tracking-wider inline-block mb-2">
                     {getTag(item.url)}
                   </div>
                   <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                     Top Viral Video
                   </h4>
                 </div>
                </a>
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
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[9/16] bg-gray-300 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
                   <VideoThumbnail url={url} />
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>

                   <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                     <div className="bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] md:text-xs rounded uppercase font-bold tracking-wider inline-block mb-2 text-white/90">
                       {getTag(url)}
                     </div>
                     <h4 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
                       {title} Video {index + 1}
                     </h4>
                   </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
