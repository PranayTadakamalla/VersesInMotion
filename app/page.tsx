import Hero from "@/components/home/Hero";
import Prologue from "@/components/home/Prologue";
import ChapterReel from "@/components/home/ChapterReel";
import Marquee from "@/components/Marquee";
import SlowPoem from "@/components/home/SlowPoem";
import SkyTeaser from "@/components/home/SkyTeaser";
import PoetTeaser from "@/components/home/PoetTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Prologue />
      <ChapterReel />
      <Marquee />
      <SlowPoem />
      <SkyTeaser />
      <PoetTeaser />
    </>
  );
}
