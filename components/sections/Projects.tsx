'use client';

import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation, TranslationKey } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PillFilter from '@/components/ui/PillFilter';
import { IconExternalLink, IconBrandGithub, IconLock } from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

import { Project } from '@/lib/sanity/types';

interface ProjectsProps {
  projects?: Project[] | null;
}

/* -------------------------------------------------------------------------- */
/*                               Fallback Data                                */
/* -------------------------------------------------------------------------- */

const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: { en: 'MacOSENSE', pl: 'MacOSENSE' },
    slug: { _type: 'slug', current: 'macosense' },
    summary: {
      en: 'A native, external, read-only ESP and combat assistant for Counter-Strike 2 running on macOS via Wine/CrossOver/Whisky.',
      pl: 'Natywny, zewnętrzny, read-only ESP i asystent walki do Counter-Strike 2 działający na macOS przez Wine/CrossOver/Whisky.',
    },
    description: {
      en: 'Operates entirely outside the Wine/CrossOver sandbox, making it inherently stealthy and undetectable by VAC. Leverages macOS native Mach kernel APIs to read process memory without injecting DLLs, opening handles within the Windows environment, or writing to game memory.',
      pl: 'Działa całkowicie poza sandboxem Wine/CrossOver, co czyni go z natury niewidocznym i niewykrywalnym przez VAC. Wykorzystuje natywne API jądra Mach macOS do odczytu pamięci procesów bez wstrzykiwania DLL, otwierania uchwytów w środowisku Windows ani zapisu do pamięci gry.',
    },
    role: 'Solo developer',
    year: 2024,
    technologies: ['macOS', 'C', 'Mach Kernel APIs', 'Wine', 'CrossOver', 'Whisky', 'CS2'],
    liveUrl: null,
    repoUrl: 'https://github.com/openpango/MacOSENSE',
    repoIsPrivate: true,
    projectType: 'tool',
    featured: true,
    order: 1,
    status: 'published',
  },
];

/* -------------------------------------------------------------------------- */
/*                            Helper: Number Label                            */
/* -------------------------------------------------------------------------- */

function formatProjectNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/* -------------------------------------------------------------------------- */
/*                             Featured Card                                  */
/* -------------------------------------------------------------------------- */

const FeaturedProjectCard: React.FC<{
  project: Project;
  index: number;
  lang: 'en' | 'pl';
  t: (key: TranslationKey) => string;
}> = ({ project, index, lang, t }) => {
  const title = project.title[lang] ?? project.title.en;
  const summary = project.summary?.[lang] ?? project.summary?.en;
  const description = project.description?.[lang] ?? project.description?.en;

  return (
    <Card variant="large" className="relative overflow-hidden">
      {/* Large number label */}
      <span
        className="absolute top-6 right-8 font-heading text-7xl font-extrabold text-text-primary/10 select-none pointer-events-none"
        aria-hidden="true"
      >
        {formatProjectNumber(index)}
      </span>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Title */}
        <h3 className="font-heading text-2xl font-bold text-text-primary pr-16">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-body text-text-muted max-w-3xl">{summary}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Metadata row */}
        {(project.role || project.year) && (
          <div className="flex items-center gap-3 text-sm text-text-muted">
            {project.role && <span>{project.role}</span>}
            {project.role && project.year && (
              <span aria-hidden="true" className="text-border-default">·</span>
            )}
            {project.year && <span>{project.year}</span>}
          </div>
        )}

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-3 mt-1">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<IconExternalLink size={16} />}
            >
              {t('projects_view')}
            </Button>
          )}

          {project.repoUrl && !project.repoIsPrivate && (
            <Button
              variant="secondary"
              size="sm"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<IconBrandGithub size={16} />}
            >
              {t('projects_github')}
            </Button>
          )}

          {project.repoIsPrivate && (
            <Badge variant="default" icon={<IconLock size={12} />}>
              {t('projects_private')}
            </Badge>
          )}
        </div>

        {/* Private repo description */}
        {project.repoIsPrivate && description && (
          <div className="mt-2 rounded-card-sm border border-border-default bg-navy-base/50 p-4">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
              {t('projects_private_desc')}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Regular Card                                   */
/* -------------------------------------------------------------------------- */

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  lang: 'en' | 'pl';
  t: (key: TranslationKey) => string;
}> = ({ project, index, lang, t }) => {
  const title = project.title[lang] ?? project.title.en;
  const summary = project.summary?.[lang] ?? project.summary?.en;
  const description = project.description?.[lang] ?? project.description?.en;

  return (
    <Card variant="compact" className="relative overflow-hidden h-full flex flex-col">
      {/* Number label */}
      <span
        className="absolute top-4 right-5 font-heading text-4xl font-extrabold text-text-muted/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        {formatProjectNumber(index)}
      </span>

      <div className="relative z-10 flex flex-col gap-3 flex-1">
        {/* Title */}
        <h3 className="font-heading text-card-title font-bold text-text-primary pr-12">
          {title}
        </h3>

        {/* Summary — clamped to 2 lines */}
        <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
          {summary}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 5 && (
            <Badge variant="tech">+{project.technologies.length - 5}</Badge>
          )}
        </div>

        {/* Role + year metadata */}
        {(project.role || project.year) && (
          <div className="flex items-center gap-2 text-xs text-text-muted mt-auto pt-2">
            {project.role && <span>{project.role}</span>}
            {project.role && project.year && (
              <span aria-hidden="true" className="text-border-default">·</span>
            )}
            {project.year && <span>{project.year}</span>}
          </div>
        )}

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<IconExternalLink size={14} />}
            >
              {t('projects_view')}
            </Button>
          )}

          {project.repoUrl && !project.repoIsPrivate && (
            <Button
              variant="secondary"
              size="sm"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<IconBrandGithub size={14} />}
            >
              {t('projects_github')}
            </Button>
          )}

          {project.repoIsPrivate && (
            <Badge variant="default" icon={<IconLock size={12} />}>
              {t('projects_private')}
            </Badge>
          )}
        </div>

        {/* Private repo description */}
        {project.repoIsPrivate && description && (
          <div className="mt-2 rounded-card-sm border border-border-default bg-navy-base/50 p-3">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1.5">
              {t('projects_private_desc')}
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

const Projects: React.FC<ProjectsProps> = ({ projects: projectsProp }) => {
  const { lang } = useLanguage();
  const t = (key: TranslationKey) => getTranslation(lang, key);

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const allProjects = projectsProp && projectsProp.length > 0 ? projectsProp : fallbackProjects;

  /* ---- Filter state ---- */
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: t('projects_all') },
    { value: 'ai', label: t('projects_ai') },
    { value: 'web', label: t('projects_web') },
    { value: 'design', label: t('projects_design') },
    { value: 'tool', label: t('projects_tool') },
  ];

  /* ---- Filtered + sorted projects ---- */
  const filteredProjects = useMemo(() => {
    const sorted = [...allProjects].sort((a, b) => a.order - b.order);
    if (activeFilter === 'all') return sorted;
    return sorted.filter((p) => p.projectType === activeFilter);
  }, [allProjects, activeFilter]);

  const featuredProject = filteredProjects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  /* ---- GSAP scroll animation ---- */
  useGSAP(
    () => {
      if (prefersReducedMotion() || !cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll('[data-animate-card]');
      if (cards.length === 0) return;

      gsap.set(cards, { y: 40, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [activeFilter] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-navy-base"
      aria-labelledby="projects-heading"
    >
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          03 — WORK
        </div>

        <div className="ml-0 lg:ml-12">
        {/* Heading */}
        <SectionHeading
          label={t('projects_label')}
          title={t('projects_title')}
          subtitle={t('projects_subtitle')}
        />

        {/* Filter pills */}
        <PillFilter
          options={filterOptions}
          activeValue={activeFilter}
          onChange={setActiveFilter}
          className="mt-8 mb-10"
        />

        {/* Cards grid */}
        <div ref={cardsRef} className="flex flex-col gap-6">
          {/* Featured project */}
          {featuredProject && (
            <div data-animate-card>
              <FeaturedProjectCard
                project={featuredProject}
                index={allProjects.indexOf(featuredProject)}
                lang={lang}
                t={t}
              />
            </div>
          )}

          {/* Regular projects — 2-col grid */}
          {regularProjects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {regularProjects.map((project) => (
                <div key={project.slug.current} data-animate-card>
                  <ProjectCard
                    project={project}
                    index={allProjects.indexOf(project)}
                    lang={lang}
                    t={t}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <p className="text-center text-text-muted py-12">
              {lang === 'en'
                ? 'No projects in this category yet.'
                : 'Brak projektów w tej kategorii.'}
            </p>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;
