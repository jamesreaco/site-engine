"use client"

import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { PageBuilderType } from "@/types";
import { createDataAttribute } from "next-sanity";
import { PageBySlugQueryResult } from "../../../sanity.types";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";

const HeroBlock = dynamic(() => import("./blocks/HeroBlock"));
const HeaderBlock = dynamic(() => import("./blocks/HeaderBlock"));
const FeatureCardsBlock = dynamic(() => import("./blocks/FeatureCardsBlock"));
const TestimonialBlock = dynamic(() => import("./blocks/TestimonialBlock"));
const LogoBlock = dynamic(() => import("./blocks/LogoBlock"));
const FreeformBlock = dynamic(() => import("./blocks/FreeformBlock"));
const PortableTextBlock = dynamic(() => import("./blocks/PortableTextBlock"));
const CallToActionBlock = dynamic(() => import("./blocks/CallToActionBlock"));
const FeaturesMinimalBlock = dynamic(() => import("./blocks/FeaturesMinimalBlock"));
const ServicesBlock = dynamic(() => import("./blocks/ServicesBlock"));
const FormBlock = dynamic(() => import("./blocks/FormBlock"));
const MediaBlock = dynamic(() => import("./blocks/MediaBlock"));

type PageBlock = NonNullable<
  NonNullable<PageBySlugQueryResult>["pageBuilder"]
>[number];

export type PageBuilderProps = {
  pageBuilder: PageBlock[];
  id: string;
  type: string;
};

const PB_BLOCKS = {
  heroBlock: HeroBlock,
  headerBlock: HeaderBlock,
  featureCardsBlock: FeatureCardsBlock,
  testimonialBlock: TestimonialBlock,
  logoBlock: LogoBlock,
  freeformBlock: FreeformBlock,
  portableTextBlock: PortableTextBlock,
  callToActionBlock: CallToActionBlock,
  featuresMinimalBlock: FeaturesMinimalBlock,
  servicesBlock: ServicesBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
} as const;

type BlockType = keyof typeof PB_BLOCKS;

export function PageBuilder({ pageBuilder, id, type }: PageBuilderProps) {
  return (
    <div
      data-sanity={createDataAttribute({
        id: id,
        type: type,
        dataset: dataset,
        baseUrl: studioUrl,
        path: "pageBuilder",
        projectId: projectId,
      }).toString()}
    >
      {pageBuilder.map((block) => {
        const Component = PB_BLOCKS[block._type] as ComponentType<PageBuilderType<BlockType>>;
        return (
          <div
            key={`${block._type}-${block._key}`}
            data-sanity={createDataAttribute({
              id: id,
              type: type,
              dataset: dataset,
              baseUrl: studioUrl,
              projectId: projectId,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component {...block} />
          </div>
        );
      })}
    </div>
  );
};