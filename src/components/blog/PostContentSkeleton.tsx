import Skeleton from '@/components/ui/Skeleton';

export default function PostContentSkeleton() {
  return (
    <div 
      role="status"
      aria-label="Loading post"
      className='animate-pulse order-0 grid grid-cols-12 gap-y-10 xl:gap-20'
    >
      <aside className='col-span-12 xl:col-span-2 xl:sticky xl:top-28 h-fit -translate-x-1 md:-translate-x-0'>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-[18px] w-[18px] rounded' />
          <Skeleton className='h-5 w-11' />
        </div>
      </aside>
      <div className='order-2 xl:order-1 col-span-12 xl:col-span-7 xl:pl-10 xl:border-l xl:border-dashed'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-[26px] w-[26px] shrink-0' />
          <Skeleton className='h-[22px] w-16' />
          <Skeleton className='h-4 w-32' />
        </div>
        <div className='mt-8 space-y-2'>
          <Skeleton className='h-9 md:h-11 w-full' />
          <Skeleton className='h-9 md:h-11 w-[70%]' />
        </div>
        <aside className='xl:hidden mt-8 space-y-5'>
          <SidebarPanelSkeleton items={5} />
          <SidebarPanelSkeleton />
        </aside>
        <div className='mt-10 p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50'>
          <Skeleton className='aspect-[3/2] w-full rounded-2xl' />
        </div>
        <div className='flex items-center justify-center gap-1 mt-4'>
          <Skeleton className='h-[15px] w-[15px] rounded' />
          <Skeleton className='h-4 w-56' />
        </div>
        <div className='my-10 xl:my-14 py-8 space-y-2.5 border-y border-dashed'>
          <Skeleton className='h-5 xl:h-6 w-full' />
          <Skeleton className='h-5 xl:h-6 w-[75%]' />
        </div>
        <div className='space-y-10'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='space-y-4'>
              <Skeleton className='h-6 md:h-7 w-[45%]' />
              <div className='space-y-2.5'>
                <Skeleton className='h-4 w-full bg-gray-100' />
                <Skeleton className='h-4 w-full bg-gray-100' />
                <Skeleton className='h-4 w-[95%] bg-gray-100' />
                <Skeleton className='h-4 w-[85%] bg-gray-100' />
                <Skeleton className='h-4 w-[60%] bg-gray-100' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className='hidden xl:block order-1 xl:order-2 col-span-12 xl:col-span-3 xl:sticky xl:top-28 h-fit space-y-5'>
        <SidebarPanelSkeleton items={5} />
        <SidebarPanelSkeleton />
      </aside>
    </div>
  )
};

const ITEM_WIDTHS = ['w-[75%]', 'w-[85%]', 'w-[70%]', 'w-[80%]', 'w-[60%]'];

function SidebarPanelSkeleton({ items = 0 }: { items?: number }) {
  return (
    <div className='space-y-4'>
      <div className='py-1.5 pl-2 flex items-center justify-between border border-dashed rounded-lg'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='mr-2.5 h-[15px] w-[15px] rounded' />
      </div>
      {items > 0 && (
        <ul role="list" className='space-y-3 border-l border-dashed'>
          {ITEM_WIDTHS.slice(0, items).map((width, index) => (
            <li key={index} className='flex items-center gap-2'>
              <span className='block w-2.5 border-t border-dashed text-gray-300' />
              <Skeleton className={`h-4 ${width}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};