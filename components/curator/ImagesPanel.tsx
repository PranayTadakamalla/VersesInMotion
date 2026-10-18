"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/schema";
import type { Mutate } from "./Studio";
import { Field, Panel, Text } from "./fields";

const SLOTS = [
  { key: "portrait", title: "The photograph", where: "About page and the home page polaroid" },
  { key: "illustrated", title: "The one you imagine", where: "Revealed under the lamplight on the About page" },
] as const;

export default function ImagesPanel({ draft, mutate }: { draft: SiteContent; mutate: Mutate }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [preview, setPreview] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const upload = async (slot: "portrait" | "illustrated", file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) return setError("Please choose a picture.");
    if (file.size > 4 * 1024 * 1024) return setError("That picture is larger than 4 MB. Try a smaller one.");
    setBusy(slot);
    const body = new FormData();
    body.set("slot", slot);
    body.set("file", file);
    const res = await fetch("/api/curator/image", { method: "POST", body }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : { error: "No connection." };
    setBusy(null);
    if (!res?.ok) return setError(data.error ?? "Upload failed.");
    setPreview((p) => ({ ...p, [slot]: URL.createObjectURL(file) }));
    mutate((d) => (d.images[slot].src = data.src));
  };

  return (
    <Panel title="Pictures" intro="Upload a new picture and it's resized and stored for you. Press Publish to put it on the site.">
      {error && <p className="italic-serif mb-6 text-lg text-rose">{error}</p>}
      <div className="grid gap-8 md:grid-cols-2">
        {SLOTS.map(({ key, title, where }) => {
          const img = draft.images[key];
          return (
            <div key={key} className="border border-bone/10 p-5">
              <p className="font-display text-2xl text-bone">{title}</p>
              <p className="label mb-4 mt-1 !text-[0.55rem]">{where}</p>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-bone/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview[key] ?? img.src} alt={img.alt} className="h-full w-full object-cover" />
                {busy === key && <div className="italic-serif absolute inset-0 flex items-center justify-center bg-ink/70 text-xl">developing…</div>}
              </div>
              <label className="mb-4 inline-flex cursor-pointer items-center rounded-full border border-bone/20 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone/80 hover:border-bone/50">
                Choose a new picture
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={!!busy}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void upload(key, f);
                    e.target.value = "";
                  }}
                />
              </label>
              <Field label="Describe it (for screen readers)">
                <Text value={img.alt} onChange={(v) => mutate((d) => (d.images[key].alt = v))} />
              </Field>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
