"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useSite } from "./Providers";
import { Rise, SplitReveal, Tilt } from "./ui";
import { SOCIALS } from "@/lib/site";

const silk = [0.22, 1, 0.36, 1] as const;

/** Two selves in one frame: the photograph, and — under a circle of lamplight — the one I imagine. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const r = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26 });
  const sy = useSpring(my, { stiffness: 220, damping: 26 });
  const sr = useSpring(r, { stiffness: 120, damping: 20 });
  const clip = useTransform([sx, sy, sr] as never, ([x, y, rad]: number[]) => `circle(${rad}% at ${x}% ${y}%)`);

  return (
    <Tilt max={6} className="mx-auto w-full max-w-[520px]">
      <div
        ref={ref}
        data-cursor="look"
        className="relative aspect-[3/4] overflow-hidden"
        onPointerMove={(e) => {
          const b = ref.current!.getBoundingClientRect();
          mx.set(((e.clientX - b.left) / b.width) * 100);
          my.set(((e.clientY - b.top) / b.height) * 100);
          r.set(24);
        }}
        onPointerLeave={() => r.set(0)}
        onClick={() => r.set(r.get() > 60 ? 0 : 150)}
      >
        <Image
          src="/images/pranay.webp"
          alt="Sai Pranay Tadakamalla, thoughtful, at a desk by a window"
          fill
          priority
          sizes="(max-width: 768px) 92vw, 520px"
          className="object-cover [filter:sepia(0.2)_contrast(1.06)_saturate(0.9)]"
        />
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image
            src="/images/illustrated.webp"
            alt="An illustrated self-portrait holding a bouquet of flowers"
            fill
            sizes="(max-width: 768px) 92vw, 520px"
            className="object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/15" />
        <p className="label pointer-events-none absolute bottom-5 left-5 !text-bone/70">Hover or tap — the one I imagine</p>
      </div>
    </Tilt>
  );
}

const TONGUES = [
  { name: "English", sample: "The stars above still spell your name,", cls: "italic-serif text-3xl", note: "for the things I could say" },
  { name: "हिन्दी · اردو", sample: "Main usko aansuon se likh raha hoon,", cls: "italic-serif text-3xl", note: "for the things only these words hold" },
  { name: "తెలుగు", sample: "తను ఆకాశ వీధిలో అందాల జాబిలి...", cls: "script-telugu text-2xl", note: "for a memory time cannot erase" },
];

export default function AboutView() {
  const { ready } = useSite();
  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[900px] w-[1200px] -translate-x-1/2 opacity-40 blur-[140px]"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(142,27,42,0.55), transparent 55%), radial-gradient(circle at 70% 40%, rgba(90,111,184,0.4), transparent 55%)" }}
      />

      <section className="relative px-5 pb-24 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.p className="label mb-6" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1.2 }}>
              The poet · {SOCIALS.instagram.handle}
            </motion.p>
            <h1 className="display text-[17vw] text-bone lg:text-[8.5vw]">
              <span className="block">
                <SplitReveal text="Sai Pranay" play={ready} stagger={0.05} />
              </span>
              <span className="block italic-serif !font-light text-ember">
                <SplitReveal text="Tadakamalla" play={ready} delay={0.4} stagger={0.045} />
              </span>
            </h1>
            <motion.p
              className="italic-serif mt-10 max-w-xl text-2xl leading-snug text-bone/75 md:text-3xl"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.4, delay: 0.9, ease: silk }}
            >
              A notebook, a sleepless night, and every language I know — all trying to say one thing.
            </motion.p>
          </div>
          <Portrait />
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[14rem_1fr]">
          <p className="label">Of the one who wrote</p>
          <div className="max-w-3xl space-y-8 font-serif text-2xl leading-relaxed text-bone/80 md:text-3xl md:leading-relaxed">
            <Rise>
              <p>
                I started writing the way most people do — to survive a feeling that had nowhere else to go. A glance that became a
                flame. A friendship I wished were something more. A morning heavier than the night before it.
              </p>
            </Rise>
            <Rise>
              <p>
                Some poems arrived in <em className="text-ember">English</em>. Some only knew how to be said in{" "}
                <em className="text-ember">Hindi and Urdu</em>. And one came in <em className="text-ember">Telugu</em>, for Savitri —
                the Mahanati, whose films outlived their decades.
              </p>
            </Rise>
            <Rise>
              <p>
                This was an old hobby, and I hadn’t opened these notebooks in months. But a poem left unread is a lamp left unlit.
                So here they are — every one of them, even the ones that stop mid-sentence — <span className="italic text-moon">set in motion</span>.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-32">
        <Rise className="mx-auto max-w-5xl text-center">
          <p className="breathe mb-8 text-2xl text-ember" aria-hidden>
            ❦
          </p>
          <p className="display text-4xl leading-tight text-bone [text-wrap:balance] md:text-6xl">
            Some of these poems end mid‑sentence.
            <br />
            <span className="italic-serif text-bone/60">Some feelings do too.</span>
          </p>
        </Rise>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="label mb-12">The tongues of one heart</p>
          <div className="grid gap-6 md:grid-cols-3">
            {TONGUES.map((t, i) => (
              <Rise key={t.name} delay={i * 0.12}>
                <Tilt max={8} className="h-full">
                  <div className="relative flex h-full min-h-[300px] flex-col justify-between border border-bone/10 bg-bone/[0.02] p-8 [transform-style:preserve-3d]">
                    <p className="font-display text-5xl text-bone [transform:translateZ(40px)]">{t.name}</p>
                    <div className="[transform:translateZ(60px)]">
                      <p className={`${t.cls} leading-snug text-bone/80`}>“{t.sample}”</p>
                      <p className="label mt-5">{t.note}</p>
                    </div>
                  </div>
                </Tilt>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-36 pt-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="label mb-10">Find me elsewhere</p>
          <div className="divide-y divide-bone/10 border-y border-bone/10">
            {Object.values(SOCIALS).map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="visit"
                className="group flex items-center justify-between gap-6 py-8 md:py-10"
              >
                <span className="display text-5xl text-bone transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4 md:text-8xl">
                  {s.label}
                </span>
                <span className="flex items-center gap-6">
                  <span className="italic-serif hidden text-xl text-bone/50 md:block">{s.handle}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/20 text-xl text-bone transition-all duration-700 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink md:h-20 md:w-20">
                    ↗
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
