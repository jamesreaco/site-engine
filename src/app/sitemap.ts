import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { sitemapQuery } from "@/sanity/lib/queries/misc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(sitemapQuery);

    if (!paths) return [];

    const baseUrl = process.env.VERCEL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      ...paths
        .filter((path): path is typeof path & { href: string } => path.href != null)
        .map((path) => ({
          url: new URL(path.href, baseUrl).toString(),
          lastModified: new Date(path._updatedAt),
          changeFrequency: "weekly" as const,
          priority: 1,
        })),
    ];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return [];
  }
};