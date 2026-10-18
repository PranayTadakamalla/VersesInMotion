# Verses in Motion

The poetry of **Sai Pranay Tadakamalla**: poems of love, longing, heartbreak, the self, hope and tribute, in English, Hindi–Urdu and Telugu.

## What's inside

- **Opening ritual**: a moon draws itself while the ink dries, then the night parts like a curtain.
- **Hero**: a real-time WebGL night (React Three Fiber and custom GLSL). A moon hangs over a moving sea, its light glittering across the waves. Shooting stars cross the sky, embers rise, and lines from the poems drift through the air. Click one to read that poem.
- **Prologue**: words light up one by one as you scroll.
- **Chapters**: 3D tilt cards on a pinned horizontal reel (GSAP ScrollTrigger).
- **A slow poem**: the ending of *If I See You Again* surfaces line by line over moving crimson ink.
- **The Sky** (`/sky`): every poem is a star, grouped into constellations by chapter. Drag the night around, fly to a chapter, and click a star to read.
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

## The Curator (`/curator`)

A private studio for running the site without touching code. You can:
- write, edit, reorder and remove poems, with a live preview in the right script
- create chapters and rename or recolour them
- choose the lines that drift through the hero sky
- change every sentence on the site
- edit the links
- upload new pictures

It isn't linked anywhere, is hidden from search engines, and only exists once its secrets are set.

**How publishing works.** Everything the site shows lives in `content/site.json`. When you press **Publish**, the Curator checks the content is valid, then commits that file to GitHub. Vercel then rebuilds the site, which takes about a minute. Every change is a commit, so any change can be undone from the history. Unpublished drafts are kept in your browser until you publish or discard them.

**Setup.** Add these in Vercel → Project → Settings → Environment Variables (Production), then redeploy:

| Variable | What it is |
| --- | --- |
| `CURATOR_EMAIL` | the sign-in email |
| `CURATOR_PASSWORD_HASH` | `scrypt:N:r:p:salt:hash` — never the password itself |
| `CURATOR_SESSION_SECRET` | 64 random hex characters; changing it signs everyone out |
| `GITHUB_TOKEN` | fine-grained token for this repo only, with **Contents: Read and write** |

`GITHUB_REPO` (default `PranayTadakamalla/VersesInMotion`) and `GITHUB_BRANCH` (default `main`) are optional.

To make a password hash:

```bash
node -e 'const c=require("crypto"),s=c.randomBytes(16),N=32768,r=8,p=1;console.log(`scrypt:${N}:${r}:${p}:${s.toString("base64")}:${c.scryptSync(process.argv[1],s,32,{N,r,p,maxmem:2**28}).toString("base64")}`)' 'your-password'
```

**Local mode.** In local development without `GITHUB_TOKEN`, Publish writes to your working copy instead of GitHub. Put the Curator variables in `.env.local`, which git ignores.
