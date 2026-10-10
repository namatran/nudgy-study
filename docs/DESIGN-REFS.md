# Design refs: nudgy.run home page

Measured 2026-10-10 from https://www.nudgy.run/ in Chromium with `getComputedStyle` /
`getBoundingClientRect` at 1440×900 unless noted. Motion was sampled every 50 ms in headless
Chromium (`scripts/probe.mjs`, `scripts/sweep.mjs`). Only measurements are recorded here; no
copy, images, icons or code from the original are reused in the build.

Reference screenshots live locally in `docs/screenshots/original/` (git-ignored):
`full-1440.png`, `full-768.png`, `full-375.png`, plus scroll frames in `frames/`
(`w1440-*`, `w768-*`, `w375-*`). The full-page captures flatten the sticky scroll story, so use
the frames for those sections.

Stack of the original: Next.js (App Router, Turbopack), Tailwind v4, Lenis smooth scroll, one
WebGL `<canvas>` for the 3D phone in the scroll story.

---

## 1. Sections, top to bottom

Your guess was close in spirit, but the page is structured differently. Corrected list:

| # | Section | Layout (1440) | Height |
|---|---|---|---|
| 0 | **Header / nav** (fixed) | Logo left (mascot + wordmark). Right: frosted white pill with 5 links + black CTA. Hides on scroll down; a floating 3D "download" pill drops in top-right instead. | 98 |
| 1 | **Hero** (`sky-hero`) | Full-bleed blue sky gradient fading to paper. Centered H1 (2 lines, inline mascot), sub, two CTAs + microcopy, then a phone mockup with a looping stack of dark notification cards on top. Four floating mascots and two floating note cards around it. | 1275 |
| 2 | **What it does** (`#what`) | Centered eyebrow + H2 (scroll-lit words) + handwritten sub. Below 768 this section also contains the *stacked* version of the story (text + phone per step). | 301 |
| 3 | **Phone story** (sticky scroll, ≥768 only) | 7200px track, sticky 100vh stage. A 3D phone turns while 4 numbered steps ("1 / 4"…) fade in/out, alternating left/right. Then a closing wordmark + tagline frame, then a MacBook with a notch notification (the "menu-bar" feature lives here, not in its own section). | 7200 |
| 3b | **Mac** (`#mac`) | Static fallback of the Mac step, shown only below 768. | (710 @375) |
| 4 | **Board** (`#give`) | 2 cols (1fr / 1.05fr). Left: eyebrow, H2, body, then a chat demo (user bubble + mascot reply card) and fine print. Right: tall card with a tap-to-fan-out of 7 coloured circles around the mascot, a hint line, and a 2-column masonry board of saved items. | 1115 |
| 5 | **Connected accounts** | 2 cols (1fr / 1fr). Left: eyebrow, H3, handwritten line with a hand-drawn coral circle. Right: 4 account chips, a hand-drawn arrow, a dark notification card. | 449 |
| 6 | **Manifesto** (scroll words) | 240vh track, sticky centered paragraph of huge handwritten words that light up one by one; 3 small mascots inline that dance when it finishes. | 2264 |
| 7 | **Waitlist** (`#invite`) | 2 cols (1fr / 1.1fr). Left: eyebrow, H2, body. Right: white form card (label, pill input + black button in a row, note). | 347 |
| 8 | **Privacy** (`#privacy`) | Centered eyebrow + H2, then 2×2 grid of cards (mascot icon + H3 + body), then 2 full-width cards split 1fr/1fr: text left, a small "you said → what's kept" demo right. Fine-print line. | 1463 |
| 9 | **FAQ** (`#faq`) | Narrow (768 max) centered header, 11 native `<details>` rows with hairline dividers and a "+" that rotates. | 949 |
| 10 | **Closing CTA** (top of `<footer>`) | Pale radial "dome" behind a dancing mascot, two-tone H2, sub, two buttons + microcopy. | 615 |
| 11 | **Footer** | 4-col grid (1.4fr / 1fr / 1fr / 1fr): wordmark + blurb, then 3 link columns. Centered copyright row. | 404 |

Not present: a separate chat section (the chat demo is inside Board), a numbered feature list
with a slideshow (that's the sticky phone story), or a separate menu-bar section (it's the Mac
step at the end of the story).

---

## 2. Type

Families:
- **HAND** = `Poor Story` 400 (Google Fonts). Used for every heading, eyebrow, button label and
  handwritten aside. Never bold.
- **ROUND** = `ui-rounded, "SF Pro Rounded", -apple-system, system-ui, sans-serif` (system font,
  not downloaded). Body, nav, chips, FAQ questions.
- **FIGURE** = `-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui`. Only for numbers
  in app mockups (`tabular-nums`, weight 300, `-0.01em`).

No letter-spacing anywhere except FIGURE (`-0.01em`); everything else is `normal`.
Line-height of HAND headings is tight (1.02–1.05).

| Role | Family | Size / line-height (desktop) | Weight | Color | Phone (<640) |
|---|---|---|---|---|---|
| H1 hero | HAND | 84 / 85.7 (1.02) | 400 | #fff, text-shadow `0 6px 26px rgb(0 40 90/.35)` | 46 (68 at 640–1023) |
| Hero sub | ROUND | 20 / 27.5 (1.375) | 600 | #fff, shadow `0 2px 14px rgb(0 40 90/.4)` | 18 |
| Eyebrow (all sections) | HAND | 22 / 33 | 400 | ink-soft | 22 |
| H2 section (`#what`) | HAND | 58 / 60.9 (1.05) | 400 | ink, unlit words at 0.14 opacity | 40 |
| H2 section (board, waitlist, privacy, FAQ) | HAND | 56 / 58.8 (1.05) | 400 | ink | 40 |
| H3 accounts | HAND | 48 / 50.4 (1.05) | 400 | ink | 38 |
| Handwritten sub (`#what`) | HAND | 23 / 31.6 (1.375) | 400 | ink-soft | 23 |
| Story step label | HAND | 22 / 33 | 400 | ink-soft | 22 |
| Story step H3 | HAND | 60 / 61.2 (1.02) ≥1024; 44 at 768–1023 | 400 | ink | 38 (stacked) |
| Story tagline | HAND | 24 / 36 | 400 | ink-soft | 22 |
| Story end wordmark | HAND | clamp(56px, 7.4vw, 124px) / 1 | 400 | ink | n/a |
| Story end tagline | HAND | clamp(44px, 5.6vw, 96px) / 0.98 + clamp(22px, 2.2vw, 36px) | 400 | ink / ink-soft | n/a |
| Body (sections) | ROUND | 17 / 27.6 (1.625) | 400 | ink @ 80% | 17 |
| Body (cards) | ROUND | 16 / 26 (1.625) | 400 | ink @ 80% | 16 |
| Fine print | ROUND | 14 / 22.75 | 400 | ink-soft | 14 |
| Manifesto words | HAND | 70 / 78.4 (1.12) | 400 | sentence 1 ink-soft, sentence 2 ink | 38 (60 at 640–1023) |
| Privacy card H3 | HAND | 30 / 37.5 (1.25) | 400 | ink | 26 |
| Privacy wide H3 | HAND | 36 / 45 | 400 | ink | 30 |
| Closing H2 | HAND | 66 / 67.3 (1.02) | 400 | clause 1 ink, rest ink-soft | 44 |
| Nav link | ROUND | 14.5 / 21.75 | 500 | ink @ 75% | hidden |
| Nav CTA | ROUND | 14.5 / 21.75 | 500 | paper on ink | 14 / 20, 600 |
| Logo wordmark | HAND | 32 / 32 | 400 | #fff on sky → ink after hero | 32 |
| Button (hero / CTA) | HAND | 22 / 33 | 400 | ink (3D pill), #fff (ghost), paper (ink) | 22 |
| Floating pill CTA | HAND | 18 / 27 | 400 | ink | 18 |
| Button microcopy | ROUND | 14 / 21 | 600 | #fff on sky, ink-soft on paper | 14 |
| Form label | HAND | 22 / 33 | 400 | ink | 22 |
| Input | ROUND | 17 / 25.5 | 400 | ink; placeholder ink-soft | 17 |
| Form button | HAND | 20 / 30 | 400 | paper on ink | 20 |
| Chip (accounts) | ROUND | 14 / 21 | 600 | ink | 14 |
| Notification card title | HAND | 24 / 30 | 400 | #fff | 24 |
| Notification card meta | HAND | 16 / 24 | 400 | #fff @ 82% | 16 |
| Notification card body | ROUND | 15 / 20.6 | 400 | #fff @ 82% | 15 |
| Notification action pill | ROUND | 13 / 19.5 | 600 | #fff on open-blue | 13 |
| Chat bubble (user) | ROUND | 15 / 22.5 | 400 | #fff on ink | 15 |
| Chat reply | HAND | 18 / 24.75 | 400 | ink | 18 |
| Board caption / meta | ROUND | 13 w500 / 11 / 9 ("drawn" tag) | 500/400 | ink / ink-soft / ink @ 45% | same |
| FAQ question | ROUND | 18 / 27 | 600 | ink | 18 |
| FAQ "+" | HAND | 26 / 26 | n/a | ink-soft | 26 |
| FAQ answer | ROUND | 16 / 26 | 400 | ink @ 80% | 16 |
| Footer wordmark | HAND | 30 / 30 | 400 | ink | 30 |
| Footer column heading | ROUND | 15 / 22.5 | 700 | ink | 15 |
| Footer link / blurb | ROUND | 14 / 21 | 400 | ink-soft (links w600 ink + underline in blurb) | 14 |
| Copyright | ROUND | 13 / 19.5 | 400 | ink-soft | 13 |

---

## 3. Color

Design tokens (`:root`):

| Token | Hex | Used for |
|---|---|---|
| paper | `#f4f3ef` | Page background, phone screen bg, ink-button text |
| paper-raised | `#ffffff` | Cards, nav pill (82% alpha), input bg |
| ink | `#0b0d12` | Text, black buttons, dark notification cards, user chat bubble |
| ink-soft | `#5b5f68` | Eyebrows, secondary text, footer links, FAQ "+" |
| ink @ 80% | `rgb(11 13 18 / .8)` | Body copy |
| ink @ 75% | `rgb(11 13 18 / .75)` | Nav links, closing sub |
| rule | `#dad8d1` | FAQ dividers, input border |
| open-blue | `#2f7fd6` | Focus ring, action pills on dark cards |
| coral | `#c62f35` | Hand-drawn circles, redaction tokens |
| sky-top / mid / bottom | `#2d78cf` / `#4f9bdd` / `#93cbea` | Hero gradient ("day" palette) |
| on-sky / on-sky-soft | `#ffffff` / `#ffffffd1` | Text on the sky |

The sky palette is swapped by `html[data-sky=…]` based on the visitor's local time (noon,
golden-dawn, golden-dusk, blue-dawn, blue-dusk, night). Measured values:
noon `#1f6bc8/#3b91dc/#7dc0e8`, golden-dawn `#3569a8/#8c92c4/#f3ae86`, golden-dusk
`#3b3777/#b0587a/#ff8c5e`, blue-dawn `#16244d/#33477d/#6c6a9c`, blue-dusk `#1a1f4a/#3f3576/#7a4f86`,
night `#070b18/#111a33/#1c2748`.

Other colors:

| Hex | Where |
|---|---|
| Hero bg | `linear-gradient(180deg, rgb(0 20 60/.22) 0%, rgb(0 20 60/.18) 55%, transparent 80%), linear-gradient(180deg, top 0%, top 30%, mid 66%, bottom 86%, paper 100%)` |
| `#101114` | Phone shell; inset ring `#5b5f66` 2px |
| `#0c0d10` | Mac lid / notch; inset ring `#3b3e44` |
| `#e4e6ea → #c4c7cd → #9a9ea6` | Mac base gradient |
| `#000000` | Hero notification card shell (with faint star dots) |
| `#a48dff` | "Listening waves" accent on the dark card |
| `#dfe9f3 → #e9eef3` | Closing "dome" radial gradient |
| `#ffffff → #efebe2`, ledge `#c9c2b3` | 3D pill button face and its bottom edge |
| `#fff1c2` | Voice-note card in the board |
| `#e9e3d3`, `#f1ede4`, `#f3e6d2` | Illustration tiles in the board |
| Fan-out circles | `#ff453a`, `#ffcc00`, `#34c759`, `#111317`, `#0a84ff`, `#af52de`, `#ff9500` (Apple system palette) |
| Selection | sky-mid @ 35% |

---

## 4. Grid and spacing (1440)

- **Gutters:** sections use `max-w-6xl` (1152) + 24px side padding → 1104px content, left edge
  x=168. Manifesto uses `max-w-5xl` (1024, 16px padding). FAQ uses `max-w-3xl` (768, 16px
  padding → 736). Header padding 24px 40px.
- **Nav:** header box 98px tall; pill 602×50 (padding 6, gap 4), right edge at x=1400.
- **Section rhythm** (top / bottom padding, desktop → <640):

| Section | Padding | Inner layout |
|---|---|---|
| Hero | 148 / 80 (132 / 48 at 640–1023; 104 / 48 below 640), sides 16 | H1 max 896 · sub max 576, mt 20 · CTA row mt 32, gap 16 · phone mt 64 (56 below 640) |
| What | 96 / 32 (64 / 32) | eyebrow → H2 mt 4 → sub mt 16, max 576 |
| Phone story | n/a | text column 38% (max 480) at left 7% or right 7%, vertically centred; phone ≈ 324×702 (78vh) |
| Board | 112 / 40 (80 / 40) | grid `1fr 1.05fr`, col-gap 48, row-gap 40; left col pt 40; right card max 448 |
| Accounts | 96 / 32 (64 / 32) | grid `1fr 1fr`, gap 48, items centred; right column max 384 |
| Manifesto | 80 / 24 (64 / 24), sides 16 | 240vh track; sticky 100vh flex-centre |
| Waitlist | 112 / 40 (80 / 40) | grid `1fr 1.1fr`, gap 48, centred; form card max 448 |
| Privacy | 112 / 32 (80 / 32) | header centred; card grid mt 48, 2 cols, gap 16; wide cards gap 16 below |
| FAQ | 112 / 40 (80 / 40) | header centred; list mt 32 |
| Closing | 80 / 40, sides 16 (footer has mt 40) | mascot → H2 → sub mt 16 → CTA row mt 32 |
| Footer grid | 56 / 56, sides 24 | `1.4fr 1fr 1fr 1fr`, gap 40; links 34px pitch |

---

## 5. Breakpoints

Tailwind defaults drive everything: **sm 640, md 768, lg 1024**. Measured by sweeping 1440 → 360:

| Width | What changes |
|---|---|
| ≥1024 | Full desktop. Hero shows all 4 mascots + 2 note cards + handwritten aside. Board / accounts / waitlist are 2 columns. Privacy wide cards split 2 columns. |
| <1024 | Hero H1 84 → 68, padding 148 → 132 top, 80 → 48 bottom. Big top-left/right mascots and note cards hide (2 lower mascots stay). Board, accounts, waitlist stack to 1 column (text centred). Privacy wide cards stack. Manifesto 70 → 60. Story step H3 60 → 44. |
| <768 | Nav pill hides; header shows logo + a black "download" button only. Sticky phone story is removed: `#what` shows a stacked list (label, H3, tagline, body, phone mockup per step) and the static `#mac` section appears. |
| <640 | Header padding 24/40 → 16. Hero H1 → 46, sub → 18, padding-top → 104, remaining 2 mascots hide, CTAs stack vertically. Section gutters 24 → 16, top paddings shrink (96 → 64, 112 → 80). All H2 → 40, accounts H3 → 38, manifesto → 38, privacy H3 → 26, closing H2 → 44. Privacy grid → 1 column, card padding 32 → 24. Form row stacks. Fan radius 148 → 120, fan area 226 → 196. Footer grid → 2 columns. |

---

## 6. Components

| Component | Size | Radius | Padding | Border / shadow | States |
|---|---|---|---|---|---|
| **Nav pill** | 602×50 | 16 | 6, gap 4 | bg white/82; `inset 0 1px 0 rgb(255 255 255/.6), 0 10px 30px rgb(0 30 60/.12)` | n/a |
| Nav link | h 38 | 10 | 8 / 14 | none | hover bg white/70 (120ms linear) |
| **Ink button** (`btn-ink`) | h 38 (nav) / 48 (CTA, form) | 999 | 8/20 nav · 0/28 CTA · 0/24 form | none | hover `translateY(-1px) scale(1.02)`; active `translateY(2px) scale(.99)`; transform 200ms `cubic-bezier(0,0,.2,1)` |
| **3D pill** (`pill-3d`) | 231×48 hero; 157×47 floating | 18 | 0/28 hero, gap 10 (icon + label) · 10/20 floating | gradient `#fff → #efebe2`; `0 6px 0 #c9c2b3, 0 14px 30px rgb(0 40 80/.25)` | hover lift like ink; active `translateY(4px)` + ledge 6px → 2px |
| **Ghost sky button** | 259×48 | 18 | 0/24, gap 10 | bg white/15, ring 1px white/45, `backdrop-filter: blur(12px)` | hover bg white/25, `translateY(-1px)`, 200ms `cubic-bezier(.2,0,0,1)` |
| Outline button (closing) | 259×48 | 18 | 0/24 | bg #fff, ring 1px ink/15 | same as ghost |
| **Card** (`.card`) | n/a | 22 | 32 privacy · 24/28 form · 20/20/16 board | 1px ink/6%; `inset 0 1px 0 rgb(255 255 255/.8), 0 12px 34px rgb(20 40 80/.08)` | n/a |
| **Phone shell** | 300×626 | 54 | 10 | bg #101114; `0 30px 80px rgb(0 20 60/.35), inset 0 0 0 2px #5b5f66`; screen radius 45 | n/a |
| **Dark notification card** (hero) | 406 wide max, container-relative | 6.4cqw (≈26) | 4cqw 5cqw 4.4cqw | `0 2.6cqw 6cqw rgb(0 15 45/.38), inset 0 0 0 1px white/6%`; random tilt ±3° | arrive / swap / leave (see Motion) |
| Dark notification card (accounts / privacy) | 387×181 | 26 | 16/20 | `0 18px 40px rgb(10 20 50/.28)`, slight tilt | n/a |
| Floating note card (hero) | 260×105 | 16 | 12/16 | bg white/95; `0 14px 34px rgb(10 40 90/.22)` | floats |
| **Chat bubble, user** | max 82% | 16, bottom-right 6 | 8/16 | bg ink | n/a |
| Chat bubble, reply | max 86% | 22, bottom-left 6 | 12, gap 12 | `.card` | n/a |
| **Account chip** | h 42–44 | 22 | 8/16 | `.card` | slight rotation per chip |
| **Input** | h 48 | 999 | 0/20 | 1px rule; bg #fff | focus: 2.5px open-blue outline, offset 3 |
| **Accordion row** | min-h 56 (summary) | none | summary 16/0; answer 0 32 20 0 | border-bottom 1px rule (list has top border) | closed "+" → open rotated 45° (200ms); answer appears instantly (native `<details>`, no height animation) |
| **Fan-out circle** | 48 (52 hit area) | full | n/a | `0 6px 16px rgb(11 13 18/.18)` | pressed: board filters (non-matches → 0.35 opacity) |
| Board item | 197 wide | 16 (image 12) | 6 (image cards) / 12 (text cards) | `.card` | dimmed 0.35, opacity/shadow 300ms |
| Focus (global) | n/a | 10 | n/a | `outline: 2.5px solid #2f7fd6; outline-offset: 3px` | n/a |

---

## 7. Motion

Easing tokens: `--ease-out cubic-bezier(.16,1,.3,1)`, `--ease-pop cubic-bezier(.34,1.4,.64,1)`,
`--ease-spring cubic-bezier(.34,1.56,.64,1)`, `--ease-soft cubic-bezier(.22,1,.36,1)`,
`--ease-hover cubic-bezier(.2,0,0,1)`.

**Page load**
1. **Hero pop-in:** opacity 0 → 1, `translateY(+14px) scale(.6)` → none, 700ms `ease-pop`. H1 delay 0.05s, sub 0.18s, CTA row 0.30s, phone 0.45s.
2. **Hero mascots:** same pop (delays 0, 0.8, 1.6, 2.2s), then infinite **bob**: `translateY(0 → -10px → 0)` 6s ease-in-out, keeping the mascot's tilt (−6°, 8°, −4°, 6°).
3. **Floating note cards / aside:** pop at 0.9s / 1.1s / 1.4s, then bob.
4. **Hero notification loop:** 4 cards, one every ~5.2s. Arrive: 750ms `ease-spring`, from `translate3d(0,-48px,0) rotate(±9–12°)`, blur 6px, opacity 0 → tilt ±3°, no blur (opacity reaches 1 at 60%). After ~1.6–2.6s the content swaps (450ms `ease-soft`, from `scale(.96) translateY(1.4cqw)`, opacity 0). One card types its answer at ~50ms per character with a blinking caret (0.9s step-end). Leave: 600ms `ease-soft` to `translate3d(0,38px,0) rotate(-1.4×tilt) scale(.92)`, blur 8px, opacity 0, overlapping the next arrive. Loading dots: 1.05s, 0.15s stagger, translateY −1.4cqw. "Waves": opacity .35 ↔ 1, 1.2s.

**Scroll**

5. **Header hide/show:** scrolling down past ~300px moves the header by `translateY(-120%)`; scrolling up brings it back. 380ms `ease-soft`. The logo turns from white to ink once you're past the sky.
6. **Floating 3D pill:** shows while the header is hidden: `translateY(-160%) → 0`, 380ms `ease-soft`. Opacity snaps.
7. **Reveal** (27 blocks): opacity 0 → 1, `translateY(18px)` (24px in footer) → 0, 550ms `ease-soft`, fired once via IntersectionObserver. Stagger within a section 0 / 0.06 / 0.10 / 0.12 / 0.15 / 0.18s.
8. **Scroll-lit headings:** each word opacity 0.14 → 1, *scrubbed* by scroll (no time). Starts when the heading top is ≈ 93% down the viewport and finishes at ≈ 47%. Words light sequentially, each over ~1/n of the range. Sets `data-done` at the end.
9. **Manifesto:** same word-lighting over a 240vh sticky track (starts when the track top hits the viewport top, finishes around 45% through). On done, the 3 inline mascots dance: `sw-dance-a/b/c` 2.3s / 1.9s / 2.6s, infinite, with hops, squash and one full spin.
10. **Phone story** (sticky, scrubbed). Progress p = scrolled / (7200 − 900). Each element fades opacity 0 ↔ 1 with `translateY(24px)` ↔ 0 over ≈ 0.04 p:
    - Step 1: in 0.06–0.10, out 0.18–0.22 (text left, phone right)
    - Step 2: in 0.23–0.25, out 0.31–0.34 (text left)
    - Step 3: in 0.44–0.47, out 0.52–0.55 (text right, phone left)
    - Step 4: in 0.56–0.59, out 0.63–0.66 (text right)
    - End frame (wordmark left, phone centre, tagline right): in 0.70–0.73, out 0.78–0.82
    - MacBook: in 0.86–0.90, `translateY(40px) scale(.92)` → none; Mac text: in 0.90–0.94, then holds.
    - The phone itself is a WebGL model that rotates and slides between sides through these steps.
11. **Hand-drawn circles / arrows** (`write-in`): `clip-path: inset(-40% 100% -40% -40%)` → `inset(-40%)`, 900ms `ease-soft`, delays 0.3–0.5s after the parent reveal.

**Hover / click**

12. **Buttons:** see Components (200ms lift/scale; active press).
13. **Board fan-out (click the mascot):** open = each circle from `translate(-50%,-50%) scale(.2)`, opacity 0 to its spot on an arc (angles −160° … −20°, radius 148px), 500ms `ease-spring`, staggered 35ms (0 … 210ms), overshooting ~8px. Close = all at once (no stagger) back to `scale(.2)` opacity 0. Clicking a circle sets `aria-pressed`, swaps the hint line, and dims non-matching board items to 0.35.
14. **FAQ:** native `<details>`. The "+" rotates 45° over 200ms; the answer appears instantly.
15. **Nav link hover:** bg → white/70, 120ms linear.

**Ambient (mascot "life")**

16. Breathe `scale(1.014, .982)` 3.4s; blink `scaleY(.08)` at 95% of 4.6s; glance left/right on an 11–15s cycle; occasional mouth murmur. Variants: headphones nod (0.9s), sway (1.3s alternate), hop with shadow (1.15s), twinkling stars (1.8s), rising music notes (2.6s).

**Reduced motion:** the original turns off all of the above; reveals and words show at full
opacity, the hero cards stop cycling, and the sticky story is replaced by the stacked version.

---

## 8. Assets and replacements

| Original | Replacement in the study |
|---|---|
| Poor Story (Google Fonts, OFL) | **Same font** via `next/font/google`. |
| SF Pro Rounded via `ui-rounded` (system) | Same stack (`ui-rounded`) so Macs match exactly. Fallback **Nunito** (Google Fonts): the closest free rounded sans, for non-Apple machines. |
| SF Pro Display for numbers (system) | Same system stack. Nothing to download. |
| Mascot (white/black blob character, inline SVG) | An **original character**: a small cloud ("puff") drawn in my own SVG, with my own breathe, blink and glance loops. |
| WebGL 3D phone model | CSS phone (div with rounded shell) using `perspective` + `rotateY` scrubbed by scroll. |
| App screenshots inside the phone / Mac (images, video) | HTML/CSS mock screens with invented content. |
| Board "drawn" illustrations | Flat gradient tiles with simple shapes. |
| Icons (laptop, phone, camera, mic, etc.) | Simple inline SVG line icons drawn for this project. |
| Copy | All new, for a fictional product, **puff**. |
