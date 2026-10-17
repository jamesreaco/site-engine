import { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import PostGrid from '@/components/blog/PostGrid';
import { JsonLd } from '@/components/shared/JsonLd';
import ArchiveEmptyState from '@/components/shared/archive/ArchiveEmptyState';
import { itemListSchema, webPageSchema } from '@/lib/json-ld';
import { postCategoryBySlugQuery, postSlugsQuery, postsByCategoryQuery } from '@/sanity/lib/queries/documents/post';

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

  const { slug } = await params;

  const { data: category } = await sanityFetch({
    query: postCategoryBySlugQuery,
    params: { slug },
    stega: false,
  });

  if (!category) { return {} };

  return {
    title: `${category?.title} Posts`,
    description: `Browse our collection of ${category?.title?.toLowerCase()} posts.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/category/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
};

export default async function PostsByCategoryPage(props: {
  params: Promise<{ slug: string }>
}) {

  const params = await props.params;

  const { data: category } = await sanityFetch({
    query: postCategoryBySlugQuery,
    params,
  });

  const { data: posts } = await sanityFetch({
    query: postsByCategoryQuery,
    params: params
  });

  const path = `/blog/category/${params.slug}`;

  const jsonLd = (
    <>
      <JsonLd data={webPageSchema({
        schemaType: 'CollectionPage',
        title: category?.title ? `${category.title} Posts` : undefined,
        seo: category?.title
          ? { description: `Browse our collection of ${category.title.toLowerCase()} posts.` }
          : null,
        path,
        createdAt: category?._createdAt,
        updatedAt: category?._updatedAt,
      })} />
      {posts.length > 0 && (
        <JsonLd data={itemListSchema({ 
          items: posts, 
          path 
        })} />
      )}
    </>
  );

  if (posts.length === 0) {
    return (
      <>
        {jsonLd}
        <ArchiveEmptyState>
          No posts found in this category.
        </ArchiveEmptyState>
      </>
    )
  };

  return (
    <>
      {jsonLd}
      <PostGrid posts={posts} />
    </>
  )
};