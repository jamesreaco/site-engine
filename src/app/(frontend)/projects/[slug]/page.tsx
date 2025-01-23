import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import PageBuilder from '@/components/page-builder';
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries/documents/project';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: PROJECT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {  
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: await params,
    stega: false,
  });

  if (!project) { return {} };

  return processMetadata({ data: project });
}

export default async function ProjectPage({ params }: PageProps) {
  const { data: project } = await sanityFetch({ 
    query: PROJECT_BY_SLUG_QUERY, 
    params: await params
  });

  if (project === null) notFound();
  
  return (
    <PageBuilder blocks={project?.pageBuilder} />
  )
}