import "./globals.css";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import ClientLayout from "@/components/global/client-layout";
import { DisableDraftMode } from "@/components/shared/disable-draft-mode";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { NAVIGATION_SETTINGS_QUERY } from "@/sanity/lib/queries/singletons/navigation";
import { GENERAL_SETTINGS_QUERY, MARKETING_SETTINGS_QUERY } from "@/sanity/lib/queries/singletons/settings";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description: "Open-Source Next.js & Sanity Marketing Website Template.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isEnabled: isDraftMode } = await draftMode();

  const [{ data: settings }, { data: marketingSettings }, { data: navigationSettings }] = await Promise.all([
    sanityFetch({ query: GENERAL_SETTINGS_QUERY }),
    sanityFetch({ query: MARKETING_SETTINGS_QUERY }),
    sanityFetch({ query: NAVIGATION_SETTINGS_QUERY })
  ]);
  
  return (
    <html lang="en">
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
    </html>
  );
}