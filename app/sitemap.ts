import type { MetadataRoute } from "next";
import { chapters, poems } from "@/lib/poems";

const SITE = "https://verses-in-motion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/poems", "/sky", "/about"].map((p) => ({ url: `${SITE}${p}` })),
    ...chapters.map((c) => ({ url: `${SITE}/chapters/${c.slug}` })),
    ...poems.map((p) => ({ url: `${SITE}/poems/${p.slug}` })),
  ];
}
