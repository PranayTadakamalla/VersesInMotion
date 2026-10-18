"use client";

import clsx from "clsx";

export const inputCls =
  "w-full rounded-sm border border-bone/12 bg-bone/[0.03] px-3 py-2.5 text-[0.95rem] text-bone outline-none transition placeholder:text-bone/25 focus:border-ember/70 focus:bg-bone/[0.05]";

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={clsx("block", className)}>
      <span className="label mb-1.5 block !text-[0.62rem] !text-bone/55">{label}</span>
      {children}
      {hint && <span className="mt-1 block font-serif text-sm italic text-bone/40">{hint}</span>}
    </label>
  );
}

export function Text({
  value,
  onChange,
  placeholder,
  className,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  mono?: boolean;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(inputCls, mono && "font-mono text-sm", className)}
    />
  );
}

export function Area({
  value,
  onChange,
  rows = 3,
  className,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(inputCls, "resize-y leading-relaxed", className)}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)} className={clsx(inputCls, "cursor-pointer")}>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-ink">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className="flex items-center gap-3 text-left font-serif text-base text-bone/80"
    >
      <span className={clsx("relative h-5 w-9 rounded-full transition", on ? "bg-ember" : "bg-bone/15")}>
        <span className={clsx("absolute top-0.5 h-4 w-4 rounded-full bg-ink transition-all", on ? "left-[18px]" : "left-0.5")} />
      </span>
      {label}
    </button>
  );
}

export function Btn({
  children,
  onClick,
  tone = "ghost",
  disabled,
  title,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "ghost" | "solid" | "danger" | "quiet";
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] transition disabled:cursor-not-allowed disabled:opacity-35",
        tone === "solid" && "bg-moon text-ink hover:bg-ember",
        tone === "ghost" && "border border-bone/15 text-bone/80 hover:border-bone/40 hover:text-bone",
        tone === "danger" && "border border-rose/40 text-rose hover:bg-rose hover:text-ink",
        tone === "quiet" && "px-2 text-bone/50 hover:text-bone",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Up / down / remove controls for any ordered list. */
export function Order({
  index,
  length,
  move,
  remove,
  removeTitle = "Remove",
  canRemove = true,
}: {
  index: number;
  length: number;
  move: (from: number, to: number) => void;
  remove?: () => void;
  removeTitle?: string;
  canRemove?: boolean;
}) {
  return (
    <span className="flex shrink-0 items-center">
      <Btn tone="quiet" title="Move up" disabled={index === 0} onClick={() => move(index, index - 1)}>
        ↑
      </Btn>
      <Btn tone="quiet" title="Move down" disabled={index === length - 1} onClick={() => move(index, index + 1)}>
        ↓
      </Btn>
      {remove && (
        <Btn tone="quiet" title={removeTitle} disabled={!canRemove} onClick={remove} className="hover:!text-rose">
          ✕
        </Btn>
      )}
    </span>
  );
}

export function Panel({ title, intro, actions, children }: { title: string; intro?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="display text-4xl text-bone md:text-5xl">{title}</h2>
          {intro && <p className="italic-serif mt-2 max-w-2xl text-lg text-bone/55">{intro}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
