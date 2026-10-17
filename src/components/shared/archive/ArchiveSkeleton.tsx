import Skeleton from '@/components/ui/Skeleton';
import Heading from '@/components/shared/Heading';
import ArchiveShell, { archiveToolbarSpacing } from './ArchiveShell';

export default function ArchiveSkeleton({ children }: {
  children: React.ReactNode;
}) {
  return (
    <ArchiveShell>
      <div className='animate-pulse'>
        <Heading tag="h1" size="xxxl" aria-hidden="true" className='relative w-32 md:w-56'>
          &nbsp;
          <Skeleton className='absolute left-0 top-1/2 -translate-y-1/2 h-8 md:h-16 w-full' />
        </Heading>
        <div className={archiveToolbarSpacing}>
          <Skeleton className='md:hidden h-10 w-36' />
          <div className='hidden md:flex items-center gap-2'>
            {['w-24', 'w-28', 'w-36', 'w-28', 'w-24', 'w-16'].map((width, index) => (
              <Skeleton key={index} className={`h-10 ${width}`} />
            ))}
          </div>
        </div>
      </div>
      {children}
    </ArchiveShell>
  )
};