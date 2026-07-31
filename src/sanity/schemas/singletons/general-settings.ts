import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";
import { pageReferenceTypes } from "../misc/page-reference-types";

export default defineType({
  name: 'generalSettings',
  title: 'General Settings',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
    }),
    defineField({
      title: 'Logo',
      name: 'siteLogo',
      type: 'image',
    }),
    defineField({
      name: 'homePage',
      title: 'Home Page',
      type: 'reference',
      description: 'Choose which page you would like to set as the homepage.',
      to: [ ...pageReferenceTypes ]
    }),
    defineField({
      title: 'Email Address',
      name: 'companyEmailAddress',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      title: 'Phone Number',
      name: 'companyPhoneNumber',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      title: 'X (Twitter) Handle',
      name: 'twitterHandle',
      type: 'string',
      group: 'companyDetails',
      description: 'Your site\'s X (Twitter) username, including the @ symbol (e.g. @yourhandle). Used for the twitter:site meta tag when pages are shared on X.',
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        return /^@\w{1,15}$/.test(value) || 'Must be a valid handle starting with @ (e.g. @yourhandle)';
      }),
    }),
    defineField({
      name: 'companySocialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'companyDetails',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Platform Name',
            type: 'string',
          }),
          defineField({
            name: 'profileUrl',
            title: 'Profile URL',
            type: 'url',
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
          }),
        ]
      }]
    }),
    defineField({
      name: "copyright",
      type: "string",
      title: "Copyright",
      description: 'Current year and © symbol will be added automatically.'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      }
    },
  },
})