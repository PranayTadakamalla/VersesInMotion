import type { Metadata } from "next";
import AboutView from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About",
  description: "Sai Pranay Tadakamalla — the poet behind Verses in Motion. Find Sai Pranay on Instagram at @tedious.one.",
};

export default function AboutPage() {
  return <AboutView />;
}
