import { BriefcaseBusiness } from "lucide-react";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { paddingFields } from "../../misc/padding-fields";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageReferenceTypes } from "../../misc/page-reference-types";

export default defineType({
  name: 'servicesBlock',
  title: 'Services',
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }]
        })
      ]
    }),
    defineField({
      title: "Background",
      name: "background",
      type: "string",
      options: {
        list: [
          { title: "White Background", value: "white" },
          { title: "Pattern Background", value: "pattern" },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      title: "Corner Radius - Top L/R",
      name: "topCornerRadius",
      type: "string",
      options: {
        list: [
          { title: "Straight", value: "straight" },
          { title: "Rounded", value: "rounded" },
        ],
      },
      initialValue: 'straight',
    }),
    defineField({
      name: 'showButton',
      title: 'Show Button',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'buttonPageReference',
      title: 'Button Page Reference',
      description: 'The page that the button will link to.',
      type: 'reference',
      to: [ ...pageReferenceTypes ]
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
        title: title ?? 'No heading set. Add one inside this block',
        subtitle: 'Services',
        media: BriefcaseBusiness,
      }
    },
  },
})