import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { JsonLd } from '@/components/shared/JsonLd';
import PostContent from '@/components/blog/PostContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { articleSchema, webPageSchema } from '@/lib/json-ld';
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries/documents/post';
import { AllPostsQueryResult, PostBySlugQueryResult } from '../../../../../sanity.types';

interface PageProps {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!post) { return {} };

  return processMetadata({ data: post as PostBySlugQueryResult });
};

export default async function PostPage({ params }: PageProps) {
  const { data: post } = await sanityFetch({ 
    query: postBySlugQuery, 
    params: await params
  });

  if (post === null) notFound();

  const showRelatedPosts = post?.relatedPosts && 
    post.relatedPosts.length > 0 && 
    post.settings?.showRelatedPosts;

  return (
    <>
      <JsonLd data={webPageSchema({ 
        title: post.title, 
        seo: post.seo, 
        documentType: post._type, 
        slug: post.slug 
      })} />
      <JsonLd data={articleSchema(post)} />
      <PostContent post={post} />
      {showRelatedPosts && (
        <RelatedPosts posts={post.relatedPosts as AllPostsQueryResult} />
      )}
    </>
  )
};