import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PoemReader from "@/components/PoemReader";
import { firstLine, getChapter, getPoem, neighbours, poems, poemsIn } from "@/lib/poems";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const poem = getPoem((await params).slug);
  if (!poem) return {};
  const title = poem.translation ? `${poem.title} — ${poem.translation}` : poem.title;
  return {
    title,
    description: `${firstLine(poem)} — a poem by Sai Pranay Tadakamalla.`,
    openGraph: { title, description: firstLine(poem) },
  };
}

export default async function PoemPage({ params }: Params) {
  const poem = getPoem((await params).slug);
  if (!poem) notFound();
  const chapter = getChapter(poem.chapter)!;
  const { prev, next } = neighbours(poem.slug);
  const siblings = poemsIn(poem.chapter).filter((p) => p.slug !== poem.slug);
  return <PoemReader poem={poem} chapter={chapter} prev={prev} next={next} siblings={siblings} />;
}
