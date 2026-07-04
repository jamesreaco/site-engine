import React from 'react';
import { BlogSearch } from './blog-search';
import PostCategories from './post-categories';
import { BlogPageQueryResult } from '../../../../../sanity.types';

type Blog = NonNullable<
  NonNullable<BlogPageQueryResult>
>;

interface BlogToolbarProps {
  categories?: Blog["categories"];
  posts?: Blog['posts'];
};

export default function BlogToolbar({ categories, posts }: BlogToolbarProps) {
  return (
    <>
      <BlogSearch 
        posts={posts ?? []} 
        classNames='mt-4 lg:hidden' 
      />
      <div className='relative z-20 overflow-x-scroll lg:overflow-visible -mx-4 lg:-mx-0 py-4 lg:py-2 pl-4 md:pl-0 mt-6 lg:mt-16 mb-6 lg:mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-2 border-y border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
        <PostCategories 
          categories={categories ?? []} 
        />
        <BlogSearch 
          posts={posts ?? []} 
          classNames='hidden lg:block' 
        />
        <EdgeBlur />
      </div>
    </>
  )
};

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
};