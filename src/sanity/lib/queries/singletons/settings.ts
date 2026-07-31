import { defineQuery } from "next-sanity";

export const twitterHandleQuery = defineQuery(`*[_type == 'generalSettings'][0].twitterHandle`);

export const generalSettingsQuery = defineQuery(`*[_type == 'generalSettings'][0] {
  siteTitle,
  twitterHandle,
  siteLogo { 
    asset->{ url },
  },
  copyright,
  homePage->{
    _id,
    _type,
    title,
    'slug': slug.current,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "noIndex": seo.noIndex == true,
      "image": seo.image,
    },
  },
}`); 

export const marketingSettingsQuery = defineQuery(`*[_type == 'marketingSettings'][0] {
  googleAnalyticsId,
  googleTagManagerId,
}`);

export const blogSettingsQuery = defineQuery(`*[_type == 'blogSettings'][0] {
  showRelatedPosts,
  showTableOfContents,
  showPostsByCategory
}`);