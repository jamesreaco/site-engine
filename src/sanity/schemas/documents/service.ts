import { fieldsets } from "../misc/fieldsets";
import { BriefcaseBusiness } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: BriefcaseBusiness,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  orderings: [orderRankOrdering],
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
    orderRankField({ 
      type: 'service' 
    }),
  ]
})