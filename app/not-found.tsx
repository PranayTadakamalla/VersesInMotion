import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="label mb-8">404 · a page that was never written</p>
      <h1 className="display text-7xl text-bone md:text-9xl">
        Lost, <span className="italic-serif text-ember">like footsteps</span>
      </h1>
      <p className="italic-serif mt-8 max-w-lg text-2xl text-bone/60">
        “The paths we walked now stand so still, the echoes lost against my will.”
      </p>
      <Link href="/" className="label draw-link mt-12 !text-bone">
        Find your way back →
      </Link>
    </section>
  );
}
