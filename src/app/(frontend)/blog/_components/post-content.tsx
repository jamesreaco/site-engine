"use client"

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import Date from '@/components/ui/Date';
import Author from '@/components/ui/Author';
import Heading from '@/components/shared/Heading';
import BackButton from '@/components/shared/BackButton';
import { Tag, ImageIcon, ChevronDown } from 'lucide-react';
import { PostBySlugQueryResult } from '../../../../../sanity.types';
import AnimatedUnderline from '@/components/shared/AnimatedUnderline';
import TableOfContents from '@/components/portable-text/TableOfContents';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';

type Post = NonNullable<
  NonNullable<PostBySlugQueryResult>
>;

interface PostGridProps {
  post: Post;
};

export default function PostContent({ post }: PostGridProps) {

  const { 
    title, 
    _createdAt, 
    category,
    author, 
    content, 
    tableOfContents, 
    excerpt, 
    image,
    categories,
    settings
  } = post;
  
  return (
    <div className='order-0 grid grid-cols-12 gap-y-10 xl:gap-20'>
      <aside className='col-span-12 xl:col-span-2 xl:sticky xl:top-28 h-fit -translate-x-1 md:-translate-x-0'>
        <BackButton />
      </aside>
      <div className='order-2 xl:order-1 col-span-12 xl:col-span-7 xl:pl-10 xl:border-l xl:border-dashed'>
        <div className='flex items-center gap-3'>
          <Author author={author} />
          <Category category={category} /> 
          <Date date={_createdAt} />
        </div>
        <Heading tag="h1" size="xxl" className='mt-8'>
          {title}
        </Heading>
        <aside className='xl:hidden mt-8 order-1 xl:order-2 col-span-12 xl:col-span-3 xl:sticky xl:top-28 h-fit space-y-5'>
          {settings?.showTableOfContents && (
            <TableOfContents content={tableOfContents} />
          )}
          {settings?.showPostsByCategory && (
            <PostCategories categories={categories}/>
          )}
        </aside>
        <Thumbnail image={image} />
        <p className='text-lg xl:text-xl my-10 xl:my-14 py-8 border-y border-dashed'>
          {excerpt}
        </p>
        <div>
          <PortableTextEditor data={content} />
        </div>
      </div>
      <aside className='hidden xl:block order-1 xl:order-2 col-span-12 xl:col-span-3 xl:sticky xl:top-28 h-fit space-y-5'>
        {settings?.showTableOfContents && (
          <TableOfContents content={tableOfContents} />
        )}
        {settings?.showPostsByCategory && (
          <PostCategories categories={categories}/>
        )}
      </aside>
    </div>
  )
};

function Thumbnail({ image }: {
  image?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
  } | null;
}) {
  return (
    <>
      <div className='mt-10 p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50'>
        <Image
          src={image?.asset?.url ?? ''}
          width={800}
          height={800}
          alt={image?.altText ?? ''}
          className='aspect-[3/2] w-full rounded-2xl'
        />
      </div>
      <div className='flex items-center justify-center gap-1 mt-4 text-center text-gray-600'>
        <ImageIcon size={15} />
        {image?.altText}
      </div>
    </>
  )
};

function Category({ category }: {
  category: Post['category'];
}) {
  return (
    <Link 
      href={`/blog/category/${category?.slug}`} 
      className='flex items-center gap-1 px-1.5 rounded-full bg-black'
    >
      <span 
        className='h-2 w-2 rounded bg-violet-300' 
        style={{ backgroundColor: category?.categoryColor?.value ?? '#FFFFFF' }} 
      />
      <span className='pr-[1.5px] text-sm text-white'>
        {category?.title}
      </span>
    </Link>
  )
};

function PostCategories({ categories }: {
  categories: Post['categories'];
}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-4"
    >
      <CollapsibleTrigger className="w-full">
        <div className="py-1.5 pl-2 flex items-center justify-between border border-dashed rounded-lg">
          <div className="flex items-center gap-2">
            <span className='h-5 w-5 flex items-center justify-center rounded bg-gray-200 text-black'>
              <Tag size={12} />
            </span>
            <span className='font-medium text-sm'>
              Explore Categories
            </span>
          </div>
          <ChevronDown 
            size={15} 
            className={cn('mr-2.5 -rotate-90 transition-transform duration-200', {
              '-rotate-0': isOpen
            })}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-200">
        <ul role="list" className="space-y-2 border-l border-dashed">
          {categories?.map((category) => (
            <li key={category?.slug}>
              <Link 
                href={`/blog/category/${category?.slug}`}
                className="flex items-center gap-2 scroll-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="block w-2.5 border-t border-dashed text-gray-300" /> 
                <span className="relative group w-fit">
                  {category?.title}
                  <AnimatedUnderline />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
};