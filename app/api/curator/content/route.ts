import { NextResponse } from "next/server";
import { isCurator, sameOrigin } from "@/lib/server/auth";
import { CONTENT_PATH, readFile, StoreError, storeMode, writeFile } from "@/lib/server/store";
import { validate } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

function fail(e: unknown) {
  const status = e instanceof StoreError ? e.status : 500;
  const error = e instanceof Error ? e.message : "Something went wrong.";
  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

/** The latest published content, straight from the repository (not the deployed copy). */
export async function GET() {
  if (!(await isCurator())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  try {
    const { text, sha } = await readFile(CONTENT_PATH);
    return NextResponse.json({ content: JSON.parse(text), sha, mode: storeMode() }, { headers: NO_STORE });
  } catch (e) {
    return fail(e);
  }
}

export async function PUT(req: Request) {
  if (!(await isCurator())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  let body: { content?: unknown; sha?: string | null; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const errors = validate(body.content);
  if (errors.length) return NextResponse.json({ error: "Some things need fixing first.", errors }, { status: 422 });

  const message = `Curator: ${String(body.message || "update the site").slice(0, 120)}`;
  try {
    const out = await writeFile(CONTENT_PATH, JSON.stringify(body.content, null, 2) + "\n", message, body.sha);
    return NextResponse.json({ ok: true, sha: out.sha, commit: out.url, mode: storeMode() }, { headers: NO_STORE });
  } catch (e) {
    return fail(e);
  }
}
