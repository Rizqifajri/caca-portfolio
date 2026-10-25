import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/app/libs/data.projects';
import { VideoCard } from '@/components/ui/video-card';

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
    <div className="min-h-screen bg-[#FAF9F6] py-24 relative overflow-hidden">
      {/* Decorative Icons */}
      <img src="/icons/sun-flower.svg" className="absolute top-[5%] left-[5%] w-24 h-24 object-contain opacity-50 z-0" alt="decoration" />
      <img src="/icons/red-flower.svg" className="absolute bottom-[10%] right-[8%] w-20 h-20 object-contain opacity-50 z-0" alt="decoration" />

      <div className="w-full px-6 md:px-16 z-10 relative">
        <div className="text-left mb-20">
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-dashed border-[#008000]/30 pb-4">
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
                  <VideoCard
                    key={idx}
                    url={url}
                    title={`${category.title} Video ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
