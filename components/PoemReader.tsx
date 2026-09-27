"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "./ui";
import { useSite } from "./Providers";
import { stanzas, type Chapter, type Poem } from "@/lib/poems";

const InkSky = dynamic(() => import("./three/InkSky"), { ssr: false });

const silk = [0.22, 1, 0.36, 1] as const;
const SPEECH_LANG: Record<Poem["script"], string> = { latin: "en-IN", devanagari: "hi-IN", telugu: "te-IN" };

const scriptClass = (s: Poem["script"]) =>
  s === "devanagari" ? "script-devanagari" : s === "telugu" ? "script-telugu" : "font-serif";

export default function PoemReader({
  poem,
  chapter,
  prev,
  next,
  siblings,
}: {
  poem: Poem;
  chapter: Chapter;
  prev: Poem;
  next: Poem;
  siblings: Poem[];
}) {
  const { ready } = useSite();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [size, setSize] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const cancelled = useRef(false);
  const blocks = useMemo(() => stanzas(poem.text), [poem.text]);
  const flat = useMemo(() => blocks.flat(), [blocks]);

  useEffect(() => {
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window);
    try {
      const s = Number(localStorage.getItem("vim-size"));
      if (s >= 0.8 && s <= 1.5) setSize(s);
    } catch {}
    return () => {
      cancelled.current = true;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const changeSize = (d: number) =>
    setSize((s) => {
      const n = Math.min(1.5, Math.max(0.8, +(s + d).toFixed(2)));
      try {
        localStorage.setItem("vim-size", String(n));
      } catch {}
      return n;
    });

  const speak = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      cancelled.current = true;
      synth.cancel();
      setSpeaking(false);
      setActiveLine(-1);
      return;
    }
    cancelled.current = false;
    synth.cancel();
    const lang = SPEECH_LANG[poem.script];
    const voice = synth.getVoices().find((v) => v.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
    setSpeaking(true);
    flat.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line.replace(/…/g, "..."));
      u.lang = lang;
      if (voice) u.voice = voice;
      u.rate = 0.82;
      u.pitch = 0.92;
      u.onstart = () => !cancelled.current && setActiveLine(i);
      if (i === flat.length - 1)
        u.onend = () => {
          setSpeaking(false);
          setActiveLine(-1);
        };
      synth.speak(u);
    });
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: poem.title, text: `${poem.title} — Sai Pranay Tadakamalla`, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  let lineIndex = 0;
  const baseSize = poem.script === "latin" ? 1.55 : 1.4;

  return (
    <article className="relative min-h-screen">
      <InkSky palette={chapter.palette} intensity={0.85} />
      <motion.div className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left" style={{ scaleX: progress, background: chapter.palette[0] }} />

      <header className="relative mx-auto max-w-3xl px-5 pb-16 pt-40 md:px-10 md:pt-48">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: silk }}
        >
          <Link href={`/chapters/${chapter.slug}`} className="label draw-link" style={{ color: chapter.palette[0] }}>
            {chapter.numeral} · {chapter.title}
          </Link>
          <span className="h-px w-8 bg-bone/20" />
          <span className="label">{poem.language}</span>
          {poem.unfinished && (
            <>
              <span className="h-px w-8 bg-bone/20" />
              <span className="label !text-ember">Unfinished</span>
            </>
          )}
        </motion.div>

        <h1
          className={clsx(
            "text-bone",
            poem.script === "telugu" ? "script-telugu text-5xl !leading-[1.35] md:text-6xl" : "display text-6xl md:text-8xl",
          )}
        >
          {poem.script === "telugu" ? (
            <motion.span
              className="block"
              initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
              animate={ready ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 1.6, ease: silk, delay: 0.2 }}
            >
              {poem.title}
            </motion.span>
          ) : (
            <SplitReveal text={poem.title} play={ready} delay={0.15} stagger={0.03} />
          )}
        </h1>
        {(poem.translation || poem.note) && (
          <motion.p
            className="italic-serif mt-6 text-2xl text-bone/60"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.9 }}
          >
            {poem.translation ?? poem.note}
          </motion.p>
        )}
        <motion.div
          className="mt-10 h-px w-24 origin-left"
          style={{ background: chapter.palette[0] }}
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 1, ease: silk }}
        />
      </header>

      <div className="relative mx-auto max-w-3xl px-5 pb-24 md:px-10">
        <div
          className={clsx(scriptClass(poem.script), "text-bone/90")}
          style={{ fontSize: `calc(${baseSize}rem * ${size})`, lineHeight: poem.script === "latin" ? 1.65 : undefined }}
          lang={poem.script === "devanagari" ? "hi" : poem.script === "telugu" ? "te" : poem.language === "English" ? "en" : "hi-Latn"}
        >
          {blocks.map((stanza, si) => (
            <div key={si} className="mb-[1.4em]">
              {stanza.map((line) => {
                const i = lineIndex++;
                const isLast = i === flat.length - 1;
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 1.1, ease: silk, delay: 0.1 + (i % 4) * 0.08 }}
                    className={clsx(
                      "transition-[color,text-shadow] duration-500",
                      activeLine === i && "text-moon [text-shadow:0_0_24px_rgba(246,238,219,0.55)]",
                      speaking && activeLine !== i && "text-bone/40",
                    )}
                  >
                    {line}
                    {isLast && poem.unfinished && <span className="caret" aria-hidden />}
                  </motion.p>
                );
              })}
            </div>
          ))}
        </div>

        {poem.unfinished ? (
          <motion.div
            className="mt-16 border-l border-ember/40 pl-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
          >
            <p className="label !text-ember">— unfinished —</p>
            <p className="italic-serif mt-3 text-xl text-bone/55">
              The poem ends where the notebook does. The rest is still unwritten — or still being felt.
            </p>
          </motion.div>
        ) : (
          <p className="breathe mt-12 text-center text-3xl" style={{ color: chapter.palette[0] }} aria-hidden>
            ❦
          </p>
        )}
        <p className="label mt-16 text-center">— Sai Pranay Tadakamalla</p>
      </div>

      {/* reading tools */}
      <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
        <motion.div
          className="flex items-center gap-1 rounded-full border border-bone/15 bg-ink/70 p-1.5 backdrop-blur-md md:flex-col"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8, ease: silk }}
        >
          <ToolButton label="Smaller text" onClick={() => changeSize(-0.1)}>
            <span className="font-display text-sm">A</span>
          </ToolButton>
          <ToolButton label="Larger text" onClick={() => changeSize(0.1)}>
            <span className="font-display text-lg">A</span>
          </ToolButton>
          {canSpeak && (
            <ToolButton label={speaking ? "Stop reading aloud" : "Read aloud"} onClick={speak} active={speaking}>
              {speaking ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="10" height="10" rx="1" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
              )}
            </ToolButton>
          )}
          <ToolButton label={copied ? "Link copied" : "Share"} onClick={share} active={copied}>
            {copied ? (
              <span className="text-xs">✓</span>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6" /></svg>
            )}
          </ToolButton>
        </motion.div>
      </div>

      {/* onward */}
      <nav className="relative mx-auto max-w-6xl px-5 pb-24 md:px-10" aria-label="More poems">
        <div className="hairline mb-16" />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { p: prev, dir: "Previous" },
            { p: next, dir: "Next" },
          ].map(({ p, dir }) => (
            <Link
              key={dir}
              href={`/poems/${p.slug}`}
              data-cursor="read"
              className={clsx(
                "group relative overflow-hidden border border-bone/10 bg-ink/40 p-8 backdrop-blur-sm transition-colors duration-700 hover:border-bone/30 md:p-10",
                dir === "Next" && "md:text-right",
              )}
            >
              <p className="label mb-4">
                {dir === "Previous" ? "← " : ""}
                {dir}
                {dir === "Next" ? " →" : ""}
              </p>
              <p className={clsx("text-4xl text-bone transition-transform duration-700 md:text-5xl", p.script === "telugu" ? "script-telugu !text-3xl" : "display", dir === "Next" ? "group-hover:-translate-x-2" : "group-hover:translate-x-2")}>
                {p.title}
              </p>
              {p.translation && <p className="italic-serif mt-3 text-lg text-bone/50">{p.translation}</p>}
            </Link>
          ))}
        </div>

        {siblings.length > 0 && (
          <div className="mt-20">
            <p className="label mb-6">Also in {chapter.title}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/poems/${s.slug}`} className={clsx("draw-link text-2xl text-bone/70 hover:text-bone", s.script === "telugu" ? "script-telugu" : "italic-serif")}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </article>
  );
}

function ToolButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-full text-bone/80 transition-colors duration-300 hover:bg-bone/10 hover:text-bone",
        active && "bg-ember/90 !text-ink",
      )}
    >
      {children}
    </button>
  );
}
