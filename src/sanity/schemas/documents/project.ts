import { fieldsets } from "../misc/fieldsets";
import { BriefcaseBusiness } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: BriefcaseBusiness,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Alternative Text',
          type: 'string'
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }),
        defineField({
          title: "Corner Radius",
          name: "cornerRadius",
          type: "string",
          options: {
            list: [
              { title: "Rounded", value: "rounded" },
              { title: "Straight", value: "straight" },
            ],
          },
          initialValue: 'rounded',
        }),
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
    }),
  ]
})