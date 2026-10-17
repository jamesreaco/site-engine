"use client"

import { usePathname } from 'next/navigation';
import PageSkeleton from '@/components/shared/PageSkeleton';
import BlogPostShell from '@/components/blog/BlogPostShell';
import PostGridSkeleton from '@/components/blog/PostGridSkeleton';
import ArchiveSkeleton from '@/components/shared/archive/ArchiveSkeleton';
import PostContentSkeleton from '@/components/blog/PostContentSkeleton';
import ProjectGridSkeleton from '@/components/projects/ProjectGridSkeleton';

export default function Loading() {

  const pathname = usePathname();

  if (pathname === '/blog' || pathname.startsWith('/blog/category/')) return (
    <ArchiveSkeleton>
      <PostGridSkeleton />
    </ArchiveSkeleton>
  );

  if (pathname.startsWith('/blog/')) return (
    <BlogPostShell>
      <PostContentSkeleton />
    </BlogPostShell>
  );

  if (pathname === '/projects' || pathname.startsWith('/projects/category/')) return (
    <ArchiveSkeleton>
      <ProjectGridSkeleton />
    </ArchiveSkeleton>
  );

  return (
    <PageSkeleton />
  )
};