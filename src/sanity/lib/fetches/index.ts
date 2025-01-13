import 'server-only'

import { PageType } from '@/types/page';
import { sanityFetch } from './utils/sanity-fetch';
import { PostCategoryType, PostType } from '@/types/post';
import { NavigationSettingsType } from '@/types/navigation';
import { pageBySlugQuery } from '../queries/documents/page';
import { BlogSettingsType, SettingsType } from '@/types/settings';
import { navigationSettingsQuery } from '../queries/singletons/navigation';
import { blogSettingsQuery, generalSettingsQuery } from '../queries/singletons/settings';
import { allPostCategoriesQuery, allPostsQuery, postBySlugQuery, postsByCategoryQuery } from '../queries/documents/post';
import { ServiceType } from '@/types/service';
import { allServicesQuery, serviceBySlugQuery, servicesPageQuery } from '../queries/documents/service';
import { allProjectCategoriesQuery, allProjectsQuery, projectBySlugQuery, projectsByCategoryQuery } from '../queries/documents/project';
import { ProjectCategoryType, ProjectType } from '@/types/project';

export async function fetchSettings() {
  return sanityFetch<SettingsType>({
    query: generalSettingsQuery,
    tags: ['generalSettings']
  })
}

export async function fetchBlogSettings() {
  return sanityFetch<BlogSettingsType>({
    query: blogSettingsQuery,
    tags: ['blogSettings']
  })
}

export async function fetchPageBySlug(slug: string) {
  return sanityFetch<PageType>({
    query: pageBySlugQuery,
    params: { slug: slug },
    tags: ['page']
  })
}

export async function fetchServiceBySlug(slug: string) {
  return sanityFetch<ServiceType>({
    query: serviceBySlugQuery,
    params: { slug: slug },
    tags: ['service']
  })
}

export async function fetchAllServices() {
  return sanityFetch<ServiceType[]>({
    query: allServicesQuery,
    tags: ['service']
  })
}

export async function fetchNavigationSettings() {
  return sanityFetch<NavigationSettingsType>({
    query: navigationSettingsQuery,
    tags: ['navigationSettings']
  })
}

export async function fetchAllPosts() {
  return sanityFetch<PostType[]>({
    query: allPostsQuery,
    tags: ['post']
  })
}

export async function fetchPostBySlug(slug: string) {
  return sanityFetch<PostType>({
    query: postBySlugQuery,
    params: { slug: slug },
    tags: ['post']
  })
}

export async function fetchPostCategories() {
  return sanityFetch<PostCategoryType[]>({
    query: allPostCategoriesQuery,
    tags: ['postCategory']
  })
}

export async function fetchPostsByCategory(slug: string) {
  return sanityFetch<PostType[]>({
    query: postsByCategoryQuery,
    params: { slug: slug },
    tags: ['post']
  })
}

export async function fetchServicesPage() {
  return sanityFetch<PageType>({
    query: servicesPageQuery,
    tags: ['servicesPage']
  })
}

export async function fetchAllProjects() {
  return sanityFetch<ProjectType[]>({
    query: allProjectsQuery,
    tags: ['project']
  })
}

export async function fetchProjectBySlug(slug: string) {
  return sanityFetch<ProjectType>({
    query: projectBySlugQuery,
    params: { slug: slug },
    tags: ['project']
  })
}

export async function fetchProjectCategories() {
  return sanityFetch<ProjectCategoryType[]>({
    query: allProjectCategoriesQuery,
    tags: ['projectCategory']
  })
}

export async function fetchProjectsByCategory(slug: string) {
  return sanityFetch<ProjectType[]>({
    query: projectsByCategoryQuery,
    params: { slug: slug },
    tags: ['project']
  })
}

