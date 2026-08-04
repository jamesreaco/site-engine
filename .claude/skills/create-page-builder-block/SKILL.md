---
name: create-page-builder-block
description: Use when the user wants to add a new page builder block / section type to this Sanity + Next.js site (e.g. "create a new block", "add a page builder block", "new Sanity block", "add a stats/testimonial/pricing section to the page builder"). Scaffolds and wires a block across every required file.
---

# Create a page builder block

This repo's page builder has no single registry — a new block requires touching **7 files** in an exact pattern. Missing one is the most common failure mode, so work through the checklist in order and don't skip steps.

## 1. Gather requirements first

Before writing anything, make sure you know:
- The block's name
- Every field it needs, and their types (string, array of items, image, buttons, rich text, etc.)
- Whether it needs buttons (reuse `buttonObject` / `buttonFields`), padding controls (reuse `paddingFields`), or rich text (reuse the `block` array pattern)

If any of this is missing from the user's request, ask a single plain, open-ended question for it — e.g. "What should this block be called, and what fields does it need?". Do **not** use a multiple-choice question with invented example block types (stats/pricing/testimonial/etc.) as options — that's guessing on the user's behalf, not clarifying. Just ask in plain text and let them answer freely.

Pick the insert-menu group (`intro` / `content` / `marketing` / `socialProof`, see `src/sanity/schemas/page-builder/page-builder.ts`) yourself based on the block's purpose — don't ask the user about this unless it's genuinely ambiguous.

## 2. Derive names (keep these consistent everywhere)

| From title    | Convention                         | Example (title: "Stats")     |
|----------------|-------------------------------------|-------------------------------|
| Schema `name`  | camelCase + `Block` suffix          | `statsBlock`                  |
| Schema filename| kebab-case + `-block.ts`            | `stats-block.ts`              |
| Component file | PascalCase + `Block.tsx`            | `StatsBlock.tsx`               |
| Component export/type | PascalCase                  | `StatsBlock`, `StatsBlockProps`|
| GROQ fragment const | `<name>BlockQuery`             | `statsBlockQuery`             |
| PB_BLOCKS key  | same as schema `name`               | `statsBlock`                  |

## 3. The 7 touch points (checklist)

1. `src/sanity/schemas/page-builder/blocks/<kebab-name>-block.ts` — new schema file
2. `src/sanity/schemas/index.ts` — import + add to `pageBuilderSchema[]`
3. `src/sanity/schemas/page-builder/page-builder.ts` — add `defineArrayMember` to `of: [...]`, add name to one `insertMenu.groups[].of` array
4. `src/sanity/lib/queries/fragments/page-builder/blocks.ts` — new `export const <name>BlockQuery`
5. `src/sanity/lib/queries/fragments/page-builder/index.ts` — import the fragment, splice into the `pageBuilder` template string
6. `src/components/page-builder/blocks/<PascalName>.tsx` — new React component
7. `src/components/page-builder/index.tsx` — add `dynamic(() => import(...))` line + add to `PB_BLOCKS` map

Then: regenerate Sanity types (step 8 below) and run verification (step 9).

## 4. Schema template

Reference files: `src/sanity/schemas/page-builder/blocks/logo-block.ts` (simple) and `feature-cards-block.ts` (nested arrays + shared button object + conditional CTA). Read whichever is closer to what's being built before writing the new one — don't guess at field syntax.

Simple pattern (`logo-block.ts`):

```ts
import { GripHorizontal } from "lucide-react"; // pick a fitting lucide-react icon
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'statsBlock',
  title: 'Stats',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    // ... block-specific fields ...
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Stats',
        media: GripHorizontal,
      }
    },
  },
})
```

Rules:
- Always spread the full shared `fieldsets`/`groups` arrays, even if unused, for Studio UI consistency.
- Always end the `fields` array with an `anchorId` string field (used for in-page anchor links) — every existing block has one.
- For buttons: use `{ type: 'buttonObject' }` in an array (top-level, like `featureCardsBlock.buttons`), or spread `buttonFields` into a nested object's `fields` (see `feature-cards-block.ts`'s `features[].button`). Both come from `src/sanity/schemas/misc/button-fields.ts` / `src/sanity/schemas/objects/button.ts`.
- For padding controls: spread `paddingFields` from `src/sanity/schemas/misc/padding-fields.ts` into `fields`.
- For rich text: use `type: 'array', of: [{ type: 'block', styles: [...], lists: [...] }]` (see `callToActionContent` in `feature-cards-block.ts`) or the shared `richTextObject`/`headingObject` types where a full-featured editor is wanted.
- `preview.prepare().media` must be a `lucide-react` icon import — no custom SVGs per block.

## 5. Register the schema (`src/sanity/schemas/index.ts`)

Add an import near the other block imports, and add the identifier to `pageBuilderSchema[]`:

```ts
import statsBlock from "./page-builder/blocks/stats-block";
// ...
const pageBuilderSchema = [
  pageBuilder,
  heroBlock,
  // ...
  statsBlock,
];
```

## 6. Register in the array field + insert menu (`src/sanity/schemas/page-builder/page-builder.ts`)

```ts
defineArrayMember({ name: 'statsBlock', type: 'statsBlock' }),
```

...and add `'statsBlock'` to the most appropriate `insertMenu.groups[].of` array (`intro` / `content` / `marketing` / `socialProof`).

## 7. GROQ fragment (`src/sanity/lib/queries/fragments/page-builder/blocks.ts`)

Mirror the schema shape exactly. Reuse shared fragments from `../misc` (`baseQuery`, `buttonQuery`, `mediaQuery`, `paddingQuery`):

```ts
import { baseQuery, buttonQuery, mediaQuery, paddingQuery } from "../misc";

export const statsBlockQuery = `
  _type == "statsBlock" => {
    ${baseQuery},
    heading,
    stats[] {
      _key,
      value,
      label
    },
    anchorId
  }
`
```

- Every image field must select through `${mediaQuery}` (never just `asset->{ url }` by hand).
- Every button field/array must select through `${buttonQuery}`.
- Array-of-object fields need `_key` selected explicitly.

## 8. Union into the pageBuilder query (`src/sanity/lib/queries/fragments/page-builder/index.ts`)

Import the new fragment and splice it into the `pageBuilder` template string (order matches `page-builder.ts`'s `of:` array by convention, but exact order doesn't affect correctness):

```ts
import { statsBlockQuery, /* ...existing... */ } from "./blocks";

export const pageBuilder = `
  pageBuilder[] {
    ${heroBlockQuery},
    // ...
    ${statsBlockQuery}
  }
`
```

## 9. React component (`src/components/page-builder/blocks/<PascalName>.tsx`)

Reference files: `LogoBlock.tsx` (simple) and `FeatureCardsBlock.tsx` (nested arrays, private sub-components in the same file, shared UI components). Read whichever fits before writing.

```tsx
import { PageBuilderType } from '@/types';
import Container from '@/components/global/Container';

export type StatsBlockProps = PageBuilderType<"statsBlock">;

export default function StatsBlock(props: StatsBlockProps) {

  const { heading, stats, anchorId } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10'
    >
      <Container>
        {/* block markup */}
      </Container>
    </section>
  )
};
```

Rules:
- Prop type is always `export type <PascalName>Props = PageBuilderType<"<schemaName>">;` — never hand-write a prop interface.
- Styling is Tailwind utility classes only (no CSS Modules); use `cn()` from `@/lib/utils` for conditional classes.
- Images: `next/image`, `src={field.asset?.url ?? ''}`.
- Any stega-encoded string field used in logic/comparisons (not just rendered as text) must go through `stegaClean()` from `next-sanity` first (see `LogoBlock.tsx`'s `stegaClean(item?.size)`).
- Reuse shared components where relevant instead of rebuilding: `@/components/shared/Heading`, `@/components/shared/ButtonRenderer`, `@/components/ui/Button`, `@/components/portable-text/PortableTextEditor`.
- Wrap the block body in `<Container>` from `@/components/global/Container`.
- Spread `{...(anchorId ? { id: anchorId } : {})}` onto the root `<section>`.
- Private sub-components (e.g. a repeated card) can live as extra unexported functions in the same file, below the default export — see `FeatureCardsBlock.tsx`'s `FeatureCard`/`CallToAction`.

## 10. Register the component (`src/components/page-builder/index.tsx`)

```tsx
const StatsBlock = dynamic(() => import("./blocks/StatsBlock"));
// ...
const PB_BLOCKS = {
  // ...
  statsBlock: StatsBlock,
} as const;
```

Always use `dynamic()` — never a static import — to match every existing block.

## 11. Regenerate Sanity types

Block prop types (`PageBuilderType<"statsBlock">`) are derived automatically from the generated `sanity.types.ts` — there's no manual union to edit. After all files above are in place, run:

```
npx sanity schema extract
npx sanity typegen generate
```

These aren't wired into `package.json` scripts; run them directly. Without this step the new component's props will fail to typecheck.

## 12. Optional: Studio insert-menu preview image

Not required for the block to work, but conventional: drop a PNG at `public/sanity/preview-<schemaName>.png` (e.g. `public/sanity/preview-statsBlock.png`). It's picked up automatically by the grid view's `previewImageUrl` in `page-builder.ts`. Mention this to the user rather than generating an image yourself.

## 13. Verify

Run, in order:
```
npx tsc --noEmit
npm run lint
```

Fix any errors before considering the block done. Then tell the user to check Sanity Studio's insert menu for the new block and confirm it renders on a page — this skill cannot visually verify Studio itself.