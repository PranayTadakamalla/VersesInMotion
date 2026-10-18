"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { SiteContent } from "@/lib/schema";
import { validate } from "@/lib/schema";
import { Btn } from "./fields";
import PoemsPanel from "./PoemsPanel";
import ChaptersPanel from "./ChaptersPanel";
import LinesPanel from "./LinesPanel";
import WordsPanel from "./WordsPanel";
import LinksPanel from "./LinksPanel";
import ImagesPanel from "./ImagesPanel";

export type Mutate = (fn: (draft: SiteContent) => void) => void;

const TABS = [
  { id: "poems", label: "Poems", glyph: "❦" },
  { id: "chapters", label: "Chapters", glyph: "☾" },
  { id: "lines", label: "Drifting lines", glyph: "✦" },
  { id: "words", label: "Words", glyph: "¶" },
  { id: "links", label: "Links", glyph: "↗" },
  { id: "images", label: "Pictures", glyph: "◐" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const DRAFT_KEY = "vim-curator-draft";

/** A short, human summary of what changed — becomes the commit message. */
function summarise(base: SiteContent, draft: SiteContent) {
  const parts: string[] = [];
  const baseBySlug = new Map(base.poems.map((p) => [p.slug, p]));
  const draftSlugs = new Set(draft.poems.map((p) => p.slug));
  const added = draft.poems.filter((p) => !baseBySlug.has(p.slug));
  const removed = base.poems.filter((p) => !draftSlugs.has(p.slug));
  const edited = draft.poems.filter((p) => baseBySlug.has(p.slug) && JSON.stringify(baseBySlug.get(p.slug)) !== JSON.stringify(p));
  if (added.length) parts.push(`add ${added.map((p) => `“${p.title}”`).join(", ")}`);
  if (removed.length) parts.push(`remove ${removed.map((p) => `“${p.title}”`).join(", ")}`);
  if (edited.length) parts.push(`edit ${edited.length === 1 ? `“${edited[0].title}”` : `${edited.length} poems`}`);
  if (!added.length && !removed.length && !edited.length && base.poems.map((p) => p.slug).join() !== draft.poems.map((p) => p.slug).join())
    parts.push("reorder poems");
  if (JSON.stringify(base.chapters) !== JSON.stringify(draft.chapters)) parts.push("chapters");
  if (JSON.stringify(base.fragments) !== JSON.stringify(draft.fragments)) parts.push("drifting lines");
  if (JSON.stringify(base.copy) !== JSON.stringify(draft.copy)) parts.push("words");
  if (JSON.stringify(base.socials) !== JSON.stringify(draft.socials)) parts.push("links");
  if (JSON.stringify(base.images) !== JSON.stringify(draft.images)) parts.push("pictures");
  return parts.join("; ") || "update the site";
}

export default function Studio() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("poems");
  const [base, setBase] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("");
  const [loadError, setLoadError] = useState("");
  const [restorable, setRestorable] = useState<SiteContent | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "err"; text: string; link?: string } | null>(null);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const load = useCallback(async () => {
    setLoadError("");
    const res = await fetch("/api/curator/content", { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setLoadError(data.error ?? "Couldn't load the content.");
    setBase(data.content);
    setDraft(data.content);
    setSha(data.sha);
    setMode(data.mode);
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null");
      if (saved?.content && JSON.stringify(saved.content) !== JSON.stringify(data.content)) setRestorable(saved.content);
    } catch {}
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const dirty = useMemo(() => !!base && !!draft && JSON.stringify(base) !== JSON.stringify(draft), [base, draft]);
  const errors = useMemo(() => (draft ? validate(draft) : []), [draft]);

  // keep an unpublished draft in this browser so a closed tab loses nothing
  const saveTimer = useRef<number>(0);
  useEffect(() => {
    if (!draft || !base) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        if (dirty) localStorage.setItem(DRAFT_KEY, JSON.stringify({ content: draft, at: Date.now() }));
        else localStorage.removeItem(DRAFT_KEY);
      } catch {}
    }, 400);
  }, [draft, base, dirty]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const mutate: Mutate = useCallback((fn) => {
    setDraft((d) => {
      if (!d) return d;
      const next = structuredClone(d);
      fn(next);
      return next;
    });
  }, []);

  const publish = async () => {
    if (!draft || !base || errors.length) {
      setShowErrors(true);
      return;
    }
    setBusy(true);
    setNotice(null);
    setServerErrors([]);
    const message = summarise(base, draft);
    const res = await fetch("/api/curator/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: draft, sha, message }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : { error: "No connection." };
    setBusy(false);
    if (!res || !res.ok) {
      if (res?.status === 401) return router.refresh();
      setServerErrors(data.errors ?? []);
      setNotice({ tone: "err", text: data.error ?? "Publishing failed." });
      return;
    }
    setBase(draft);
    setSha(data.sha ?? null);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    setNotice({
      tone: "ok",
      text:
        data.mode === "github"
          ? "Published. The site will show it in about a minute, once it rebuilds."
          : "Saved to the local copy (development mode).",
      link: data.commit ?? undefined,
    });
  };

  const discard = () => {
    if (!base || !window.confirm("Throw away every change since the last publish?")) return;
    setDraft(base);
    setNotice(null);
  };

  const signOut = async () => {
    if (dirty && !window.confirm("You have unpublished changes. They stay saved in this browser. Sign out anyway?")) return;
    await fetch("/api/curator/logout", { method: "POST" });
    router.refresh();
  };

  if (loadError)
    return (
      <Shell>
        <div className="mx-auto max-w-lg py-32 text-center">
          <p className="display text-4xl text-bone">The ink won’t come.</p>
          <p className="italic-serif mt-4 text-xl text-bone/60">{loadError}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Btn tone="solid" onClick={() => void load()}>
              Try again
            </Btn>
            <Btn onClick={signOut}>Sign out</Btn>
          </div>
        </div>
      </Shell>
    );

  if (!draft || !base)
    return (
      <Shell>
        <p className="italic-serif py-40 text-center text-2xl text-bone/50">opening the notebooks…</p>
      </Shell>
    );

  return (
    <Shell>
      <header className="sticky top-0 z-40 border-b border-bone/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-moon">
              <span className="ml-2.5 block h-8 w-8 rounded-full bg-ink" />
            </span>
            <div>
              <p className="font-display text-xl italic leading-none text-bone">The Curator</p>
              <p className="label mt-1 !text-[0.55rem]">
                {dirty ? <span className="text-ember">unpublished changes</span> : "everything is published"}
                {mode === "local" && " · local mode"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {errors.length > 0 && (
              <Btn tone="danger" onClick={() => setShowErrors((s) => !s)}>
                {errors.length === 1 ? "1 thing to fix" : "things to fix"}
              </Btn>
            )}
            <a href="/" target="_blank" rel="noreferrer" className="label px-3 hover:!text-bone">
              View site ↗
            </a>
            <Btn onClick={discard} disabled={!dirty || busy}>
              Discard
            </Btn>
            <Btn tone="solid" onClick={publish} disabled={!dirty || busy}>
              {busy ? "Publishing…" : "Publish"}
            </Btn>
            <Btn tone="quiet" onClick={signOut}>
              Sign out
            </Btn>
          </div>
        </div>
        {(showErrors && errors.length > 0) || serverErrors.length > 0 ? (
          <div className="border-t border-rose/30 bg-rose/10 px-4 py-3 md:px-8">
            <ul className="mx-auto max-w-[1500px] list-inside list-disc font-serif text-base text-rose">
              {(serverErrors.length ? serverErrors : errors).slice(0, 12).map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {notice && (
          <div className={clsx("border-t px-4 py-3 md:px-8", notice.tone === "ok" ? "border-ember/30 bg-ember/10" : "border-rose/30 bg-rose/10")}>
            <p className={clsx("mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 font-serif text-base", notice.tone === "ok" ? "text-ember" : "text-rose")}>
              {notice.text}
              {notice.link && (
                <a href={notice.link} target="_blank" rel="noreferrer" className="underline">
                  see the change
                </a>
              )}
              <button className="ml-auto opacity-70 hover:opacity-100" onClick={() => setNotice(null)} aria-label="Dismiss">
                ✕
              </button>
            </p>
          </div>
        )}
        {restorable && (
          <div className="border-t border-ember/30 bg-ember/10 px-4 py-3 md:px-8">
            <p className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 font-serif text-base text-ember">
              You left some unpublished changes in this browser last time.
              <Btn
                tone="solid"
                onClick={() => {
                  setDraft(restorable);
                  setRestorable(null);
                }}
              >
                Bring them back
              </Btn>
              <Btn
                onClick={() => {
                  setRestorable(null);
                  try {
                    localStorage.removeItem(DRAFT_KEY);
                  } catch {}
                }}
              >
                Let them go
              </Btn>
            </p>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-4 py-8 md:flex-row md:px-8 md:py-12">
        <nav className="-mx-4 flex shrink-0 gap-1 overflow-x-auto px-4 md:sticky md:top-28 md:mx-0 md:w-52 md:flex-col md:self-start md:px-0" aria-label="Curator sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={clsx(
                "flex shrink-0 items-center gap-3 rounded-sm px-4 py-3 text-left font-serif text-lg transition",
                tab === t.id ? "bg-bone/[0.07] text-bone" : "text-bone/55 hover:bg-bone/[0.03] hover:text-bone",
              )}
            >
              <span className="w-5 text-center text-ember">{t.glyph}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          {tab === "poems" && <PoemsPanel draft={draft} base={base} mutate={mutate} />}
          {tab === "chapters" && <ChaptersPanel draft={draft} mutate={mutate} />}
          {tab === "lines" && <LinesPanel draft={draft} mutate={mutate} />}
          {tab === "words" && <WordsPanel draft={draft} mutate={mutate} />}
          {tab === "links" && <LinksPanel draft={draft} mutate={mutate} />}
          {tab === "images" && <ImagesPanel draft={draft} mutate={mutate} />}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] bg-ink text-bone">{children}</div>;
}
