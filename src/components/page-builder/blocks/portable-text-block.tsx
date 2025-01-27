"use client"
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import { PortableTextBlockType } from '@/types/page-builder/blocks/portable-text';

export default function PortableTextBlock(props: PortableTextBlockType) {

  const { content, alignment, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10'
    >
      <Container 
        className={cn('py-16 md:py-28 flex border-x border-dashed', {
          'justify-start': alignment === 'left',
          'justify-center': alignment === 'center',
          'justify-end': alignment === 'right',
        })}
      >
        <div 
          className={cn('max-w-[48rem]', {
            'pl-10 border-l border-dashed': alignment === 'left',
            'border-r border-dashed': alignment === 'right',
          })}
        >
          <PortableTextEditor 
            data={content}
            classNames='text-balance text-gray-600'
          />
        </div>
      </Container>
    </section>
  )
}
