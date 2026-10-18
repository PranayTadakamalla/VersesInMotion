import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/curator", "/api/"] },
    sitemap: "https://verses-in-motion.vercel.app/sitemap.xml",
  };
}
