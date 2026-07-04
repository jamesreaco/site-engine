import React, { useState } from "react";
import { Text, ChevronDown } from "lucide-react";
import { slugify, truncateText, cn } from "@/lib/utils";
import AnimatedUnderline from "../shared/AnimatedUnderline";
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
          <ChevronDown 
            size={15} 
            className={cn('mr-2.5 -rotate-90 transition-transform duration-200', {
              '-rotate-0': isOpen
            })}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-200">
        <nav aria-label="Table of contents" className="scroll-smooth">
          <ul role="list" className="space-y-2 border-l border-dashed">
            {contentArray?.map((item) => (
              <li key={item?._key}>
                <a 
                  href={`#${slugify(item?.children?.[0]?.text ?? '')}`} 
                  className="flex items-center gap-2 scroll-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span className="block w-2.5 border-t border-dashed text-gray-300" /> 
                  <span className="relative group w-fit">
                    {truncateText(item?.children?.[0]?.text ?? '', 33)}
                    <AnimatedUnderline />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
};