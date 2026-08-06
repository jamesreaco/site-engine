import "./globals.css";

import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { JsonLd } from "@/components/shared/JsonLd";
import Container from "@/components/global/Container";
import { VisualEditing } from "next-sanity/visual-editing";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import WebsiteLayout from "@/components/global/WebsiteLayout";
import { organizationSchema, websiteSchema } from "@/lib/json-ld";
import InstallDemoButton from "@/components/shared/InstallDemoButton";
import { DisableDraftMode } from "@/components/shared/DisableDraftMode";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { navigationSettingsQuery } from "@/sanity/lib/queries/singletons/navigation";
import { announcementBarSettingsQuery, generalSettingsQuery, marketingSettingsQuery } from "@/sanity/lib/queries/singletons/settings";

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
    { data: navigationSettings },
    { data: announcementBarSettings }
  ] = await Promise.all([
    sanityFetch({ query: generalSettingsQuery }),
    sanityFetch({ query: marketingSettingsQuery }),
    sanityFetch({ query: navigationSettingsQuery }),
    sanityFetch({ query: announcementBarSettingsQuery })
  ]);

  if (!settings) return (
    <body>
      <Container className="py-16 flex items-center justify-center gap-2.5 h-screen pattern-bg--2">
        <InstallDemoButton />
      </Container>
    </body>
  );
  
  return (
    <body>
      <JsonLd data={organizationSchema(settings)} />
      <JsonLd data={websiteSchema(settings)} />
      <WebsiteLayout
        settings={settings}
        navigationSettings={navigationSettings}
        announcementBarSettings={announcementBarSettings}
      >
        {children}
      </WebsiteLayout>
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