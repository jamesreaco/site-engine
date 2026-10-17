import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Categorised {
  category?: { slug: string | null } | null;
};

export function useSelectedCategories(basePath: string) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryPagePrefix = `${basePath}/category/`;
  const selected = pathname.startsWith(categoryPagePrefix)
    ? [pathname.replace(categoryPagePrefix, '')]
    : searchParams.getAll('category');

  function setSelected(slugs: string[]) {
    const params = new URLSearchParams();
    slugs.forEach((slug) => params.append('category', slug));
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  };

  return { selected, setSelected };
};

export function useCategoryFilter<T extends Categorised>(items: T[], basePath: string) {
  const { selected } = useSelectedCategories(basePath);
  return selected.length > 0
    ? items.filter((item) => selected.includes(item.category?.slug ?? ''))
    : items;
};