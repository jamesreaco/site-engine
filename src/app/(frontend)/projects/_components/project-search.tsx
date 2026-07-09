'use client'

import Link from 'next/link';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useClickOutside } from '@/hooks/useClickOutside';
import { highlightMatch, useSearch } from '@/hooks/useSearch';
import { ProjectsPageQueryResult } from '../../../../../sanity.types';

type Project = NonNullable<
  NonNullable<ProjectsPageQueryResult>
>;

interface ProjectSearchProps {
  projects: Project['projects'];
  classNames?: string;
};

export function ProjectSearch({ projects, classNames }: ProjectSearchProps) {

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isDropdownOpen,
    clearSearch
  } = useSearch(projects);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, clearSearch);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  };

  return (
    <div ref={dropdownRef} className={cn('relative w-full md:max-w-[260px]', classNames)}>
      <div className="relative z-20">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleInputChange}
          className="h-10 pl-9 pr-10 w-full rounded-full shadow-none bg-gray-50 placeholder:text-gray-500"
          aria-label="Search articles"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute h-6 w-6 right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gray-200 group"
          >
            <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-all duration-300" />
          </button>
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 md:-left-8 max-h-[290px] overflow-y-scroll z-50 w-full md:w-[320px] mt-2 bg-gray-50 border rounded-xl shadow-lg">
          <ul className="py-1 px-1">
            {searchResults?.map((project, index) => (
              <React.Fragment key={project?._id}>
                <li className="px-4 py-3 cursor-pointer rounded-lg hover:bg-gray-200/60">
                  <Link href={`/projects/${project?.slug}`}>
                    <h3 className="text-sm font-medium text-balance">
                      {highlightMatch(project.title ?? '', searchTerm)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {highlightMatch(project.excerpt ?? '', searchTerm)}
                    </p>
                  </Link>
                </li>
                {index !== searchResults.length - 1 && (
                  <div className='mt-1 mb-1 border-b border-dashed'></div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};