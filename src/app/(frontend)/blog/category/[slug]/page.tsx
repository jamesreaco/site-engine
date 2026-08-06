import { Metadata } from 'next';
import { CircleSlash } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/live';
import PostGrid from '@/components/blog/PostGrid';
import { JsonLd } from '@/components/shared/JsonLd';
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
        <div className="py-20 flex items-center justify-center gap-2 border border-dashed rounded-3xl text-center text-gray-600 bg-white">
          <CircleSlash  
            size={20} 
            className='text-red-500' /> 
            <span className='font-medium antialiased'>
              No posts found in this category.
            </span>
        </div>
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