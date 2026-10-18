import type { Metadata } from "next";
import PoemIndex from "@/components/PoemIndex";

export const metadata: Metadata = {
  title: "The Poems",
  description: "Every poem by Sai Pranay Tadakamalla — love, longing, heartbreak, the self, hope and tribute.",
};

export default function PoemsPage() {
  return <PoemIndex />;
}
