import type { Metadata, Viewport } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Tiro_Devanagari_Hindi,
  Tiro_Telugu,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-plex-mono",
  display: "swap",
});
const tiroDeva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro-deva",
  display: "swap",
});
const tiroTelugu = Tiro_Telugu({
  subsets: ["telugu", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro-telugu",
  display: "swap",
});

const SITE = "https://verses-in-motion.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Verses in Motion — Poems by Sai Pranay Tadakamalla",
    template: "%s · Verses in Motion",
  },
  description:
    "Thirty-five poems of love, longing, heartbreak, the self, hope and memory — in English, Hindi–Urdu and Telugu. By Sai Pranay Tadakamalla.",
  keywords: ["poetry", "poems", "shayari", "Hindi poetry", "Urdu poetry", "Telugu poetry", "Sai Pranay Tadakamalla", "tedious.one"],
  authors: [{ name: "Sai Pranay Tadakamalla", url: "https://www.instagram.com/tedious.one" }],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Verses in Motion",
    title: "Verses in Motion",
    description: "Poems of love, longing and the quiet ache between — by Sai Pranay Tadakamalla.",
  },
  twitter: { card: "summary_large_image", title: "Verses in Motion" },
};

export const viewport: Viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${cormorant.variable} ${plexMono.variable} ${tiroDeva.variable} ${tiroTelugu.variable}`}
    >
      <body>
        <Providers>
          <Loader />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
