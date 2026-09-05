import { defineQuery } from "next-sanity";
import { pageBuilder } from "../fragments/page-builder";

export const pageSlugsQuery = defineQuery(`*[_type == "page" && defined(slug.current)] {
  'params': { 'slug': slug.current }
}`);

export const pageBySlugQuery = defineQuery(`*[_type == 'page' && slug.current == $slug][0] {
  _type,
  _id,
  _createdAt,
  _updatedAt,
  title,
  'slug': slug.current,
  ${pageBuilder},
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "noIndex": seo.noIndex == true,
    "image": seo.image,
  },
}`);