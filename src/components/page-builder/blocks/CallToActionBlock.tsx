import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import ButtonRenderer from '@/components/shared/ButtonRenderer';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type CallToActionBlockProps = PageBuilderType<"callToActionBlock">;

export default function CallToActionBlock(props: CallToActionBlockProps) {

  const { heading, content, buttons, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='xl:px-10 pattern-bg--2 border-t border-t-gray-200/60'
    >
      <Container className='py-16 md:py-28 border-x border-dashed'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-x-16'>
          <div>
            <Heading tag="h2" size="xl" className='max-w-[40rem] text-balance leading-tight'>
              {heading}
            </Heading>
            <PortableTextEditor 
              data={content ?? []}
              classNames='mt-6 md:mt-8 text-balance text-gray-600'
            />
          </div>
          {buttons && buttons.length > 0 && (
            <div className='mt-10'>
              <ButtonRenderer buttons={buttons} />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
};