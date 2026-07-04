import { Metadata } from "next";
import { processMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import Container from "@/components/global/Container";
import { PageBuilder } from "@/components/page-builder";
import { PageBySlugQueryResult } from "../../../sanity.types";
import { pageBySlugQuery } from "@/sanity/lib/queries/documents/page";
import { generalSettingsQuery } from "@/sanity/lib/queries/singletons/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: generalSettingsQuery,
    stega: false,
  });

  const page = settings?.homePage;

  if (!page) { return {} };

  return processMetadata({ data: page as PageBySlugQueryResult });
};

export default async function Home() {

  const { data: settings } = await sanityFetch({
    query: generalSettingsQuery,
  });

  if (settings?.homePage === null) return (
    <Container className="py-16">
      No Homepage Set...
    </Container>
  );

  const { data: page } = await sanityFetch({ 
    query: pageBySlugQuery, 
    params: { slug: settings?.homePage?.slug },
  });

  return(
    <div id="home">
      <PageBuilder 
        id={page?._id ?? ""} 
        type={page?._type ?? ""} 
        pageBuilder={page?.pageBuilder ?? []} 
      />
    </div>
  )
};