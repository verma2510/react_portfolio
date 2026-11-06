# Aman Verma — Portfolio (frontend)

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion (LazyMotion) · React Router 7.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run optimize:images` | Regenerate `.webp` derivatives of `public/photo.jpg` and `public/hobbies/*.jpg` (originals untouched) |

`VITE_BACKEND_URL` (in `.env`) must point at the Express backend; the contact form posts to `${VITE_BACKEND_URL}/api/contact`.

## Editing content

All content lives in **`src/data/portfolioData.ts`** — no copy is hard-coded in components.
Derived values (career timeline, years of experience, skill → project evidence, architecture layers) are computed in `src/lib/content.ts`.

Projects support two optional fields that render on the case-study page (`/work/:slug`) only when filled in:

```ts
contributions?: string[];                              // "Key engineering contributions"
challenges?: { problem: string; solution: string }[];  // "Challenges & solutions"
```

The **system map** on each project is generated from its `stack` array. To place a new technology in the right layer (client / server / data / intelligence / delivery), add it to `LAYER_OF` in `src/lib/content.ts`; brand icons are mapped in `src/components/ui/TechIcon.tsx`.

## Structure

```
src/
  data/portfolioData.ts      content (typed)
  lib/                       derived selectors, API client, platform helpers
  hooks/                     active section, section navigation, contact form, document meta
  providers/                 theme, command palette, active section
  components/
    layout/                  SiteShell, SideRail (desktop), TopBar (mobile), CommandPalette, Footer
    projects/                SystemMap, FeaturedProject, ProjectLedger, ProjectSpec, ProjectLinks
    experience/              CareerTimeline, RoleEntry
    ui/                      Button, Chip, Meter, Reveal, SectionHeader, TechIcon
  sections/                  Hero, Work, Experience, Stack, Profile, Credentials, OffClock, Contact
  pages/                     HomePage, CaseStudyPage (lazy-loaded)
```

## Routing & hosting

- `/` — single-page narrative; `/#work`, `/#contact`, etc. deep-link to sections.
- `/work/:slug` — project case studies. Unknown routes redirect to `/`.
- Deep links need an SPA fallback: `vercel.json` (Vercel) and `public/_redirects` (Netlify) are included.
