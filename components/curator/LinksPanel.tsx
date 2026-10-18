"use client";

import { slugify, type SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Btn, Field, Order, Panel, Text, move } from "./fields";

export default function LinksPanel({ draft, mutate }: { draft: SiteContent; mutate: Mutate }) {
  return (
    <Panel
      title="Links"
      intro="Where readers can find you. They appear on the About page and in the footer; the link with id “instagram” is the big one in the footer."
      actions={
        <Btn
          tone="solid"
          onClick={() =>
            mutate((d) => {
              let id = "link";
              for (let n = 2; d.socials.some((s) => s.id === id); n++) id = `link-${n}`;
              d.socials.push({ id, label: "New link", handle: "", href: "https://" });
            })
          }
        >
          + New link
        </Btn>
      }
    >
      <ul className="space-y-4">
        {draft.socials.map((s, i) => (
          <li key={i} className="grid gap-3 border border-bone/10 p-4 md:grid-cols-[1fr_1fr_2fr_8rem_auto] md:items-end">
            <Field label="Name">
              <Text
                value={s.label}
                onChange={(v) =>
                  mutate((d) => {
                    const old = slugify(d.socials[i].label);
                    d.socials[i].label = v;
                    if (d.socials[i].id === old || d.socials[i].id.startsWith("link")) d.socials[i].id = slugify(v) || d.socials[i].id;
                  })
                }
              />
            </Field>
            <Field label="Shown as">
              <Text value={s.handle} onChange={(v) => mutate((d) => (d.socials[i].handle = v))} />
            </Field>
            <Field label="Address">
              <Text value={s.href} onChange={(v) => mutate((d) => (d.socials[i].href = v.trim()))} mono />
            </Field>
            <Field label="Id">
              <Text value={s.id} onChange={(v) => mutate((d) => (d.socials[i].id = slugify(v)))} mono />
            </Field>
            <Order index={i} length={draft.socials.length} move={(a, b) => mutate((d) => (d.socials = move(d.socials, a, b)))} remove={() => mutate((d) => d.socials.splice(i, 1))} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
