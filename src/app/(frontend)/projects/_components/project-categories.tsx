"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ProjectCategoryType } from "@/types/project";

export default function ProjectCategories({ categories }: {
  categories: ProjectCategoryType[]
}) {
  return (
    <ul className='relative z-20 flex items-center justify-start gap-0 md:gap-2'>
      <li className="text-nowrap">
        <CategoryLink
          href={`/projects`}
        >
          All Projects
        </CategoryLink>
      </li>
      {categories.map((category: ProjectCategoryType) => (
        <li key={category._id} className="text-nowrap">
          <CategoryLink
            href={`/projects/category/${category.slug}`}
            category={category}
          >
            {category.title}
          </CategoryLink>
        </li>
      ))}
    </ul>
  )
}

function CategoryLink({ href, category, children }: {
  href: string;
  category?: ProjectCategoryType;
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const isActive = category 
    ? pathname === `/projects/category/${category.slug}`
    : pathname === '/projects';

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
}