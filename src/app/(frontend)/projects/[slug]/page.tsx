import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageBuilder } from '@/components/page-builder';
import { creativeWorkSchema, webPageSchema } from '@/lib/json-ld';
import { ProjectBySlugQueryResult } from '../../../../../sanity.types';
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries/documents/project';

interface PageProps {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {  
  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!project) { return {} };

  return processMetadata({ data: project as ProjectBySlugQueryResult });
};

export default async function ProjectPage({ params }: PageProps) {
  const { data: project } = await sanityFetch({ 
    query: projectBySlugQuery, 
    params: await params
  });

  if (project === null) notFound();

  return (
    <>
      <JsonLd data={webPageSchema({ 
        title: project.title, 
        seo: project.seo, 
        documentType: project._type, 
        slug: project.slug 
      })} />
      <JsonLd data={creativeWorkSchema(project)} />
      <PageBuilder
        id={project?._id ?? ''}
        type={project?._type ?? ''}
        pageBuilder={project?.pageBuilder ?? []}
      />
    </>
  )
};