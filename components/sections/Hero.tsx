'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

function getFadeUpProps(delay: number, introStep: number, isHeroH1: boolean = false) {
  const skip = typeof window !== 'undefined' && prefersReducedMotion();
  if (skip) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
    };
  }

  // Hero H1 fades up at step 3 (while doors are sliding open).
  // Other elements fade up at step 4 (after doors are fully open).
  const isVisible = isHeroH1 ? introStep >= 3 : introStep >= 4;

  return {
    initial: { opacity: 0, y: 24 },
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.8, ease: 'easeOut', delay },
  };
}

export default function Hero({ siteSettings }: HeroProps) {
  const { lang } = useLanguage();
  const t = (key: TranslationKey) => getTranslation(lang, key);

  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to the top so the intro always plays correctly
    window.scrollTo(0, 0);

    // Disable scrolling while intro plays
    document.body.style.overflow = 'hidden';

    // Timeline sequence for split-screen sliding intro
    const t1 = setTimeout(() => setIntroStep(1), 800);  // 0.8s: Doors finished sliding in. Start typing HELLO.
    const t2 = setTimeout(() => setIntroStep(2), 2200); // 2.2s: Typing finished. Wait a moment.
    const t3 = setTimeout(() => setIntroStep(3), 2500); // 2.5s: HELLO fades out. Doors start sliding open. Hero H1 fades in.
    const t4 = setTimeout(() => {
      setIntroStep(4); // 3.3s: Doors fully open. Rest of elements fade in.
      document.body.style.overflow = ''; // Re-enable scrolling
    }, 3300); 

    return () => {
      document.body.style.overflow = '';
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const tagline = siteSettings?.heroTagline?.[lang] ?? siteSettings?.heroTagline?.en ?? t('hero_tagline');
  const showAvailable = siteSettings?.availableForWork !== false;
  const links = socialLinks(siteSettings);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Split Screen Typographic Intro */}
      <AnimatePresence>
        {introStep < 4 && (
          <motion.div
            key="split-intro"
            className="fixed inset-0 z-[100] flex pointer-events-auto"
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {/* Left Red Door */}
            <motion.div
              className="w-1/2 h-full bg-red-primary shadow-[20px_0_40px_rgba(0,0,0,0.5)] z-20"
              initial={{ x: "-100%" }}
              animate={{ x: introStep >= 3 ? "-100%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            
            {/* Right Navy Surface Door (slightly lighter than base so you see it slide) */}
            <motion.div
              className="w-1/2 h-full bg-navy-surface shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-20"
              initial={{ x: "100%" }}
              animate={{ x: introStep >= 3 ? "100%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* HELLO. Text Container */}
            <AnimatePresence>
              {introStep >= 1 && introStep < 3 && (
                <motion.div
                  className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeInOut' } }}
                >
                  <div className="font-heading text-[32vw] md:text-[20rem] leading-[0.8] tracking-tighter uppercase text-text-primary flex flex-col items-start font-black">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4, ease: "linear", delay: 0.1 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      HE
                    </motion.div>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "linear", delay: 0.5 }}
                      className="whitespace-nowrap overflow-hidden pr-4"
                    >
                      LLO<span className="text-red-primary">.</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-navy-base" aria-label="Hero">
        <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-8 py-32 min-h-screen">
          
          <div className="lg:col-span-7 flex flex-col relative z-30 pointer-events-none">
            <motion.div {...getFadeUpProps(0, introStep)} className="pointer-events-auto">
              {showAvailable && (
                <Badge variant="status" dot className="mb-8 lg:mb-12 border-none px-0 text-text-primary tracking-[0.2em] uppercase bg-transparent text-xs lg:text-sm">
                  {t('hero_available')}
                </Badge>
              )}
            </motion.div>

            <motion.h1
              {...getFadeUpProps(0, introStep, true)}
              className="font-heading text-[15vw] lg:text-[7.5rem] leading-[0.85] text-text-primary uppercase tracking-tighter lg:whitespace-nowrap text-left"
            >
              Nikodem<br />
              <span className="text-red-primary">Lesiecki</span>
            </motion.h1>

            <motion.div {...getFadeUpProps(0.2, introStep)} className="mt-8 lg:mt-12 max-w-2xl pointer-events-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-text-muted leading-relaxed font-sans">
                {tagline}
              </p>
            </motion.div>

            <motion.div {...getFadeUpProps(0.3, introStep)} className="flex flex-wrap gap-8 mt-10 lg:mt-14 pointer-events-auto">
              <button
                onClick={handleScrollToProjects}
                className="group flex items-center gap-2 text-text-primary uppercase tracking-widest text-sm lg:text-base font-bold hover:text-red-primary transition-colors"
              >
                {t('hero_cta_work')}
                <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-text-muted uppercase tracking-widest text-sm lg:text-base font-bold hover:text-text-primary transition-colors"
              >
                {t('hero_cta_cv')}
                <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          <motion.div {...getFadeUpProps(0.4, introStep)} className="lg:col-start-9 lg:col-span-4 relative h-[50vh] lg:h-[75vh] w-full mt-16 lg:mt-0 z-10 lg:opacity-80 transition-opacity hover:opacity-100">
            <div className="absolute inset-0 bg-navy-surface overflow-hidden">
              <Image 
                src="/photo.png"
                alt="Nikodem Lesiecki"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 hover:scale-100"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-base/80 lg:to-navy-base/40 pointer-events-none" />
              <div className="absolute inset-0 border border-border-default pointer-events-none" />
            </div>

            <div className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
              01 — PORTFOLIO
            </div>
          </motion.div>

        </div>

        <motion.div {...getFadeUpProps(0.5, introStep)} className="absolute bottom-8 right-8 flex gap-6 z-30 pointer-events-auto">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Icon size={24} stroke={1.5} />
            </a>
          ))}
        </motion.div>
      </section>
    </>
  );
}
