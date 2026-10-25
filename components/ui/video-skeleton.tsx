import React from 'react';

export interface VideoCardSkeletonProps {
  isTopViewer?: boolean;
  className?: string;
}

/**
 * Single Video Card Skeleton matching the user's reference image exactly:
 * - Soft light pastel pink outer container (#FFF0F4)
 * - Solid sweet pastel pink upper block (#FAA5B9)
 * - Two solid sweet pastel pink horizontal bars at the bottom
 * - Smooth light shimmer sweep
 */
export const VideoCardSkeleton: React.FC<VideoCardSkeletonProps> = ({
  isTopViewer = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#FFF0F4] border border-[#FFD6E0] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs ${className}`}
      aria-label="Loading video..."
    >
      {/* Light Shimmer Sweep */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-20" />

      {/* Main Thumbnail Block (Sweet Pastel Pink) */}
      <div className="w-full flex-1 rounded-xl bg-[#FAA5B9] relative overflow-hidden" />

      {/* Bottom Placeholder Bars (Sweet Pastel Pink) */}
      <div className="w-full pt-2.5 sm:pt-3 pb-0.5 flex flex-col gap-2">
        {/* Line 1 */}
        <div className="w-[85%] h-2.5 sm:h-3 rounded-full bg-[#FAA5B9]" />
        {/* Line 2 */}
        <div className="w-[50%] h-2.5 sm:h-3 rounded-full bg-[#FAA5B9]" />
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
  count = 8,
  isTopViewer = false,
  className = 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6',
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
 * - 2 top header bars in pastel pink
 * - 4-column grid of sweet pink video cards
 */
export const ProjectsPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 relative overflow-hidden">
      <div className="w-full px-6 md:px-16 z-10 relative">
        {/* Top Header Placeholder Bars */}
        <div className="mb-10 flex flex-col gap-2.5">
          <div className="w-3/4 max-w-md h-7 rounded-md bg-[#FFD6E0] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
          </div>
          <div className="w-1/3 max-w-xs h-5 rounded-md bg-[#FFD6E0] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 4 columns x 2 rows of pink cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <VideoCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
