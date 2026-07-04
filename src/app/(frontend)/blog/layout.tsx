import React from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import BlogLayout from './_components/blog-layout';
import { blogPageQuery } from '@/sanity/lib/queries/documents/post';

export default async function BlogArchiveLayout({ children }: {
  children: React.ReactNode;
}) {
  
  const { data: page } = await sanityFetch({
    query: blogPageQuery,
  });

  return (
    <BlogLayout page={page}>
      {children}
    </BlogLayout>
  )
};