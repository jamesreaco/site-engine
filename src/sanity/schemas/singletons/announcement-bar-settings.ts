import { defineField, defineType } from "sanity";
import { pageReferenceTypes } from "../misc/page-reference-types";

export default defineType({
  name: 'announcementBarSettings',
  title: 'Announcement Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'showAnnouncementBar',
      title: 'Show Announcement Bar',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      hidden: ({ parent }) => !parent?.showAnnouncementBar,
    }),
    defineField({
      name: 'showLink',
      title: 'Add Link',
      description: 'Enable to make the announcement bar link to a page or URL. A right arrow icon will be shown next to the text.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.showAnnouncementBar,
    }),
    defineField({
      title: 'Link Type',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
      },
      initialValue: 'internal',
      hidden: ({ parent }) => !parent?.showAnnouncementBar || !parent?.showLink,
    }),
    defineField({
      name: 'pageReference',
      title: 'Page',
      description: 'The page that the announcement bar will link to.',
      type: 'reference',
      to: [ ...pageReferenceTypes ],
      hidden: ({ parent }) => !parent?.showAnnouncementBar || !parent?.showLink || parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'The external URL that the announcement bar will link to.',
      type: 'url',
      validation: Rule => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
      hidden: ({ parent }) => !parent?.showAnnouncementBar || !parent?.showLink || parent?.linkType !== 'external',
    }),
    defineField({
      name: 'backgroundColour',
      title: 'Background Colour',
      type: 'simplerColor',
      description: 'The background colour of the announcement bar. Defaults to black.',
      hidden: ({ parent }) => !parent?.showAnnouncementBar,
    }),
    defineField({
      title: 'Text Colour',
      name: 'textColour',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White)', value: 'light' },
          { title: 'Dark (Black)', value: 'dark' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'light',
      hidden: ({ parent }) => !parent?.showAnnouncementBar,
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }) {
      return {
        title: 'Announcement Bar',
        subtitle: text || 'No text set',
      }
    },
  },
});