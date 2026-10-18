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
const TOKEN = process.env.GITHUB_TOKEN;

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
    if (res.status === 409 || res.status === 422)
      throw new StoreError("Someone (or another tab) published in the meantime. Reload to get the latest, then try again.", 409);
    if (res.status === 401 || res.status === 403)
      throw new StoreError("GitHub refused the token. Check GITHUB_TOKEN has read & write access to the repository's contents.", 502);
    throw new StoreError(`GitHub said ${res.status}: ${body.slice(0, 200)}`, 502);
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
