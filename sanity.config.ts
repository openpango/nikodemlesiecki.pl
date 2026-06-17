import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureBuilder } from 'sanity/structure'

import { schemaTypes } from '@/sanity/schema'

// Singleton document ID for site settings
const SITE_SETTINGS_ID = 'siteSettings'

/**
 * Custom desk structure that organises content into logical groups
 * and treats siteSettings as a singleton.
 */
function deskStructure(S: StructureBuilder) {
  // Singleton item for Site Settings — opens the document directly
  const siteSettingsItem = S.listItem()
    .title('Site Settings')
    .id('siteSettings')
    .child(
      S.document()
        .schemaType('siteSettings')
        .documentId(SITE_SETTINGS_ID)
        .title('Site Settings'),
    )

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),

      S.listItem()
        .title('Experience')
        .schemaType('experience')
        .child(S.documentTypeList('experience').title('Experience')),

      S.listItem()
        .title('Skills')
        .schemaType('skill')
        .child(S.documentTypeList('skill').title('Skills')),

      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(S.documentTypeList('location').title('Locations')),

      S.divider(),

      siteSettingsItem,
    ])
}

export default defineConfig({
  name: 'default',
  title: 'Nikodem Lesiecki',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent new siteSettings documents from being created via the "New document" menu
    templates: (prev) =>
      prev.filter((template) => template.schemaType !== 'siteSettings'),
  },
})
