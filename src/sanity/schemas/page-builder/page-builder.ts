import { defineType } from "sanity";

export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    { name: 'heroBlock', type: 'heroBlock' },
    { name: 'headerBlock', type: 'headerBlock' },
    { name: 'featureBlock', type: 'featureBlock' },
    { name: 'freeformBlock', type: 'freeformBlock' },
    { name: 'logoBlock', type: 'logoBlock' },
    { name: 'testimonialBlock', type: 'testimonialBlock' },
  ],
  options: {
    insertMenu: {
      groups: [
        {
          name: 'intro',
          title: 'Intro',
          of: [ 'heroBlock', 'headerBlock' ]
        },
        {
          name: 'content',
          title: 'Content',
          of: [ 'freeformBlock', 'featureBlock' ]
        },
        {
          name: 'socialProof',
          title: 'Social Proof',
          of: [ 'logoBlock', 'testimonialBlock' ]
        }
      ],
      views: [
        { name: 'grid' },
      ]
    }
  }
})