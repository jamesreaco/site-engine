import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};