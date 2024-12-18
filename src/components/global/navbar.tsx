import Link from 'next/link';
import { cn } from '@/lib/utils';
import Container from './container';
import { Button } from '../ui/button';
import SiteLogo from '../shared/site-logo';
import useScroll from '@/hooks/use-scroll';
import { usePathname } from 'next/navigation';
import AnimatedText from '../ui/animated-text';
import { SettingsType } from '@/types/settings';
import { NavigationSettingsType } from '@/types/navigation';

interface NavbarProps {
  settings: SettingsType;
  navigationSettings: NavigationSettingsType['navbar']
}

export default function Navbar({ settings, navigationSettings }: NavbarProps) {

  const pathname = usePathname();
  const hasScrolled = useScroll();

  const { siteTitle, logo } = settings
  const { navbarType, navbarMenuItems: menuItems } = navigationSettings;

  return (
    <header 
      className={cn('z-20 fixed top-0 left-0 bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out', {
        'py-1 border w-fit mx-auto right-0 top-4 rounded-full': navbarType === 'floating',
        'w-full py-6 rounded-b-xl border-b border-b-gray-100': navbarType === 'classic',
        'py-4 ': hasScrolled && navbarType === 'classic',
      })}
    >
      <Container 
        className={cn('flex items-center justify-between', {
          'md:px-1 md:pl-6 gap-6': navbarType === 'floating'
        })}
      >
        <SiteLogo siteTitle={siteTitle} logo={logo} navbarType={navbarType} />
        <ul 
          className={cn('hidden md:flex items-center gap-8 group/nav', {
            'gap-6 text-sm': navbarType === 'floating'
          })}
        >
          {menuItems.map(({ _key, pageReference, title, isButton }) => (
            <li key={_key} className='relative'>
              <>
                {!isButton ? (
                  <>
                    <Link 
                      href={`/${pageReference.slug}`}
                      className={cn('relative overflow-hidden inline-flex transition-opacity duration-200 group-hover/nav:opacity-40 hover:!opacity-100', {
                        'hover:underline underline-offset-[38px]': !isButton,
                        'py-2 px-4 rounded-full text-white bg-blue-600': isButton,
                      })}
                    >
                      <AnimatedText>
                        {title}
                      </AnimatedText>
                    </Link>
                    {pathname.includes(`/${pageReference.slug}`) && (
                      <div className='absolute -bottom-1.5 left-0 right-0 w-full flex items-center justify-center transition-all duration-300'>
                        <div className='border-b-[1.5px] border-dashed w-full'></div>
                      </div>
                    )}
                  </>
                ): (
                  <Button 
                    variant="primary" 
                    disableIcon={true}
                    buttonType="internal"
                  >
                    {title}
                  </Button>
                )}
              </>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  )
}