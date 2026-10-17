import { useEffect, useRef, useState } from "react";
import { Text, ChevronDown } from "lucide-react";
import { slugify, truncateText, cn } from "@/lib/utils";
import { PostBySlugQueryResult } from "../../../sanity.types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';

type Post = NonNullable<
  NonNullable<PostBySlugQueryResult>
>;

interface TableOfContentsProps {
  content: Post['tableOfContents'];
};

export default function TableOfContents({ content }: TableOfContentsProps) {

  const [isOpen, setIsOpen] = useState(true);
  const contentArray = Array.isArray(content) ? content : [content];
  const ids = contentArray.map((item) => slugify(item?.children?.[0]?.text ?? ''));

  const listRef = useRef<HTMLUListElement>(null);
  const { activeIndex, fillHeight } = useReadingProgress(ids, listRef, isOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-4"
    >
      <CollapsibleTrigger className="w-full">
        <div className="py-1.5 pl-2 flex items-center justify-between border border-dashed rounded-lg">
          <div className="flex items-center gap-2">
            <span className='h-5 w-5 flex items-center justify-center rounded bg-gray-200 text-black'>
              <Text size={12} />
            </span>
            <span className='font-medium text-sm'>
              Table Of Contents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs tabular-nums text-gray-500">
              {activeIndex + 1}/{ids.length}
            </span>
            <ChevronDown
              size={15}
              className={cn('mr-2.5 -rotate-90 transition-transform duration-200', {
                '-rotate-0': isOpen
              })}
            />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-200">
        <nav aria-label="Table of contents" className="scroll-smooth">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 w-px bg-black transition-[height] duration-150 ease-out"
              style={{ height: fillHeight }}
            />
            <ul ref={listRef} role="list" className="space-y-2 border-l border-dashed">
              {contentArray?.map((item, index) => (
                <li key={item?._key}>
                  <a
                    href={`#${ids[index]}`}
                    aria-current={index === activeIndex ? 'location' : undefined}
                    className={cn('flex items-center gap-2 scroll-smooth text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary', {
                      'text-black': index <= activeIndex,
                    })}
                  >
                    <span
                      className={cn('block w-2.5 border-t border-dashed text-gray-300 transition-colors duration-200', {
                        'border-solid text-black': index <= activeIndex
                      })}
                    />
                    <span className="relative group w-fit hover:text-black transition-colors duration-300">
                      {truncateText(item?.children?.[0]?.text ?? '', 33)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
};

function useReadingProgress(
  ids: string[],
  listRef: React.RefObject<HTMLUListElement | null>,
  isOpen: boolean
) {

  const [activeIndex, setActiveIndex] = useState(-1);
  const [fillHeight, setFillHeight] = useState(0);
  const idsKey = ids.join('|');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const headings = idsKey.split('|').map((id) => document.getElementById(id));
      const list = listRef.current;
      if (!list) return;

      const line = window.innerHeight * 0.3;
      const tops = headings.map((el) => el?.getBoundingClientRect().top ?? Infinity);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let index = -1;
      tops.forEach((top, i) => { if (top <= line) index = i; });
      if (atBottom) index = tops.length - 1;

      const listTop = list.getBoundingClientRect().top;
      const centers = Array.from(list.querySelectorAll('li')).map((li) => {
        const rect = li.getBoundingClientRect();
        return rect.top - listTop + rect.height / 2;
      });

      let height = 0;
      if (index >= 0) {
        const next = index + 1;
        const fraction = next < tops.length && !atBottom
          ? Math.min(Math.max((line - tops[index]) / (tops[next] - tops[index]), 0), 1)
          : 0;
        height = centers[index] + fraction * ((centers[next] ?? centers[index]) - centers[index]);
      }

      setActiveIndex(index);
      setFillHeight(height);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [idsKey, listRef, isOpen]);

  return { activeIndex, fillHeight };
};