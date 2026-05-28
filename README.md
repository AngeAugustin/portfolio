# Portfolio — Augustin FACHEHOUN

Premium bilingual portfolio (EN/FR) for a Beninese FullStack & AI Developer transitioning into Data Engineering.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui patterns
- next-intl
- next-themes

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/en` or `/fr`.

## Scripts

- `npm run dev` — development with Turbopack
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

## Structure

- `src/app/[locale]/` — localized pages
- `src/components/sections/` — home page sections
- `src/components/layout/` — navbar, footer, theme
- `messages/` — EN/FR translations

## Environment

Optional: `NEXT_PUBLIC_SITE_URL` for SEO canonical URLs.
