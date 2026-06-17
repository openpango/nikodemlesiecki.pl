'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  IconBriefcase,
  IconUser,
  IconCode,
  IconTimeline,
  IconPlane,
  IconMail,
} from '@tabler/icons-react';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation } from '@/lib/i18n/translations';
import { scrollToSection } from '@/lib/utils';

const navItems = [
  { id: 'projects', icon: IconBriefcase, labelKey: 'nav_work' as const },
  { id: 'about', icon: IconUser, labelKey: 'nav_about' as const },
  { id: 'skills', icon: IconCode, labelKey: 'nav_skills' as const },
  { id: 'timeline', icon: IconTimeline, labelKey: 'nav_timeline' as const },
  { id: 'travel', icon: IconPlane, labelKey: 'nav_travel' as const },
  { id: 'contact', icon: IconMail, labelKey: 'nav_contact' as const },
];

export default function FloatingNav() {
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState(false);

  // Observe sections for active state
  useEffect(() => {
    const sectionIds = ['hero', ...navItems.map((item) => item.id)];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Show nav after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 border-t border-border-default bg-navy-base px-4 py-4 md:px-8 flex justify-center ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[100%] opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide md:gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const label = getTranslation(lang, item.labelKey);

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              className={`relative text-[0.65rem] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-200 ${
                isActive
                  ? 'text-red-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
