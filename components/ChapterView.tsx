"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import clsx from "clsx";
import { useSite } from "./Providers";
import { Rise, SplitReveal, Tilt } from "./ui";
import { stanzas, type Chapter, type Poem } from "@/lib/poems";

const InkSky = dynamic(() => import("./three/InkSky"), { ssr: false });
const silk = [0.22, 1, 0.36, 1] as const;

export default function ChapterView({ chapter, list, next }: { chapter: Chapter; list: Poem[]; next: Chapter }) {
  const { ready } = useSite();
  const [a] = chapter.palette;
  return (
    <div className="relative">
      <InkSky palette={chapter.palette} intensity={1} />
      <header className="relative flex min-h-[90svh] flex-col justify-end px-5 pb-20 pt-36 md:px-10">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute right-[-2vw] top-[8vh] font-display text-[46vw] italic leading-none md:text-[34vw]"
          style={{ color: a, opacity: 0.08 }}
          initial={{ opacity: 0, y: 60 }}
          animate={ready ? { opacity: 0.08, y: 0 } : {}}
          transition={{ duration: 2, ease: silk }}
        >
          {chapter.numeral}
        </motion.span>
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.p
            className="label mb-6"
            style={{ color: a }}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
          >
            {chapter.glyph} Chapter {chapter.numeral} · {list.length} {list.length === 1 ? "poem" : "poems"}
          </motion.p>
          <h1 className="display text-[22vw] text-bone md:text-[14vw]">
            <SplitReveal text={chapter.title} play={ready} stagger={0.06} />
          </h1>
          <motion.p
            className="italic-serif mt-6 max-w-2xl text-3xl leading-snug text-bone/75 md:text-4xl"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.4, delay: 0.7, ease: silk }}
          >
            {chapter.epigraph}
          </motion.p>
        </div>
      </header>

      <section className="relative px-5 pb-32 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => {
            const first = stanzas(p.text)[0].slice(0, 4);
            return (
              <Rise key={p.slug} delay={(i % 3) * 0.1}>
                <Tilt max={7} className="h-full">
                  <Link
                    href={`/poems/${p.slug}`}
                    data-cursor="read"
                    className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden border border-bone/10 bg-ink/55 p-8 backdrop-blur-md transition-colors duration-700 hover:border-bone/30 [transform-style:preserve-3d]"
                  >
                    <span
                      aria-hidden
                      className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-60"
                      style={{ background: chapter.palette[1] }}
                    />
                    <div className="relative [transform:translateZ(30px)]">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="font-mono text-xs text-bone/40">{String(i + 1).padStart(2, "0")}</span>
                        <span className="label !text-[0.6rem]">
                          {p.language}
                          {p.unfinished ? " · unfinished" : ""}
                        </span>
                      </div>
                      <h2 className={clsx("text-bone", p.script === "telugu" ? "script-telugu text-3xl !leading-snug" : "display text-4xl md:text-5xl")}>
                        {p.title}
                      </h2>
                      {p.translation && <p className="italic-serif mt-2 text-lg text-bone/50">{p.translation}</p>}
                    </div>
                    <div
                      className={clsx(
                        "relative mt-8 text-bone/60 [transform:translateZ(50px)]",
                        p.script === "devanagari" ? "script-devanagari text-base" : p.script === "telugu" ? "script-telugu text-base" : "italic-serif text-xl leading-snug",
                      )}
                    >
                      {first.map((l, j) => (
                        <p key={j}>{l}</p>
                      ))}
                      <p className="label mt-6 !text-bone/40 transition-colors duration-500 group-hover:!text-bone">Read →</p>
                    </div>
                  </Link>
                </Tilt>
              </Rise>
            );
          })}
        </div>
      </section>

      <Link
        href={`/chapters/${next.slug}`}
        data-cursor="next"
        className="group relative block overflow-hidden border-t border-bone/10 px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <p className="label mb-6">Next chapter · {next.numeral}</p>
          <p className="display text-[16vw] leading-none text-bone/25 transition-colors duration-1000 group-hover:text-bone md:text-[10vw]">
            {next.title} <span className="inline-block transition-transform duration-1000 group-hover:translate-x-6" style={{ color: next.palette[0] }}>→</span>
          </p>
          <p className="italic-serif mt-4 text-2xl text-bone/50">{next.epigraph}</p>
        </div>
      </Link>
    </div>
  );
}
