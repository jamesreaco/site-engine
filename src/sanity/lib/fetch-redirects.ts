"use server"
import { client } from "./client";
import { Redirect } from 'next/dist/lib/load-custom-routes';

interface SanityRedirect {
  _type: string;
  source?: string;
  destination?: string;
  permanent?: boolean;
}

export async function fetchRedirects(): Promise<Redirect[]> {
  const redirects = await client.fetch(`*[_type == "redirect" && isEnabled == true]`);
  
  return redirects
    .filter((r: SanityRedirect) => r.source && r.destination)
    .map((r: SanityRedirect) => ({
      source: r.source,
      destination: r.destination,
      permanent: !!r.permanent
    }));
}