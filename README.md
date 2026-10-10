# puff: a design study of nudgy.run

An **unofficial design study** of the home page of [nudgy.run](https://www.nudgy.run/), rebuilt to
learn its layout, type, spacing, color and motion. All copy, mockups, icons and the mascot are
original, made for a fictional product called **puff**. Not affiliated with Nudgy. The page ships
with `robots: noindex`, and the waitlist form never sends data anywhere.

Measurements behind every value are in [docs/DESIGN-REFS.md](docs/DESIGN-REFS.md).

## Run it

Needs Node 20+ (tested on Node 25).

```bash
npm install
npm run dev          # http://localhost:4380
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port **4380** |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on 4380 |
| `npm run typecheck` | `tsc --noEmit` |
| `node scripts/verify.mjs` | Behaviour checks: noindex, disclaimer, header hide/show, local-only waitlist, FAQ, reduced motion, no sideways scroll. Needs the dev server running. |
| `npm run shots:original` / `npm run shots:mine` | Full-page screenshots at 1440 / 768 / 375 into `docs/screenshots/` |
| `node scripts/frames.mjs <url> <outDir> <width> [step] [startY] [endY]` | Screenshots of the visible window while scrolling (best for the sticky story) |
| `node scripts/probe.mjs <url> <width> <snippet.js> [scrollY]` | Run a measuring snippet in headless Chromium |
| `node scripts/sweep.mjs <url> <snippet.js> <w1,w2,…>` | Run a snippet at many widths (breakpoint hunting) |

Screenshots in `docs/screenshots/` are git-ignored on purpose. Regenerate them with the commands above.

## Where things live

| Path | What's there |
|---|---|
| `docs/DESIGN-REFS.md` | Phase 1 measurements: sections, type, color, grid, breakpoints, components, motion, assets |
| `src/app/layout.tsx` | Fonts (Poor Story + Nunito fallback), metadata (`noindex`), smooth scroll |
| `src/app/globals.css` | Design tokens: colors, type sizes, spacing, radii, shadows, easings; breakpoint overrides |
| `src/app/page.tsx` | Section order |
| `src/data/content.ts` | **Every string on the page** |
| `src/components/sections/<Name>/` | One folder per section: `Header`, `Hero` (+ `HeroCards`), `WhatItDoes`, `PhoneStory`, `MacSection`, `Board`, `Accounts`, `Manifesto`, `Waitlist`, `Privacy`, `Faq`, `Closing`, `Footer` |
| `src/components/ui/` | Reused pieces: `Button`, `Card`, `Accordion`, `Reveal`, `ScrollWords`, `HandDrawn` (circle + arrow), `Mascot`, `Phone`, `Mac`, `NotifCard`, `Screens/*` (mock app screens), `ShelfArt`, `Icon`, `SmoothScroll` |
| `src/hooks/` | `useInView` (reveal once), `useScrollFrame` (rAF-throttled scroll callback) |
| `scripts/` | Playwright tooling: screenshots, probes, breakpoint sweep, behaviour checks |

## Motion map

| Effect (DESIGN-REFS §7) | Implementation |
|---|---|
| Hero load-in pop (700ms `ease-pop`, staggered) | CSS keyframes `pop` in `Hero.module.css`, `--delay` per element |
| Floating mascots / notes bob (6s) | CSS `bob` after `pop` (`.float.pop`) |
| Hero notification loop (5.2s cycle, spring arrive, blur leave, typed answer) | `HeroCards.tsx`: timers + keyed elements; CSS `arrive` / `leave` / `swap` / `dot` / `caret`; pauses off-screen via IntersectionObserver |
| Header hides on scroll down, floating 3D pill appears (380ms `ease-soft`) | `Header.tsx` scroll direction → `data-hidden`; CSS transforms |
| Logo white → ink after the sky | `Header.tsx` compares scroll with `#hero` height |
| Fade-and-rise reveals (550ms, 18px) | `ui/Reveal` + `useInView` → `data-shown`; CSS transition |
| Scroll-lit words (0.14 → 1, scrubbed) | `ui/ScrollWords` + `useScrollFrame`; writes opacity per word |
| Manifesto sticky track + dancing clouds | `Manifesto.tsx` (240vh track passed to `ScrollWords`); `data-done` triggers CSS `dance-a/b/c` |
| Sticky phone story (4 steps, end frame, Mac) | `PhoneStory.tsx`: scroll progress → fade windows measured from the original; phone pose keyframes → CSS 3D `rotateY/rotateZ`; screens crossfade |
| Mac notch panel drop-in (420ms `ease-out`) | `ui/Mac`: `data-active` → CSS transform transition |
| Hand-drawn circles and arrows (900ms clip-path) | `ui/HandDrawn` + `useInView`; CSS `clip-path` transition |
| Board fan-out (500ms spring, 35ms stagger open, no stagger close) | `Board.tsx`: inline transform/opacity/transition-delay per button; CSS transition |
| Board filtering (non-matches → 0.35) | `Board.tsx` state → `.dim` class |
| FAQ "+" rotates 45° (200ms) | Native `<details>` + CSS in `ui/Accordion` |
| Button lift / press | CSS transitions in `ui/Button` |
| Mascot life (breathe 3.4s, blink 4.6s, glance 11–15s, hop/sway/nod, stars, notes) | CSS keyframes in `ui/Mascot` with per-instance seeded delays |
| Smooth scrolling | Lenis in `ui/SmoothScroll` (off for reduced motion) |
| `prefers-reduced-motion` | Every module has a reduce block; sticky story → stacked list; words/reveals fully shown; Lenis off |

## Choices made with the owner

- Sky colors are fixed to the measured **"day"** palette (the original switches by time of day).
- **Lenis** smooth scroll is included to match the original's scroll feel.
- Brand: **puff**, with an original cloud mascot.

## Handoff prompt for the next session

> You're continuing an unofficial design study in `/Users/namtran/dev/nudgy-study`: a Next.js
> (App Router) + TypeScript + CSS Modules rebuild of the nudgy.run home page for a fictional
> product "puff". Read `README.md` and `docs/DESIGN-REFS.md` first. All copy is in
> `src/data/content.ts`, tokens in `src/app/globals.css`, one folder per section in
> `src/components/sections/`. Never copy nudgy.run's text, images, icons, mascot or video. The dev
> server runs with `npm run dev` on port 4380 (pick another port if it's taken, and never stop a
> program that's already running). Commit each finished piece with Conventional Commits under
> the existing git author, with no co-author trailer, and never push. Before calling anything
> done, run `npx tsc --noEmit`, `npm run build` and `node scripts/verify.mjs`, and compare with the
> original using `scripts/frames.mjs` at 1440, 768 and 375.
>
> Open items, roughly in order of visual impact:
> 1. The 3D phone in the sticky story is CSS 3D with a fake edge. The original is a lit WebGL model,
>    so mine looks flatter. Try a subtle side highlight or gradient that shifts with `rotateY`.
> 2. The Mac step shows a still gradient. The original plays a screen recording; consider a CSS
>    animation inside `ui/Mac` (a cursor and a card appearing) instead of video.
> 3. The floating hero mascots don't drift with scroll; the original shifts them a few px (`--py`).
> 4. Mascot "talking" mouth and look-at-cursor states from the original aren't built.
> 5. Scroll-lit words use a linear mapping; the original's first word starts a little slower.
> 6. The page is ~250px shorter at 1440 because of copy length (FAQ 9 vs 11 items, shorter
>    privacy text). Add copy if you want closer heights.
> 7. Only Chromium has been checked. Test Safari and iOS, especially `backdrop-filter`,
>    container-query units in the hero cards, and the sticky story.
> 8. Sub-pages (Benchmarks, Pricing, Privacy policy, Terms, Support) are out of scope; their links
>    point to `#`.
