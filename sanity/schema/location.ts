import { defineField, defineType } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'country',
      title: 'Country',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'pl',
          title: 'Polish',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cityOrRegion',
      title: 'City or Region',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (rule) => rule.required().min(-90).max(90),
        }),
        defineField({
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: (rule) => rule.required().min(-180).max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateVisited',
      title: 'Date Visited',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
        }),
        defineField({
          name: 'pl',
          title: 'Polish',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Visited', value: 'visited' },
          { title: 'Home', value: 'home' },
          { title: 'Want to Visit', value: 'want-to-visit' },
        ],
        layout: 'radio',
      },
      initialValue: 'visited',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      country: 'country.en',
      city: 'cityOrRegion',
      status: 'status',
    },
    prepare({ country, city, status }) {
      return {
        title: city ? `${city}, ${country}` : country || 'Untitled',
        subtitle: status,
      }
    },
  },
})
