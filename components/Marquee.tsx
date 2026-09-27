import Link from "next/link";
import { fragments } from "@/lib/poems";

/** Two rivers of verse flowing in opposite directions. */
export default function Marquee() {
  const half = Math.ceil(fragments.length / 2);
  const rows = [fragments.slice(0, half), fragments.slice(half)];
  return (
    <section className="relative overflow-hidden border-y border-bone/10 py-10 md:py-14" aria-label="Fragments">
      {rows.map((row, r) => (
        <div key={r} className="flex overflow-hidden py-2">
          <div className="marquee" data-reverse={r === 1} style={{ ["--marquee-duration" as string]: `${70 + r * 15}s` }}>
            {[...row, ...row].map((f, i) => (
              <Link
                key={i}
                href={`/poems/${f.slug}`}
                data-cursor="read"
                className={`group flex shrink-0 items-center whitespace-nowrap px-6 text-4xl md:text-6xl ${
                  r === 0 ? "italic-serif text-bone/85 hover:text-ember" : "font-display text-transparent hover:text-bone"
                } transition-colors duration-500`}
                style={r === 1 ? { WebkitTextStroke: "1px rgba(239,230,214,0.35)" } : undefined}
              >
                {f.line}
                <span className="ml-12 text-2xl text-ember/70">✦</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
