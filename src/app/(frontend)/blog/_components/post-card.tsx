import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Date from '@/components/ui/Date';
import { ChevronRight } from 'lucide-react';
import Author from '@/components/ui/Author';
import Heading from '@/components/shared/Heading';
import { AllPostsQueryResult } from "../../../../../sanity.types";
import AnimatedUnderline from '@/components/shared/AnimatedUnderline';

interface PostCardProps {
  post: AllPostsQueryResult[number];
};

export default function PostCard({ post }: PostCardProps) {

  const { _createdAt, title, category, author, slug, excerpt, image } = post;

  return (
    <article aria-label={title ?? ''} className='relative group pb-8 border-b border-dashed'>
      <Link href={`/blog/${slug}`} className='relative'>
        <Category>
          {category?.title}
        </Category>
        <Thumbnail image={image} />
        <Heading tag="h2" size="md" className='mt-5 md:mt-6 text-balance'>
          {title}   
        </Heading>
        <Excerpt>
          {excerpt}
        </Excerpt>
        <div className='mt-5 md:mt-6 flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            <Author author={author} classNames='-translate-y-0'/>
            <Date date={_createdAt} />
          </div>
          <ChevronRight 
            size={18} 
            className='-translate-x-6 opacity-0 group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 text-gray-600'
          />
        </div>
      </Link>
      <AnimatedUnderline className='-translate-y-0.5' />
    </article>
  )
};

function Thumbnail({ image }: {
  image?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
  } | null;
}) {
  
  if (!image?.asset?.url) return null;
  
  return (
    <div className='p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
      <Image
        src={image.asset.url}
        width={800}
        height={800}
        alt={image.altText ?? ''}
        className='aspect-[3/2] rounded-2xl'
      />
    </div>
  )
};

function Category({ children }: { children: React.ReactNode }) {
  return (
    <div className='z-10 absolute top-10 left-10 px-1.5 rounded-md text-sm font-medium text-nowrap bg-white'>
      {children}
    </div>
  )
};

function Excerpt({ children }: { children: React.ReactNode }) {
  return (
    <p className='mt-4 text-balance text-neutral-500'>
      {children}
    </p>
  )
};