"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { copy } from "@/lib/content";

// *words between asterisks* burn a little brighter than the rest
const WORDS = copy.prologue.text.split(/\s+/).filter(Boolean).map((w) => {
  const m = w.match(/^([^*]*)\*([^*]+)\*(.*)$/);
  return m ? { pre: m[1], word: m[2], post: m[3], ember: true } : { pre: "", word: w, post: "", ember: false };
});

export default function Prologue() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-w]"),
        { opacity: 0.12, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative px-5 py-40 md:px-10 md:py-56">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-10 flex items-center gap-4">
          <span className="inline-block h-px w-12 bg-ember/70" /> {copy.prologue.label}
        </p>
        <p ref={ref} className="font-display text-[8.5vw] leading-[1.08] tracking-tight text-bone md:text-[4.6vw]">
          {WORDS.map((w, i) => (
            <span key={i} data-w style={{ display: "inline-block", marginRight: "0.25em" }}>
              {w.pre}
              {w.ember ? <span className="italic-serif text-ember">{w.word}</span> : w.word}
              {w.post}
            </span>
          ))}
        </p>
        <p className="label mt-12 text-right">{copy.prologue.signature}</p>
      </div>
    </section>
  );
}
