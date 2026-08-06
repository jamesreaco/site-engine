import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageBuilder } from '@/components/page-builder';
import { itemListSchema, webPageSchema } from '@/lib/json-ld';
import { allServicesQuery, servicesPageQuery } from '@/sanity/lib/queries/documents/service';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: servicesPageQuery,
    stega: false
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
};

export default async function ServicesPage() {

  const { data: page } = await sanityFetch({
    query: servicesPageQuery,
  });

  if (page === null) notFound();

  const { data: services } = await sanityFetch({
    query: allServicesQuery,
  });

  return (
    <>
      <JsonLd data={webPageSchema({ 
        schemaType: 'CollectionPage', 
        title: page.title, 
        seo: page.seo, 
        documentType: 'servicesPage' 
      })} />
      {services && services.length > 0 && (
        <JsonLd data={itemListSchema({ 
          items: services, 
          path: '/services' 
        })} />
      )}
      <PageBuilder
        id={page?._id ?? ''}
        type="servicesPage"
        pageBuilder={page?.pageBuilder ?? []}
      />
    </>
  )
};