import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingRitual from "@/components/LoadingRitual";
import RareMoment from "@/components/RareMoment";
import { PresenceProvider } from "@/components/PresenceProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Verses In Motion - Romantic Poetry",
  description:
    "A modern romantic poetry sanctuary where words dance and emotions bloom. Explore deeply moving poems in English and Hindi.",
  viewport: "width=device-width, initial-scale=1, user-scalable=no",
  themeColor: "#0d0d14",
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-black text-stone-100 min-h-screen flex flex-col overflow-x-hidden">
        <PresenceProvider>
          <LoadingRitual />
          <RareMoment />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PresenceProvider>
      </body>
    </html>
  );
}
