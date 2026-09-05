import Skeleton from '@/components/ui/Skeleton';

interface ProjectGridSkeletonProps {
  count?: number;
};

export default function ProjectGridSkeleton({ count = 6 }: ProjectGridSkeletonProps) {
  return (
    <div 
      role="status"
      aria-label="Loading projects"
      className='animate-pulse grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  )
};

function ProjectCardSkeleton() {
  return (
    <article className='relative pb-10 border-b border-dashed'>
      <div className='relative'>
        <div className='z-10 absolute top-10 left-10 px-1.5 py-1 rounded-md bg-white'>
          <Skeleton className='h-3.5 w-11 rounded bg-gray-300' />
        </div>
        <div className='p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
          <Skeleton className='aspect-[3/2] w-full rounded-2xl' />
        </div>
        <div className='mt-5 md:mt-6 space-y-2.5'>
          <Skeleton className='h-5 md:h-6 w-[85%]' />
          <Skeleton className='h-5 md:h-6 w-[55%]' />
        </div>
        <div className='mt-4 space-y-2'>
          <Skeleton className='h-4 w-full bg-gray-100' />
          <Skeleton className='h-4 w-[90%] bg-gray-100' />
          <Skeleton className='h-4 w-[70%] bg-gray-100' />
        </div>
      </div>
    </article>
  )
};