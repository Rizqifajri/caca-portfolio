'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/ui/text-reveal';

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      id: 1,
      role: 'Multimedia Designer',
      company: 'Lanu Indonesia',
      period: '2026 - Present',
      description: 'Produced and edited engaging educational, motivational, and promotional short-form videos for Instagram Reels and TikTok, focusing on dynamic pacing and visual storytelling.',
      align: 'right' // Company/Role on the right
    },
    {
      id: 2,
      role: 'Video Editor',
      company: 'Seva',
      period: '2024 - 2026',
      description: 'Spearheaded video editing and post-production for various promotional campaigns, ensuring high-quality visual storytelling and brand consistency.',
      align: 'left' // Company/Role on the left
    },
    {
      id: 3,
      role: 'Video Editor Intern',
      company: 'Cretivox',
      period: '2025',
      description: 'Handled end-to-end video production, focusing on engaging content creation, motion graphics, and dynamic pacing for digital platforms.',
      align: 'right' // Company/Role on the right
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate Dashed Divider Lines
      gsap.utils.toArray<HTMLElement>('.exp-divider').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
            },
          }
        );
      });

      // Animate Each Experience Row (Left & Right halves slide inward)
      gsap.utils.toArray<HTMLElement>('.exp-row').forEach((row) => {
        const leftCol = row.querySelector('.exp-left');
        const rightCol = row.querySelector('.exp-right');

        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { x: -45, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
              },
            }
          );
        }

        if (rightCol) {
          gsap.fromTo(
            rightCol,
            { x: 45, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="w-full">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[#a82525] text-5xl md:text-8xl font-cursive italic tracking-wide">
            <TextReveal mode="chars" stagger={0.035}>Experiences</TextReveal>
          </h2>
        </div>

        <div className="flex flex-col">
          {/* Top dashed line */}
          <div className="exp-divider w-full border-t-[2px] border-dashed border-gray-300"></div>

          {experiences.map((exp) => (
            <React.Fragment key={exp.id}>
              <div className="exp-row group py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full transition-colors duration-300 hover:bg-[#014421]/[0.02] rounded-xl px-2 md:px-4">

                {exp.align === 'right' ? (
                  <>
                    {/* Date and Description on Left */}
                    <div className="exp-left w-full md:w-1/2 flex flex-col justify-center">
                      <p className="text-[#2b5a2b] font-medium mb-3 transition-transform duration-300 group-hover:translate-x-1">{exp.period}</p>
                      <p className="text-[#2b5a2b] leading-relaxed max-w-md text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                    {/* Title on Right */}
                    <div className="exp-right w-full md:w-1/2 flex justify-start md:justify-end items-center">
                      <h3 className="text-4xl md:text-6xl font-cursive italic transition-transform duration-300 group-hover:-translate-x-1">
                        <TextReveal mode="words" stagger={0.08}>
                          <span className="text-[#2b5a2b]">{exp.company}</span>
                          <span className="text-[#2b5a2b] font-sans mx-2 text-3xl">-</span>
                          <span className="text-[#a82525]">{exp.role}</span>
                        </TextReveal>
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Title on Left */}
                    <div className="exp-left w-full md:w-1/2 flex justify-start items-center order-2 md:order-1">
                      <h3 className="text-4xl md:text-6xl font-cursive italic transition-transform duration-300 group-hover:translate-x-1">
                        <TextReveal mode="words" stagger={0.08}>
                          <span className="text-[#2b5a2b]">{exp.company}</span>
                          <span className="text-[#2b5a2b] font-sans mx-2 text-3xl">-</span>
                          <span className="text-[#a82525]">{exp.role}</span>
                        </TextReveal>
                      </h3>
                    </div>
                    {/* Date and Description on Right */}
                    <div className="exp-right w-full md:w-1/2 flex flex-col justify-center order-1 md:order-2 md:pl-12">
                      <p className="text-[#2b5a2b] font-medium mb-3 transition-transform duration-300 group-hover:-translate-x-1">{exp.period}</p>
                      <p className="text-[#2b5a2b] leading-relaxed max-w-md text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                  </>
                )}

              </div>
              {/* Bottom dashed line */}
              <div className="exp-divider w-full border-t-[2px] border-dashed border-gray-300"></div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
