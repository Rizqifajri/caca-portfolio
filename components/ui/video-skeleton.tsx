import React from 'react';

export interface VideoCardSkeletonProps {
  isTopViewer?: boolean;
  className?: string;
}

/**
 * Single Video Card Skeleton with pink - merah - maroon aesthetic.
 */
export const VideoCardSkeleton: React.FC<VideoCardSkeletonProps> = ({
  isTopViewer = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-b from-[#4A101D] via-[#350A14] to-[#22060D] shadow-xl ${
        isTopViewer
          ? 'border-2 border-[#C80000]/70 ring-1 ring-pink-500/20'
          : 'border border-[#8B1E3F]/30'
      } ${className}`}
      aria-label="Loading video..."
    >
      {/* Pink-Maroon Shimmer Sweep */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-pink-400/20 to-transparent pointer-events-none z-20" />

      {/* Top Views Badge Skeleton (if top viral) */}
      {isTopViewer && (
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
          <div className="h-5 md:h-6 w-20 md:w-24 rounded-full bg-[#801826]/80 border border-pink-400/30 animate-pulse" />
        </div>
      )}

      {/* Center Play Button Skeleton (Pink-maroon glassmorphic circular plate) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-pink-950/60 border border-pink-300/30 backdrop-blur-xs flex items-center justify-center animate-pulse shadow-md">
          <div className="w-0 h-0 ml-1 border-y-[6px] md:border-y-[8px] border-y-transparent border-l-[10px] md:border-l-[14px] border-l-pink-300/70" />
        </div>
      </div>

      {/* Bottom Information Skeleton */}
      <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full z-10 flex flex-col gap-2">
        {/* Platform tag placeholder (e.g. INSTAGRAM / TIKTOK) */}
        <div className="w-16 md:w-20 h-4 md:h-5 rounded bg-[#731728]/80 border border-pink-400/20 animate-pulse" />

        {/* Video title line 1 placeholder */}
        <div className="w-3/4 h-3.5 md:h-4 rounded bg-pink-100/30 animate-pulse" />

        {/* Video title line 2 placeholder */}
        <div className="w-1/2 h-3 md:h-3.5 rounded bg-pink-100/20 animate-pulse" />
      </div>
    </div>
  );
};

export interface VideoSkeletonGridProps {
  count?: number;
  isTopViewer?: boolean;
  className?: string;
}

export const VideoSkeletonGrid: React.FC<VideoSkeletonGridProps> = ({
  count = 6,
  isTopViewer = false,
  className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5',
}) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} isTopViewer={isTopViewer} />
      ))}
    </div>
  );
};
/**
 * Full page skeleton matching the user's reference:
 * - Top breadcrumb pill
 * - Big header / banner block with subtle pink tone
 * - Right action button skeleton
 * - Dashed divider
 * - Section header (icon pill + title)
 * - Row/Grid of 6 vertical cards in pink-merah-maroon
 */
export const ProjectsPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 relative overflow-hidden">
      {/* Decorative background placeholders */}
      <div className="absolute top-[5%] left-[5%] w-24 h-24 rounded-full bg-pink-100/40 blur-2xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[8%] w-32 h-32 rounded-full bg-rose-100/40 blur-2xl pointer-events-none" />

      <div className="w-full px-6 md:px-16 z-10 relative">
        {/* Top small breadcrumb bar */}
        <div className="w-24 md:w-32 h-4 rounded-full bg-[#EFD3E1] animate-pulse mb-6" />

        {/* Header Block & Action Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          {/* Large title/banner block */}
          <div className="w-full md:w-2/3 max-w-xl h-24 md:h-32 rounded-2xl bg-gradient-to-r from-[#EFD3E1]/70 via-[#f8dbe7]/60 to-[#EFD3E1]/40 border border-pink-200/60 relative overflow-hidden shadow-xs">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          </div>

          {/* Action button skeleton on right */}
          <div className="w-28 md:w-36 h-10 rounded-full bg-rose-100/80 border border-pink-300/40 relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Dashed divider */}
        <div className="w-full border-b-2 border-dashed border-[#a82525]/20 mb-8" />

        {/* Section header: pill + title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-3 rounded-full bg-[#a82525]/30 animate-pulse" />
          <div className="w-36 md:w-48 h-5 rounded-md bg-[#EFD3E1] animate-pulse" />
        </div>

        {/* 6 Cards Grid (like in the user screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <VideoCardSkeleton key={idx} isTopViewer={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};
