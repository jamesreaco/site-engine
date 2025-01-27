import { defineQuery } from "next-sanity";

export const GENERAL_SETTINGS_QUERY = defineQuery(`*[_type == 'generalSettings'][0] {
  siteTitle,
  siteLogo { 
    asset->{ url },
  },
  copyright,
  homePage->{
    _id,
    title,
    'slug': slug.current,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "noIndex": seo.noIndex == true
    },
  },
}`); 

export const MARKETING_SETTINGS_QUERY = defineQuery(`*[_type == 'marketingSettings'][0] {
  googleAnalyticsId,
  googleTagManagerId,
}`);

export const BLOG_SETTINGS_QUERY = defineQuery(`*[_type == 'blogSettings'][0] {
  showRelatedPosts,
  showTableOfContents,
  showPostsByCategory
}`);