import type { Metadata } from "next";
import SkyView from "@/components/SkyView";

export const metadata: Metadata = {
  title: "The Sky",
  description: "Every poem is a star. Wander the night and touch a light to read it.",
};

export default function SkyPage() {
  return <SkyView />;
}
