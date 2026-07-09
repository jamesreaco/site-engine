import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from 'next/font/google'
import { GeneralSettingsQueryResult, NavigationSettingsQueryResult } from '../../../sanity.types';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface WebsiteLayoutProps {
  children: React.ReactNode;
  settings: GeneralSettingsQueryResult;
  navigationSettings: NavigationSettingsQueryResult;
};

export default function WebsiteLayout({ 
  children,
  settings,
  navigationSettings,
}: WebsiteLayoutProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-geistSans antialiased grid min-h-[100dvh] grid-rows-[auto_1fr_auto]`}>
      <Navbar 
        settings={settings}
        navigationSettings={navigationSettings}
      />
      <main className='overflow-hidden'>
        {children}
      </main>
      <Footer 
        settings={settings} 
        navigationSettings={navigationSettings}
      />
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'text-sm font-semibold antialiased',
          style: {
            borderRadius: '300px',
            padding: '4px 8px',
            color: '#FFFFFF',
            fontWeight: '500',
            backgroundColor: '#000000'
          }
        }}
      />
    </div>
  )
};