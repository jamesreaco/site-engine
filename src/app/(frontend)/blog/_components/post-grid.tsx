import React from 'react';
import PostCard from './post-card';
import { AllPostsQueryResult } from "../../../../../sanity.types";

interface PostGridProps {
  posts: AllPostsQueryResult;
};

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
};