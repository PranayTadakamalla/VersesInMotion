"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "I write what I cannot say out loud. These are thirty-five small confessions — of a glance that became a flame, of a lamp of waiting that never went out, of mornings that woke me a little more dead, and of a love that never learned how to die.";

// words that burn a little brighter than the rest
const EMBERS = new Set(["glance", "flame,", "lamp", "waiting", "dead,", "love", "die."]);

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
          <span className="inline-block h-px w-12 bg-ember/70" /> Prologue
        </p>
        <p ref={ref} className="font-display text-[8.5vw] leading-[1.08] tracking-tight text-bone md:text-[4.6vw]">
          {TEXT.split(" ").map((w, i) => (
            <span
              key={i}
              data-w
              className={EMBERS.has(w) ? "italic-serif text-ember" : undefined}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {w}
            </span>
          ))}
        </p>
        <p className="label mt-12 text-right">— S. P. T.</p>
      </div>
    </section>
  );
}
