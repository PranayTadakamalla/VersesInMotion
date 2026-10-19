import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Where published content lives. In production the Curator commits to the
 * GitHub repository (Vercel redeploys on every commit to the branch). In local
 * development, without a token, it writes to the working copy instead.
 *   GITHUB_TOKEN   fine-grained token with "Contents: read and write" on the repo
 *   GITHUB_REPO    owner/name (default PranayTadakamalla/VersesInMotion)
 *   GITHUB_BRANCH  branch Vercel deploys from (default main)
 */
const REPO = process.env.GITHUB_REPO || "PranayTadakamalla/VersesInMotion";
const BRANCH = process.env.GITHUB_BRANCH || "main";
/** Forgive the usual copy-paste slips: spaces, line breaks, quotes, a "Bearer " prefix. */
function cleanToken(raw: string | undefined) {
  if (!raw) return undefined;
  const t = raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^(bearer|token)\s+/i, "")
    .replace(/\s+/g, "");
  return t || undefined;
}
const TOKEN = cleanToken(process.env.GITHUB_TOKEN);

export const CONTENT_PATH = "content/site.json";

export function storeMode(): "github" | "local" | "none" {
  if (TOKEN) return "github";
  return process.env.NODE_ENV === "production" ? "none" : "local";
}

export class StoreError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message);
  }
}

async function gh(url: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${url}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "verses-in-motion-curator",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    let said = "";
    try {
      said = JSON.parse(body).message ?? "";
    } catch {}
    if (res.status === 409 || (res.status === 422 && /sha/i.test(said)))
      throw new StoreError("Someone (or another tab) published in the meantime. Reload to get the latest, then try again.", 409);
    if (res.status === 401)
      throw new StoreError(
        "GitHub doesn't recognise GITHUB_TOKEN (“Bad credentials”). It may be mistyped, expired or deleted — make a new one, paste it into Vercel, and redeploy.",
        502,
      );
    if (res.status === 403 && /rate limit/i.test(said)) throw new StoreError("GitHub is rate-limiting this token. Wait a few minutes and try again.", 503);
    if (res.status === 403)
      throw new StoreError(
        `GitHub knows the token but won't let it do this (${said || "forbidden"}). Give it access to ${REPO} with “Contents: Read and write”.`,
        502,
      );
    if (res.status === 404)
      throw new StoreError(`GitHub can't find ${REPO} (branch ${BRANCH}) with this token. Check the token has access to that repository.`, 502);
    throw new StoreError(`GitHub said ${res.status}: ${said || body.slice(0, 200)}`, 502);
  }
  return res.json();
}

export async function readFile(file: string): Promise<{ text: string; sha: string | null }> {
  const mode = storeMode();
  if (mode === "none") throw new StoreError("Publishing isn't set up: GITHUB_TOKEN is missing on the server.", 503);
  if (mode === "local") {
    const text = await fs.readFile(path.join(process.cwd(), file), "utf8");
    return { text, sha: null };
  }
  const data = await gh(`contents/${file}?ref=${encodeURIComponent(BRANCH)}`);
  return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

export async function writeFile(file: string, body: Buffer | string, message: string, sha?: string | null) {
  const mode = storeMode();
  if (mode === "none") throw new StoreError("Publishing isn't set up: GITHUB_TOKEN is missing on the server.", 503);
  const buf = typeof body === "string" ? Buffer.from(body, "utf8") : body;
  if (mode === "local") {
    const full = path.join(process.cwd(), file);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, buf);
    return { sha: null, url: null };
  }
  const data = await gh(`contents/${file}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: buf.toString("base64"), branch: BRANCH, ...(sha ? { sha } : {}) }),
  });
  return { sha: data.content?.sha as string, url: data.commit?.html_url as string };
}

export type Diagnosis = {
  mode: ReturnType<typeof storeMode>;
  repo: string;
  branch: string;
  token: { present: boolean; kind: string; length: number };
  checks: { label: string; ok: boolean | null; detail: string }[];
};

/** Asks GitHub, step by step, what it thinks of the token — shown in the Curator when publishing fails. */
export async function diagnose(): Promise<Diagnosis> {
  const kind = !TOKEN
    ? "none"
    : TOKEN.startsWith("github_pat_")
      ? "fine-grained token"
      : TOKEN.startsWith("ghp_")
        ? "classic token"
        : TOKEN.startsWith("gho_") || TOKEN.startsWith("ghu_") || TOKEN.startsWith("ghs_")
          ? "app / OAuth token"
          : "unrecognised format";
  const out: Diagnosis = {
    mode: storeMode(),
    repo: REPO,
    branch: BRANCH,
    token: { present: !!TOKEN, kind, length: TOKEN?.length ?? 0 },
    checks: [],
  };
  if (!TOKEN) {
    out.checks.push({ label: "Token is set", ok: false, detail: "GITHUB_TOKEN isn't set for this deployment. Add it in Vercel and redeploy." });
    return out;
  }
  out.checks.push({
    label: "Token looks like a GitHub token",
    ok: kind !== "unrecognised format",
    detail: kind === "unrecognised format" ? "GitHub tokens start with github_pat_ or ghp_. Something else was pasted." : kind,
  });
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "verses-in-motion-curator",
  };
  const user = await fetch("https://api.github.com/user", { headers, cache: "no-store" }).catch(() => null);
  const expires = user?.headers.get("github-authentication-token-expiration");
  if (!user) {
    out.checks.push({ label: "GitHub answers", ok: false, detail: "Couldn't reach api.github.com from the server." });
    return out;
  }
  const who = user.ok ? ((await user.json().catch(() => ({}))) as { login?: string }).login : undefined;
  out.checks.push({
    label: "GitHub accepts the token",
    ok: user.ok,
    detail: user.ok
      ? `Signed in as ${who ?? "?"}${expires ? ` · expires ${expires}` : ""}`
      : user.status === 401
        ? "Bad credentials — the token is mistyped, expired or was deleted. Make a new one."
        : `GitHub said ${user.status}.`,
  });
  if (!user.ok) return out;

  const repo = await fetch(`https://api.github.com/repos/${REPO}`, { headers, cache: "no-store" }).catch(() => null);
  const data = repo?.ok ? ((await repo.json().catch(() => ({}))) as { permissions?: { push?: boolean } }) : null;
  out.checks.push({
    label: `Token can see ${REPO}`,
    ok: !!repo?.ok,
    detail: repo?.ok ? "yes" : `GitHub said ${repo?.status ?? "nothing"} — check the repository name and the token's repository access.`,
  });
  if (!repo?.ok) return out;

  // fine-grained tokens report push=true only when Contents is read & write
  const push = data?.permissions?.push;
  out.checks.push({
    label: "Your account may write to it",
    ok: push === undefined ? null : push,
    detail:
      push === false
        ? "No — this GitHub account can't push to the repository."
        : "Yes. The token itself also needs Permissions → Contents → Read and write; GitHub only reveals that when you publish.",
  });

  const file = await fetch(`https://api.github.com/repos/${REPO}/contents/${CONTENT_PATH}?ref=${encodeURIComponent(BRANCH)}`, { headers, cache: "no-store" }).catch(() => null);
  out.checks.push({
    label: `Can read ${CONTENT_PATH} on ${BRANCH}`,
    ok: !!file?.ok,
    detail: file?.ok ? "yes" : `GitHub said ${file?.status ?? "nothing"} — is the branch name right?`,
  });
  return out;
}
