import { groq } from 'next-sanity'

/** Fetch all published projects, ordered by display order */
export const projectsQuery = groq`
  *[_type == "project" && status == "published"] | order(order asc) {
    _id,
    title,
    slug,
    summary,
    description,
    role,
    year,
    technologies,
    liveUrl,
    repoUrl,
    repoIsPrivate,
    projectType,
    featured,
    order,
    status
  }
`

/** Fetch the single featured project */
export const featuredProjectQuery = groq`
  *[_type == "project" && status == "published" && featured == true][0] {
    _id,
    title,
    slug,
    summary,
    description,
    role,
    year,
    technologies,
    liveUrl,
    repoUrl,
    repoIsPrivate,
    projectType,
    featured,
    order,
    status
  }
`

/** Fetch all locations, ordered by country name */
export const locationsQuery = groq`
  *[_type == "location"] | order(country.en asc) { // cache-bust
    _id,
    country,
    cityOrRegion,
    coordinates,
    dateVisited,
    description,
    status
  }
`

/** Fetch all experience entries, ordered by display order */
export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    title,
    company,
    period,
    location,
    type,
    responsibilities,
    order
  }
`

/** Fetch all skills, ordered by display order */
export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc) {
    _id,
    name,
    category,
    proficiency,
    order
  }
`

/** Fetch the site settings singleton */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    heroTagline,
    bio,
    availableForWork,
    email,
    github,
    instagram,
    twitter,
    seo {
      title,
      description,
      "ogImageUrl": ogImage.asset->url
    }
  }
`
