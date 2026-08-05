import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'marketingSettings',
  title: 'Marketing Settings',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: "googleAnalyticsId",
      type: "string",
      title: "Google Analytics ID",
    }),
    defineField({
      name: "googleTagManagerId",
      type: "string",
      title: "Google Tag Manager ID",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Marketing Settings',
      }
    },
  },
})