import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';
import { LogoBlockType } from '@/types/page-builder/blocks/logos';

export default function LogoBlock(props: LogoBlockType) {

  const { heading, logos, anchorId } = props;
  
  const items = [...logos, ...logos];
  
  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10 border-b border-b-gray-200/60 rounded-b-4xl bg-gray-50'
    >
      <Container className='px-0 border-x border-x-gray-200 border-dashed'>
        <div className='py-6 md:py-10'>
          <div className='relative w-fit mx-auto py-2 px-10 mt-4 md:mt-7 bg-white pattern-bg border-y border-y-gray-100'>
            <h2 className='text-center font-geistMono text-xs md:text-sm uppercase font-medium text-gray-500'> 
              {heading}
            </h2>
            <EdgeBlur />
          </div>
          <div className="mt-10 md:mt-16 mb-6 md:mb-8 relative overflow-clip">
            <ul className="flex items-center pl-[4.8rem] gap-16 md:gap-[10rem] w-max animate-logo-marquee border-y border-dashed py-4 md:py-10">
              {items.map((item, index) => (
                <li key={item._key + index}>
                  <Image
                    width={200}
                    height={100}
                    src={item.image.asset.url}
                    alt={`${item.title} Logo` ?? ''}
                    className={cn('w-20 md:w-28 object-contain', {
                      'w-36 md:w-40': item.size === 'large'
                    })}
                  />  
                </li>
              ))}
            </ul>
            <EdgeBlur />
          </div>
        </div>
      </Container>
    </section>
  )
}

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-slate-50 via-slate/80 to-transparent h-full w-[200px]'></div>
      <div className='bg-gradient-to-l from-slate-50 via-slate/80 to-transparent h-full w-[200px]'></div>
    </div>
  )
}