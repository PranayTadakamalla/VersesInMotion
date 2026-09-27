# Verses in Motion

The poetry of **Sai Pranay Tadakamalla**: 35 poems of love, longing, heartbreak, the self, hope and tribute, in English, Hindi–Urdu and Telugu.

## What's inside

- **Opening ritual**: a moon draws itself while the counter climbs, then the night parts like a curtain.
- **Hero**: a real-time WebGL night (React Three Fiber and custom GLSL). A moon hangs over a moving sea, its light glittering across the waves. Shooting stars cross the sky, embers rise, and lines from the poems drift through the air. Click one to read that poem.
- **Prologue**: words light up one by one as you scroll.
- **Chapters**: six 3D tilt cards on a pinned horizontal reel (GSAP ScrollTrigger).
- **A slow poem**: the ending of *If I See You Again* surfaces line by line over moving crimson ink.
- **The Sky** (`/sky`): every poem is a star in six constellations. Drag the night around, fly to a chapter, and click a star to read.
- **Reader** (`/poems/[slug]`): each chapter has its own ink shader. Lines rise as you scroll. You can change the text size, have the poem read aloud with the current line highlighted (Web Speech API, English, Hindi and Telugu), or share it. Unfinished poems end on a blinking caret.
- **Index** (`/poems`): filter by chapter or language, search any word (in any script), and see a preview of the verse beside the cursor.
- **About**: a photograph that reveals an illustrated self under a circle of light.
- **Ambient sound**: a generative night soundscape (Web Audio: minor pad, wind, bells), off by default.
- Also: a custom cursor, Lenis smooth scrolling, film grain, and support for reduced motion.

## Stack

Next.js 15 (App Router, fully static), React 19, TypeScript, Tailwind CSS 4, three.js with @react-three/fiber, drei and postprocessing, GSAP, Lenis, and Motion.
Fonts: Bodoni Moda, Cormorant Garamond, IBM Plex Mono, Tiro Devanagari Hindi and Tiro Telugu.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static production build
```

The poems live in `lib/poems.ts`. Add a poem there and it appears everywhere: the index, its chapter, the sky, and its own page.
Social links live in `lib/site.ts`.
