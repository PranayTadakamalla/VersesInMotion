"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black via-stone-950/95 to-black/80 backdrop-blur-xl border-b border-amber-900/20">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 transition-all duration-500"
          >
            Verses In Motion
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {[
            { href: "/", label: "Home", subtitle: "Begin" },
            { href: "/experience", label: "Wander", subtitle: "Explore" },
            { href: "/about", label: "Story", subtitle: "Discover" },
          ].map((item, idx) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-stone-400 hover:text-amber-700 font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <motion.span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-700 to-yellow-700 group-hover:w-full transition-all duration-300 w-0" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-amber-700 hover:text-amber-600 transition-colors"
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-stone-950/50 backdrop-blur-lg border-t border-amber-900/20"
      >
        <ul className="flex flex-col space-y-3 px-4 md:px-8 py-4">
          {[
            { href: "/", label: "Home" },
            { href: "/experience", label: "Experience" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className="text-stone-400 hover:text-amber-700 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
}
