import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/app/libs/data.projects';
import { VideoCard } from '@/components/ui/video-card';

export default function ProjectsPage() {
  // Extract all categories/brands dynamically
  const categories = [];

  // Lanu Indonesia
  if (projectsData.lanu) {
    categories.push({
      title: 'Lanu Indonesia',
      slug: 'lanu',
      urls: [
        ...(projectsData.lanu.instagram || []),
        ...(projectsData.lanu.tiktok || []),
        ...(projectsData.lanu.edukasi || []),
        ...(projectsData.lanu.motivation || []),
      ]
    });
  }

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
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24 px-6 md:px-16 relative overflow-hidden text-gray-900 font-sans">
      <div className="w-full z-10 relative">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-[#008000] hover:text-[#005a00] transition-colors mb-16 md:mb-32 group font-medium text-sm">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Top Section (Same layout as Gallery & Detail Project) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-36 gap-12">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium font-cursive italic tracking-tight text-[#a82525] leading-none">
            All Projects<span className="text-2xl md:text-4xl align-top">º</span>
          </h1>
          <div className="flex justify-between w-full md:w-auto md:flex-1 md:ml-16 lg:ml-32">
            <div className="max-w-xs text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
              <p>
                Projects is a curated collection dedicated to video editing and visual storytelling by brand, crafted to deliver real outcomes, meaningful, measurable, and human.
              </p>
            </div>
            <div className="hidden lg:flex gap-4 text-xs font-medium text-gray-500 items-end">
              <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
              <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-black transition-colors">X</span>
            </div>
          </div>
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
