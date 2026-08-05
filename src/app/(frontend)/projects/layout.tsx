import React from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import ProjectsLayout from '@/components/projects/ProjectsLayout';
import { projectsPageQuery } from '@/sanity/lib/queries/documents/project';

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  
  const { data: page } = await sanityFetch({
    query: projectsPageQuery,
  });
  
  return (
    <ProjectsLayout page={page}>
      {children}
    </ProjectsLayout>
  )
};