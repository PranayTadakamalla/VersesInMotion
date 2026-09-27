import { chapters, poems } from "@/lib/poems";
import { PillLink, Rise } from "../ui";

/** A little armillary of rings — each chapter an orbit, each poem a point of light. */
export default function SkyTeaser() {
  return (
    <section className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <Rise>
          <p className="label mb-6">An index written in stars</p>
          <h2 className="display text-6xl text-bone md:text-8xl">
            Every poem <br />
            <span className="italic-serif text-ember">is a star.</span>
          </h2>
          <p className="italic-serif mt-8 max-w-md text-2xl leading-snug text-bone/70">
            Each one a small light, gathered into constellations of the heart. Turn the night, drift toward a feeling, and touch a
            light to read what it holds.
          </p>
          <div className="mt-10">
            <PillLink href="/sky" cursor="fly">
              Enter the sky
            </PillLink>
          </div>
        </Rise>

        <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1400px]" aria-hidden>
          <div
            className="absolute inset-[38%] rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(246,238,219,0.6), rgba(217,163,91,0.2) 50%, transparent 70%)" }}
          />
          <div className="absolute inset-[45%] rounded-full bg-moon shadow-[0_0_60px_20px_rgba(246,238,219,0.35)]" />
          <div className="absolute inset-0 [transform-style:preserve-3d] [animation:armillary_40s_linear_infinite]">
            {chapters.map((c, i) => {
              const count = poems.filter((p) => p.chapter === c.slug).length;
              const inset = 4 + i * 5.5;
              return (
                <div
                  key={c.slug}
                  className="absolute rounded-full border [transform-style:preserve-3d]"
                  style={{
                    inset: `${inset}%`,
                    borderColor: `${c.palette[0]}33`,
                    transform: `rotateX(${62 + i * 9}deg) rotateY(${i * 28}deg)`,
                  }}
                >
                  <div className="absolute inset-0 [animation:spin_var(--d)_linear_infinite]" style={{ ["--d" as string]: `${18 + i * 7}s` }}>
                    {Array.from({ length: count }).map((_, j) => {
                      const a = (j / count) * Math.PI * 2;
                      return (
                        <span
                          key={j}
                          className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            left: `${50 + Math.cos(a) * 50}%`,
                            top: `${50 + Math.sin(a) * 50}%`,
                            background: c.palette[0],
                            boxShadow: `0 0 10px 2px ${c.palette[0]}`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
