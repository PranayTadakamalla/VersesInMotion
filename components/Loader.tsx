"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "./Providers";

const WHISPERS = ["every verse begins in silence", "then, a glance", "then, the ache", "and the words arrive"];

/**
 * The opening ritual: a moon draws itself while the counter climbs,
 * four whispers pass, and the night parts like a curtain.
 */
export default function Loader() {
  const { setReady, lenis } = useSite();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [short, setShort] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("vim-seen") === "1";
      sessionStorage.setItem("vim-seen", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = seen || reduce ? 700 : 3600;
    setShort(seen || reduce);
    lenis.current?.stop();
    document.documentElement.style.overflow = "hidden";

    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // slow at the end until fonts land, so nothing flashes unstyled
      const eased = 1 - Math.pow(1 - t, 3);
      const capped = fontsReady ? eased : Math.min(eased, 0.92);
      setProgress(capped);
      if (capped >= 1) {
        window.setTimeout(() => setDone(true), seen ? 50 : 450);
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [lenis]);

  useEffect(() => {
    if (!done) return;
    document.documentElement.style.overflow = "";
    lenis.current?.start();
    const id = window.setTimeout(() => setReady(true), short ? 100 : 700);
    return () => window.clearTimeout(id);
  }, [done, lenis, setReady, short]);

  const whisper = WHISPERS[Math.min(Math.floor(progress * WHISPERS.length), WHISPERS.length - 1)];
  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: short ? "inset(0% 0% 100% 0%)" : "inset(50% 0% 50% 0%)" }}
          transition={{ duration: short ? 0.6 : 1.3, ease: [0.76, 0, 0.24, 1] }}
          aria-live="polite"
          aria-label="Loading Verses in Motion"
        >
          {/* distant stars */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="breathe absolute rounded-full bg-moon"
                style={{
                  left: `${(i * 37.7) % 100}%`,
                  top: `${(i * 61.3) % 100}%`,
                  width: i % 7 === 0 ? 2 : 1,
                  height: i % 7 === 0 ? 2 : 1,
                  opacity: 0.2 + ((i * 13) % 10) / 20,
                  animationDelay: `${(i % 10) * 0.4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative h-[180px] w-[180px]"
              animate={progress >= 1 ? { scale: 1.12 } : { scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(246,238,219,0.35), transparent 65%)",
                  opacity: 0.2 + progress * 0.8,
                }}
              />
              <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(239,230,214,0.08)" strokeWidth="1" />
                <circle
                  cx="90"
                  cy="90"
                  r={R}
                  fill="none"
                  stroke="url(#moonStroke)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                />
                <defs>
                  <linearGradient id="moonStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f6eedb" />
                    <stop offset="100%" stopColor="#d9a35b" />
                  </linearGradient>
                </defs>
              </svg>
              {/* the moon fills with light as the night arrives */}
              <div
                className="absolute inset-[26px] overflow-hidden rounded-full"
                style={{
                  background: "radial-gradient(circle at 38% 35%, #fffaf0, #e9dcc0 45%, #a89878 100%)",
                  opacity: progress,
                  boxShadow: `0 0 ${40 + progress * 60}px rgba(246,238,219,${0.15 + progress * 0.35})`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-ink"
                  style={{ transform: `translateX(${progress * 105}%)` }}
                />
              </div>
            </motion.div>

            <div className="mt-12 h-8 overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={whisper}
                  className="italic-serif text-xl text-bone/80 md:text-2xl"
                  initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {whisper}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between md:left-10 md:right-10">
            <p className="label">Verses in Motion</p>
            <div className="flex w-40 flex-col items-end gap-3 md:w-64">
              <p className="italic-serif text-lg text-bone/60 md:text-xl">the ink is still drying…</p>
              <div className="h-px w-full bg-bone/10">
                <div className="h-px w-full origin-left bg-ember" style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>
          </div>
          <div className="absolute left-6 top-8 md:left-10">
            <p className="label">Sai Pranay Tadakamalla</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
