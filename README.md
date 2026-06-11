# Juwon Bowofola — 3D Portfolio

A production-grade, single-page **3D portfolio** for Juwon Bowofola (Frontend &
Backend Developer). Dark futuristic / tech-noir aesthetic with electric-cyan and
violet neon accents, layered Three.js scenes, and scroll-triggered motion.

## Tech Stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Build tool     | **Vite 6**                                      |
| Language       | **TypeScript only** (`.ts` / `.tsx`, `strict`)  |
| UI framework   | **React 18**                                    |
| Styling        | **Tailwind CSS v4** (`@tailwindcss/vite`)       |
| 3D engine      | **Three.js** + **@react-three/fiber** + **drei**|
| Animation      | **Framer Motion**                               |
| Fonts          | Orbitron · Sora · JetBrains Mono (Google Fonts) |

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

### Other scripts

```bash
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # type-check only, no emit
```

## Add Your Own Content

1. **Profile photo** — replace `public/profile.jpg` with your own image
   (referenced as `/profile.jpg`). A placeholder is included so the site runs
   out of the box. See `src/assets/README.md` for the `src/assets/` alternative.
2. **Résumé / CV** — drop your PDF at `public/Juwon_Bowofola_Resume.pdf` so the
   hero **"Download CV"** button resolves. Update the `resume` path in
   `src/data/portfolio.ts` if you rename it.
3. **Everything else** — all résumé content (experience, projects, skills,
   education, socials, nav) lives in a single typed source of truth:
   [`src/data/portfolio.ts`](src/data/portfolio.ts). Edit there; sections import
   from it — no hardcoded strings in components.

Project preview images are pulled from [Unsplash](https://unsplash.com/) at
runtime (see `projects[].image` in `src/data/portfolio.ts`).

## Project Structure

```
src/
├─ assets/                 # Local images (profile photo alternative)
├─ components/
│  ├─ three/               # Three.js / R3F scenes
│  │  ├─ HeroCanvas.tsx     # Wireframe icosahedron + particle field + PresentationControls
│  │  ├─ SkillsOrbit.tsx    # "Solar system" of orbiting skill badges
│  │  ├─ ParticleField.tsx  # Reusable drifting particle cloud
│  │  ├─ CrystalCanvas.tsx  # About-section abstract crystal
│  │  └─ GradCapCanvas.tsx  # Education-section graduation cap
│  ├─ sections/            # Hero, About, Skills, Experience, Education, Projects, Contact
│  └─ ui/                  # Navbar, SectionWrapper, GlowCard, CanvasLoader, Icons
├─ data/portfolio.ts       # Typed single source of truth for all content
├─ hooks/                  # useMouseParallax, useScrollReveal, useTypewriter, useReducedMotion
├─ types/index.ts          # All shared interfaces (Experience, Project, SkillGroup, …)
├─ App.tsx
├─ main.tsx
└─ index.css               # Tailwind v4 entry + base theme
```

## Highlights

- **Lazy-loaded 3D** — every canvas is `React.lazy` + `Suspense` with a pulsing
  loader fallback, so first paint isn't blocked by Three.js.
- **GPU hygiene** — generated geometries/materials are disposed on unmount.
- **Type safety** — `strict: true`, no `any`, all props/handlers/refs typed.
- **Accessibility** — keyboard-focusable controls, `aria-label`s on icon buttons,
  and a full `prefers-reduced-motion` path that freezes 3D + typewriter motion.
- **Responsive** — mobile, tablet and desktop breakpoints throughout.

## Theme Tokens

Defined in [`tailwind.config.ts`](tailwind.config.ts) (loaded by Tailwind v4 via
`@config` in `src/index.css`):

| Token       | Value     | Use                |
| ----------- | --------- | ------------------ |
| `primary`   | `#00f5ff` | Electric cyan      |
| `secondary` | `#7c3aed` | Violet             |
| `dark`      | `#050816` | Base background    |
| `darkAlt`   | `#0d1224` | Elevated surfaces  |

Plus glow utilities: `text-glow-primary`, `border-glow-secondary`, `glass`, etc.

---

Built with React, Three.js & Tailwind CSS.
