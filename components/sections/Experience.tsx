'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import type { Experience as ExperienceType } from '@/lib/sanity/types';

const educationEntry: ExperienceType = {
  _id: 'fallback-edu',
  title: 'IT Technician',
  company: 'TEB Edukacja Technical School',
  period: '09.2020 – 06.2023',
  location: 'Kalisz',
  type: 'full-time',
  responsibilities: {
    en: [
      'IT Technician profile',
      'Passed State Vocational Examination',
      'INF.02 qualification (System Administration and Web Technologies)',
    ],
    pl: [
      'Profil: Technik Informatyk',
      'Zdany Egzamin Zawodowy',
      'Kwalifikacja INF.02 (Administracja Systemów i Technologii Webowych)',
    ],
  },
  order: 999,
};

const fallbackExperience: ExperienceType[] = [
  {
    _id: 'fallback-1',
    title: 'Freelance / Personal Projects (AI & Web)',
    company: undefined,
    period: '07.2023 – Present',
    location: 'Remote',
    type: 'freelance',
    responsibilities: {
      en: [
        'Web Development (HTML/CSS/Figma): Designed and coded a custom responsive portfolio website (nikodemlesiecki.pl) from scratch in Figma.',
        'AI & Prompt Engineering: Created advanced scripts and prompts for LLMs (ChatGPT, Claude), automating generation and analysis of large data blocks.',
        'Agentic Workflows: Designed and implemented multi-stage business automations integrating various tools via API using autonomous AI agents.',
      ],
      pl: [
        'Web Development (HTML/CSS/Figma): Zaprojektował i zakodował responsywną stronę portfolio (nikodemlesiecki.pl) od zera w Figma.',
        'AI & Prompt Engineering: Tworzył zaawansowane skrypty i prompty dla LLM (ChatGPT, Claude), automatyzując generowanie i analizę dużych bloków danych.',
        'Agentic Workflows: Zaprojektował i wdrożył wieloetapowe automatyzacje biznesowe integrujące różne narzędzia przez API z wykorzystaniem autonomicznych agentów AI.',
      ],
    },
    order: 1,
  },
  {
    _id: 'fallback-2',
    title: 'Intern / IT & Web Support',
    company: 'Hubert Krauze',
    period: '09.2020 – 06.2023',
    location: 'Kalisz / Wrocław',
    type: 'intern',
    responsibilities: {
      en: [
        'AD and M365 Administration: Managed identities, permissions, and user accounts in Active Directory and Microsoft 365.',
        'IT Support (Hardware / LAN Networks): Resolved hardware and system issues on Windows workstations; configured network and peripheral devices.',
        'Web & UI (HTML/CSS/Figma): Maintained website, designed new UI elements, implemented RWD fixes.',
      ],
      pl: [
        'Administracja AD i M365: Zarządzanie tożsamościami, uprawnieniami i kontami użytkowników w Active Directory i Microsoft 365.',
        'Wsparcie IT (Hardware / Sieci LAN): Rozwiązywanie problemów sprzętowych i systemowych na stacjach Windows; konfiguracja urządzeń sieciowych i peryferyjnych.',
        'Web & UI (HTML/CSS/Figma): Utrzymanie strony internetowej, projektowanie nowych elementów UI, wdrażanie poprawek RWD.',
      ],
    },
    order: 2,
  },
  educationEntry,
];

interface ExperienceProps {
  experience?: ExperienceType[] | null;
}

export default function Experience({ experience }: ExperienceProps) {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const data = experience && experience.length > 0 ? experience : fallbackExperience;
  const sortedData = [...data].sort((a, b) => a.order - b.order);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.from('.experience-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden bg-navy-base" ref={containerRef}>
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          05 — EXPERIENCE
        </div>

        <div className="ml-0 lg:ml-12">
          <SectionHeading
            title={getTranslation(lang, 'experience_title')}
          />

          <div className="mt-12 lg:mt-16 relative">
            {/* Vertical line connector */}
            <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-border-default ml-6 md:ml-0 -translate-x-1/2" />

          <div className="space-y-12">
            {sortedData.map((item, index) => {
              const isPresent = item.period.toLowerCase().includes('present') || item.period.toLowerCase().includes('obecnie');
              const responsibilities = item.responsibilities?.[lang] || item.responsibilities?.en || [];

              return (
                <div key={index} className="experience-item relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/4 w-3 h-3 rounded-full bg-navy-surface border-2 border-red-primary -translate-x-[7px] mt-8 md:mt-6 z-10" />

                  {/* Left side: Period label */}
                  <div className="md:w-1/4 flex-shrink-0 pt-6 pl-16 md:pl-0 md:pr-12 md:text-right">
                    <div className="inline-flex flex-col items-start md:items-end gap-2">
                      <span className="font-heading text-lg md:text-xl font-bold text-text-primary">
                        {item.period.replace('Present', getTranslation(lang, 'experience_present'))}
                      </span>
                      {isPresent && (
                        <Badge variant="default" className="text-yellow-highlight border-yellow-highlight/30 bg-yellow-highlight/10">
                          {getTranslation(lang, 'experience_present')}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Right side: Role card */}
                  <div className="md:w-3/4 pl-16 md:pl-0">
                    <Card variant="compact" className="w-full">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            {item.company ? (
                              <h3 className="font-heading text-card-title text-text-primary mb-1">
                                {item.company}
                              </h3>
                            ) : (
                              <h3 className="font-heading text-card-title text-text-primary mb-1">
                                {lang === 'en' ? 'Freelance' : 'Freelance'}
                              </h3>
                            )}
                            <p className="text-text-muted font-medium">
                              {item.title}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="tech">{item.location}</Badge>
                            <Badge variant="default" className="capitalize">
                              {item.type}
                            </Badge>
                          </div>
                        </div>

                        {responsibilities.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border-default">
                            <ul className="space-y-2">
                              {responsibilities.map((resp, i) => (
                                <li key={i} className="text-sm text-text-muted flex gap-3">
                                  <span className="text-red-primary mt-1 flex-shrink-0">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Card>
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
