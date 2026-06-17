'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useLanguage } from '@/lib/i18n/context';
import { getTranslation, TranslationKey } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PillFilter from '@/components/ui/PillFilter';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface Skill {
  name: string;
  category: string;
  proficiency: string;
  order: number;
}

interface SkillsProps {
  skills?: Skill[] | null;
}

/* -------------------------------------------------------------------------- */
/*                                 Fallbacks                                  */
/* -------------------------------------------------------------------------- */

const fallbackSkills: Skill[] = [
  { name: 'AI Coding (Vibe Coding)', category: 'ai', proficiency: 'expert', order: 1 },
  { name: 'Prompt Engineering', category: 'ai', proficiency: 'expert', order: 2 },
  { name: 'Building AI Agents', category: 'ai', proficiency: 'expert', order: 3 },
  { name: 'Bypassing AI Restrictions', category: 'ai', proficiency: 'expert', order: 4 },
  { name: 'Agentic Workflow Design', category: 'ai', proficiency: 'expert', order: 5 },
  { name: 'Figma', category: 'design', proficiency: 'expert', order: 6 },
  { name: 'UI/UX Design', category: 'design', proficiency: 'advanced', order: 7 },
  { name: 'Graphic Design', category: 'design', proficiency: 'advanced', order: 8 },
  { name: 'RWD / Responsive Design', category: 'design', proficiency: 'advanced', order: 9 },
  { name: 'HTML / CSS', category: 'frontend', proficiency: 'advanced', order: 10 },
  { name: 'Frontend Development', category: 'frontend', proficiency: 'intermediate', order: 11 },
  { name: 'Web Performance', category: 'frontend', proficiency: 'intermediate', order: 12 },
  { name: 'Backend Development', category: 'learning', proficiency: 'beginner', order: 13 },
];

/* -------------------------------------------------------------------------- */
/*                               Proficiency map                              */
/* -------------------------------------------------------------------------- */

type ProficiencyLevel = 'expert' | 'advanced' | 'intermediate' | 'beginner';

const proficiencyConfig: Record<
  ProficiencyLevel,
  { percent: number; color: string; variant: ProficiencyLevel }
> = {
  expert: { percent: 100, color: 'bg-red-primary', variant: 'expert' },
  advanced: { percent: 75, color: 'bg-text-primary', variant: 'advanced' },
  intermediate: { percent: 50, color: 'bg-text-muted', variant: 'intermediate' },
  beginner: { percent: 25, color: 'bg-border-default', variant: 'beginner' },
};

function getProficiency(level: string) {
  return (
    proficiencyConfig[level as ProficiencyLevel] ??
    proficiencyConfig.beginner
  );
}

/* -------------------------------------------------------------------------- */
/*                              Filter categories                             */
/* -------------------------------------------------------------------------- */

function getFilterOptions(t: (key: TranslationKey) => string) {
  return [
    { value: 'all', label: t('skills_all') },
    { value: 'ai', label: t('skills_ai') },
    { value: 'design', label: t('skills_design') },
    { value: 'frontend', label: t('skills_frontend') },
    { value: 'learning', label: t('skills_learning') },
  ];
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { lang } = useLanguage();
  const t = useCallback((key: TranslationKey) => getTranslation(lang, key), [lang]);
  const [activeFilter, setActiveFilter] = useState('all');

  const data = skills && skills.length > 0 ? skills : fallbackSkills;
  const reducedMotion = typeof window !== 'undefined' && prefersReducedMotion();

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? [...data].sort((a, b) => a.order - b.order)
        : data
            .filter((s) => s.category === activeFilter)
            .sort((a, b) => a.order - b.order),
    [data, activeFilter],
  );

  const filterOptions = useMemo(() => getFilterOptions(t), [t]);

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden bg-navy-base"
      aria-label={t('skills_label')}
    >
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          04 — SKILLS
        </div>

        <div className="ml-0 lg:ml-12 space-y-10">
          {/* ── Heading ── */}
          <SectionHeading
            title={t('skills_title')}
          />

        {/* ── Filter pills ── */}
        <PillFilter
          options={filterOptions}
          activeValue={activeFilter}
          onChange={setActiveFilter}
          className="pb-2"
        />

        {/* ── Skill cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((skill) => {
              const prof = getProficiency(skill.proficiency);

              return (
                <motion.div
                  key={skill.name}
                  layout={!reducedMotion}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 0.25, ease: 'easeOut' }
                  }
                >
                  <Card variant="compact" hover={false} className="h-full space-y-3">
                    {/* Skill name + badge */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-card-title text-text-primary">
                        {skill.name}
                      </span>
                      <Badge variant={prof.variant} className="shrink-0">
                        {skill.proficiency}
                      </Badge>
                    </div>

                    {/* Proficiency bar */}
                    <div
                      className="h-1.5 w-full rounded-full bg-navy-base overflow-hidden"
                      role="meter"
                      aria-valuenow={prof.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency: ${skill.proficiency}`}
                    >
                      <div
                        className={`h-full rounded-full ${prof.color} transition-all duration-500 ease-out`}
                        style={{ width: `${prof.percent}%` }}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
};

Skills.displayName = 'Skills';

export default Skills;
