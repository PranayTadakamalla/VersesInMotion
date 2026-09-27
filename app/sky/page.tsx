import type { Metadata } from "next";
import SkyView from "@/components/SkyView";

export const metadata: Metadata = {
  title: "The Sky",
  description: "Every poem is a star — wander thirty-five poems arranged in six constellations.",
};

export default function SkyPage() {
  return <SkyView />;
}
