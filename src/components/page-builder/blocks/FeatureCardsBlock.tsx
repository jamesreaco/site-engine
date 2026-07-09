import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import ButtonRenderer from '@/components/shared/ButtonRenderer';
import PortableTextEditor from '@/components/portable-text/PortableTextEditor';

export type FeatureCardsBlockProps = PageBuilderType<"featureCardsBlock">;

export default function FeatureCardsBlock(props: FeatureCardsBlockProps) {

  const { heading, buttons, features, showCallToAction, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 xl:px-10'
    >
      <Container className='py-16 md:py-28 px-4 space-y-8 md:space-y-6 border-x border-dashed'>
        <div className='relative max-w-[60rem] mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-30 md:gap-6 items-center justify-between border-y border-dashed pattern-bg--2'>
          <Heading tag="h2" size="xl" className='relative col-span-7 py-1.5 text-balance leading-normal'>
            <span className='relative z-10'>
              {heading}
            </span>
          </Heading>
          {buttons && buttons.length > 0 && (
            <ButtonRenderer classNames='z-20 hidden md:flex' buttons={buttons} />  
          )}
          <EdgeBlur />
        </div>
        <div className='max-w-[60rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
          {features?.map((feature) => (
            <div key={feature._key} className='col-span-2 md:col-span-1'>
              <FeatureCard feature={feature} />
            </div>
          ))}
          {showCallToAction && (
            <CallToAction 
              {...props}
            />
          )}
        </div>
      </Container>
    </section>
  )
};

function FeatureCard({ feature }: {
  feature:  NonNullable<FeatureCardsBlockProps['features']>[number];
}) {
  return (
    <div className='border border-dashed rounded-3xl'>
      <div className='p-3'>
        <Image
          src={feature.image?.asset?.url ?? ''}
          width={600}
          height={400}
          alt={feature.title ?? ''}
          sizes="(max-width: 768px) calc(100vw - 4rem), (max-width: 1280px) calc(50vw - 4rem), 28rem"
          className='rounded-2xl h-[280px] object-cover overflow-hidden'
        />
      </div>
      <div className='mt-5 px-6 md:px-8 pb-2'>
        <div className='space-y-6'>
          <Heading tag="h3" size="sm" className='relative py-2 font-semibold border-y border-y-gray-200/40 pattern-bg'>
            {feature.title}
          </Heading>
          <p className='text-balance text-sm text-gray-500'>
            {feature.description}
          </p>
        </div>
      </div>
      <div className='mt-4 space-y-3 border-t border-dashed'>
        {feature?.items?.map((item, index) => (
          <div 
            key={item} 
            className={cn('flex items-start md:items-center gap-2 px-6 md:px-8 py-4 border-b border-dashed', {
              'border-none pb-6': index === (feature?.items?.length ?? 0) - 1
            })}
          >
            <CircleCheck className='h-4 w-4 text-green-600' />
            <span className='text-balance text-sm'>
              {item}
            </span>
          </div>
        ))}
      </div>
      {feature?.button?.showButton && (
        <div className='px-4 py-4 border-t border-dashed'>
          <Button 
            variant={feature?.button.buttonVariant}
            buttonType={feature?.button.buttonType}
            pageReference={feature?.button.buttonPageReference}
            externalUrl={feature?.button.buttonExternalUrl ?? ''}
            className='h-12 w-full'
          >
            {feature.button.buttonText}
          </Button>
        </div>
      )}
    </div>
  )
};

function CallToAction(props: FeatureCardsBlockProps) {

  const { 
    callToActionHeading,
    callToActionContent,
    callToActionButtons,
  } = props;

  return (
    <div className='col-span-2 w-full p-8 flex flex-col md:flex-row items-center gap-8 border rounded-3xl pattern-bg--2'>
      <div className="space-y-5 md:space-y-3">
        <div className="font-medium text-xl text-balance">
          {callToActionHeading}
        </div>
        <PortableTextEditor 
          data={callToActionContent}
          classNames='text-balance text-sm md:text-base text-gray-500'
        />
      </div>
      {callToActionButtons && callToActionButtons.length > 0 && (
        <div className='items-center md:justify-center gap-2.5'>
          <ButtonRenderer buttons={callToActionButtons} />  
        </div>
      )}
    </div>
  )
};

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
};