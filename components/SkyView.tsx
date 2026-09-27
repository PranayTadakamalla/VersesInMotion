"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { useSite } from "./Providers";
import { SplitReveal } from "./ui";
import { chapters, type ChapterSlug } from "@/lib/poems";

const Constellation = dynamic(() => import("./three/Constellation"), { ssr: false });

export default function SkyView() {
  const { ready } = useSite();
  const [focus, setFocus] = useState<ChapterSlug | null>(null);
  const [zoom, setZoom] = useState<{ n: number; dir: 1 | -1 }>({ n: 0, dir: 1 });
  const current = focus ? chapters.find((c) => c.slug === focus)! : null;

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#04040a]">
      {/* pan-y: a vertical swipe still scrolls the page; sideways turns the night */}
      <div className="absolute inset-0 [touch-action:pan-y]">
        <Constellation focus={focus} zoom={zoom} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#04040a] via-[#04040a]/80 to-transparent px-5 pb-16 pt-24 md:bg-none md:px-10 md:pt-32">
        <p className="label mb-3 md:mb-4">Turn the night · touch a light to read</p>
        <h1 className="display text-6xl text-bone md:text-9xl">
          <SplitReveal text="The Sky" play={ready} stagger={0.06} />
        </h1>
        <motion.p
          className="italic-serif mt-3 max-w-md text-lg leading-snug text-bone/65 md:mt-4 md:text-2xl"
          key={current?.slug ?? "all"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {current ? current.epigraph : "Every light up here is a poem. The longer it aches, the brighter it burns."}
        </motion.p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#04040a] to-transparent pb-6 pt-10 md:bg-none md:pb-10">
        <div className="flex items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:flex-wrap md:justify-between md:px-10">
          <div className="flex gap-2 md:flex-wrap">
            <LegendButton on={!focus} onClick={() => setFocus(null)} color="#f6eedb">
              All
            </LegendButton>
            {chapters.map((c) => (
              <LegendButton key={c.slug} on={focus === c.slug} onClick={() => setFocus(c.slug)} color={c.palette[0]}>
                <span className="mr-2 opacity-60">{c.numeral}</span>
                {c.title}
              </LegendButton>
            ))}
          </div>
          <div className="hidden gap-2 md:flex">
            <LegendButton on={false} onClick={() => setZoom((z) => ({ n: z.n + 1, dir: 1 }))} color="#f6eedb" aria="Draw closer">
              +
            </LegendButton>
            <LegendButton on={false} onClick={() => setZoom((z) => ({ n: z.n + 1, dir: -1 }))} color="#f6eedb" aria="Step back">
              −
            </LegendButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendButton({
  children,
  on,
  onClick,
  color,
  aria,
}: {
  children: React.ReactNode;
  on: boolean;
  onClick: () => void;
  color: string;
  aria?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={aria}
      className={clsx(
        "flex shrink-0 items-center whitespace-nowrap rounded-full border px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-500",
        on ? "text-ink" : "border-bone/15 bg-ink/50 text-bone/75 hover:text-bone",
      )}
      style={on ? { background: color, borderColor: color } : undefined}
    >
      <span
        className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: on ? "#07060a" : color, boxShadow: on ? "none" : `0 0 8px ${color}` }}
      />
      {children}
    </button>
  );
}
