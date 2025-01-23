import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import PageBuilder from '@/components/page-builder';
import { PAGE_BY_SLUG_QUERY, PAGE_SLUGS_QUERY } from '@/sanity/lib/queries/documents/page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return pages;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: await params,
    stega: false,
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
}

export default async function Page({ params }: PageProps) {
  const { data: page } = await sanityFetch({ 
    query: PAGE_BY_SLUG_QUERY, 
    params: await params,
  });

  if (page === null) notFound();

  return (
    <main className="overflow-hidden">
      <PageBuilder blocks={page?.pageBuilder} />
    </main>
  )
}