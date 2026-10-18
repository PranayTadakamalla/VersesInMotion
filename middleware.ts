import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionSecret, verifySession } from "@/lib/session";

/**
 * A second lock on the Curator: every API call except signing in needs a valid
 * session, and nothing under /curator is ever cached or indexed.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const open = pathname === "/api/curator/login" || pathname === "/api/curator/logout";

  if (pathname.startsWith("/api/curator") && !open) {
    const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value, sessionSecret());
    if (!ok) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("X-Frame-Options", "DENY");
  return res;
}

export const config = { matcher: ["/curator/:path*", "/curator", "/api/curator/:path*"] };
