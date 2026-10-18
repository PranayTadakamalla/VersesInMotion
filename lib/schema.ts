/**
 * The shape of content/site.json — everything the Curator can change.
 * Shared by the site, the Curator studio and the server, so a save that
 * would break a page is refused before it is ever published.
 */

export type Script = "latin" | "devanagari" | "telugu";
export const SCRIPTS: Script[] = ["latin", "devanagari", "telugu"];
export const LANGUAGES = ["English", "Hindi / Urdu", "Telugu"] as const;
export type Language = (typeof LANGUAGES)[number];

export interface Chapter {
  slug: string;
  numeral: string;
  title: string;
  epigraph: string;
  /** light, mid and deep tones used by shaders and gradients */
  palette: [string, string, string];
  glyph: string;
}

export interface Poem {
  slug: string;
  title: string;
  translation?: string;
  note?: string;
  language: Language;
  script: Script;
  chapter: string;
  text: string;
  unfinished?: boolean;
}

export interface Fragment {
  line: string;
  slug: string;
}

export interface Social {
  id: string;
  label: string;
  handle: string;
  href: string;
}

export interface Img {
  src: string;
  alt: string;
}

export interface Copy {
  loader: { whispers: string[]; drying: string };
  hero: { label: string; tagline: string; stanza: string[]; hint: string };
  prologue: { label: string; text: string; signature: string };
  reel: { label: string; title: string; accent: string };
  slowPoem: { poem: string; lines: string[] };
  skyTeaser: { label: string; title: string; accent: string; text: string };
  sky: { hint: string; line: string };
  poet: { label: string; text: string; caption: string };
  index: { label: string; line: string; empty: string };
  about: {
    lede: string;
    storyLabel: string;
    story: string[];
    interlude: string[];
    tonguesLabel: string;
    tongues: { name: string; sample: string; note: string; script: Script }[];
    elsewhereLabel: string;
    photoHint: string;
  };
  unfinished: { label: string; text: string };
  footer: { label: string; title: string; accent: string; quote: string; right: string };
}

export interface SiteContent {
  poems: Poem[];
  chapters: Chapter[];
  fragments: Fragment[];
  socials: Social[];
  images: { portrait: Img; illustrated: Img };
  copy: Copy;
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const IMG_RE = /^\/images\/[a-z0-9-]+\.(webp|jpg|jpeg|png|avif)$/;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const isStr = (v: unknown): v is string => typeof v === "string";
const isUrl = (v: unknown) => {
  if (!isStr(v)) return false;
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:" || u.protocol === "mailto:";
  } catch {
    return false;
  }
};

/** Returns a list of human-readable problems; empty means the content is safe to publish. */
export function validate(c: unknown): string[] {
  const errors: string[] = [];
  const e = (m: string) => errors.push(m);
  if (!c || typeof c !== "object") return ["Content is not an object."];
  const s = c as Partial<SiteContent>;

  if (!Array.isArray(s.chapters) || s.chapters.length === 0) e("There must be at least one chapter.");
  const chapterSlugs = new Set<string>();
  (s.chapters ?? []).forEach((ch, i) => {
    const at = `Chapter ${i + 1}${ch?.title ? ` (“${ch.title}”)` : ""}`;
    if (!ch || !isStr(ch.slug) || !SLUG_RE.test(ch.slug)) e(`${at}: the address must be lowercase letters, numbers and dashes.`);
    else if (chapterSlugs.has(ch.slug)) e(`${at}: another chapter already uses the address “${ch.slug}”.`);
    else chapterSlugs.add(ch.slug);
    if (!isStr(ch?.title) || !ch.title.trim()) e(`${at}: needs a title.`);
    if (!isStr(ch?.numeral)) e(`${at}: needs a numeral.`);
    if (!isStr(ch?.epigraph)) e(`${at}: needs an epigraph.`);
    if (!isStr(ch?.glyph)) e(`${at}: needs a symbol.`);
    if (!Array.isArray(ch?.palette) || ch.palette.length !== 3 || !ch.palette.every((x) => isStr(x) && HEX_RE.test(x)))
      e(`${at}: needs three colours like #c9546a.`);
  });

  if (!Array.isArray(s.poems) || s.poems.length === 0) e("There must be at least one poem.");
  const poemSlugs = new Set<string>();
  (s.poems ?? []).forEach((p, i) => {
    const at = `Poem ${i + 1}${p?.title ? ` (“${p.title}”)` : ""}`;
    if (!p || !isStr(p.slug) || !SLUG_RE.test(p.slug)) e(`${at}: the address must be lowercase letters, numbers and dashes.`);
    else if (poemSlugs.has(p.slug)) e(`${at}: another poem already uses the address “${p.slug}”.`);
    else poemSlugs.add(p.slug);
    if (!isStr(p?.title) || !p.title.trim()) e(`${at}: needs a title.`);
    if (!isStr(p?.text) || !p.text.trim()) e(`${at}: has no words yet.`);
    if (!LANGUAGES.includes(p?.language as Language)) e(`${at}: choose a language.`);
    if (!SCRIPTS.includes(p?.script as Script)) e(`${at}: choose a script.`);
    if (!isStr(p?.chapter) || !chapterSlugs.has(p.chapter)) e(`${at}: belongs to a chapter that doesn’t exist.`);
    if (p?.translation !== undefined && !isStr(p.translation)) e(`${at}: translation must be text.`);
    if (p?.note !== undefined && !isStr(p.note)) e(`${at}: note must be text.`);
  });

  (s.fragments ?? []).forEach((f, i) => {
    if (!isStr(f?.line) || !f.line.trim()) e(`Drifting line ${i + 1}: is empty.`);
    if (!poemSlugs.has(f?.slug)) e(`Drifting line ${i + 1}: points to a poem that doesn’t exist.`);
  });

  const socialIds = new Set<string>();
  (s.socials ?? []).forEach((l, i) => {
    const at = `Link ${i + 1}${l?.label ? ` (${l.label})` : ""}`;
    if (!isStr(l?.label) || !l.label.trim()) e(`${at}: needs a name.`);
    if (!isUrl(l?.href)) e(`${at}: the address must start with https://`);
    if (!isStr(l?.id) || !SLUG_RE.test(l.id) || socialIds.has(l.id)) e(`${at}: has a missing or repeated id.`);
    else socialIds.add(l.id);
  });

  for (const key of ["portrait", "illustrated"] as const) {
    const img = s.images?.[key];
    if (!img || !IMG_RE.test(img.src)) e(`The ${key} image path is invalid.`);
  }

  const copy = s.copy as Copy | undefined;
  if (!copy) e("The site’s words are missing.");
  else {
    if (!poemSlugs.has(copy.slowPoem?.poem)) e("Home › slow poem: points to a poem that doesn’t exist.");
    if (!Array.isArray(copy.loader?.whispers) || copy.loader.whispers.length === 0) e("Loader: needs at least one whisper.");
    if (!Array.isArray(copy.slowPoem?.lines) || copy.slowPoem.lines.length === 0) e("Home › slow poem: needs at least one line.");
  }
  return errors;
}
