import Skeleton from '@/components/ui/Skeleton';
import Container from '@/components/global/Container';

export default function PageSkeleton() {
  return (
    <div 
      role="status"
      aria-label="Loading page"
      className='animate-pulse'
    >
      <HeroSkeleton />
      <FeatureCardsSkeleton />
    </div>
  )
};

function HeroSkeleton() {
  return (
    <section className='px-4 md:px-10 pattern-bg border-b border-b-gray-200/60'>
      <Container className='pb-7 md:pb-12 space-y-10 xl:-space-y-6 border-x border-dashed'>
        <div className='pt-[calc(9rem+var(--announcement-bar-height,0px))] md:pt-[calc(13rem+var(--announcement-bar-height,0px))] pb-6 md:pb-24 xl:pb-36 grid grid-cols-12 gap-3 md:gap-6 xl:gap-14 md:px-14 md:border-x md:border-dashed'>
          <div className='col-span-12 xl:col-span-7 space-y-2 md:space-y-3'>
            <Skeleton className='h-9 md:h-12 w-full md:max-w-[40rem]' />
            <Skeleton className='h-9 md:h-12 w-[80%] md:max-w-[32rem]' />
          </div>
          <div className='col-span-12 xl:col-span-5'>
            <div className='mt-3 space-y-2'>
              <Skeleton className='h-4 md:h-5 w-full bg-gray-100' />
              <Skeleton className='h-4 md:h-5 w-[95%] bg-gray-100' />
              <Skeleton className='h-4 md:h-5 w-[70%] bg-gray-100' />
            </div>
            <div className='mt-8 md:mt-10 flex items-center gap-3'>
              <Skeleton className='h-9 md:h-10 w-32' />
              <Skeleton className='h-9 md:h-10 w-40' />
            </div>
          </div>
        </div>
        <div className='p-4 md:p-6 border border-dashed rounded-3xl md:rounded-4xl pattern-bg--2'>
          <Skeleton className='aspect-video w-full rounded-2xl md:rounded-3xl' />
        </div>
      </Container>
    </section>
  )
};

function FeatureCardsSkeleton() {
  return (
    <section className='px-4 xl:px-10'>
      <Container className='py-16 md:py-28 px-4 space-y-8 md:space-y-6 border-x border-dashed'>
        <div className='max-w-[60rem] mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-6 items-center justify-between border-y border-dashed pattern-bg--2'>
          <Skeleton className='h-8 md:h-10 w-full md:w-[45%]' />
          <Skeleton className='h-9 md:h-10 w-36 shrink-0' />
        </div>
        <div className='max-w-[60rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='border border-dashed rounded-3xl'>
              <div className='p-3'>
                <Skeleton className='h-[280px] w-full rounded-2xl' />
              </div>
              <div className='mt-5 px-6 md:px-8 pb-8 space-y-6'>
                <Skeleton className='h-9 w-[60%]' />
                <div className='space-y-2.5'>
                  <Skeleton className='h-4 w-full bg-gray-100' />
                  <Skeleton className='h-4 w-[90%] bg-gray-100' />
                  <Skeleton className='h-4 w-[70%] bg-gray-100' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
};