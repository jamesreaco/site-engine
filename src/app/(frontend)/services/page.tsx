import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { PageBuilder } from '@/components/page-builder';
import { servicesPageQuery } from '@/sanity/lib/queries/documents/service';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: servicesPageQuery,
    stega: false
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
};

export default async function ServicesPage() {

  const { data: page } = await sanityFetch({
    query: servicesPageQuery,
  });

  if (page === null) notFound();

  return (
    <PageBuilder
      id={page?._id ?? ''}
      type="servicesPage"
      pageBuilder={page?.pageBuilder ?? []}
    />
  )
};