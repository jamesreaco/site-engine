import { client } from "./client";
import { token } from "@/sanity/lib/token";
import { defineLive } from "next-sanity/live";

export const { sanityFetch, SanityLive } = defineLive({
  client: client,
  serverToken: token,
  browserToken: token,
});