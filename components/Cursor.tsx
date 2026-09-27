"use client";

import { useEffect, useRef, useState } from "react";

/** An ember that follows the pointer, with a halo that swells over anything you can touch. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [elementLabel, setLabel] = useState("");
  const [override, setOverride] = useState("");
  const label = override || elementLabel;
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setActive(!!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onLabel = (e: Event) => setOverride((e as CustomEvent<string>).detail);
    window.addEventListener("cursor-label", onLabel);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("cursor-label", onLabel);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 88 : active ? 56 : 28;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[120] opacity-0 ${label ? "" : "mix-blend-difference"}`}
        style={{ transition: "opacity .3s" }}
      >
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-moon/70"
          style={{
            width: size,
            height: size,
            background: label ? "rgba(246,238,219,0.95)" : "transparent",
            transition: "width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), background .4s",
          }}
        >
          {label && <span className="label !tracking-[0.2em] !text-ink">{label}</span>}
        </div>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[121] opacity-0">
        <div
          className="h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
          style={{ boxShadow: "0 0 12px 3px rgba(217,163,91,0.7)", opacity: label ? 0 : 1 }}
        />
      </div>
    </>
  );
}
