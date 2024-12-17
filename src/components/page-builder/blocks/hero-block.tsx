import Image from 'next/image';
import { cn } from '@/lib/utils';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import Container from '@/components/global/container';
import { HeroBlockType } from '@/types/page-builder/blocks/hero';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';

export default function HeroBlock(props: HeroBlockType) {

  const { heading, content, mediaType, bottomCornerRadius, image } = props

  return (
    <section 
      className={cn('px-10 pattern-bg border-b border-b-gray-200/60', {
        'rounded-4xl': bottomCornerRadius === 'rounded'
      })}
    >
      <Container 
        className={cn('space-y-14 xl:space-y-0 border-x border-dashed', {
          'pb-14': mediaType === 'image'
        })}
      >
        <div className='pt-52 pb-20 md:pb-36  grid grid-cols-12 gap-6'>
          <Heading size="xxl" className='text-balance col-span-12 xl:col-span-7 leading-normal'>
            {heading}
          </Heading>
          <div className='col-span-12 xl:col-span-5'>
            <PortableTextEditor 
              data={content}
              classNames='mt-3 md:text-xl text-balance text-gray-600'
            />
            <div className='flex items-center gap-6 mt-10'>
              <Button variant="primary" buttonType="internal">
                View Demo
              </Button>
              <Button variant="underline" buttonType="external">
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
        {mediaType === 'image' && image && (
          <Image
            src={image.asset.url}
            width={1400}
            height={800}
            alt={image.alt ?? ''}
            className={cn('rounded-xl md:rounded-3xl', {
              'rounded-none': image.cornerRadius === 'straight'
            })}
          />
        )}
      </Container>
    </section>
  )
}
