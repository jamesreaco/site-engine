import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GeneralSettingsQueryResult } from '../../../sanity.types';

export default function SiteLogo({ settings, location, theme }: {
  settings: GeneralSettingsQueryResult;
  location?: 'footer' | 'navbar';
  theme?: 'light' | 'dark';
}) {

  const { siteTitle, siteLogo } = settings ?? {};

  return (
    <Link 
      href="/"
      className={cn('hover:scale-[0.95] transition-transform duration-300 ease-in-out', {
        'text-white': theme === 'light'
      })}
    >
      {!siteLogo ? ( 
        <span 
          className={cn('font-semibold tracking-tighter text-xl', {
            'text-3xl': location === 'footer'
          })}
        >
          {siteTitle}
        </span>
      ): (
        <Image
          priority
          loading="eager"
          fetchPriority="high"
          width={140}
          height={140}
          src={siteLogo?.asset?.url ?? ''}
          alt={`${siteTitle} Logo`}
          className='w-[140px] h-auto object-contain'
        />
      )}
    </Link>
  )
};