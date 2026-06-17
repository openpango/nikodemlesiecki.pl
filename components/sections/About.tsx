'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { useLanguage } from '@/lib/i18n/context';
import { getTranslation, TranslationKey } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

import { BilingualStringOptional } from '@/lib/sanity/types';

interface AboutProps {
  bio?: BilingualStringOptional | null;
}

/* -------------------------------------------------------------------------- */
/*                                 Fallbacks                                  */
/* -------------------------------------------------------------------------- */

const defaultBio = {
  en: `My name is Nikodem, but everyone calls me Nico. I'm 22, from Poland, and I've gone from designing pixels to building AI agents — and I'm not slowing down. What sets me apart is my creativity, hard work, and adaptability. I love solving complex problems, especially the ones that seem impossible at first. I bring fresh energy and creative-logical thinking to any team. Outside of work I travel whenever I can (Czech Republic, England, Spain, Portugal so far — the list is growing) and I'm currently obsessed with squash.`,
  pl: `Nazywam się Nikodem, ale wszyscy mówią na mnie Nico. Mam 22 lata, jestem z Polski i przeszedłem od projektowania pikseli do budowania agentów AI — i nie zamierzam zwalniać. Wyróżnia mnie kreatywność, ciężka praca i zdolność adaptacji. Uwielbiam rozwiązywać złożone problemy, zwłaszcza te, które na pierwszy rzut oka wydają się niemożliwe. Wnoszę świeżą energię i kreatywno-logiczne myślenie do każdego zespołu. Poza pracą podróżuję, kiedy tylko mogę (Czechy, Anglia, Hiszpania, Portugalia — lista rośnie) i aktualnie mam obsesję na punkcie squasha.`,
};

/* -------------------------------------------------------------------------- */
/*                                   Stats                                    */
/* -------------------------------------------------------------------------- */

interface Stat {
  value: string;
  labelKey: TranslationKey;
}

const stats: Stat[] = [
  { value: '22', labelKey: 'about_stat_age' },
  { value: '3+', labelKey: 'about_stat_years' },
  { value: '4', labelKey: 'about_stat_countries' },
  { value: '2', labelKey: 'about_stat_languages' },
];

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const About: React.FC<AboutProps> = ({ bio }) => {
  const { lang } = useLanguage();
  const t = (key: TranslationKey) => getTranslation(lang, key);
  const sectionRef = useRef<HTMLElement>(null);

  const bioText = bio?.[lang] ?? bio?.en ?? defaultBio[lang];

  /* ── GSAP scroll-triggered fade-in ── */
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const children = gsap.utils.toArray<HTMLElement>(
        '[data-about-animate]',
        sectionRef.current!,
      );

      gsap.set(children, { opacity: 0, y: 32 });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden bg-navy-base"
      aria-label={t('about_label')}
    >
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          02 — ABOUT
        </div>

        <div className="ml-0 lg:ml-12 flex flex-col gap-12">
          {/* ── Heading (Full Width) ── */}
          <div data-about-animate>
            <SectionHeading
              title={t('about_title')}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* ── Left column (Typography) ── */}
            <div className="lg:col-span-8 space-y-8 pr-0 lg:pr-8">
              <p
                data-about-animate
                className="text-lg lg:text-xl text-text-muted leading-relaxed max-w-2xl font-sans"
              >
                {bioText}
              </p>
            </div>

          {/* ── Right column (Stats grid) ── */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-12 lg:pl-12 lg:border-l lg:border-border-default">
            {stats.map(({ value, labelKey }) => (
              <div
                key={labelKey}
                data-about-animate
                className="flex flex-col items-start gap-2 text-left"
              >
                <span className="font-heading text-4xl lg:text-5xl text-red-primary uppercase tracking-tighter">
                  {value}
                </span>
                <span className="text-[0.65rem] text-text-primary uppercase tracking-[0.2em] font-bold">
                  {t(labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

About.displayName = 'About';

export default About;
