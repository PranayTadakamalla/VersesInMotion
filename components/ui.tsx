"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import clsx from "clsx";
import Link from "next/link";

const silk = [0.22, 1, 0.36, 1] as const;

/** Letters rise out of a mask, one breath at a time. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  play = true,
  by = "char",
  charClassName,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  by?: "char" | "word";
}) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className={clsx("inline", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          {(by === "word" ? [word] : Array.from(word)).map((ch, ci) => {
            const i = index++;
            return (
              <motion.span
                key={ci}
                className={clsx("inline-block will-change-transform", charClassName)}
                initial={{ y: "110%", rotate: 6, opacity: 0, filter: "blur(6px)" }}
                animate={play ? { y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" } : undefined}
                transition={{ duration: 1.1, ease: silk, delay: delay + i * stagger }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** Fades and lifts children into view as they enter the viewport. */
export function Rise({
  children,
  delay = 0,
  className,
  y = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, ease: silk, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A card that leans toward the pointer, with light sliding across its surface. */
export function Tilt({
  children,
  className,
  max = 12,
  glare = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glareBg = useTransform(
    [gx, gy] as never,
    ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, rgba(255,240,215,0.22), transparent 55%)`,
  );

  return (
    <div className={clsx("[perspective:1200px]", className)} style={style}>
      <motion.div
        ref={ref}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** Pulls gently toward the pointer, like a moth to a lamp. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function PillLink({
  children,
  href,
  variant = "solid",
  external,
  cursor,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  external?: boolean;
  cursor?: string;
}) {
  const cls = clsx(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-500",
    variant === "solid" ? "bg-moon text-ink" : "border border-bone/25 text-bone hover:border-ember/70",
  );
  const inner = (
    <>
      <span
        className={clsx(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0",
          variant === "solid" ? "bg-ember" : "bg-bone/10",
        )}
      />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls} data-cursor={cursor}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls} data-cursor={cursor}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
