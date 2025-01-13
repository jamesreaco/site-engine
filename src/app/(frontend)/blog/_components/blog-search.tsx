'use client'
import Link from 'next/link';
import { useRef } from 'react';
import { PostType } from '@/types/post';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/use-search';
import { useClickOutside } from '@/hooks/use-click-outside';

export function BlogSearch({ posts }: {
  posts: PostType[];
}) {

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isDropdownOpen,
    clearSearch
  } = useSearch(posts);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, clearSearch);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="relative w-full max-w-[260px]" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts..."
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
        <div className="absolute -left-8 max-h-[290px] overflow-y-scroll z-50 w-[320px] mt-2 bg-gray-50 border rounded-xl shadow-lg">
          <ul className="py-1 px-1">
            {searchResults.map((post, index) => (
              <>
                <li key={post._id} className="px-4 py-3 cursor-pointer rounded-lg hover:bg-gray-200/60">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-sm font-medium text-balance">{post.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{post.excerpt}</p>
                  </Link>
                </li>
                {index !== searchResults.length - 1 && (
                  <div className='mt-1 mb-1 border-b border-dashed'></div>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}