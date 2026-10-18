"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/curator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Couldn't sign in.");
    } catch {
      setError("The night is unreachable. Check your connection.");
    }
    setBusy(false);
  };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(246,238,219,0.5), rgba(142,27,42,0.4) 50%, transparent 70%)" }}
      />
      <form onSubmit={submit} className="relative w-full max-w-sm">
        <div className="mx-auto mb-10 h-14 w-14 rounded-full bg-moon shadow-[0_0_60px_10px_rgba(246,238,219,0.25)]">
          <div className="ml-4 h-14 w-14 rounded-full bg-ink" />
        </div>
        <p className="label mb-3 text-center">Verses in Motion</p>
        <h1 className="display mb-10 text-center text-5xl text-bone">
          The <span className="italic-serif text-ember">Curator</span>
        </h1>

        <label className="mb-5 block">
          <span className="label mb-2 block">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-bone/15 bg-bone/[0.03] px-4 py-3 font-mono text-sm text-bone outline-none transition focus:border-ember/70"
          />
        </label>
        <label className="mb-8 block">
          <span className="label mb-2 block">Password</span>
          <span className="relative block">
            <input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-bone/15 bg-bone/[0.03] px-4 py-3 pr-16 font-mono text-sm text-bone outline-none transition focus:border-ember/70"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="label absolute right-3 top-1/2 -translate-y-1/2 !text-[0.6rem] hover:!text-bone"
            >
              {show ? "hide" : "show"}
            </button>
          </span>
        </label>

        {error && (
          <p role="alert" className="italic-serif mb-5 text-center text-lg text-rose">
            {error}
          </p>
        )}
        <button
          disabled={busy}
          className="w-full rounded-full bg-moon py-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink transition hover:bg-ember disabled:opacity-50"
        >
          {busy ? "Opening…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
