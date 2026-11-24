import { site } from "./content";
import type { Chapter, Poem, Fragment } from "./schema";

export type { Chapter, Poem, Script } from "./schema";
/** Chapters are created in the Curator, so their slugs are plain strings. */
export type ChapterSlug = string;

export const chapters: Chapter[] = site.chapters;
export const poems: Poem[] = site.poems;
/** Lines that drift through the hero sky and the marquee. */
export const fragments: Fragment[] = site.fragments;

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
export const getPoem = (slug: string) => poems.find((p) => p.slug === slug);
export const poemsIn = (chapter: ChapterSlug) => poems.filter((p) => p.chapter === chapter);

export function neighbours(slug: string) {
  const i = poems.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? poems[i - 1] : poems[poems.length - 1],
    next: i < poems.length - 1 ? poems[i + 1] : poems[0],
  };
}

export function parsePoemLine(line: string) {
  const isSubtitle = line.startsWith("## ");
  return { isSubtitle, text: isSubtitle ? line.slice(3) : line };
}

/** Returns poem text suitable for previews, search and metadata. */
export const poemTextWithoutMarkers = (text: string) => text.split("\n").map((line) => parsePoemLine(line).text).join("\n");

export const stanzas = (text: string) => text.split(/\n\s*\n/).map((s) => s.split("\n"));

export const firstLine = (p: Poem) => poemTextWithoutMarkers(p.text).split("\n")[0];
