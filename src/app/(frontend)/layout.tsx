import "./globals.css";

import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/global/Container";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import ClientLayout from "@/components/global/ClientLayout";
import { VisualEditing } from "@/components/shared/VisualEditing";
import InstallDemoButton from "@/components/shared/InstallDemoButton";
import { DisableDraftMode } from "@/components/shared/DisableDraftMode";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { navigationSettingsQuery } from "@/sanity/lib/queries/singletons/navigation";
import { generalSettingsQuery, marketingSettingsQuery } from "@/sanity/lib/queries/singletons/settings";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description: "Open-Source Next.js & Sanity Marketing Website Template.",
};

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const { isEnabled: isDraftMode } = await draftMode();

  const [
    { data: settings }, 
    { data: marketingSettings }, 
    { data: navigationSettings }
  ] = await Promise.all([
    sanityFetch({ query: generalSettingsQuery }),
    sanityFetch({ query: marketingSettingsQuery }),
    sanityFetch({ query: navigationSettingsQuery })
  ]);

  if (!settings) return (
    <Container className="py-16 flex items-center justify-center gap-2.5 h-screen pattern-bg--2">
      <InstallDemoButton />
    </Container>
  );
  
  return (
    <body>
      <ClientLayout 
        settings={settings}
        navigationSettings={navigationSettings}
      >
        {children}
      </ClientLayout>
      <SanityLive />
      {isDraftMode && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      {marketingSettings?.googleAnalyticsId && (
        <GoogleAnalytics 
          gaId={marketingSettings.googleAnalyticsId} 
        />
      )}
      {marketingSettings?.googleTagManagerId && (
        <GoogleTagManager 
          gtmId={marketingSettings?.googleTagManagerId} 
        />
      )}
    </body>
  );
};