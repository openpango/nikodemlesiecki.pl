import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI', value: 'ai' },
          { title: 'Design', value: 'design' },
          { title: 'Frontend', value: 'frontend' },
          { title: 'Learning', value: 'learning' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency',
      type: 'string',
      options: {
        list: [
          { title: 'Expert', value: 'expert' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Beginner', value: 'beginner' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      proficiency: 'proficiency',
    },
    prepare({ title, category, proficiency }) {
      return {
        title: title || 'Untitled',
        subtitle: `${category ?? ''} — ${proficiency ?? ''}`,
      }
    },
  },
})
