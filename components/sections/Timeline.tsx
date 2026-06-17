'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  IconSchool,
  IconPalette,
  IconLayout,
  IconRocket,
  IconRobot,
  IconDatabase,
} from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { year: '2020', titleEn: 'IT Technician Student + Intern', titlePl: 'Uczeń Technikum IT + Stażysta', icon: IconSchool },
  { year: '2021', titleEn: 'Graphic Designer', titlePl: 'Grafik', icon: IconPalette },
  { year: '2022', titleEn: 'Web Designer', titlePl: 'Web Designer', icon: IconLayout },
  { year: '2023', titleEn: 'Frontend Dev → AI Engineer', titlePl: 'Frontend Dev → Inżynier AI', icon: IconRocket },
  { year: '2024', titleEn: 'Vibe Coder / AI Agent Builder', titlePl: 'Vibe Coder / Budowniczy Agentów AI', icon: IconRobot },
  { year: '2025', titleEn: 'Learning Backend (no AI)', titlePl: 'Nauka Backendu (bez AI)', icon: IconDatabase },
];

export default function Timeline() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.from('.timeline-node', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.2)',
    });
  }, { scope: containerRef });

  return (
    <section id="timeline" className="relative py-24 md:py-32 overflow-hidden bg-navy-base" ref={containerRef}>
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          04 — TIMELINE
        </div>

        <div className="ml-0 lg:ml-12">
        <SectionHeading
          title={getTranslation(lang, 'timeline_title')}
        />

        <div className="mt-16 md:mt-24 relative max-w-5xl">
          {/* Main timeline axis */}
          <div className="absolute left-[39px] md:left-0 top-0 bottom-0 md:bottom-auto md:top-1/2 w-[2px] md:w-full md:h-px bg-border-default md:-translate-y-1/2" />

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
            {timelineData.map((node, index) => {
              const Icon = node.icon;
              const isCurrent = node.year === '2024' || node.year === '2025';

              return (
                <div key={index} className="timeline-node flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-4 flex-1">
                  
                  {/* Node point with icon */}
                  <div className={`relative flex items-center justify-center w-20 h-20 bg-navy-base border flex-shrink-0 transition-transform hover:scale-105 duration-300 ${isCurrent ? 'border-red-primary' : 'border-border-default'}`}>
                    <Icon size={32} className={isCurrent ? 'text-red-primary' : 'text-text-muted'} stroke={1.5} />
                  </div>

                  {/* Node content */}
                  <div className="flex flex-col md:items-center text-left md:text-center mt-0 md:mt-4">
                    <span className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary mb-1 uppercase tracking-tighter">
                      {node.year}
                    </span>
                    <span className="text-sm font-medium text-text-muted leading-tight max-w-[120px]">
                      {lang === 'en' ? node.titleEn : node.titlePl}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
