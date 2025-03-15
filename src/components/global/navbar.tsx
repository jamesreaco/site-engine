import React from 'react';
import Link from 'next/link';
import Container from './container';
import { Button } from '../ui/button';
import useScroll from '@/hooks/use-scroll';
import SiteLogo from '../shared/site-logo';
import SlideOutMenu from './slide-out-menu';
import { usePathname } from 'next/navigation';
import { cn, resolveHref } from '@/lib/utils';
import { ChevronRight, Menu } from 'lucide-react';
import AnimatedText from '../shared/animated-text';
import { GeneralSettingsQueryResult, NavigationSettingsQueryResult } from '../../../sanity.types';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

interface NavbarProps {
  settings: GeneralSettingsQueryResult;
  navigationSettings: NavigationSettingsQueryResult;
}

export default function Navbar({ settings, navigationSettings }: NavbarProps) {

  const pathname = usePathname();
  const hasScrolled = useScroll();

  const { navbarMenuItems } = navigationSettings?.navbar ?? {};
  const { showSlideOutMenu } = navigationSettings?.slideOutMenu ?? {};
  
  return (
    <header 
      className={cn('z-40 fixed top-0 left-0 w-full py-6 rounded-b-xl border-b border-b-gray-100 bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out', {
        'py-4 ': hasScrolled
      })}
    >
      <Container className='flex items-center justify-between'>
        <SiteLogo settings={settings} />
        <div className='flex items-center gap-3'>
          <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className='space-x-8 group/nav'>
              {navbarMenuItems?.map((item) => (
                <React.Fragment key={item._key}>
                  {!item.isButton ? (
                    <>
                      {item.menuItemType === 'group' ? (
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className='min-w-[180px] text-nowrap py-3 px-3 flex flex-col gap-2 bg-white'>
                            {item.pageReferences?.map((page) => (
                              <Link 
                                key={page.slug} 
                                href={resolveHref(page._type, page.slug ?? '') ?? '/'}
                                className='group py-1 pl-3 pr-2 flex items-center justify-between gap-6 rounded-md border border-dashed hover:bg-gray-50'
                              >
                                {page.title}
                                <ChevronRight 
                                  size={14} 
                                  className='text-gray-300 group-hover:-translate-x-0.5 group-hover:text-gray-500 transition-all duration-300' 
                                />
                              </Link>
                            ))}
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      ): (
                        <NavigationMenuItem>
                          <Link 
                            href={resolveHref(item?.pageReference?._type ?? '', item?.pageReference?.slug ?? '') ?? '/'}
                            className={cn('relative overflow-hidden inline-flex transition-opacity duration-200 hover:!opacity-100', {
                              'hover:underline underline-offset-[38px]': !item.isButton,
                              'py-2 px-4 rounded-full text-white bg-blue-600': item.isButton,
                              'text-blue-700': pathname.includes(`/${item.pageReference?.slug ?? ''}`)
                            })}
                          >
                            <AnimatedText>
                              {item.title}
                            </AnimatedText>
                          </Link>
                        </NavigationMenuItem>
                      )}
                    </>
                  ): (
                    <NavigationMenuItem>
                      <Button 
                        variant="primary" 
                        disableIcon={true}
                        buttonType="internal"
                        pageReference={item.pageReference}
                      >
                        {item.title}
                      </Button>
                    </NavigationMenuItem>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {showSlideOutMenu && (
            <SlideOutMenu 
              settings={settings} 
              navigationSettings={navigationSettings}
            >
              <button aria-label='Open menu' className='p-2.5 border border-gray-200/60 rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out'>
                <Menu size={18} />
              </button>
            </SlideOutMenu>
          )}
        </div>
      </Container>
    </header>
  )
}