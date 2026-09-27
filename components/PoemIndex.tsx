"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import clsx from "clsx";
import { chapters, getChapter, poems, type ChapterSlug, type Poem } from "@/lib/poems";
import { useSite } from "./Providers";
import { SplitReveal } from "./ui";

const LANGS = ["All", "English", "Hindi / Urdu", "Telugu"] as const;
const silk = [0.22, 1, 0.36, 1] as const;

function normalise(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export default function PoemIndex() {
  const { ready } = useSite();
  const [chapter, setChapter] = useState<ChapterSlug | "all">("all");
  const [lang, setLang] = useState<(typeof LANGS)[number]>("All");
  const [q, setQ] = useState("");
  const [hover, setHover] = useState<Poem | null>(null);

  const list = useMemo(() => {
    const needle = normalise(q.trim());
    return poems.filter(
      (p) =>
        (chapter === "all" || p.chapter === chapter) &&
        (lang === "All" || p.language === lang) &&
        (!needle || normalise(`${p.title} ${p.translation ?? ""} ${p.text}`).includes(needle)),
    );
  }, [chapter, lang, q]);

  // a small card of verse that trails the pointer across the list
  const listRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 22 });
  const y = useSpring(my, { stiffness: 180, damping: 22 });
  const hoverChapter = hover ? getChapter(hover.chapter)! : null;

  return (
    <div className="relative px-5 pb-32 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <p className="label mb-6">Index of the heart</p>
        <h1 className="display text-[18vw] text-bone md:text-[10vw]">
          <SplitReveal text="The Poems" play={ready} stagger={0.05} />
        </h1>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="italic-serif text-2xl text-bone/60">
            {poems.length} poems, written across years and three languages.
          </p>
        </div>

        {/* filters */}
        <div className="sticky top-20 z-30 -mx-5 mt-14 border-y border-bone/10 bg-ink/80 px-5 py-4 backdrop-blur-md md:top-24 md:-mx-10 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Chip on={chapter === "all"} onClick={() => setChapter("all")}>
                All
              </Chip>
              {chapters.map((c) => (
                <Chip key={c.slug} on={chapter === c.slug} onClick={() => setChapter(c.slug)} color={c.palette[0]}>
                  {c.title}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {LANGS.map((l) => (
                <Chip key={l} on={lang === l} onClick={() => setLang(l)} subtle>
                  {l}
                </Chip>
              ))}
              <label className="relative ml-1 flex items-center">
                <span className="sr-only">Search the poems</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="search a word…"
                  className="w-44 rounded-full border border-bone/15 bg-transparent px-4 py-2 font-serif text-base italic text-bone placeholder:text-bone/35 focus:border-ember/60 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        {/* the list */}
        <div
          ref={listRef}
          className="relative mt-4"
          onPointerMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const c = getChapter(p.chapter)!;
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.7, ease: silk, delay: Math.min(i, 12) * 0.03 }}
                >
                  <Link
                    href={`/poems/${p.slug}`}
                    onPointerEnter={() => setHover(p)}
                    data-cursor="read"
                    className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-bone/10 py-6 md:grid-cols-[4rem_1fr_14rem_10rem] md:py-8"
                  >
                    <span className="font-mono text-xs text-bone/35 transition-colors duration-500 group-hover:text-ember">
                      {String(poems.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={clsx(
                          "block text-bone transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3",
                          p.script === "telugu" ? "script-telugu text-3xl md:text-4xl" : "display text-4xl md:text-6xl",
                        )}
                      >
                        {p.title}
                        {p.unfinished && <span className="caret opacity-60" aria-hidden />}
                      </span>
                      {p.translation && (
                        <span className="italic-serif mt-2 block text-lg text-bone/45 transition-transform duration-700 group-hover:translate-x-3">
                          {p.translation}
                        </span>
                      )}
                    </span>
                    <span className="label col-start-2 mt-3 md:col-start-auto md:mt-0" style={{ color: c.palette[0] }}>
                      {c.numeral} · {c.title}
                    </span>
                    <span className="label col-start-2 md:col-start-auto md:text-right">
                      {p.language}
                      {p.unfinished ? " · unfinished" : ""}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {list.length === 0 && (
            <p className="italic-serif py-24 text-center text-3xl text-bone/50">
              No poem holds that word — yet.
            </p>
          )}
        </div>
      </div>

      {/* trailing verse preview (desktop) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-80 lg:block"
        style={{ x, y }}
      >
        <div className="translate-x-6 -translate-y-1/2">
        <AnimatePresence>
          {hover && hoverChapter && (
            <motion.div
              key={hover.slug}
              initial={{ opacity: 0, scale: 0.9, rotate: -3, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, rotate: -1.5, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: silk }}
              className="overflow-hidden border border-bone/15 p-6 shadow-2xl"
              style={{ background: `linear-gradient(160deg, ${hoverChapter.palette[2]}, #07060a)` }}
            >
              <p className="label mb-3" style={{ color: hoverChapter.palette[0] }}>
                {hoverChapter.glyph} {hoverChapter.title}
              </p>
              <div
                className={clsx(
                  "text-bone/80",
                  hover.script === "devanagari" ? "script-devanagari text-base" : hover.script === "telugu" ? "script-telugu text-base" : "italic-serif text-lg leading-snug",
                )}
              >
                {hover.text
                  .split("\n")
                  .filter(Boolean)
                  .slice(0, 4)
                  .map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function Chip({
  children,
  on,
  onClick,
  color,
  subtle,
}: {
  children: React.ReactNode;
  on: boolean;
  onClick: () => void;
  color?: string;
  subtle?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={clsx(
        "relative rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] transition-all duration-500",
        on ? "border-transparent text-ink" : "border-bone/15 text-bone/70 hover:border-bone/40 hover:text-bone",
        subtle && !on && "border-transparent",
      )}
      style={on ? { background: color ?? "#f6eedb" } : undefined}
    >
      {children}
    </button>
  );
}
