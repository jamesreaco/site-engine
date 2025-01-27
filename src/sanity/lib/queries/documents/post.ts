import { defineQuery } from "next-sanity";
import { pageBuilder } from "../fragments/page-builder";

export const POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] {
  'params': { 'slug': slug.current }
}`);

export const BLOG_PAGE_QUERY = defineQuery(`*[_type == 'blogPage'][0] {
  _type,
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

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == 'post' && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  "tableOfContents": content[style in ["h2", "h3", "h4", "h5", "h6"]],
  content[],
  category->{
    _id,
    title,
    categoryColor {
      value
    },
    'slug': slug.current,
  },
  author->{
    _id,
    name,
    username,
    bio,
    avatar { 
      asset->{ url }, 
    },
  },
  image { 
    asset->{ url }, 
    altText,
    caption, 
  },
  relatedPostsType,
  "relatedPosts": select(
    relatedPostsType == "custom" => customRelatedPosts[]->{ 
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      excerpt,
      category->{
        _id,
        title,
        categoryColor->{
          value
        },
        'slug': slug.current,
      },
      author->{
        _id,
        name,
        username,
        bio,
        avatar { 
          asset->{ url }, 
        },
      },
      image { 
        asset->{ url }, 
        altText 
      }
    },
    relatedPostsType == "autofill" => *[_type == 'post' && category._ref == ^.category._ref && _id != ^._id][0...3]{ 
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      category->{
        _id,
        title,
        categoryColor->{
          value
        },
        'slug': slug.current,
      },
      author->{
        _id,
        name,
        username,
        bio,
        avatar { 
          asset->{ url }, 
        },
      },
      excerpt,
      image { 
        asset->{ url }, 
        altText 
      }
    },
  ),
  "settings": *[_type == "blogSettings"][0] {
    showRelatedPosts,
    showTableOfContents,
    showPostsByCategory
  },
  "categories": *[_type == "postCategory"] {
    _id,
    title,
    'slug': slug.current,
  },
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "noIndex": seo.noIndex == true,
    "image": seo.image,
  },
}`);

export const ALL_POSTS_QUERY = defineQuery(`*[_type == 'post'] {
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  category->{
    _id,
    title,
    'slug': slug.current,
  },
  author->{
    _id,
    name,
    username,
    bio,
    avatar { 
      asset->{ url }, 
    },
  },
  image { 
    asset->{ url }, 
    altText 
  },
}`);

export const ALL_POST_CATEGORIES_QUERY = defineQuery(`*[_type == 'postCategory'] | order(orderRank asc) {
  _id,
  _type,
  title,
  'slug': slug.current,
}`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == 'post' && category->slug.current == $slug] {
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  category->{
    _id,
    title,
    'slug': slug.current,
  },
  author->{
    _id,
    name,
    username,
    bio,
    avatar { 
      asset->{ url }, 
    },
  },
  image { 
    asset->{ url }, 
    altText 
  },
}`);

export const POST_CATEGORY_BY_SLUG_QUERY = defineQuery(`*[_type == 'postCategory' && slug.current == $slug][0] {
  _id,
  _type,
  title,
  'slug': slug.current,
}`);