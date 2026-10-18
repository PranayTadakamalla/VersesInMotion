"use client";

import { slugify, type SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Area, Btn, Field, Order, Panel, Text, move } from "./fields";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function ChaptersPanel({ draft, mutate }: { draft: SiteContent; mutate: Mutate }) {
  const add = () =>
    mutate((d) => {
      const taken = new Set(d.chapters.map((c) => c.slug));
      let slug = "new-chapter";
      for (let n = 2; taken.has(slug); n++) slug = `new-chapter-${n}`;
      d.chapters.push({
        slug,
        numeral: ROMAN[d.chapters.length] ?? String(d.chapters.length + 1),
        title: "New chapter",
        epigraph: "",
        palette: ["#e6d3b3", "#8f7a5a", "#14100a"],
        glyph: "✧",
      });
    });

  return (
    <Panel
      title="Chapters"
      intro="Each chapter is a mood: its words, its symbol and the three colours its skies are painted in."
      actions={
        <Btn tone="solid" onClick={add}>
          + New chapter
        </Btn>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {draft.chapters.map((c, i) => {
          const count = draft.poems.filter((p) => p.chapter === c.slug).length;
          const set = (patch: Partial<typeof c>) => mutate((d) => Object.assign(d.chapters[i], patch));
          return (
            <div
              key={i}
              className="relative overflow-hidden border border-bone/10 p-6"
              style={{ background: `linear-gradient(160deg, ${c.palette[2]}, #07060a 80%)` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-2xl" style={{ color: c.palette[0] }}>
                  {c.glyph}
                </span>
                <Order
                  index={i}
                  length={draft.chapters.length}
                  move={(f, t) => mutate((d) => (d.chapters = move(d.chapters, f, t)))}
                  remove={() => window.confirm(`Remove the chapter “${c.title}”?`) && mutate((d) => d.chapters.splice(i, 1))}
                  canRemove={count === 0 && draft.chapters.length > 1}
                  removeTitle={count ? "Move its poems elsewhere first" : "Remove chapter"}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_5rem_5rem]">
                <Field label="Title">
                  <Text value={c.title} onChange={(v) => set({ title: v })} className="font-display !text-xl" />
                </Field>
                <Field label="Numeral">
                  <Text value={c.numeral} onChange={(v) => set({ numeral: v })} mono />
                </Field>
                <Field label="Symbol">
                  <Text value={c.glyph} onChange={(v) => set({ glyph: v })} className="text-center" />
                </Field>
              </div>
              <Field label="Epigraph" className="mt-4">
                <Area value={c.epigraph} onChange={(v) => set({ epigraph: v })} rows={2} className="italic" />
              </Field>
              <Field label="Address" className="mt-4" hint={`/chapters/${c.slug}`}>
                <Text
                  value={c.slug}
                  mono
                  onChange={(v) => {
                    const next = slugify(v) || v.toLowerCase();
                    mutate((d) => {
                      const old = d.chapters[i].slug;
                      d.chapters[i].slug = next;
                      d.poems.forEach((p) => p.chapter === old && (p.chapter = next));
                    });
                  }}
                />
              </Field>
              <div className="mt-4">
                <span className="label mb-1.5 block !text-[0.62rem] !text-bone/55">Colours — light, middle, deep</span>
                <div className="flex gap-3">
                  {c.palette.map((hex, k) => (
                    <label key={k} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={hex}
                        onChange={(e) =>
                          mutate((d) => {
                            d.chapters[i].palette[k] = e.target.value;
                          })
                        }
                        className="h-9 w-9 cursor-pointer rounded-full border border-bone/20 bg-transparent"
                        aria-label={["Light colour", "Middle colour", "Deep colour"][k]}
                      />
                      <span className="font-mono text-xs text-bone/50">{hex}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="label mt-5 !text-[0.55rem]">{count ? `${count} ${count === 1 ? "poem" : "poems"} live here` : "no poems yet"}</p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
