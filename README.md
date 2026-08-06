# Portfolio — Augustin FACHEHOUN

Premium bilingual portfolio (EN/FR) for a Beninese FullStack & AI Developer transitioning into Data Engineering.

## Stack

- Vite 6
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui patterns
- React Router
- next-themes

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — routes are available in `/en` and `/fr`.

## Scripts

- `npm run dev` — development with Vite
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint

## Structure

- `src/pages/` — page components
- `src/components/sections/` — home page sections
- `src/components/layout/` — navbar, footer, theme
- `messages/` — EN/FR translations

## Environment

Copy `.env.example` to `.env`:

```bash
VITE_SITE_URL=https://augustinfachehoun.dev
VITE_STRAPI_URL=http://localhost:1337
```

- `VITE_SITE_URL` — SEO canonical URLs
- `VITE_STRAPI_URL` — CMS Strapi (`Portfolio-backend`)
- `VITE_STRAPI_TOKEN` — optional API token

Projets, services et actualités sont chargés depuis Strapi.  
Si le CMS est vide ou indisponible, le front utilise les données locales de secours.

Démarrer le CMS :

```bash
cd ../Portfolio-backend
npm run develop
```

Admin : [http://localhost:1337/admin](http://localhost:1337/admin)

