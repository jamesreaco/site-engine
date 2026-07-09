import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "./api";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: true,
  stega: {
    studioUrl: studioUrl,
  },
});