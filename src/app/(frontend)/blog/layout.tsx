import React from 'react';
import BlogLayout from './_components/blog-layout';
import { sanityFetch } from '@/sanity/config/live';
import { allPostCategoriesQuery, allPostsQuery } from '@/sanity/lib/queries/documents/post';

export default async function BlogArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const { data: categories } = await sanityFetch({
    query: allPostCategoriesQuery,
  });

  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <BlogLayout categories={categories} posts={posts}>
      {children}
    </BlogLayout>
  )
}
