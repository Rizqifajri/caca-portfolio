'use client';

import React from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useSmoothScroll();

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};
