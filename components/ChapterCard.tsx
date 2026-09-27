import Link from "next/link";
import { Tilt } from "./ui";
import { poemsIn, type Chapter } from "@/lib/poems";

/** A chapter as a lit doorway: tilt it, and its layers separate in depth. */
export default function ChapterCard({ chapter, className = "" }: { chapter: Chapter; className?: string }) {
  const list = poemsIn(chapter.slug);
  const [a, b, c] = chapter.palette;
  return (
    <Tilt className={`h-full ${className}`} max={9}>
      <Link
        href={`/chapters/${chapter.slug}`}
        data-cursor="open"
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] border border-bone/10 p-7 [transform-style:preserve-3d] md:p-9"
        style={{ background: `linear-gradient(160deg, ${c} 0%, #07060a 85%)` }}
      >
        {/* drifting aura */}
        <span
          aria-hidden
          className="absolute -right-1/4 -top-1/4 h-[80%] w-[80%] rounded-full opacity-50 blur-[70px] transition-opacity duration-1000 group-hover:opacity-90"
          style={{ background: `radial-gradient(circle, ${b}, transparent 70%)`, animation: "aura 14s ease-in-out infinite alternate" }}
        />
        <span
          aria-hidden
          className="absolute -bottom-1/4 -left-1/4 h-[60%] w-[70%] rounded-full opacity-30 blur-[80px]"
          style={{ background: `radial-gradient(circle, ${a}, transparent 70%)`, animation: "aura 18s ease-in-out infinite alternate-reverse" }}
        />
        {/* ghost numeral far behind */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-2 font-display text-[16rem] italic leading-none text-bone/[0.04] transition-transform duration-1000 [transform:translateZ(-40px)] group-hover:-translate-y-3"
        >
          {chapter.numeral}
        </span>

        <div className="relative flex items-start justify-between [transform:translateZ(40px)]">
          <span className="label" style={{ color: a }}>
            Chapter {chapter.numeral}
          </span>
          <span className="text-3xl transition-transform duration-1000 group-hover:rotate-[20deg]" style={{ color: a }}>
            {chapter.glyph}
          </span>
        </div>

        <div className="relative [transform:translateZ(70px)]">
          <h3 className="display text-6xl text-bone md:text-7xl">{chapter.title}</h3>
          <p className="italic-serif mt-4 max-w-xs text-xl leading-snug text-bone/70">{chapter.epigraph}</p>
          <div className="mt-8 flex items-end justify-between border-t border-bone/10 pt-5">
            <ul className="space-y-1">
              {list.slice(0, 3).map((p) => (
                <li key={p.slug} className="text-sm text-bone/50">
                  {p.script === "telugu" ? p.translation?.split("—")[0] : p.title}
                </li>
              ))}
              {list.length > 3 && <li className="italic-serif text-sm text-bone/35">and more, waiting…</li>}
            </ul>
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-700 group-hover:rotate-45"
              style={{ borderColor: `${a}66`, color: a }}
              aria-hidden
            >
              ↗
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
