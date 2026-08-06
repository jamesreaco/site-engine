import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { webPageSchema } from '@/lib/json-ld';
import { sanityFetch } from '@/sanity/lib/live';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageBuilder } from '@/components/page-builder';
import { pageBySlugQuery, pageSlugsQuery } from '@/sanity/lib/queries/documents/page';

interface PageProps {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: pageSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return pages;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
};

export default async function Page({ params }: PageProps) {
  const { data: page } = await sanityFetch({ 
    query: pageBySlugQuery, 
    params: await params,
  });

  if (page === null) notFound();

  return (
    <>
      <JsonLd data={webPageSchema({ 
        title: page.title, 
        seo: page.seo, 
        documentType: page._type, slug: page.slug 
      })}/>
      <PageBuilder
        id={page?._id ?? ''}
        type={page?._type ?? ''}
        pageBuilder={page?.pageBuilder ?? []}
      />
    </>
  )
};