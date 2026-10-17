import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import PlayVideo from '@/components/shared/PlayVideo';
import ButtonRenderer from '@/components/shared/ButtonRenderer';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type HeroBlockProps = PageBuilderType<"heroBlock">;

export default function HeroBlock(props: HeroBlockProps) {

  const { 
    heading, 
    content, 
    mediaType, 
    bottomCornerRadius, 
    buttons, 
    image, 
    dialogType,
    videoUrl,
    overlayType,
    anchorId 
  } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('px-4 md:px-10 pattern-bg border-b border-b-gray-200/60', {
        'rounded-3xl md:rounded-4xl': bottomCornerRadius === 'rounded'
      })}
    >
      <Container 
        className={cn('space-y-10 xl:-space-y-6 border-x border-dashed', {
          'pb-7 md:pb-12': mediaType === 'image'
        })}
      >
        <div
          className={cn('pt-[calc(9rem+var(--announcement-bar-height,0px))] md:pt-[calc(13rem+var(--announcement-bar-height,0px))] flex flex-col justify-center items-center pb-16 md:pb-24 xl:pb-32 md:px-14 md:border-x md:border-dashed', {
            'pb-6 xl:pb-40': mediaType === 'image'
          })}
        >
          <Heading size="xxxl" tag="h1" className='md:max-w-[50rem] text-balance leading-tight text-center'>
            {heading}
          </Heading>
          <PortableTextEditor 
            data={content ?? []}
            classNames='mt-6 md:mt-9 md:text-lg text-gray-600 text-balance text-center'
          />
          {buttons && buttons.length > 0 && (
            <div className='mt-8 md:mt-11'>
              <ButtonRenderer buttons={buttons} />  
            </div>
          )}
        </div>
        {mediaType === 'image' && image && (
          <div className='p-4 md:p-6 border border-dashed rounded-3xl md:rounded-4xl pattern-bg--2'>
            <div className='overflow-hidden relative h-full w-full rounded-3xl md:rounded-4xl'>
              <Image
                priority
                loading="eager"
                fetchPriority="high"
                width={1280}
                height={720}
                src={image?.asset?.url ?? ''}
                alt={image?.asset?.altText ?? ''}
                sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) calc(100vw - 7rem), calc(min(90rem, 100vw - 5rem) - 3rem)"
                className={cn('w-full h-auto object-cover rounded-2xl md:rounded-3xl', {
                  'max-h-[30rem]': image?.height === 'short'
                })}
              />
              {overlayType === 'dark' && (
                <DarkOverlay />
              )}
              {dialogType === 'video' && videoUrl && (
                <PlayVideo videoUrl={videoUrl} />
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
};

function DarkOverlay() {
  return (
    <>
      <div className='absolute inset-0 bg-black/20' />
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-[50%] w-full' />
    </>
  )
};