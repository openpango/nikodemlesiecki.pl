import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Timeline from '@/components/sections/Timeline';
import TravelMap from '@/components/sections/TravelMap';
import Contact from '@/components/sections/Contact';
import { client } from '@/lib/sanity/client';
import {
  projectsQuery,
  locationsQuery,
  experienceQuery,
  skillsQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import { Project, Location, Experience as ExperienceType, Skill, SiteSettings } from '@/lib/sanity/types';

export const revalidate = 3600; // Revalidate every hour max if webhook fails

export default async function Home() {
  // Fetch data from Sanity with try/catch fallbacks
  let siteSettings: SiteSettings | null = null;
  let projects: Project[] | null = null;
  let locations: Location[] | null = null;
  let experience: ExperienceType[] | null = null;
  let skills: Skill[] | null = null;

  try {
    const [fetchedSettings, fetchedProjects, fetchedLocations, fetchedExperience, fetchedSkills] = await Promise.all([
      client.fetch<SiteSettings | null>(siteSettingsQuery),
      client.fetch<Project[]>(projectsQuery),
      client.fetch<Location[]>(locationsQuery),
      client.fetch<ExperienceType[]>(experienceQuery),
      client.fetch<Skill[]>(skillsQuery),
    ]);

    siteSettings = fetchedSettings;
    projects = fetchedProjects;
    locations = fetchedLocations;
    experience = fetchedExperience;
    skills = fetchedSkills;
  } catch (error) {
    console.error('Failed to fetch data from Sanity. Falling back to defaults.', error);
  }

  return (
    <div className="w-full relative z-0">
      <Hero siteSettings={siteSettings} />
      <About bio={siteSettings?.bio} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Timeline />
      <TravelMap locations={locations} />
      <Contact />
      
      {/* Footer */}
      <footer className="w-full border-t border-border-default/50 py-8 section-padding text-center">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Nikodem Lesiecki.
        </p>
      </footer>
    </div>
  );
}
