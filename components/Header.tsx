"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-300 hover:to-rose-300 transition-all duration-300"
        >
          Verses In Motion
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/experience", label: "Experience" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-slate-300 hover:text-pink-300 font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-pink-400 hover:text-pink-300 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <ul className="flex flex-col space-y-3 px-4 md:px-8 py-4">
            {[
              { href: "/", label: "Home" },
              { href: "/experience", label: "Experience" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-300 hover:text-pink-300 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
