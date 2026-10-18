import { NextResponse } from "next/server";
import { checkCredentials, clearAttempts, curatorConfigured, sameOrigin, tooManyAttempts } from "@/lib/server/auth";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, sessionSecret, signSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!curatorConfigured()) return new NextResponse(null, { status: 404 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: "Too many tries. Rest a while, then try again." }, { status: 429 });
  }

  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "").slice(0, 200);
    password = String(body.password ?? "").slice(0, 200);
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const ok = await checkCredentials(email, password);
  // the same pause for right and wrong answers
  await new Promise((r) => setTimeout(r, 450));
  if (!ok) return NextResponse.json({ error: "That isn't the right key." }, { status: 401 });

  clearAttempts(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await signSession(sessionSecret()!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
