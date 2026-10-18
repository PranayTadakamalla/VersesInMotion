import "server-only";
import { cookies } from "next/headers";
import { scrypt, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE, sessionSecret, verifySession } from "@/lib/session";

/**
 * The Curator exists only when its secrets are set in the environment:
 *   CURATOR_EMAIL, CURATOR_PASSWORD_HASH (scrypt:N:r:p:salt:hash), CURATOR_SESSION_SECRET
 * Nothing about the password lives in the repository.
 */
export function curatorConfigured() {
  return Boolean(process.env.CURATOR_EMAIL && process.env.CURATOR_PASSWORD_HASH && sessionSecret());
}

function scryptAsync(pw: string, salt: Buffer, len: number, opts: { N: number; r: number; p: number }) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(pw, salt, len, { ...opts, maxmem: 256 * 1024 * 1024 }, (err, out) => (err ? reject(err) : resolve(out))),
  );
}

export async function checkCredentials(email: string, password: string) {
  const wantEmail = (process.env.CURATOR_EMAIL ?? "").trim().toLowerCase();
  const stored = process.env.CURATOR_PASSWORD_HASH ?? "";
  const [scheme, N, r, p, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64"), expected.length, { N: +N, r: +r, p: +p });
  const a = Buffer.from(email.trim().toLowerCase());
  const b = Buffer.from(wantEmail);
  // compare both, always, in constant time
  const emailOk = a.length === b.length && timingSafeEqual(a, b);
  const passOk = actual.length === expected.length && timingSafeEqual(actual, expected);
  return emailOk && passOk;
}

export async function isCurator() {
  if (!curatorConfigured()) return false;
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value, sessionSecret());
}

/** Mutations must come from this site, not from a page elsewhere. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Gentle brake on guessing: a handful of tries per address per quarter hour. */
const attempts = new Map<string, { n: number; until: number }>();
export function tooManyAttempts(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.until < now) {
    attempts.set(ip, { n: 1, until: now + 15 * 60 * 1000 });
    return false;
  }
  a.n++;
  return a.n > 8;
}
export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
