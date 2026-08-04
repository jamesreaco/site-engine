---
name: create-portable-text-component
description: Use when the user wants to add a new custom object type that can be inserted inline into rich text / Portable Text content on this Sanity + Next.js site (e.g. "create a portable text component", "add a new block type inside rich text", "new inline object for the content editor" — things like the existing Call To Action, Single Image, or Video embeds). Not to be confused with page builder blocks (top-level page sections) — use create-page-builder-block for those.
---

# Create a portable text component

Portable Text content fields (`content` on `postBlock`/`portableTextBlock`-style schemas) accept `{ type: 'block' }` for normal rich text plus a handful of custom **object types** — e.g. `callToActionObject`, `singleImageObject`, `videoObject` — that render as inline embeds inside the editor. This skill scaffolds a new one of those. It requires touching **5 files** in an exact pattern.

Reference files for the whole flow: `src/sanity/schemas/objects/call-to-action.ts`, `src/components/portable-text/components/CallToAction.tsx`, `src/components/portable-text/PortableTextComponents.tsx`.

## 1. Gather requirements first

Ask the user directly (a single plain, open-ended question, not multiple choice with invented examples):
- What should the component be called?
- What fields should it have, and their types (string, longer text, image, buttons, url, etc.)?

Don't guess field names or invent extra fields beyond what's asked.

## 2. Derive names (keep these consistent everywhere)

| From title    | Convention                    | Example (title: "Quote")   |
|----------------|--------------------------------|------------------------------|
| Schema `name`  | camelCase + `Object` suffix    | `quoteObject`                |
| Schema filename| kebab-case, **no** suffix      | `quote.ts`                   |
| Component file | PascalCase, **no** suffix      | `Quote.tsx`                  |
| Component export | PascalCase                  | `Quote`                      |

Note this differs from page-builder blocks: object schema filenames and component filenames drop the `-object`/`Object` suffix (see `call-to-action.ts` → `callToActionObject`, `CallToAction.tsx`).

## 3. The 5 touch points (checklist)

1. `src/sanity/schemas/objects/<kebab-name>.ts` — new schema object
2. `src/sanity/schemas/index.ts` — import + add to `objectSchema[]`
3. Every Portable Text `content` field's `of: [...]` array that should allow this embed — add `{ type: '<name>Object' }`
4. `src/components/portable-text/components/<PascalName>.tsx` — new React component
5. `src/components/portable-text/PortableTextComponents.tsx` — register in the `types` map

Then: regenerate Sanity types (step 6) and verify (step 7).

## 4. Schema (`src/sanity/schemas/objects/<kebab-name>.ts`)

```ts
import { Quote as QuoteIcon } from "lucide-react"; // pick a fitting lucide-react icon
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'quoteObject',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Quote',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'quoteText',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Quote',
        media: QuoteIcon,
      }
    },
  },
})
```

Rules:
- No `fieldsets`/`groups`/`anchorId` here — those are page-builder-block conventions, not used on inline objects (see `call-to-action.ts`, `single-image.ts`, `video.ts` — none have them).
- `preview.prepare().media` must be a `lucide-react` icon import.
- For buttons: `{ name: 'buttons', type: 'array', of: [{ type: 'buttonObject' }] }` (see `call-to-action.ts`).
- For an image: mirror `single-image.ts` — an `image` field with nested `altText` (string) and optionally `aspectRatio` (via `RatioInput`, only if genuinely needed — don't add it speculatively).
- Keep fields flat and minimal — this is an inline embed, not a full block.

## 5. Register the schema (`src/sanity/schemas/index.ts`)

```ts
import quoteObject from './objects/quote';
// ...
const objectSchema = [
  seoObject,
  headingObject,
  richTextObject,
  buttonObject,
  singleImageObject,
  spacerObject,
  callToActionObject,
  videoObject,
  quoteObject,
];
```

## 6. Allow it inside Portable Text content arrays

Find every `of: [...]` array that contains `{ type: 'block' }` alongside other `*Object` types (currently: `content` on `src/sanity/schemas/documents/post.ts` and `content` on `src/sanity/schemas/page-builder/blocks/portable-text-block.ts` — check both, there may be more by the time this runs via `grep -rn "type: 'block'" src/sanity/schemas`). These two don't necessarily allow the same set of objects today, so **ask the user which rich text field(s) this new component should be insertable into** if it's not obvious from their request, rather than assuming "all of them."

```ts
of: [
  { type: 'block' },
  { type: 'callToActionObject' },
  { type: 'quoteObject' },
],
```

## 7. React component (`src/components/portable-text/components/<PascalName>.tsx`)

This is the important part for this skill: **keep it deliberately basic**. Don't design a polished layout, don't guess styling — just render each field plainly so a human developer can see the data shape and implement the real design on top. Reference `CallToAction.tsx` / `SingleImage.tsx` / `Video.tsx` for the prop-typing pattern (hand-written inline `data` type — these don't use generated `PageBuilderType<...>` since they're not page-builder blocks).

```tsx
export default function Quote({ data }: {
  data: {
    quoteText?: string;
    attribution?: string;
  }
}) {

  const { quoteText, attribution } = data;

  return (
    <div className="mt-12 p-4 border border-dashed rounded-3xl space-y-2">
      {/* TODO: implement real design — fields are rendered plainly below */}
      {quoteText && <p><strong>Quote:</strong> {quoteText}</p>}
      {attribution && <p><strong>Attribution:</strong> {attribution}</p>}
    </div>
  )
};
```

Rules:
- Hand-write the `data` prop type inline to mirror the schema fields — don't invent a `PageBuilderType`-style generic for these.
- Wrap the whole thing in a visibly minimal container (`border border-dashed` like the existing examples) and a `{/* TODO: implement real design */}` comment — signal clearly that this is a scaffold, not a finished component.
- Render every field, guarded with `{field && ...}`, labeled with its name so the shape is obvious at a glance.
- Images: use `urlForImage` from `@/sanity/lib/utils` + `next/image`, following `SingleImage.tsx` — asset refs don't need GROQ dereferencing for these inline objects.
- Buttons: reuse `ButtonRenderer` from `@/components/shared/ButtonRenderer` and `ButtonType` from `@/types`, following `CallToAction.tsx` — don't hand-roll button rendering.
- Add `"use client"` at the top only if the component needs it (e.g. `Video.tsx` does, for `react-player`).

## 8. Register the component (`src/components/portable-text/PortableTextComponents.tsx`)

```tsx
import Quote from './components/Quote';
// ...
export const portableTextComponents: PortableTextComponents = {
  types: {
    callToActionObject: (data) => <CallToAction data={data.value} />,
    singleImageObject: (data) => <SingleImage data={data.value}/>,
    videoObject: (data) => <Video data={data.value}/>,
    quoteObject: (data) => <Quote data={data.value}/>,
  },
  block: {
    ...portableTextHeadings
  },
};
```

## 9. Regenerate Sanity types

```
npx sanity schema extract
npx sanity typegen generate
```

Not wired into `package.json` scripts; run directly. The component's own props are hand-written (step 7), but the schema still needs to be re-extracted so `sanity.types.ts` / `schema.json` stay in sync with the new object type.

## 10. Verify

Run, in order:
```
npx tsc --noEmit
npm run lint
```

Fix any errors before considering the component done. Then tell the user to check Sanity Studio's rich text toolbar (in whichever field(s) it was added to) for the new inline embed option and confirm it renders — this skill cannot visually verify Studio itself.
