"use client";

import type { SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Btn, Order, Panel, Select, Text, move } from "./fields";

export default function LinesPanel({ draft, mutate }: { draft: SiteContent; mutate: Mutate }) {
  const options = draft.poems.map((p) => ({ value: p.slug, label: p.title }));
  return (
    <Panel
      title="Drifting lines"
      intro="The lines that float through the moonlit sky on the home page and stream past in the marquee. Each one opens its poem."
      actions={
        <Btn tone="solid" onClick={() => mutate((d) => d.fragments.push({ line: "", slug: d.poems[0].slug }))}>
          + New line
        </Btn>
      }
    >
      <ul className="space-y-3">
        {draft.fragments.map((f, i) => (
          <li key={i} className="flex flex-col gap-2 border border-bone/10 p-3 md:flex-row md:items-center">
            <Text value={f.line} onChange={(v) => mutate((d) => (d.fragments[i].line = v))} placeholder="a line that drifts…" className="italic md:flex-[2]" />
            <div className="md:flex-1">
              <Select value={f.slug} onChange={(v) => mutate((d) => (d.fragments[i].slug = v))} options={options} />
            </div>
            <Order
              index={i}
              length={draft.fragments.length}
              move={(a, b) => mutate((d) => (d.fragments = move(d.fragments, a, b)))}
              remove={() => mutate((d) => d.fragments.splice(i, 1))}
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
