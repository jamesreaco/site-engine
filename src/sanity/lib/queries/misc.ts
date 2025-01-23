import { defineQuery } from "next-sanity";

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "post", "project", "service", "blogPage", "projectsPage", "servicesPage"] && defined(slug.current)] {
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/blog/" + slug.current,
      _type == "blogPage" => "/blog",
      _type == "project" => "/projects/" + slug.current,
      _type == "projectsPage" => "/projects",
      _type == "service" => "/services/" + slug.current,
      _type == "servicesPage" => "/services",
      slug.current
    ),
    _updatedAt
  }
`)