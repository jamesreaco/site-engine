import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { JsonLd } from '@/components/shared/JsonLd';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { itemListSchema, webPageSchema } from '@/lib/json-ld';
import { ProjectsPageQueryResult } from '../../../../sanity.types';
import { allProjectsQuery, projectsPageQuery } from '@/sanity/lib/queries/documents/project';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: projectsPageQuery,
    stega: false
  });

  if (!page) { return {} };

  return processMetadata({ data: page as ProjectsPageQueryResult });
};

export default async function ProjectsPage() {
  const { data: page } = await sanityFetch({
    query: projectsPageQuery,
  });

  const { data: projects } = await sanityFetch({
    query: allProjectsQuery,
  });

  return (
    <>
      <JsonLd data={webPageSchema({ 
        schemaType: 'CollectionPage', 
        title: page?.title, 
        seo: page?.seo,
        documentType: 'projectsPage' 
      })} />
      {projects && projects.length > 0 && (
        <JsonLd data={itemListSchema({ 
          items: projects, 
          path: '/projects' 
        })} />
      )}
      <ProjectGrid projects={projects} />
    </>
  )
};