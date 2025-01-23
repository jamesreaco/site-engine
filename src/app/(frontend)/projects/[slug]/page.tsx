import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import PageBuilder from '@/components/page-builder';
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries/documents/project';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {  
  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!project) { return {} };

  return processMetadata({ data: project });
}

export default async function ProjectPage({ params }: PageProps) {
  const { data: project } = await sanityFetch({ 
    query: projectBySlugQuery, 
    params: await params
  });

  if (project === null) notFound();
  
  return (
    <main className="overflow-hidden">
      <PageBuilder blocks={project?.pageBuilder} />
    </main>
  )
}