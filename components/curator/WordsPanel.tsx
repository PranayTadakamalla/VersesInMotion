"use client";

import { SCRIPTS, type Copy, type Script, type SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Area, Btn, Field, Order, Panel, Select, Text, move } from "./fields";

/** Where each block of words appears, and what each field is called. */
const SECTIONS: { key: keyof Copy; title: string; where: string }[] = [
  { key: "loader", title: "Opening", where: "The moonrise that plays when someone arrives" },
  { key: "hero", title: "Home: the moonlit sea", where: "The first screen of the home page" },
  { key: "prologue", title: "Home: prologue", where: "Words that light up as you scroll. Put *asterisks* around words that should glow." },
  { key: "reel", title: "Home: chapters", where: "Heading above the sliding chapter cards" },
  { key: "slowPoem", title: "Home: slow poem", where: "The lines that surface one by one over the ink" },
  { key: "skyTeaser", title: "Home: the sky", where: "The armillary section inviting people into The Sky" },
  { key: "poet", title: "Home: the poet", where: "Beside the polaroid near the end of the home page" },
  { key: "sky", title: "The Sky page", where: "Over the constellations" },
  { key: "index", title: "The Poems page", where: "Above the list of every poem" },
  { key: "about", title: "About page", where: "Your story. *Asterisks* make a word glow." },
  { key: "unfinished", title: "Unfinished poems", where: "Shown where an unfinished poem stops" },
  { key: "footer", title: "Footer", where: "At the bottom of every page" },
];

const LABELS: Record<string, string> = {
  whispers: "Whispers (one after another)",
  drying: "Line beside the loading bar",
  label: "Small label",
  tagline: "Tagline",
  stanza: "Little stanza (bottom left)",
  hint: "Hint",
  text: "Text",
  signature: "Signature",
  title: "Heading",
  accent: "Heading, glowing part",
  poem: "Which poem",
  lines: "Lines (one per row)",
  line: "Line",
  caption: "Caption under the photo",
  empty: "When a search finds nothing",
  lede: "Opening line",
  storyLabel: "Story label",
  story: "Story (one paragraph per box)",
  interlude: "Interlude lines",
  tonguesLabel: "Languages label",
  tongues: "Languages",
  elsewhereLabel: "Links label",
  photoHint: "Hint on the photo",
  quote: "Quote",
  right: "Line at the very bottom",
  name: "Name",
  sample: "Sample line",
  note: "Note",
  script: "Written in",
};

const label = (k: string) => LABELS[k] ?? k;

type Path = (string | number)[];

function setIn(obj: Record<string, unknown>, path: Path, value: unknown) {
  let o = obj as Record<string | number, unknown>;
  for (let i = 0; i < path.length - 1; i++) o = o[path[i]] as Record<string | number, unknown>;
  o[path[path.length - 1]] = value;
}

export default function WordsPanel({ draft, mutate }: { draft: SiteContent; mutate: Mutate }) {
  const set = (path: Path, value: unknown) => mutate((d) => setIn(d.copy as unknown as Record<string, unknown>, path, value));
  const poems = draft.poems.map((p) => ({ value: p.slug, label: p.title }));

  const renderValue = (path: Path, key: string, value: unknown): React.ReactNode => {
    if (key === "poem" && typeof value === "string") {
      return (
        <Field label={label(key)} key={path.join(".")}>
          <Select value={value} onChange={(v) => set(path, v)} options={poems} />
        </Field>
      );
    }
    if (key === "script" && typeof value === "string") {
      return (
        <Field label={label(key)} key={path.join(".")}>
          <Select<Script> value={value as Script} onChange={(v) => set(path, v)} options={SCRIPTS.map((s) => ({ value: s, label: s }))} />
        </Field>
      );
    }
    if (typeof value === "string") {
      const long = value.length > 70 || ["text", "story", "tagline", "quote", "lede"].includes(key);
      return (
        <Field label={label(key)} key={path.join(".")}>
          {long ? <Area value={value} onChange={(v) => set(path, v)} rows={Math.min(8, Math.ceil(value.length / 80) + 1)} /> : <Text value={value} onChange={(v) => set(path, v)} />}
        </Field>
      );
    }
    if (Array.isArray(value)) {
      const objects = value.length > 0 && typeof value[0] === "object";
      return (
        <div key={path.join(".")} className="md:col-span-2">
          <span className="label mb-1.5 block !text-[0.62rem] !text-bone/55">{label(key)}</span>
          <ul className="space-y-2">
            {value.map((item, i) => (
              <li key={i} className={objects ? "border border-bone/10 p-3" : "flex items-start gap-2"}>
                {objects ? (
                  <>
                    <div className="mb-2 flex justify-end">
                      <Order index={i} length={value.length} move={(a, b) => set(path, move(value, a, b))} remove={() => set(path, value.filter((_, j) => j !== i))} />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {Object.entries(item as Record<string, unknown>).map(([k, v]) => renderValue([...path, i, k], k, v))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      {String(item).length > 70 || key === "story" ? (
                        <Area value={String(item)} onChange={(v) => set([...path, i], v)} rows={Math.min(8, Math.ceil(String(item).length / 80) + 1)} />
                      ) : (
                        <Text value={String(item)} onChange={(v) => set([...path, i], v)} />
                      )}
                    </div>
                    <Order index={i} length={value.length} move={(a, b) => set(path, move(value, a, b))} remove={() => set(path, value.filter((_, j) => j !== i))} />
                  </>
                )}
              </li>
            ))}
          </ul>
          <Btn
            className="mt-2"
            onClick={() =>
              set(path, [...value, objects ? Object.fromEntries(Object.entries(value[0]).map(([k, v]) => [k, k === "script" ? "latin" : typeof v === "string" ? "" : v])) : ""])
            }
          >
            + add
          </Btn>
        </div>
      );
    }
    return null;
  };

  return (
    <Panel title="Words" intro="Every sentence on the site that isn't a poem. Change any of it; Publish when it reads right.">
      <div className="space-y-6">
        {SECTIONS.map(({ key, title, where }) => (
          <details key={key} className="group border border-bone/10 open:bg-bone/[0.02]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="font-display text-2xl text-bone">{title}</span>
                <span className="italic-serif ml-3 text-base text-bone/45">{where}</span>
              </span>
              <span className="text-ember transition group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-4 border-t border-bone/10 p-5 md:grid-cols-2">
              {Object.entries(draft.copy[key] as Record<string, unknown>).map(([k, v]) => renderValue([key, k], k, v))}
            </div>
          </details>
        ))}
      </div>
    </Panel>
  );
}
