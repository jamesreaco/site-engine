import { dataset, projectId } from "./api";
import {createImageUrlBuilder} from "@sanity/image-url";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "", dataset: dataset || "",
});

export const urlForImage = (source: {
  asset?: {
    _ref: string;
  };
}) => {
  if (!source?.asset?._ref) { return undefined; }
  return imageBuilder?.image(source).auto("format").fit("max");
};