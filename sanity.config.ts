import { defineConfig } from 'sanity';
import { schema } from '@/sanity/schemas';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import { structure } from '@/sanity/lib/structure';
import { presentationTool } from 'sanity/presentation';
import { resolve } from '@/sanity/presentation/resolve';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { defaultDocumentNode } from '@/sanity/lib/structure/default-document-node';

const config = defineConfig({
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  dataset: dataset,
  basePath: studioUrl,
  projectId: projectId,
  apiVersion: apiVersion,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    media(),
    visionTool(),
    simplerColorInput()
  ],
  schema: schema,
});

export default config;