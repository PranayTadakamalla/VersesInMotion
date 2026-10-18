import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { curatorConfigured, isCurator } from "@/lib/server/auth";
import Login from "@/components/curator/Login";
import Studio from "@/components/curator/Studio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curator",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default async function CuratorPage() {
  // until its secrets are set, the Curator simply doesn't exist
  if (!curatorConfigured()) notFound();
  return (await isCurator()) ? <Studio /> : <Login />;
}
