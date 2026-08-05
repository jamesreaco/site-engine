# SiteEngine - Next.js & Sanity Template

A fully-featured starter template made with Next.js, Sanity, TypeScript, Tailwind & more.

![Frame 2](https://github.com/user-attachments/assets/ef83c368-8954-4ed3-b370-7025c25e0d99)

## Tech Stack

* [Next.js 16 (App Router)](https://nextjs.org/) 
* [Sanity v6](https://sanity.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [Shadcn](https://ui.shadcn.com/)
* [Resend](https://resend.com/)
* [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* [Vercel](https://vercel.com/)

## Key Features

* Page Builder with 12 pre-made blocks to get you started.
* Visual Editing, Live Preview and Live Content API integrations.
* Form Builder to create custom forms without leaving the Studio.
* Robust website settings implementation.
* Custom input components for an enchanced content editing experience.
* Fully-featured blog with table of contents generation, custom portable text blocks, search functionality and more.
* Includes [Claude Code](https://claude.com/claude-code) skills (`.claude/skills`) for scaffolding new page builder blocks and portable text components.

## Getting Started

### Option A: Use this template (recommended)

The fastest way to get started is with the [Sanity CLI](https://www.sanity.io/docs/cli-reference), which will create a new Sanity project, set up your dataset, and scaffold the template into a new directory for you:

```
npm create sanity@latest -- --template jamesreaco/site-engine
```

Follow the interactive prompts to log in to Sanity, create (or select) a project and dataset, and choose an output directory. Once it's finished, `cd` into the new directory, add the Resend environment variables described below, then jump to [Start a local server](#3-start-a-local-server).

### Option B: Manual setup

#### 1. Create a Sanity Project
* Create a new Sanity Project.
* Add CORS origin for `http://localhost:3000`.
* Create an API token with `viewer` permissions.

#### 2. Install the template
* Clone this repository and open it in your code editor.
* Create a `.env.local` file (you can copy `.env.example` as a starting point) and add the following environment variables:
  
| Environment Variable | Description                                           |
| :------------------------ | :----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`| The public URL of your website (use `http://localhost:3000` during development) |
| `NEXT_PUBLIC_SITE_NAME`| The name of your website |
| `NEXT_PUBLIC_SANITY_DATASET`| The name of your Sanity dataset (usually "production") |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`| Your Sanity project ID found in project settings |
| `NEXT_PUBLIC_SANITY_API_VERSION`| The Sanity API version to use (e.g., "2024-09-24") |
| `RESEND_SENDER_EMAIL`| The email address used to send emails via Resend |
| `RESEND_RECIEVER_EMAIL`| The email address that receives contact form submissions |
| `RESEND_API_KEY`| Your Resend API key for email functionality |
| `SANITY_API_READ_TOKEN`| API token for accessing Sanity content |

Next, run these commands in your terminal at the root of your project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install --legacy-peer-deps`| Installs dependencies.|
| `npx sanity dataset import demo-content.tar.gz production`| Imports demo content (optional).|

### 3. Start a local server

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run dev`| Starts local dev server at http://localhost:3000 |

Your site will be available at [http://localhost:3000](http://localhost:3000), and the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

> If you used Option A, make sure `RESEND_SENDER_EMAIL`, `RESEND_RECIEVER_EMAIL` and `RESEND_API_KEY` are set in your `.env.local` before using the contact form — the Sanity CLI only populates the Sanity-related variables automatically.

## License

SiteEngine is [licensed](license.md) for free use, including in commercial projects. The template itself (in original or modified form) may not be resold or repackaged as a paid product. See [license.md](license.md) for the full terms.

## Author

#### James Rea

- LinkedIn ([@jamesreaco](https://linkedin.com/in/jamesreaco))
- Website ([jamesrea.co](https://jamesrea.co))
- X (Twitter) ([@jamesreaco](https://x.com/jamesreaco))
