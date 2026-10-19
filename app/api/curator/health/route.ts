import { NextResponse } from "next/server";
import { isCurator } from "@/lib/server/auth";
import { diagnose } from "@/lib/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** What GitHub thinks of the publishing token. Never returns the token itself. */
export async function GET() {
  if (!(await isCurator())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  return NextResponse.json(await diagnose(), { headers: { "Cache-Control": "no-store" } });
}
