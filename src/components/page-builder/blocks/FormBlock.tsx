"use client"

import { PageBuilderType } from '@/types';
import Form from '@/components/shared/Form';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type FormBlockProps = PageBuilderType<"formBlock">;

export default function FormBlock(props: FormBlockProps) {

  const { heading, content, form, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className='px-4 xl:px-10 pattern-bg'
    >
      <Container className='py-16 md:py-28 border-x border-dashed'>
        <div className='flex flex-col justify-center items-center gap-4 md:gap-6'>
          {heading && (
            <Heading tag="h2" size="xl" className='text-balance text-center leading-normal'>
              {heading}
            </Heading>
          )}
          {content && (
            <PortableTextEditor 
              data={content}
              classNames='max-w-[320px] mb-4 md:text-xl text-balance text-center text-gray-600'
            />
          )}
          {form && (
            <Form form={form} />
          )}
        </div>
      </Container>
    </section>
  )
};