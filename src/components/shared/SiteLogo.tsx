"use client"

import Image from 'next/image';
import { cn, scrollToElement } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { GeneralSettingsQueryResult } from '../../../sanity.types';

export default function SiteLogo({ settings, location, theme }: {
  settings: GeneralSettingsQueryResult;
  location?: 'footer' | 'navbar';
  theme?: 'light' | 'dark';
}) {

  const pathname = usePathname();
  const router = useRouter();

  const { siteTitle, siteLogo } = settings ?? {};

  return (
    <button 
      aria-label="Go to home page"
      onClick={() => pathname === '/' ? scrollToElement('home') : router.push(`/#home`)}
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
    </button>
  )
};