import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function seed() {
  console.log('Seeding Sanity with initial data...');

  // 1. Site Settings
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroTagline: {
      en: "I'm a Polish creative technologist bridging human creativity with AI systems.",
      pl: "Jestem polskim technologiem kreatywnym łączącym ludzką kreatywność z systemami AI.",
    },
    bio: {
      en: "I build fast, heavily animated, and modern digital experiences. From graphic design to frontend development, and now AI coding.",
      pl: "Tworzę szybkie, silnie animowane i nowoczesne doświadczenia cyfrowe. Od projektowania graficznego, przez rozwój frontendowy, aż po AI coding.",
    },
    availableForWork: true,
    email: 'nlesiecki@icloud.com',
    github: 'https://github.com/openpango',
    instagram: 'https://instagram.com/skipper.lsc',
    twitter: 'https://twitter.com/joaopensao',
    seo: {
      title: 'Nikodem Lesiecki | Creative Technologist',
      description: 'Portfolio of Nikodem Lesiecki',
    },
  };
  
  await client.createOrReplace(siteSettings);
  console.log('✅ Created Site Settings');

  // 2. Locations
  const locations = [
    { _id: 'loc-1', _type: 'location', country: { en: 'Poland', pl: 'Polska' }, cityOrRegion: 'Kalisz', coordinates: { lat: 51.7611, lng: 18.0910 }, description: { en: 'Hometown', pl: 'Miasto rodzinne' }, status: 'home' },
    { _id: 'loc-2', _type: 'location', country: { en: 'Czech Republic', pl: 'Czechy' }, cityOrRegion: 'Prague', coordinates: { lat: 50.0755, lng: 14.4378 }, description: { en: 'Beautiful architecture', pl: 'Piękna architektura' }, status: 'visited' },
    { _id: 'loc-3', _type: 'location', country: { en: 'England', pl: 'Anglia' }, cityOrRegion: 'London', coordinates: { lat: 51.5074, lng: -0.1278 }, description: { en: 'The city that never sleeps', pl: 'Miasto, które nigdy nie śpi' }, status: 'visited' },
    { _id: 'loc-4', _type: 'location', country: { en: 'Spain', pl: 'Hiszpania' }, coordinates: { lat: 40.4168, lng: -3.7038 }, description: { en: 'Sun and tapas', pl: 'Słońce i tapas' }, status: 'visited' },
    { _id: 'loc-5', _type: 'location', country: { en: 'Portugal', pl: 'Portugalia' }, coordinates: { lat: 38.7223, lng: -9.1393 }, description: { en: 'Pastéis de nata', pl: 'Pastéis de nata' }, status: 'visited' },
  ];
  for (const loc of locations) { await client.createIfNotExists(loc); }
  console.log('✅ Created Locations');

  // 3. Projects
  const projects = [
    { _id: 'proj-1', _type: 'project', title: 'Betclic Inspired UI', category: 'frontend', link: 'https://github.com/openpango', highlights: ['Next.js', 'Framer Motion', 'Tailwind'], features: { en: ['Dynamic Animations', 'Dark Mode'], pl: ['Dynamiczne Animacje', 'Tryb Ciemny'] }, description: { en: 'A highly animated, sports-betting style UI.', pl: 'Mocno animowane UI w stylu zakładów bukmacherskich.' } },
    { _id: 'proj-2', _type: 'project', title: 'AI Vibe Coder Dashboard', category: 'ai', link: 'https://github.com/openpango', highlights: ['React', 'LLMs', 'OpenAI'], features: { en: ['Agentic Workflows'], pl: ['Przepływy Pracy Agentów'] }, description: { en: 'An interface for controlling AI agents.', pl: 'Interfejs do kontrolowania agentów AI.' } },
  ];
  for (const p of projects) { await client.createIfNotExists(p); }
  console.log('✅ Created Projects');

  // 4. Skills
  const skills = [
    { _id: 'skill-1', _type: 'skill', name: 'React', category: 'frontend', proficiency: 'Expert' },
    { _id: 'skill-2', _type: 'skill', name: 'Next.js', category: 'frontend', proficiency: 'Expert' },
    { _id: 'skill-3', _type: 'skill', name: 'TypeScript', category: 'frontend', proficiency: 'Advanced' },
    { _id: 'skill-4', _type: 'skill', name: 'Figma', category: 'design', proficiency: 'Expert' },
    { _id: 'skill-5', _type: 'skill', name: 'Photoshop', category: 'design', proficiency: 'Advanced' },
    { _id: 'skill-6', _type: 'skill', name: 'Agentic AI', category: 'ai', proficiency: 'Advanced' },
    { _id: 'skill-7', _type: 'skill', name: 'Cursor / GitHub Copilot', category: 'ai', proficiency: 'Expert' },
    { _id: 'skill-8', _type: 'skill', name: 'Node.js', category: 'backend', proficiency: 'Intermediate' },
  ];
  for (const s of skills) { await client.createIfNotExists(s); }
  console.log('✅ Created Skills');

  console.log('🎉 Done! Your Sanity CMS is fully seeded.');
}

seed().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
