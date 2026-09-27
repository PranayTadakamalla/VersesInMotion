"use client";

import { useEffect, useRef, useState } from "react";

/** Mounts its children only once they come near the viewport — WebGL is expensive. */
export default function InView({
  children,
  className,
  margin = "200px",
}: {
  children: React.ReactNode;
  className?: string;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} className={className}>
      {on && children}
    </div>
  );
}
