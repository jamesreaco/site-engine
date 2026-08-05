import { defineField, defineType } from "sanity";

export default defineType({
  name: 'blogSettings',
  title: 'Blog Settings',
  type: 'document',
  fields: [
    defineField({
      title: 'Show Related Posts',
      name: 'showRelatedPosts',
      type: 'boolean',
      description: 'Enable to display 3 related posts at the end of each post.',
      initialValue: true
    }),
    defineField({
      title: 'Show Table of Contents',
      name: 'showTableOfContents',
      type: 'boolean',
      description: 'Enable to display a table of contents in the right sidebar of each post.',
      initialValue: true
    }),
    defineField({
      title: 'Show Posts by Category',
      name: 'showPostsByCategory',
      type: 'boolean',
      description: 'Enable to display post categories in right sidebar of each post.',
      initialValue: true
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Blog Settings',
      }
    },
  },
})