import Image from "next/image";
import { PillLink, Rise, Tilt } from "../ui";
import { social } from "@/lib/site";
import { copy, site } from "@/lib/content";

export default function PoetTeaser() {
  return (
    <section className="relative px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1fr_1.1fr]">
        <Tilt className="mx-auto w-full max-w-[420px]" max={8}>
          <figure className="relative bg-[#efe6d6] p-3 pb-16 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] [transform:rotate(-2deg)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={site.images.portrait.src}
                alt={site.images.portrait.alt}
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover [filter:sepia(0.25)_contrast(1.05)_saturate(0.85)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a0b16]/40 to-transparent mix-blend-multiply" />
            </div>
            <figcaption className="absolute bottom-4 left-0 right-0 text-center font-serif text-xl italic text-ink/80">
              {copy.poet.caption}
            </figcaption>
          </figure>
        </Tilt>

        <Rise>
          <p className="label mb-6">{copy.poet.label}</p>
          <h2 className="display text-6xl text-bone md:text-8xl">
            Sai Pranay <br />
            <span className="italic-serif text-ember">Tadakamalla</span>
          </h2>
          <p className="italic-serif mt-8 max-w-lg text-2xl leading-snug text-bone/70">
            {copy.poet.text}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href="/about">The poet</PillLink>
            {["instagram", "linkedin"].map((id) => {
              const s = social(id);
              return s ? (
                <PillLink key={id} href={s.href} external variant="ghost" cursor={id === "instagram" ? "say hi" : "connect"}>
                  {id === "instagram" ? s.handle : s.label}
                </PillLink>
              ) : null;
            })}
          </div>
        </Rise>
      </div>
    </section>
  );
}
