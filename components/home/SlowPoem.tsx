"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import InView from "../InView";
import { PillLink } from "../ui";
import { getChapter } from "@/lib/poems";

const InkSky = dynamic(() => import("../three/InkSky"), { ssr: false });

const LINES = [
  "Because loving you",
  "felt like holding a flame in winter.",
  "It kept me alive",
  "while quietly turning me to ash.",
  "My heart has buried you a thousand times,",
  "yet every lonely night",
  "it still kneels beside your memory,",
  "placing fresh flowers",
  "on a love that never learned how to die.",
];

function Line({ text, i, progress }: { text: string; i: number; progress: MotionValue<number> }) {
  const n = LINES.length;
  const start = i / (n + 1);
  const end = start + 1 / (n + 1);
  const opacity = useTransform(progress, [start, end, Math.min(end + 0.1, 1)], [0.06, 1, i === n - 1 ? 1 : 0.32]);
  const blur = useTransform(progress, [start, start + (end - start) * 0.6], ["blur(8px)", "blur(0px)"]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const last = i === n - 1;
  return (
    <motion.p
      style={{ opacity, filter: blur, y }}
      className={
        last
          ? "italic-serif mt-6 text-[7vw] leading-tight text-moon md:text-5xl"
          : "font-display text-[6vw] leading-[1.25] text-bone md:text-4xl"
      }
    >
      {text}
    </motion.p>
  );
}

export default function SlowPoem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const cta = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);
  const palette = getChapter("heartbreak")!.palette;

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <InView className="absolute inset-0">
          <InkSky palette={palette} intensity={0.9} className="absolute inset-0" />
        </InView>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="relative mx-auto w-full max-w-4xl px-5 md:px-10">
          <p className="label mb-10">III · Heartbreak — If I See You Again</p>
          <div className="space-y-1">
            {LINES.map((l, i) => (
              <Line key={i} text={l} i={i} progress={scrollYProgress} />
            ))}
          </div>
          <motion.div className="mt-12" style={{ opacity: cta }}>
            <PillLink href="/poems/if-i-see-you-again" variant="ghost" cursor="read">
              Read the whole poem
            </PillLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
