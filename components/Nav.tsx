"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "./Providers";
import { chapters } from "@/lib/poems";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/poems", label: "Poems" },
  { href: "/sky", label: "The Sky" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const { sound, toggleSound, ready, lenis } = useSite();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 200 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) lenis.current?.stop();
    else lenis.current?.start();
  }, [open, lenis]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mx-auto flex items-center justify-between px-5 py-4 transition-[background,backdrop-filter] duration-700 md:px-10 md:py-5"
          style={{
            background: scrolled && !open ? "linear-gradient(to bottom, rgba(7,6,10,0.85), rgba(7,6,10,0))" : "transparent",
          }}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="Verses in Motion — home">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 transition-colors duration-500 group-hover:border-ember/70">
              <span className="font-display text-sm italic tracking-tight text-bone">V</span>
              <span className="font-display text-sm italic tracking-tight text-ember">m</span>
            </span>
            <span className="hidden font-display text-lg italic text-bone/90 sm:block">Verses in Motion</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="draw-link label !text-[0.7rem] !text-bone/80 transition-colors hover:!text-bone"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="group flex h-10 items-center gap-2 rounded-full border border-bone/15 px-4 transition-colors hover:border-ember/60"
              aria-pressed={sound}
              aria-label={sound ? "Silence the night" : "Let the night hum"}
            >
              <span className="flex h-3 items-end gap-[2px]">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] rounded-full bg-ember"
                    animate={sound ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
                    transition={sound ? { duration: 1.4 + i * 0.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
                  />
                ))}
              </span>
              <span className="label hidden !text-[0.62rem] sm:inline">{sound ? "Sound on" : "Sound off"}</span>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5">
                <span
                  className="absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500"
                  style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500"
                  style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={l.href} className="display block text-6xl text-bone">
                    {isActive(l.href) ? <span className="italic text-ember">{l.label}</span> : l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {chapters.map((c) => (
                <Link key={c.slug} href={`/chapters/${c.slug}`} className="label">
                  {c.numeral} · {c.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
