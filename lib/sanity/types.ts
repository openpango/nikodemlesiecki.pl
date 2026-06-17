/** Bilingual text field */
export interface BilingualString {
  en: string
  pl: string
}

/** Bilingual text field (optional values) */
export interface BilingualStringOptional {
  en?: string
  pl?: string
}

/** Sanity slug object */
export interface SanitySlug {
  _type: 'slug'
  current: string
}

/** Portfolio project */
export interface Project {
  _id: string
  title: BilingualString
  slug: SanitySlug
  summary?: BilingualStringOptional
  description?: BilingualStringOptional
  role?: string
  year: number
  technologies?: string[]
  liveUrl?: string | null
  repoUrl?: string | null
  repoIsPrivate: boolean
  projectType: 'ai' | 'web' | 'design' | 'tool' | 'other'
  featured: boolean
  order: number
  status: 'published' | 'draft'
}

/** Travel map location */
export interface Location {
  _id: string
  country: BilingualString
  cityOrRegion?: string
  coordinates: {
    lat: number
    lng: number
  }
  dateVisited?: string
  description?: BilingualStringOptional
  status: 'visited' | 'home' | 'want-to-visit'
}

/** Work experience entry */
export interface Experience {
  _id: string
  title: string
  company?: string
  period: string
  location: string
  type: 'full-time' | 'part-time' | 'freelance' | 'intern'
  responsibilities?: {
    en?: string[]
    pl?: string[]
  }
  order: number
}

/** Skill entry */
export interface Skill {
  _id: string
  name: string
  category: 'ai' | 'design' | 'frontend' | 'learning'
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'beginner'
  order: number
}

/** SEO metadata */
export interface SeoSettings {
  title?: string
  description?: string
  ogImageUrl?: string
}

/** Global site settings (singleton) */
export interface SiteSettings {
  _id: string
  heroTagline?: BilingualStringOptional
  bio?: BilingualStringOptional
  availableForWork: boolean
  email?: string
  github?: string
  instagram?: string
  twitter?: string
  seo?: SeoSettings
}
