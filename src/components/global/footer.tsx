import Link from 'next/link';
import { cn } from '@/lib/utils';
import Container from './Container';
import Heading from '../shared/Heading';
import SiteLogo from '../shared/SiteLogo';
import { ExternalLink } from 'lucide-react';
import AnimatedUnderline from '../shared/AnimatedUnderline';
import { GeneralSettingsQueryResult, NavigationSettingsQueryResult } from '../../../sanity.types';

interface FooterProps {
  settings: GeneralSettingsQueryResult;
  navigationSettings: NavigationSettingsQueryResult;
};

export default function Footer({ settings, navigationSettings }: FooterProps) {

  const { copyright } = settings ?? {};
  
  const { 
    footerColumns: columns, 
    footerLegalMenuItems: legalMenuItems 
  } = navigationSettings?.footer ?? {};

  return (
    <footer className='px-4 xl:px-10 border-t border-t-gray-200/60'>
      <Container className='pt-14 md:pt-16 border-x border-dashed'>
        <div className='w-full space-y-14 md:space-y-16'>
          <div className='flex-none py-4 md:py-0 border-y border-dashed md:border-none'>
            <SiteLogo settings={settings} location="footer" />
          </div>
          <FooterColumns columns={columns ?? []} />
        </div>
        <div className='relative mt-10 md:mt-20 mb-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0 border-y border-dashed text-xs pattern-bg--2'>
          <div className='z-20 relative'>
          {copyright} © {new Date().getFullYear()}  - Design + Code by
            <a 
              href="https://jamesrea.co" 
              rel="noopener noreferrer" target="_blank"
              className='relative ml-1 font-semibold tracking-tight text-blue-600 group'
            >
              <span>James Rea.</span> 
              <AnimatedUnderline className='bg-blue-600'/>
            </a>
          </div>
          <LegalMenuItems legalMenuItems={legalMenuItems ?? []} />
          <EdgeBlur />
        </div>
      </Container>
    </footer>
  )
};

function FooterColumns({ columns }: {
  columns: Array<{
    _key: string;
    title: string | null;
    menuItems: Array<{
      _key: string;
      title: string | null;
      linkType: "external" | "internal" | null;
      pageReference: {
        _id: string;
        title: string | null;
        slug: string | null;
      } | null;
      externalUrl: string | null;
    }> | null;
  }> | null;
}) {
  return (
    <ul className='flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-2 border-y border-dashed pattern-bg--2'>
      {columns?.map((column, index) => (
        <li 
          key={column._key} 
          className={cn('md:py-10 px-10 w-full space-y-7 border-x border-dashed bg-white', { 
            'pb-8': index === columns.length - 1 
          })}>
          <Heading tag="h2" size="xs" className='relative mt-8 md:mt-0 py-2.5 font-semibold border-y border-dashed pattern-bg--2'>
            <span className='z-20 relative'>
              {column.title}
            </span>
            <EdgeBlur />
          </Heading>
          <ul className='space-y-1 md:space-y-2'>
            {column?.menuItems?.map((item) => (
              <li key={item._key}>
                {item.linkType === 'internal' ? (
                  <Link 
                    href={`/${item?.pageReference?.slug}`}
                    className='relative group text-sm md:text-base'
                  >
                    {item.title}
                    <AnimatedUnderline />
                  </Link>
                ): (
                  <a 
                    href={item?.externalUrl ?? ''}
                    rel="noopener noreferrer" target="_blank"
                    className='group flex items-center gap-2'
                  >
                    <span className='relative'>
                      {item.title}
                      <AnimatedUnderline />
                    </span>
                    <ExternalLink size={14} className='group-hover:rotate-12 group-hover:text-blue-500 transition-all duration-300' />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
};

function LegalMenuItems({ legalMenuItems }: {
  legalMenuItems: Array<{
    _key: string;
    title: string | null;
    pageReference: {
      _id: string;
      title: string | null;
      slug: string | null;
    } | null;
  }> | null;
}) {
  return (
    <ul className='z-20 relative flex items-center gap-1'>
      {legalMenuItems?.map((item, index) => (
        <li key={item._key} className='text-xs font-medium'>
          <Link 
            href={`/${item?.pageReference?.slug}`}
            className='relative group'
          >
            <span>{item.title}</span>
            <AnimatedUnderline />
          </Link>
          {index !== legalMenuItems.length - 1 && (
            <span className='ml-1'>/</span>
          )}
        </li>
      ))}
    </ul>
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