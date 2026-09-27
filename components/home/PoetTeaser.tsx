import Image from "next/image";
import { PillLink, Rise, Tilt } from "../ui";
import { SOCIALS } from "@/lib/site";

export default function PoetTeaser() {
  return (
    <section className="relative px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1fr_1.1fr]">
        <Tilt className="mx-auto w-full max-w-[420px]" max={8}>
          <figure className="relative bg-[#efe6d6] p-3 pb-16 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] [transform:rotate(-2deg)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/pranay.webp"
                alt="Sai Pranay Tadakamalla at a desk, chin resting on one hand, looking at a laptop"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover [filter:sepia(0.25)_contrast(1.05)_saturate(0.85)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a0b16]/40 to-transparent mix-blend-multiply" />
            </div>
            <figcaption className="absolute bottom-4 left-0 right-0 text-center font-serif text-xl italic text-ink/80">
              somewhere between two lines
            </figcaption>
          </figure>
        </Tilt>

        <Rise>
          <p className="label mb-6">The one who wrote them</p>
          <h2 className="display text-6xl text-bone md:text-8xl">
            Sai Pranay <br />
            <span className="italic-serif text-ember">Tadakamalla</span>
          </h2>
          <p className="italic-serif mt-8 max-w-lg text-2xl leading-snug text-bone/70">
            A notebook, a sleepless night, and every language the heart could find — all trying to say one thing. Once an old
            hobby, kept here so these verses never quietly disappear.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href="/about">The poet</PillLink>
            <PillLink href={SOCIALS.instagram.href} external variant="ghost" cursor="say hi">
              {SOCIALS.instagram.handle}
            </PillLink>
            <PillLink href={SOCIALS.linkedin.href} external variant="ghost" cursor="connect">
              LinkedIn
            </PillLink>
          </div>
        </Rise>
      </div>
    </section>
  );
}
