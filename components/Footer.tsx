import Link from "next/link";
import { chapters } from "@/lib/poems";
import { SOCIALS } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink px-5 pb-10 pt-24 md:px-10">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(142,27,42,0.6), rgba(217,163,91,0.15) 50%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="label mb-6">Before you go</p>
        <a
          href={SOCIALS.instagram.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="write"
          className="group block"
        >
          <span className="display block text-[13vw] leading-[0.85] text-bone transition-colors duration-700 group-hover:text-ember md:text-[9vw]">
            Stay <span className="italic-serif">a while</span>
          </span>
          <span className="display block text-[13vw] leading-[0.95] text-bone/30 transition-colors duration-700 group-hover:text-bone md:text-[9vw]">
            @tedious.one <span className="inline-block transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">↗</span>
          </span>
        </a>

        <div className="mt-20 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="italic-serif max-w-md text-2xl leading-snug text-bone/70">
              “My heart has buried you a thousand times, yet every lonely night it still kneels beside your memory.”
            </p>
          </div>
          <div>
            <p className="label mb-4">Chapters</p>
            <ul className="space-y-2">
              {chapters.map((c) => (
                <li key={c.slug}>
                  <Link href={`/chapters/${c.slug}`} className="draw-link text-lg text-bone/80 hover:text-bone">
                    <span className="mr-3 font-mono text-xs text-ember/80">{c.numeral}</span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {Object.values(SOCIALS).map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="draw-link text-lg text-bone/80 hover:text-bone">
                    {s.label} <span className="text-ember">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-bone/10 pt-6 md:flex-row">
          <p className="label">© {year} Sai Pranay Tadakamalla · All rights reserved</p>
          <p className="label">Written in notebooks · Set in motion</p>
        </div>
      </div>
    </footer>
  );
}
