import { defineDocuments, defineLocations, PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug === 'home' ? '/' : `/${doc?.slug}`,
          },
        ],
      }),
    }),
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
          { title: 'Blog', href: `/blog` },
        ],
      }),
    }),
    service: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/services/${doc?.slug}`,
          },
          { title: 'Services', href: `/services` },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/projects/${doc?.slug}`,
          },
          { title: 'Projects Index', href: `/projects` },
        ],
      }),
    }),
    servicesPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Services', href: `/services` },
        ],
      }),
    }),
    projectsPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Projects', href: `/projects` },
        ],
      }),
    }),
    blogPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Blog', href: `/blog` },
        ],
      }),
    }),
    postCategory: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/category/${doc?.slug}`,
          },
          { title: 'Blog', href: `/blog` },
        ],
      }),
    }),
    projectCategory: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/projects/category/${doc?.slug}`,
          },
          { title: 'Projects Index', href: `/projects` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == 'page' && _id == *[_type == 'generalSettings'][0].homePage._ref`,
    },
    {
      route: "/services",
      filter: `_type == 'servicesPage'`,
    },
    {
      route: "/projects",
      filter: `_type == 'projectsPage'`,
    },
    {
      route: "/blog",
      filter: `_type == 'blogPage'`,
    },
    {
      route: "/blog/category/:slug",
      filter: `_type == 'postCategory' && slug.current == $slug`,
    },
    {
      route: "/projects/category/:slug",
      filter: `_type == 'projectCategory' && slug.current == $slug`,
    },
    {
      route: "/projects/:slug",
      filter: `_type == 'project' && slug.current == $slug`,
    },
    {
      route: "/services/:slug",
      filter: `_type == 'service' && slug.current == $slug`,
    },
    {
      route: "/blog/:slug",
      filter: `_type == 'post' && slug.current == $slug`,
    },
    {
      route: "/:slug",
      filter: `_type == 'page' && slug.current == $slug`,
    },
  ]),
};