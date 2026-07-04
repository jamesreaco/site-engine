import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import PostGrid from './_components/post-grid';
import { sanityFetch } from '@/sanity/lib/live';
import { BlogPageQueryResult } from "../../../../sanity.types";
import { allPostsQuery, blogPageQuery } from '@/sanity/lib/queries/documents/post';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: blogPageQuery,
    stega: false
  });

  if (!page) { return {} };

  return processMetadata({ data: page as BlogPageQueryResult });
};

export default async function BlogArchivePage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <PostGrid posts={posts} />
  )
};