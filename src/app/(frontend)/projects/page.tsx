import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import ProjectGrid from './_components/project-grid';
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
  const { data: projects } = await sanityFetch({
    query: allProjectsQuery,
  });

  return (
    <ProjectGrid projects={projects} />
  )
};