import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/Heading';
import Container from '@/components/global/Container';
import ButtonRenderer from '@/components/shared/ButtonRenderer';
import AnimatedUnderline from '@/components/shared/AnimatedUnderline';

export type ServicesBlockProps = PageBuilderType<"servicesBlock">;

export default function ServicesBlock(props: ServicesBlockProps) {

  const { 
    heading, 
    services, 
    background, 
    topCornerRadius, 
    buttons,
    anchorId,
    paddingTop, 
    paddingBottom 
  } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('px-4 xl:px-10', {
        'pattern-bg': stegaClean(background) === 'pattern',
        'rounded-t-4xl border-t border-t-gray-200/60': stegaClean(topCornerRadius) === 'rounded'
      })}
    >
      <Container 
        paddingTop={stegaClean(paddingTop) ?? undefined}
        paddingBottom={stegaClean(paddingBottom) ?? undefined}
        className='space-y-10 border-x border-dashed'
      >
        <div className='py-4 flex items-center justify-between gap-6 border-y border-dashed'>
          <Heading tag="h2" size="xl" className='max-w-[40rem] text-balance leading-tight'>
            {heading}
          </Heading>
          {buttons && buttons.length > 0 && (
            <div className='hidden md:block'>
              <ButtonRenderer buttons={buttons} />  
            </div>
          )}
        </div>
        <div className='grid md:grid-cols-3 gap-x-6 gap-y-10'>
          {services && services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
        {buttons && buttons.length > 0 && (
          <div className='md:hidden pt-4'>
            <ButtonRenderer buttons={buttons} />  
          </div>
        )}
      </Container>
    </section>
  )
};

function ServiceCard({ service }: {
  service: NonNullable<ServicesBlockProps['services']>[number];
}) {

  const { title, slug, shortDescription, image } = service;

  return (
    <div aria-label={title ?? ''} className='relative pb-8 group border-b border-dashed'>
      <Link href={`/services/${slug}`} className='relative space-y-4 md:space-y-6'>
        <div className='p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50'>
          <Image
            src={image?.asset?.url ?? ''}
            width={800}
            height={800}
            alt={image?.asset?.altText ?? ''}
            sizes="(max-width: 768px) calc(100vw - 5rem), (max-width: 1280px) calc(33vw - 3rem), 22rem"
            className='aspect-[3/2] rounded-2xl'
          />
        </div>
        <Heading tag="h2" size="md" className='pt-1 md:pt-0 text-balance'>
          {title}
        </Heading>
        <p className='text-sm md:text-base md:text-balance text-neutral-500'>
          {shortDescription}
        </p>
      </Link>
      <AnimatedUnderline className='-translate-y-0.5' />
    </div>
  )
};