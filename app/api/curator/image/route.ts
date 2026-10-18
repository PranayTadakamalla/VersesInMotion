import { NextResponse } from "next/server";
import sharp from "sharp";
import { isCurator, sameOrigin } from "@/lib/server/auth";
import { StoreError, writeFile } from "@/lib/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLOTS = new Set(["portrait", "illustrated"]);
const MAX_BYTES = 4 * 1024 * 1024;

/** Accepts one picture, re-encodes it as a modest WebP, and commits it to public/images. */
export async function POST(req: Request) {
  if (!(await isCurator())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const slot = String(form?.get("slot") ?? "");
  if (!SLOTS.has(slot)) return NextResponse.json({ error: "Unknown picture." }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "No picture was sent." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "That picture is too large (4 MB at most)." }, { status: 413 });

  let webp: Buffer;
  try {
    // decoding through sharp also proves the upload really is an image
    webp = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 64_000_000 })
      .rotate()
      .resize({ width: 1400, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "That file doesn't look like a picture." }, { status: 415 });
  }

  const name = `${slot}-${Date.now().toString(36)}.webp`;
  try {
    await writeFile(`public/images/${name}`, webp, `Curator: new ${slot} picture`);
    return NextResponse.json({ ok: true, src: `/images/${name}` });
  } catch (e) {
    const status = e instanceof StoreError ? e.status : 500;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed." }, { status });
  }
}
