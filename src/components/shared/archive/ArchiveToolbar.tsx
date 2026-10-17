"use client"

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { archiveToolbarSpacing } from './ArchiveShell';
import ArchiveCategoryFilter, { ArchiveCategory } from './ArchiveCategoryFilter';

export interface ArchiveToolbarProps {
  categories?: ArchiveCategory[];
  basePath: string;
  allCategoriesLabel?: string;
};

export default function ArchiveToolbar({
  categories,
  basePath,
  allCategoriesLabel
}: ArchiveToolbarProps) {

  const toolbarRef = useRef<HTMLDivElement>(null);
  const { isStuck, canAnimate } = useStickyToolbar(toolbarRef);

  return (
    <div
      ref={toolbarRef}
      className={cn('sticky top-[var(--navbar-height,0px)] z-30', archiveToolbarSpacing, 
        'before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-[var(--navbar-width,100vw)] before:-translate-x-1/2 before:rounded-b-xl before:border-b before:border-b-gray-200 before:bg-white/100 before:backdrop-blur-lg', {
        'before:transition-opacity before:duration-500': canAnimate,
        'before:opacity-0': !isStuck,
        'before:opacity-100': isStuck,
      })}
    >
      <div
        className={cn('relative left-1/2 w-[var(--navbar-width,100%)] -translate-x-1/2 [--navbar-inset:1.5rem] md:[--navbar-inset:calc(max((var(--navbar-width,100vw)_-_90rem)_/_2,_0px)_+_2.5rem)]', {
          'transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none': canAnimate,
        })}
        style={{
          paddingInline: isStuck
            ? 'var(--navbar-inset)'
            : 'calc((var(--navbar-width, 100%) - 100%) / 2)'
        }}
      >
        <ArchiveCategoryFilter
          categories={categories ?? []}
          basePath={basePath}
          allLabel={allCategoriesLabel}
        />
      </div>
    </div>
  )
};

function useStickyToolbar(ref: React.RefObject<HTMLElement | null>) {

  const [isStuck, setIsStuck] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const root = document.documentElement;
      const stickyTop = parseFloat(getComputedStyle(el).top) || 0;
      const stuck = el.getBoundingClientRect().top <= stickyTop + 0.5;

      setIsStuck(stuck);
      root.toggleAttribute('data-archive-toolbar-stuck', stuck);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    
    const inputEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    
    const enableAnimation = () => {
      setCanAnimate(true);
      inputEvents.forEach((event) => window.removeEventListener(event, enableAnimation));
    };

    inputEvents.forEach((event) => window.addEventListener(event, enableAnimation, { passive: true }));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      inputEvents.forEach((event) => window.removeEventListener(event, enableAnimation));
      document.documentElement.removeAttribute('data-archive-toolbar-stuck');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return { isStuck, canAnimate };
};