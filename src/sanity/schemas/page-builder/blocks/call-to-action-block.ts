import { Clapperboard } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { paddingFields } from "../../misc/padding-fields";

export default defineType({
  name: 'callToActionBlock',
  title: 'Call To Action',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'buttonObject' }],
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
    ...paddingFields
  ],
  preview: {
    select: {
      title: 'heading',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Call To Action',
        media: Clapperboard,
      }
    },
  },
})