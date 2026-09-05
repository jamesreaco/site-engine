import React from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div 
      aria-hidden="true"
      className={cn('rounded-full bg-gray-200', className)} 
      {...props} 
    />
  )
};