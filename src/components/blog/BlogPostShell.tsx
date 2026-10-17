import Container from '@/components/global/Container';

export default function BlogPostShell({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className='pt-[calc(8rem+var(--announcement-bar-height,0px))] md:pt-[calc(10rem+var(--announcement-bar-height,0px))] pb-10 xl:pb-16 pattern-bg'>
      <Container>
        {children}
      </Container>
    </main>
  )
};