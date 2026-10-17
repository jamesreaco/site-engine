import Container from '@/components/global/Container';

export const archiveToolbarSpacing = 'py-3 mt-3 lg:mt-5 mb-7 lg:mb-[4.25rem]';

export default function ArchiveShell({ children, after }: {
  children: React.ReactNode;
  after?: React.ReactNode;
}) {
  return (
    <main className='overflow-x-clip'>
      <div className='px-4 xl:px-10 pattern-bg'>
        <Container className='px-4 pt-[calc(8rem+var(--announcement-bar-height,0px))] md:pt-[calc(10rem+var(--announcement-bar-height,0px))] pb-14 md:pb-28 border-x border-dashed'>
          {children}
        </Container>
      </div>
      {after}
    </main>
  )
};