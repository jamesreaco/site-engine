"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import ProjectToolbar from './project-toolbar';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import { PageBuilder } from '@/components/page-builder';
import { ProjectsPageQueryResult } from '../../../../../sanity.types';

export default function ProjectsLayout({ children, page }: Readonly<{
  children: React.ReactNode;
  page: ProjectsPageQueryResult;
}>) {

  const pathname = usePathname();

  const { categories, projects, title } = page ?? {};

  if (pathname === '/projects' || pathname.includes('/projects/category/')) return (
    <main className='overflow-hidden md:overflow-auto'>
      <div className='px-4 xl:px-10 pattern-bg'>
        <Container className='px-4 pt-32 md:pt-40 pb-14 md:pb-28 border-x border-dashed'>
          <Heading tag="h1" size="xxxl">
            {title}
          </Heading>
          {(pathname === '/projects' || pathname.includes('/projects/category/')) && (
            <ProjectToolbar categories={categories} projects={projects} />
          )}
          {children}
        </Container>
      </div>
      <PageBuilder
        id={page?._id ?? ''}
        type={page?._type ?? ''}
        pageBuilder={page?.pageBuilder ?? []}
      />
    </main>
  )

  return (
    <>
      {children}
    </>
  )
}