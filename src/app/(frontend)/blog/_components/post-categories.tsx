"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BlogPageQueryResult } from "../../../../../sanity.types";

type Blog = NonNullable<
  NonNullable<BlogPageQueryResult>
>;

interface PostCategoriesProps {
  categories: Blog['categories'];
};

export default function PostCategories({ categories }: PostCategoriesProps) {
  return (
    <ul className='relative z-20 flex items-center justify-start gap-0 md:gap-2'>
      <li className="text-nowrap">
        <CategoryLink
          href={`/blog`}
        >
          All Posts
        </CategoryLink>
      </li>
      {categories.map((category) => (
        <li key={category._id} className="text-nowrap">
          <CategoryLink
            href={`/blog/category/${category.slug}`}
            category={category}
          >
            {category.title}
          </CategoryLink>
        </li>
      ))}
    </ul>
  )
};

function CategoryLink({ href, category, children }: {
  href: string;
  children: React.ReactNode;
  category?: Blog['categories'][number];
}) {

  const pathname = usePathname();

  const isActive = category 
    ? pathname === `/blog/category/${category.slug}`
    : pathname === '/blog';

  return (
    <Link 
      href={href}
      className={cn('py-2 px-3.5 rounded-full border border-transparent backdrop-blur-md transition-all duration-300', {
        'mr-2 md:mr-0 border-black bg-black text-white': isActive,
        'hover:bg-white hover:border-gray-200': !isActive
      })}
    >
      {children}
    </Link>
  )
};