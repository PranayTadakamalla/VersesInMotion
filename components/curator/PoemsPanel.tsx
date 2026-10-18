"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { LANGUAGES, SCRIPTS, slugify, type Language, type Poem, type Script, type SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Area, Btn, Field, Order, Panel, Select, Text, Toggle, inputCls, move } from "./fields";

const SCRIPT_LABEL: Record<Script, string> = { latin: "Latin letters", devanagari: "Devanagari (हिन्दी)", telugu: "Telugu (తెలుగు)" };
const scriptClass = (s: Script) => (s === "devanagari" ? "script-devanagari" : s === "telugu" ? "script-telugu" : "font-serif");

function detectScript(text: string): Script {
  if (/[ఀ-౿]/.test(text)) return "telugu";
  if (/[ऀ-ॿ]/.test(text)) return "devanagari";
  return "latin";
}

function uniqueSlug(base: string, taken: Set<string>) {
  const root = base || "untitled";
  let s = root;
  let n = 2;
  while (taken.has(s)) s = `${root}-${n++}`;
  return s;
}

export default function PoemsPanel({ draft, base, mutate }: { draft: SiteContent; base: SiteContent; mutate: Mutate }) {
  const [selected, setSelected] = useState(0);
  const [q, setQ] = useState("");
  const [chapter, setChapter] = useState("all");
  const poem = draft.poems[selected] as Poem | undefined;
  const published = useMemo(() => new Set(base.poems.map((p) => p.slug)), [base.poems]);

  const visible = draft.poems
    .map((p, i) => ({ p, i }))
    .filter(
      ({ p }) =>
        (chapter === "all" || p.chapter === chapter) &&
        (!q.trim() || `${p.title} ${p.translation ?? ""} ${p.text}`.toLowerCase().includes(q.trim().toLowerCase())),
    );

  const add = () => {
    const taken = new Set(draft.poems.map((p) => p.slug));
    const ch = chapter !== "all" ? chapter : draft.chapters[0].slug;
    mutate((d) => {
      d.poems.unshift({
        slug: uniqueSlug("untitled", taken),
        title: "Untitled",
        language: "English",
        script: "latin",
        chapter: ch,
        text: "",
      });
    });
    setSelected(0);
    setQ("");
  };

  const update = (patch: Partial<Poem>) =>
    mutate((d) => {
      Object.assign(d.poems[selected], patch);
      for (const k of ["translation", "note"] as const) if (d.poems[selected][k] === "") delete d.poems[selected][k];
      if (d.poems[selected].unfinished === false) delete d.poems[selected].unfinished;
    });

  const rename = (next: string) =>
    mutate((d) => {
      const old = d.poems[selected].slug;
      d.poems[selected].slug = next;
      // keep everything that points at this poem pointing at it
      d.fragments.forEach((f) => f.slug === old && (f.slug = next));
      if (d.copy.slowPoem.poem === old) d.copy.slowPoem.poem = next;
    });

  const remove = () => {
    if (!poem) return;
    if (draft.copy.slowPoem.poem === poem.slug) {
      window.alert("This poem is the one that unfolds slowly on the home page. Choose another one under Words › Home: slow poem first.");
      return;
    }
    if (!window.confirm(`Remove “${poem.title}” from the site? (It stays in the history and can be brought back.)`)) return;
    mutate((d) => {
      const [gone] = d.poems.splice(selected, 1);
      d.fragments = d.fragments.filter((f) => f.slug !== gone.slug);
    });
    setSelected((s) => Math.max(0, Math.min(s, draft.poems.length - 2)));
  };

  const suggested = poem ? detectScript(poem.text) : "latin";

  return (
    <Panel
      title="Poems"
      intro="Write, edit, reorder and retire poems. The order here is the order readers walk through them."
      actions={
        <Btn tone="solid" onClick={add}>
          + New poem
        </Btn>
      }
    >
      <div className="grid gap-8 xl:grid-cols-[22rem_1fr]">
        {/* list */}
        <div className="xl:sticky xl:top-28 xl:self-start">
          <div className="mb-3 flex gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search…" className={inputCls} />
            <select value={chapter} onChange={(e) => setChapter(e.target.value)} className={clsx(inputCls, "w-36 cursor-pointer")}>
              <option value="all" className="bg-ink">
                All chapters
              </option>
              {draft.chapters.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-ink">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <ul className="max-h-[70vh] overflow-y-auto border-y border-bone/10">
            {visible.map(({ p, i }) => {
              const c = draft.chapters.find((x) => x.slug === p.chapter);
              return (
                <li key={`${p.slug}-${i}`}>
                  <button
                    onClick={() => setSelected(i)}
                    className={clsx(
                      "flex w-full items-center gap-3 border-b border-bone/5 px-3 py-3 text-left transition",
                      i === selected ? "bg-bone/[0.07]" : "hover:bg-bone/[0.03]",
                    )}
                  >
                    <span className="w-4 text-center" style={{ color: c?.palette[0] }}>
                      {c?.glyph ?? "?"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={clsx("block truncate text-lg text-bone", p.script === "telugu" ? "script-telugu !text-base" : "font-display")}>
                        {p.title || "Untitled"}
                      </span>
                      <span className="label block truncate !text-[0.55rem]">
                        {c?.title ?? "no chapter"} · {p.language}
                        {p.unfinished ? " · unfinished" : ""}
                        {!published.has(p.slug) ? " · new" : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            {visible.length === 0 && <li className="italic-serif px-3 py-8 text-center text-bone/40">Nothing matches.</li>}
          </ul>
        </div>

        {/* editor */}
        {poem ? (
          <div className="grid gap-8 2xl:grid-cols-[1fr_24rem]">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <p className="label">Editing</p>
                <Order index={selected} length={draft.poems.length} move={(f, t) => {
                  mutate((d) => (d.poems = move(d.poems, f, t)));
                  setSelected(t);
                }} remove={remove} removeTitle="Remove poem" />
              </div>
              <Field label="Title">
                <Text value={poem.title} onChange={(v) => update({ title: v })} className={clsx("!text-2xl", scriptClass(poem.script))} />
              </Field>
              <Field
                label="Address"
                hint={
                  published.has(poem.slug)
                    ? "Changing this changes the poem's link; old links to it will stop working."
                    : `The poem will live at /poems/${poem.slug || "…"}`
                }
              >
                <div className="flex gap-2">
                  <Text value={poem.slug} onChange={(v) => rename(v.toLowerCase().replace(/[^a-z0-9-]/g, ""))} mono />
                  <Btn
                    className="shrink-0 whitespace-nowrap"
                    title="Make the address from the title"
                    onClick={() => {
                      const taken = new Set(draft.poems.filter((_, i) => i !== selected).map((p) => p.slug));
                      rename(uniqueSlug(slugify(poem.translation && poem.script !== "latin" ? poem.translation.split("—")[0] : poem.title), taken));
                    }}
                  >
                    ↻ from title
                  </Btn>
                </div>
              </Field>
              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Chapter">
                  <Select value={poem.chapter} onChange={(v) => update({ chapter: v })} options={draft.chapters.map((c) => ({ value: c.slug, label: `${c.numeral} · ${c.title}` }))} />
                </Field>
                <Field label="Language">
                  <Select<Language> value={poem.language} onChange={(v) => update({ language: v })} options={LANGUAGES.map((l) => ({ value: l, label: l }))} />
                </Field>
                <Field label="Written in">
                  <Select<Script> value={poem.script} onChange={(v) => update({ script: v })} options={SCRIPTS.map((s) => ({ value: s, label: SCRIPT_LABEL[s] }))} />
                </Field>
              </div>
              {suggested !== poem.script && poem.text.trim() && (
                <p className="font-serif text-base italic text-ember">
                  These words look like {SCRIPT_LABEL[suggested]}.{" "}
                  <button className="underline" onClick={() => update({ script: suggested })}>
                    Use that
                  </button>
                </p>
              )}
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Translation or subtitle" hint="Shown under the title, e.g. “Moment by moment”.">
                  <Text value={poem.translation ?? ""} onChange={(v) => update({ translation: v })} />
                </Field>
                <Field label="Note" hint="Optional, e.g. “A second telling of …”.">
                  <Text value={poem.note ?? ""} onChange={(v) => update({ note: v })} />
                </Field>
              </div>
              <Toggle on={!!poem.unfinished} onChange={(v) => update({ unfinished: v })} label="Unfinished — end on a blinking cursor" />
              <Field label="The poem" hint="One line per line. Leave an empty line between stanzas.">
                <Area value={poem.text} onChange={(v) => update({ text: v })} rows={18} className={clsx("!text-lg", scriptClass(poem.script))} />
              </Field>
            </div>

            {/* preview */}
            <aside className="2xl:sticky 2xl:top-28 2xl:self-start">
              <p className="label mb-3">How it will read</p>
              <div className="max-h-[75vh] overflow-y-auto border border-bone/10 bg-gradient-to-b from-bone/[0.03] to-transparent p-6">
                <p className="label mb-3 !text-[0.55rem]" style={{ color: draft.chapters.find((c) => c.slug === poem.chapter)?.palette[0] }}>
                  {draft.chapters.find((c) => c.slug === poem.chapter)?.title} · {poem.language}
                </p>
                <p className={clsx("text-3xl text-bone", poem.script === "telugu" ? "script-telugu !text-2xl" : "display")}>{poem.title || "Untitled"}</p>
                {(poem.translation || poem.note) && <p className="italic-serif mt-2 text-lg text-bone/50">{poem.translation ?? poem.note}</p>}
                <div className={clsx("mt-6 text-lg text-bone/85", scriptClass(poem.script))}>
                  {poem.text.split(/\n\s*\n/).map((st, i) => (
                    <div key={i} className="mb-4">
                      {st.split("\n").map((l, j) => (
                        <p key={j}>{l || " "}</p>
                      ))}
                    </div>
                  ))}
                  {poem.unfinished && <span className="caret" />}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <p className="italic-serif py-20 text-center text-xl text-bone/40">Choose a poem, or begin a new one.</p>
        )}
      </div>
    </Panel>
  );
}
