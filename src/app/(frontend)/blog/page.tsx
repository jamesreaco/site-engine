import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import PostGrid from '@/components/blog/PostGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import { itemListSchema, webPageSchema } from '@/lib/json-ld';
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
  const { data: page } = await sanityFetch({
    query: blogPageQuery,
  });

  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <>
      <JsonLd data={webPageSchema({ 
        schemaType: 'CollectionPage', 
        title: page?.title, 
        seo: page?.seo, 
        documentType: 'blogPage' 
      })} />
      {posts && posts.length > 0 && (
        <JsonLd data={itemListSchema({ 
          items: posts, 
          path: '/blog' 
        })} />
      )}
      <PostGrid posts={posts} />
    </>
  )
};