"use client"
import React from 'react';
import Image from 'next/image';
import { cn, scrollToElement } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

export default function SiteLogo({ siteTitle, logo, location, theme }: {
  siteTitle: string;
  logo?: {
    asset: {
      url: string;
    }
  };
  location?: 'footer' | 'navbar';
  theme?: 'light' | 'dark';
}) {

  const pathname = usePathname()
  const router = useRouter()

  return (
    <button 
      aria-label="Go to home page"
      onClick={() => pathname === '/' ? scrollToElement('home') : router.push(`/#home`)}
      className={cn('hover:scale-[0.95] transition-transform duration-300 ease-in-out', {
        'text-white': theme === 'light'
      })}
    >
      {!logo ? ( 
        <span 
          className={cn('font-semibold tracking-tighter text-xl', {
            'text-3xl': location === 'footer'
          })}
        >
          {siteTitle}
        </span>
      ): (
        <Image
          src={logo.asset.url}
          width={200}
          height={200}
          alt={`${siteTitle} Logo` ?? ''}
        />
      )}
    </button>
  )
}
