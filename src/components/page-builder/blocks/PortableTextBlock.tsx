"use client"

import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Container from '@/components/global/Container';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type PortableTextBlockProps = PageBuilderType<"portableTextBlock">;

export default function PortableTextBlock(props: PortableTextBlockProps) {

  const { content, alignment, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10'
    >
      <Container 
        className={cn('py-16 md:py-28 flex border-x border-dashed', {
          'justify-start': stegaClean(alignment) === 'left',
          'justify-center': stegaClean(alignment) === 'center',
          'justify-end': stegaClean(alignment) === 'right',
        })}
      >
        <div 
          className={cn('max-w-[48rem]', {
            'pl-10 border-l border-dashed': stegaClean(alignment) === 'left',
            'border-r border-dashed': stegaClean(alignment) === 'right',
          })}
        >
          <PortableTextEditor 
            data={content ?? []}
            classNames='text-balance text-gray-600'
          />
        </div>
      </Container>
    </section>
  )
};