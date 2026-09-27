import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChapterView from "@/components/ChapterView";
import { chapters, getChapter, poemsIn } from "@/lib/poems";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getChapter((await params).slug);
  return c ? { title: `${c.numeral} · ${c.title}`, description: c.epigraph } : {};
}

export default async function ChapterPage({ params }: Params) {
  const chapter = getChapter((await params).slug);
  if (!chapter) notFound();
  const i = chapters.indexOf(chapter);
  const next = chapters[(i + 1) % chapters.length];
  return <ChapterView chapter={chapter} list={poemsIn(chapter.slug)} next={next} />;
}
