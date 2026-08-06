import { urlForImage } from '@/sanity/lib/utils';
import { resolveHref } from '@/lib/utils';

import {
  GeneralSettingsQueryResult,
  PostBySlugQueryResult,
  ProjectBySlugQueryResult,
  ServiceBySlugQueryResult,
} from '../../sanity.types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? '';

type SeoImage = Parameters<typeof urlForImage>[0];

type Seo = {
  title?: string | null;
  description?: string | null;
  image?: SeoImage | null;
} | null;

function absoluteUrl(path?: string | null) {
  return path ? `${siteUrl}${path}` : siteUrl;
};

function seoImageUrl(image?: SeoImage | null) {
  return image ? urlForImage(image)?.width(1200).height(630).url() : undefined;
};

export function organizationSchema(settings: GeneralSettingsQueryResult) {

  const sameAs = (settings?.companySocialMediaLinks ?? [])
    .map((link) => link?.profileUrl)
    .filter((url): url is string => Boolean(url));

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: settings?.siteTitle || siteName,
    url: siteUrl,
    ...(settings?.siteLogo?.asset?.url && { logo: settings.siteLogo.asset.url }),
    ...(settings?.companyEmailAddress && { email: settings.companyEmailAddress }),
    ...(settings?.companyPhoneNumber && { telephone: settings.companyPhoneNumber }),
    ...(sameAs.length > 0 && { sameAs }),
  };
};

export function websiteSchema(settings: GeneralSettingsQueryResult) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: settings?.siteTitle || siteName,
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
  };
};

export function webPageSchema({
  schemaType = 'WebPage',
  title,
  seo,
  documentType,
  slug,
  path,
}: {
  schemaType?: 'WebPage' | 'CollectionPage';
  title?: string | null;
  seo?: Seo;
  documentType?: string;
  slug?: string | null;
  path?: string;
}) {

  const url = absoluteUrl(path ?? resolveHref(documentType, slug ?? undefined));
  const image = seoImageUrl(seo?.image);

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${url}#webpage`,
    url,
    name: seo?.title || title || siteName,
    ...(seo?.description && { description: seo.description }),
    ...(image && { image }),
    isPartOf: { '@id': `${siteUrl}/#website` },
  };
};

export function articleSchema(post: PostBySlugQueryResult) {
  if (!post) return null;

  const url = absoluteUrl(resolveHref('post', post.slug ?? undefined));
  const image = seoImageUrl(post.seo?.image) ?? post.image?.asset?.url ?? undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    headline: post.seo?.title || post.title,
    ...((post.seo?.description || post.excerpt) && {
      description: post.seo?.description || post.excerpt,
    }),
    ...(image && { image }),
    url,
    datePublished: post._createdAt,
    dateModified: post._createdAt,
    ...(post.author?.name && {
      author: { '@type': 'Person', name: post.author.name },
    }),
    ...(post.category?.title && { articleSection: post.category.title }),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
};

export function serviceSchema(service: ServiceBySlugQueryResult) {
  if (!service) return null;

  const url = absoluteUrl(resolveHref('service', service.slug ?? undefined));
  const image = seoImageUrl(service.seo?.image);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.seo?.title || service.title,
    ...(service.seo?.description && { description: service.seo.description }),
    ...(image && { image }),
    url,
    provider: { '@id': `${siteUrl}/#organization` },
  };
};

export function creativeWorkSchema(project: ProjectBySlugQueryResult) {
  if (!project) return null;

  const url = absoluteUrl(resolveHref('project', project.slug ?? undefined));
  const image = seoImageUrl(project.seo?.image);

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#creativework`,
    name: project.seo?.title || project.title,
    ...(project.seo?.description && { description: project.seo.description }),
    ...(image && { image }),
    url,
    ...(project.category?.title && { about: project.category.title }),
    creator: { '@id': `${siteUrl}/#organization` },
  };
};

export function itemListSchema({ items, path }: {
  items: Array<{ title?: string | null; slug?: string | null; _type?: string | null }>;
  path: string;
}) {

  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(resolveHref(item._type ?? undefined, item.slug ?? undefined)),
      name: item.title,
    })),
  };
};