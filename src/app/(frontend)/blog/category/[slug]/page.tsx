import { Metadata } from 'next';
import { CircleSlash } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/live';
import PostGrid from '../../_components/post-grid';
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

  const { data: category } = await sanityFetch({
    query: postCategoryBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!category) { return {} };

  return {
    title: `${category?.title} Posts`,
    description: `Browse our collection of ${category?.title?.toLowerCase()} posts.`
  }
};

export default async function PostsByCategoryPage(props: {
  params: Promise<{ slug: string }>
}) {

  const params = await props.params;

  const { data: posts } = await sanityFetch({ 
    query: postsByCategoryQuery, 
    params: params
  });

  if (posts.length === 0) {
    return (
      <div className="py-20 flex items-center justify-center gap-2 border border-dashed rounded-3xl text-center text-gray-600 bg-white">
        <CircleSlash size={20} className='text-red-500' /> <span className='font-medium antialiased'>No posts found in this category.</span>
      </div>
    )
  };

  return (
    <PostGrid posts={posts} />
  )
};