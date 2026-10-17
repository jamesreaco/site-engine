"use client"

import PostGrid from './PostGrid';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { AllPostsQueryResult } from "../../../sanity.types";
import ArchiveEmptyState from '@/components/shared/archive/ArchiveEmptyState';

interface FilteredPostGridProps {
  posts: AllPostsQueryResult;
};

export default function FilteredPostGrid({ posts }: FilteredPostGridProps) {

  const filteredPosts = useCategoryFilter(posts, '/blog');

  if (filteredPosts.length === 0) return (
    <ArchiveEmptyState>
      No posts found in these categories.
    </ArchiveEmptyState>
  );

  return (
    <PostGrid posts={filteredPosts} />
  )
};