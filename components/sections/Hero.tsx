'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import {
  IconArrowRight,
  IconBrandGithub,
  IconMail,
  IconBrandInstagram,
  IconBrandX,
} from '@tabler/icons-react';

import { useLanguage } from '@/lib/i18n/context';
import { getTranslation, TranslationKey } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { SiteSettings } from '@/lib/sanity/types';

interface HeroProps {
  siteSettings?: SiteSettings | null;
}

const socialLinks = (settings?: SiteSettings | null) => [
  { href: settings?.github ?? 'https://github.com/openpango', icon: IconBrandGithub, label: 'GitHub' },
  { href: settings?.email ? `mailto:${settings.email}` : 'mailto:nlesiecki@icloud.com', icon: IconMail, label: 'Email' },
  { href: settings?.instagram ?? 'https://instagram.com/skipper.lsc', icon: IconBrandInstagram, label: 'Instagram' },
  { href: settings?.twitter ?? 'https://x.com/joaopensao', icon: IconBrandX, label: 'X (Twitter)' },
];

function fadeUp(delay: number) {
  const skip = typeof window !== 'undefined' && prefersReducedMotion();
  return {
    initial: skip ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: skip ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const, delay } },
  };
}

export default function Hero({ siteSettings }: HeroProps) {
  const { lang } = useLanguage();
  const t = (key: TranslationKey) => getTranslation(lang, key);

  const tagline = siteSettings?.heroTagline?.[lang] ?? siteSettings?.heroTagline?.en ?? t('hero_tagline');
  const showAvailable = siteSettings?.availableForWork !== false;
  const links = socialLinks(siteSettings);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-end pb-20 overflow-hidden bg-navy-base" aria-label="Hero">
      <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end px-4 sm:px-6 lg:px-8 pt-32">
        
        {/* Typographic Statement Overlapping */}
        <div className="lg:col-span-8 flex flex-col relative z-20">
          <motion.div {...fadeUp(0)}>
            {showAvailable && (
              <Badge variant="status" dot className="mb-12 border-none px-0 text-text-primary tracking-[0.2em] uppercase bg-transparent">
                {t('hero_available')}
              </Badge>
            )}
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-[12vw] lg:text-[7.5rem] leading-[0.95] text-text-primary uppercase tracking-tighter"
          >
            Nikodem<br />
            <span className="text-red-primary">Lesiecki</span>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="mt-12 max-w-md">
            <p className="text-base text-text-muted leading-relaxed font-sans">
              {tagline}
            </p>
          </motion.div>

          {/* Text Links */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-8 mt-12">
            <button
              onClick={handleScrollToProjects}
              className="group flex items-center gap-2 text-text-primary uppercase tracking-widest text-xs font-bold hover:text-red-primary transition-colors"
            >
              {t('hero_cta_work')}
              <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-text-muted uppercase tracking-widest text-xs font-bold hover:text-text-primary transition-colors"
            >
              {t('hero_cta_cv')}
              <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Flush Image Panel */}
        <motion.div {...fadeUp(0.4)} className="lg:col-span-4 relative h-[60vh] lg:h-[75vh] w-full mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-navy-surface overflow-hidden">
            <Image 
              src="/photo.png"
              alt="Nikodem Lesiecki"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 hover:scale-100"
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            {/* Thin alignment borders */}
            <div className="absolute inset-0 border border-border-default pointer-events-none" />
          </div>

          {/* Vertical section label */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
            01 — PORTFOLIO
          </div>
        </motion.div>

      </div>

      {/* Social Links Fixed to Bottom Right */}
      <motion.div {...fadeUp(0.5)} className="absolute bottom-8 right-8 flex gap-6 z-30">
        {links.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon size={20} stroke={1.5} />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
