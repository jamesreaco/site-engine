import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type HeaderBlockProps = PageBuilderType<"headerBlock">;

export default function HeaderBlock(props: HeaderBlockProps) {

  const { heading, content, bottomCornerRadius, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('px-4 md:px-10 pattern-bg border-b', {
        'rounded-4xl': bottomCornerRadius === 'rounded'
      })}
    >
      <Container className='border-x border-dashed'>
        <div className='pt-[calc(9rem+var(--announcement-bar-height,0px))] md:pt-[calc(13rem+var(--announcement-bar-height,0px))] pb-20 md:pb-36'>
          <Heading tag="h1" size="xxl" className='text-balance leading-normal'>
            {heading}
          </Heading>
          <PortableTextEditor 
            data={content ?? []}
            classNames='mt-6 md:mt-8 md:text-xl text-balance text-gray-600'
          />
        </div>
      </Container>
    </section>
  )
};