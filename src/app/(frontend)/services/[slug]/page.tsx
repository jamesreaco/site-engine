import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { PageBuilder } from '@/components/page-builder';
import { serviceBySlugQuery, serviceSlugsQuery } from '@/sanity/lib/queries/documents/service';

interface PageProps {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: serviceSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: service } = await sanityFetch({
    query: serviceBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!service) { return {} };

  return processMetadata({ data: service});
};

export default async function ServicePage({ params }: PageProps) {
  const { data: service } = await sanityFetch({ 
    query: serviceBySlugQuery, 
    params: await params
  });
  
  if (service === null) notFound();

  return (
    <PageBuilder
      id={service?._id ?? ''}
      type={service?._type ?? ''}
      pageBuilder={service?.pageBuilder ?? []}
    />
  )
};