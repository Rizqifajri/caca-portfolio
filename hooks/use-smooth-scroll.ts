'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useSmoothScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Configuration
    const ease = 0.08;
    let target = 0;
    let current = 0;

    // Update body height to match the container
    const setBodyHeight = () => {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    };

    // Initial setup
    setBodyHeight();
    
    // Set fixed positioning for the container wrapper
    gsap.set(container, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      overflow: 'hidden',
    });

    const onScroll = () => {
      target = window.scrollY;
    };

    const update = () => {
      // Smoothly interpolate current scroll position towards the target
      current = gsap.utils.interpolate(current, target, ease);
      // Apply the transform
      gsap.set(container, { y: -current });
    };

    // Listeners
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setBodyHeight);
    
    // Add update function to GSAP ticker for 60fps smoothing
    gsap.ticker.add(update);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setBodyHeight);
      gsap.ticker.remove(update);
      document.body.style.height = '';
      gsap.set(container, { clearProps: 'all' });
    };
  }, []);

  return scrollContainerRef;
};
