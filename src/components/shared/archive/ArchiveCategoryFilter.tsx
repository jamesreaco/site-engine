"use client"

import { cn } from "@/lib/utils";
import { Suspense, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { useSelectedCategories } from "@/hooks/useCategoryFilter";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu";

export interface ArchiveCategory {
  _id: string;
  title: string | null;
  slug: string | null;
};

interface ArchiveCategoryFilterProps {
  categories: ArchiveCategory[];
  basePath: string;
  allLabel?: string;
};

interface CategorySelectionProps extends ArchiveCategoryFilterProps {
  selected: string[];
  onToggle?: (slug: string) => void;
  onClear?: () => void;
};

export default function ArchiveCategoryFilter(props: ArchiveCategoryFilterProps) {
  return (
    <Suspense fallback={<CategorySelection {...props} selected={[]} />}>
      <SelectableCategories {...props} />
    </Suspense>
  )
};

function CategorySelection(props: CategorySelectionProps) {
  return (
    <>
      <CategoryDropdown {...props} />
      <CategoryPills {...props} />
    </>
  )
};

function SelectableCategories(props: ArchiveCategoryFilterProps) {

  const { selected, setSelected } = useSelectedCategories(props.basePath);

  function toggleCategory(slug: string) {
    setSelected(
      selected.includes(slug)
        ? selected.filter((item) => item !== slug)
        : [...selected, slug]
    );
  };

  return (
    <CategorySelection
      {...props}
      selected={selected}
      onToggle={toggleCategory}
      onClear={() => setSelected([])}
    />
  )
};

function CategoryDropdown({ categories, allLabel = 'All', selected, onToggle, onClear }: CategorySelectionProps) {

  const selectedTitles = categories
    .filter((category) => selected.includes(category.slug ?? ''))
    .map((category) => category.title);

  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CategoryTrigger
            label={selectedTitles[0] ?? allLabel}
            count={selectedTitles.length}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Filter by category
          </DropdownMenuLabel>
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category._id}
              checked={selected.includes(category.slug ?? '')}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={() => onToggle?.(category.slug ?? '')}
            >
              {category.title}
            </DropdownMenuCheckboxItem>
          ))}
          {selected.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={onClear}
                className="justify-center text-gray-600"
              >
                Clear filters
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

const CategoryTrigger = forwardRef<HTMLButtonElement, {
  label: string;
  count: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>>(({ label, count, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn('group h-10 pl-4 pr-3 flex items-center gap-2 rounded-full border border-gray-200 bg-white text-nowrap transition-colors duration-200 hover:bg-gray-100 data-[state=open]:border-black', className)}
      {...props}
    >
      <span>{label}</span>
      {count > 1 && (
        <span className="h-5 px-1.5 flex items-center justify-center rounded-full bg-black text-xs text-white tabular-nums">
          +{count - 1}
        </span>
      )}
      <ChevronDown
        size={15}
        className="text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </button>
  )
});

CategoryTrigger.displayName = 'CategoryTrigger';

function CategoryPills({ categories, allLabel = 'All', selected, onToggle, onClear }: CategorySelectionProps) {
  return (
    <ul
      aria-label="Filter by category"
      className='hidden md:flex min-w-0 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    >
      <li className="shrink-0">
        <CategoryPill
          isActive={selected.length === 0}
          onClick={onClear}
        >
          {allLabel}
        </CategoryPill>
      </li>
      {categories.map((category) => (
        <li key={category._id} className="shrink-0">
          <CategoryPill
            isActive={selected.includes(category.slug ?? '')}
            onClick={() => onToggle?.(category.slug ?? '')}
          >
            {category.title}
          </CategoryPill>
        </li>
      ))}
    </ul>
  )
};

function CategoryPill({ isActive, onClick, children }: {
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn('h-10 px-4 rounded-full border text-nowrap transition-colors duration-200', {
        'border-black bg-black text-white': isActive,
        'border-gray-200 bg-white hover:bg-gray-100': !isActive,
      })}
    >
      {children}
    </button>
  )
};
