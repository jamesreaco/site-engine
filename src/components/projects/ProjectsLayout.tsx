"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { PageBuilder } from '@/components/page-builder';
import ArchiveShell from '@/components/shared/archive/ArchiveShell';
import ArchiveHeader from '@/components/shared/archive/ArchiveHeader';
import { ProjectsPageQueryResult } from '../../../sanity.types';

export default function ProjectsLayout({ children, page }: Readonly<{
  children: React.ReactNode;
  page: ProjectsPageQueryResult;
}>) {

  const pathname = usePathname();

  const { categories, title } = page ?? {};

  if (pathname === '/projects' || pathname.includes('/projects/category/')) return (
    <ArchiveShell
      after={
        <PageBuilder
          id={page?._id ?? ''}
          type={page?._type ?? ''}
          pageBuilder={page?.pageBuilder ?? []}
        />
      }
    >
      <ArchiveHeader 
        title={title}
        categories={categories}
        basePath='/projects'
        allCategoriesLabel='All Projects'
      />
      {children}
    </ArchiveShell>
  );

  return (
    <>
      {children}
    </>
  );
};