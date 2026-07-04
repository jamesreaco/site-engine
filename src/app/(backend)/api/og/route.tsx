import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { ogImageQuery } from "@/sanity/lib/queries/singletons/og";

export const runtime = "edge";

const dimensions = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (!id) { notFound(); };

  const data = await client.fetch(ogImageQuery, { id });
  if (!data) { notFound(); };

  const text = data.title || "";

  return new ImageResponse(
    (
      <div 
        tw="flex w-full h-full relative px-10"
        style={{ backgroundColor: '#f9fafb' }}
      >
        <div 
          tw="flex flex-col items-start justify-between w-full p-20 relative"
          style={{
            borderLeft: '1px dashed #a4a6ab',
            borderRight: '1px dashed #a4a6ab'
          }}
        >
          <div className="flex text-xl">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </div>
          <h1 tw="text-[120px] font-bold font-geist">
            {text || "Missing title parameter"}
          </h1>
        </div>
      </div>
    ),
    dimensions
  );
};