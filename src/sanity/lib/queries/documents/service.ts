import { defineQuery } from "next-sanity";
import { pageBuilder } from "../fragments/page-builder";

export const serviceSlugsQuery = defineQuery(`*[_type == "service" && defined(slug.current)] {
  'params': { 'slug': slug.current }
}`);

export const serviceBySlugQuery = defineQuery(`*[_type == 'service' && slug.current == $slug][0] {
  _id,
  _type,
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

export const allServicesQuery = defineQuery(`*[_type == 'service'] {
  _type,
  title,
  'slug': slug.current,
  ${pageBuilder},
}`);

export const servicesPageQuery = defineQuery(`*[_type == 'servicesPage'][0] {
  _id,
  _type,
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