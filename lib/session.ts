/**
 * Signed, expiring Curator sessions. Uses Web Crypto only, so the same code
 * verifies cookies in middleware (edge) and in route handlers (node).
 */
export const SESSION_COOKIE = "vim_curator";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function key(secret: string) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export function sessionSecret() {
  const s = process.env.CURATOR_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

export async function signSession(secret: string) {
  const payload = b64url(enc.encode(JSON.stringify({ sub: "curator", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

export async function verifySession(token: string | undefined, secret: string | null) {
  if (!token || !secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(secret), fromB64url(sig), enc.encode(payload));
    if (!ok) return false;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    return data.sub === "curator" && typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}
