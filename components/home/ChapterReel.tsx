"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterCard from "../ChapterCard";
import { chapters } from "@/lib/poems";

/** Six chapters slide past like frames of film while the page holds still. */
export default function ChapterReel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
        },
      });
      return () => tween.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden py-24 md:py-0">
      <div className="flex min-h-[100svh] flex-col justify-center">
        <div className="mb-10 flex items-end justify-between px-5 md:px-10">
          <div>
            <p className="label mb-4">The book, in six movements</p>
            <h2 className="display text-6xl text-bone md:text-7xl">
              Chapters <span className="italic-serif text-ember">of a heart</span>
            </h2>
          </div>
          <div className="hidden w-48 md:block">
            <div className="h-px w-full bg-bone/10">
              <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-ember" />
            </div>
          </div>
        </div>
        <div
          ref={track}
          className="flex flex-col gap-6 px-5 will-change-transform md:flex-row md:gap-8 md:px-10"
        >
          {chapters.map((c) => (
            <ChapterCard key={c.slug} chapter={c} className="h-[440px] w-full shrink-0 md:h-[58vh] md:w-[min(32vw,500px)]" />
          ))}
          <div className="hidden w-[20vw] shrink-0 md:block" />
        </div>
      </div>
    </section>
  );
}
