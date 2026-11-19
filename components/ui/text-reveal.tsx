'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.06,
  mode = 'words',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll('.reveal-unit');
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          yPercent: 115,
          opacity: 0,
          rotateZ: 2.5,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger]);

  const renderContent = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      const units = mode === 'chars' ? node.split('') : node.split(/(\s+)/);
      return units.map((unit, index) => {
        if (/^\s+$/.test(unit)) {
          return <React.Fragment key={index}>{unit}</React.Fragment>;
        }
        return (
          <span
            key={index}
            className="inline-block overflow-hidden align-bottom py-2 -my-2 px-1 -mx-1"
          >
            <span className="reveal-unit inline-block will-change-transform">
              {unit}
            </span>
          </span>
        );
      });
    }

    if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(node)) {
      return (
        <span className="inline-block overflow-hidden align-bottom py-2 -my-2 px-1 -mx-1">
          <span className={`reveal-unit inline-block will-change-transform ${node.props.className || ''}`}>
            {node.props.children}
          </span>
        </span>
      );
    }

    return node;
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {React.Children.map(children, renderContent)}
    </span>
  );
};
