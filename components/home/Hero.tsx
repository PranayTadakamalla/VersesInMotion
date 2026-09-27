"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useSite } from "../Providers";
import { PillLink, SplitReveal } from "../ui";
import { stats } from "@/lib/poems";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

const silk = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { ready } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const canvasFade = useTransform(scrollYProgress, [0.4, 1], [1, 0.15]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden" data-hero>
      <motion.div className="absolute inset-0" style={{ opacity: canvasFade }}>
        <HeroScene intro={ready} eventSource={ref} />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/75 to-transparent md:hidden" />

      <motion.div
        className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
        style={{ opacity: fade, y: lift }}
      >
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          Case file no. 221B · Poems &amp; Verses
        </motion.p>

        <div>
          <h1 className="display text-[19vw] text-moon [filter:drop-shadow(0_6px_28px_rgba(0,0,0,0.6))] md:text-[12.5vw]">
            <span className="block">
              <SplitReveal text="Verses" play={ready} delay={0.2} stagger={0.07} />
            </span>
            <span className="block pl-[8vw] italic-serif !font-light md:pl-[18vw]">
              <SplitReveal text="in Motion" play={ready} delay={0.6} stagger={0.06} charClassName="gold-text pr-[0.04em]" />
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="flex gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.5, ease: silk }}
          >
            {[
              [stats.poems, "poems"],
              [stats.languages, "tongues"],
              [stats.chapters, "chapters"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-bone md:text-5xl">{n}</p>
                <p className="label mt-1">{l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-auto max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.7, ease: silk }}
          >
            <p className="italic-serif mb-6 text-xl leading-snug text-bone/80 md:text-2xl">
              Poems of love, longing, and the quiet ache between — in English, Hindi–Urdu &amp; Telugu.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="/poems">Begin reading</PillLink>
              <PillLink href="/sky" variant="ghost">
                Wander the sky
              </PillLink>
            </div>
            <p className="label mt-5 !text-[0.6rem] !text-bone/40">Touch a drifting line to read it</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="label !text-[0.58rem]">scroll, slowly</span>
        <span className="relative block h-14 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ember"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
