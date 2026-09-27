"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ambient } from "@/lib/ambient";

gsap.registerPlugin(ScrollTrigger);

type SiteState = {
  /** true once the opening ritual has finished (or was skipped) */
  ready: boolean;
  setReady: (v: boolean) => void;
  sound: boolean;
  toggleSound: () => void;
  lenis: React.RefObject<Lenis | null>;
};

const SiteContext = createContext<SiteState | null>(null);

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const ambient = useRef<Ambient | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const l = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    lenis.current = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // Every new page begins at the top, like turning to a fresh sheet.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const toggleSound = useCallback(() => {
    ambient.current ??= new Ambient();
    const a = ambient.current;
    if (a.playing) a.stop();
    else void a.start();
    setSound(a.playing);
  }, []);

  return (
    <SiteContext.Provider value={{ ready, setReady, sound, toggleSound, lenis }}>
      {children}
    </SiteContext.Provider>
  );
}
