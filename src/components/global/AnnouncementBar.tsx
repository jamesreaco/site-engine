"use client"

import Link from 'next/link';
import Container from './Container';
import { stegaClean } from 'next-sanity';
import { X, ArrowRight } from 'lucide-react';
import { cn, resolveHref } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { AnnouncementBarSettingsQueryResult } from '../../../sanity.types';

interface AnnouncementBarProps {
  announcementBarSettings: AnnouncementBarSettingsQueryResult;
};

export default function AnnouncementBar({ announcementBarSettings }: AnnouncementBarProps) {

  const barRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const {
    showAnnouncementBar,
    text,
    showLink,
    linkType,
    pageReference,
    externalUrl,
    backgroundColour,
    textColour
  } = announcementBarSettings ?? {};

  const isVisible = !!showAnnouncementBar && !!text && !isDismissed;

  useEffect(() => {
    const bar = barRef.current;

    if (!isVisible || !bar) {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
      return;
    };

    const updateHeight = () => {
      document.documentElement.style.setProperty('--announcement-bar-height', `${bar.offsetHeight}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    };
  }, [isVisible, text]);

  if (!isVisible) return null;

  const isDarkText = stegaClean(textColour) === 'dark';
  const isInternalLink = stegaClean(linkType) !== 'external';
  const hasLink = showLink && (isInternalLink ? !!pageReference?.slug : !!externalUrl);

  const linkContent = (
    <>
      {text}
      <ArrowRight
        size={14}
        className='transition duration-300 group-hover:translate-x-0.5'
      />
    </>
  );

  return (
    <div
      ref={barRef}
      className={cn('z-50 w-full relative', {
        'text-white': !isDarkText,
        'text-black': isDarkText,
      })}
      style={{ backgroundColor: stegaClean(backgroundColour)?.value ?? '#000000' }}
    >
      <Container className='relative flex items-center justify-center py-3 text-center text-sm font-medium'>
        {!hasLink && (
          <span>{text}</span>
        )}
        {hasLink && isInternalLink && (
          <Link
            href={resolveHref(pageReference?._type, pageReference?.slug ?? '') ?? '/'}
            className='group inline-flex items-center gap-1.5'
          >
            {linkContent}
          </Link>
        )}
        {hasLink && !isInternalLink && (
          <a
            href={externalUrl ?? ''}
            rel="noopener noreferrer" target="_blank"
            className='group inline-flex items-center gap-1.5'
          >
            {linkContent}
          </a>
        )}
      </Container>
      <button
        type='button'
        aria-label='Dismiss announcement'
        onClick={() => setIsDismissed(true)}
        className='absolute right-2 md:right-3 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:rotate-180'
      >
        <X size={14} />
      </button>
    </div>
  )
};