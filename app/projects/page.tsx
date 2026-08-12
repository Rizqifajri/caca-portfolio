import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/app/libs/data.projects';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';

export default function ProjectsPage() {
  // Extract all categories/brands dynamically
  const categories = [];

  // Cretivox
  if (projectsData.cretivox) {
    categories.push({
      title: 'Cretivox',
      slug: 'cretivox',
      urls: [
        ...(projectsData.cretivox.igAssets || []),
        ...(projectsData.cretivox.tiktokAssets || [])
      ]
    });
  }

  // Brands
  if (projectsData.brands) {
    Object.keys(projectsData.brands).forEach(key => {
      if (key === 'inaco') {
        Object.keys(projectsData.brands.inaco).forEach(inacoKey => {
          categories.push({
            title: inacoKey.charAt(0).toUpperCase() + inacoKey.slice(1).replace(/([A-Z])/g, ' $1').trim(),
            slug: inacoKey,
            urls: projectsData.brands.inaco[inacoKey as keyof typeof projectsData.brands.inaco]
          });
        });
      } else {
        categories.push({
          title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
          slug: key,
          urls: projectsData.brands[key as keyof typeof projectsData.brands]
        });
      }
    });
  }

  // imCoco
  if (projectsData.imCoco) {
    categories.push({
      title: 'ImCoco',
      slug: 'imCoco',
      urls: projectsData.imCoco
    });
  }

  // otherProjects
  if (projectsData.otherProjects) {
    categories.push({
      title: 'Other Projects',
      slug: 'otherProjects',
      urls: projectsData.otherProjects
    });
  }

  const getTag = (url: string) => url.includes('instagram.com') ? 'INSTAGRAM' : (url.includes('tiktok.com') ? 'TIKTOK' : 'VIDEO');

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 px-6 relative overflow-hidden">
      {/* Decorative Icons */}
      <img src="/icons/sun-flower.svg" className="absolute top-[5%] left-[5%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/red-flower.svg" className="absolute bottom-[10%] right-[8%] w-20 h-20 object-contain opacity-50 z-0" alt="decoration" />

      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="text-center mb-20">
          <h1 className="text-[#a82525] text-5xl md:text-7xl font-cursive italic tracking-wide">
            All Projects
          </h1>
          <p className="mt-4 text-gray-600 font-medium">Explore all my video editing projects by brand.</p>
        </div>

        {categories.map((category, index) => {
          if (!category.urls || category.urls.length === 0) return null;
          
          return (
            <div key={index} className="mb-24 last:mb-0">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-dashed border-[#008000]/30 pb-4">
                <h2 className="text-[#008000] text-4xl font-cursive italic tracking-wide">
                  {category.title}
                </h2>
                <Link href={`/projects/${category.slug}`} className="text-[#a82525] hover:underline font-medium text-sm md:text-base transition-colors flex items-center mt-4 md:mt-0">
                  See All ({category.urls.length})
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Grid */}
              <div className={`grid grid-cols-2 gap-4 md:gap-8 ${category.slug === 'cretivox' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
                {category.urls.slice(0, category.slug === 'cretivox' ? 10 : 4).map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[9/16] bg-gray-300 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
                    <VideoThumbnail url={url} />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                      <div className="bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] md:text-xs rounded uppercase font-bold tracking-wider inline-block mb-2 text-white/90">
                        {getTag(url)}
                      </div>
                      <h4 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
                        {category.title} Video {idx + 1}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
