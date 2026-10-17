'use client'

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { highlightMatch, useSearch, Searchable } from '@/hooks/useSearch';

interface ArchiveSearchProps<T extends Searchable> {
  items: T[];
  basePath: string;
  placeholder: string;
  classNames?: string;
  expandedWidth?: number | string;
  align?: 'left' | 'right';
};

const spring = { type: 'spring', stiffness: 380, damping: 30 } as const;

export function ArchiveSearch<T extends Searchable>({ 
  items, 
  basePath, 
  placeholder, 
  classNames, 
  expandedWidth = 220,
  align = 'right'
}: ArchiveSearchProps<T>) {

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isDropdownOpen,
    clearSearch
  } = useSearch(items);

  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function collapse() {
    clearSearch();
    setIsExpanded(false);
  };

  useClickOutside(dropdownRef, collapse);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (!dropdownRef.current?.offsetParent) return;
        e.preventDefault();
        setIsExpanded(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      collapse();
      inputRef.current?.blur();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div ref={dropdownRef} className={cn('relative flex', align === 'right' ? 'justify-end' : 'justify-start', classNames)}>
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? expandedWidth : 42 }}
          transition={spring}
          onAnimationComplete={() => isExpanded && inputRef.current?.focus()}
          className={cn('relative z-20 h-[42px] overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors duration-300', {
            'hover:bg-gray-100 cursor-pointer': !isExpanded,
          })}
        >
          {!isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              aria-label="Open search"
              className="absolute inset-0 z-10"
            />
          )}
          <motion.span
            key={isExpanded ? 'open' : 'closed'}
            initial={isExpanded ? { scale: 0.6, rotate: -45 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="absolute left-[12px] top-1/2 -mt-2 h-4 w-4 text-gray-500"
          >
            <Search className="h-4 w-4" />
          </motion.span>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="absolute inset-y-0 left-9 right-2.5 flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onBlur={() => !searchTerm && setIsExpanded(false)}
                  placeholder={placeholder}
                  aria-label={placeholder.replace(/\.+$/, '')}
                  className="h-full w-full min-w-0 bg-transparent pr-8 text-base md:text-sm outline-none placeholder:text-gray-500"
                />
                <AnimatePresence mode="wait" initial={false}>
                  {searchTerm ? (
                    <motion.button
                      key="clear"
                      type="button"
                      onClick={() => { clearSearch(); inputRef.current?.focus(); }}
                      aria-label="Clear search"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-0 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 group"
                    >
                      <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-all duration-300" />
                    </motion.button>
                  ) : (
                    <motion.kbd
                      key="shortcut"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                      exit={{ opacity: 0 }}
                      className="hidden md:flex absolute right-0 h-6 px-2 items-center rounded-full border border-gray-200 font-sans text-[11px] text-gray-500"
                    >
                      ⌘K
                    </motion.kbd>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={cn("absolute top-full max-h-[290px] overflow-y-scroll z-50 w-full md:w-[320px] mt-2 p-1.5 bg-white border rounded-xl shadow-md", align === 'right' ? 'right-0' : 'left-0')}
            >
              <ul>
                {searchResults.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <li className="px-3 py-2.5 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors">
                      <Link href={`${basePath}/${item.slug ?? ''}`}>
                        <h3 className="text-sm font-medium text-balance">
                          {highlightMatch(item.title ?? '', searchTerm)}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">
                          {highlightMatch(item.excerpt ?? '', searchTerm)}
                        </p>
                      </Link>
                    </li>
                    {index !== searchResults.length - 1 && (
                      <div className='-mx-1.5 my-1.5 border-b border-dashed'></div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
};