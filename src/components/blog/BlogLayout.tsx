"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import BlogPostShell from './BlogPostShell';
import { PageBuilder } from '@/components/page-builder';
import ArchiveShell from '@/components/shared/archive/ArchiveShell';
import ArchiveHeader from '@/components/shared/archive/ArchiveHeader';
import { BlogPageQueryResult } from '../../../sanity.types';

export default function BlogLayout({ children, page }: Readonly<{
  children: React.ReactNode;
  page: BlogPageQueryResult;
}>) {

  const pathname = usePathname();

  const { categories, title } = page ?? {};

  if (pathname === '/blog' || pathname.includes('/blog/category/')) return (
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
        basePath='/blog'
        allCategoriesLabel='All Posts'
      />
      {children}
    </ArchiveShell>
  )

  return (
    <BlogPostShell>
      {children}
    </BlogPostShell>
  )
};