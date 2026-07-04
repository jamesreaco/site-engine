import React from 'react';

export default function Loading() {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <CardSkeleton />
        </div>
      ))}
    </div>
  )
};

function CardSkeleton() {
  return (
    <article className='pb-10 border-b border-dashed'>
      <div className='relative space-y-6'>
        <div className='z-10 absolute top-10 left-10 px-1.5 rounded-md text-sm font-medium bg-white' />
        <div className='h-72 p-4 rounded-3xl border border-dashed'>
          <div className='h-full rounded-2xl animate-pulse bg-gray-200'></div>
        </div>
        <div className='space-y-2'>
          <div className='h-5 w-[80%] rounded-full bg-gray-200' />
          <div className='h-5 w-[60%] rounded-full bg-gray-200' />
        </div>
        <div className='space-y-2'>
          <div className='h-1 w-[80%] rounded-full bg-gray-100' />
          <div className='h-1 w-[75%] rounded-full bg-gray-100' />
          <div className='h-1 w-[70%] rounded-full bg-gray-100' />
          <div className='h-1 w-[75%] rounded-full bg-gray-100' />
        </div>
      </div>
    </article>
  )
};