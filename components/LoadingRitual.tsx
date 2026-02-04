"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "Poetry is the language the heart speaks when words fail.",
    author: "Rainer Maria Rilke",
  },
  {
    text: "In every human heart there is a spark of heavenly fire.",
    author: "George Washington",
  },
  {
    text: "Love is the poetry of the senses.",
    author: "Honoré de Balzac",
  },
  {
    text: "The heart has its reasons which reason knows nothing of.",
    author: "Blaise Pascal",
  },
];

export default function LoadingRitual() {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("versesLoaded");

    if (!hasSeenLoading) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("versesLoaded", "true");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 4.5 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center"
          style={{ pointerEvents: "auto" }}
        >
          {/* Massive ambient orbs - larger than life */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary glow - top left */}
            <motion.div
              animate={{
                opacity: [0, 0.25, 0.15],
                scale: [0.5, 1.3, 1],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-amber-900 via-yellow-900 to-transparent blur-3xl"
            />

            {/* Secondary glow - bottom right */}
            <motion.div
              animate={{
                opacity: [0, 0.2, 0.1],
                scale: [0.3, 1.2, 0.8],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-yellow-800 to-transparent blur-3xl"
            />

            {/* Tertiary glow - center */}
            <motion.div
              animate={{
                opacity: [0.05, 0.15, 0.08],
                scale: [0.8, 1.1, 0.9],
              }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-800/30 blur-3xl"
            />
          </div>

          {/* Animated rings expanding from center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 5],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1,
                }}
                className="absolute w-20 h-20 border border-amber-700/40 rounded-full"
              />
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-20 flex flex-col items-center justify-center max-w-4xl px-8 text-center">
            {/* Animated decorative line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-12 origin-center"
            />

            {/* Main quotation - larger than life */}
            <motion.blockquote
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.p
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-600 to-yellow-600 leading-tight"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
              >
                "{quote.text}"
              </motion.p>
            </motion.blockquote>

            {/* Author attribution */}
            <motion.cite
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-2xl text-amber-700/70 italic not-italic mb-16"
            >
              — {quote.author}
            </motion.cite>

            {/* Breathing center dot */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600"
            />

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{
                duration: 5,
                times: [0, 0.2, 0.8, 1],
              }}
              className="mt-12 text-stone-500 text-sm tracking-widest uppercase"
            >
              Beginning your journey...
            </motion.p>
          </div>

          {/* Corner decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: 5.5, times: [0, 0.2, 0.8, 1] }}
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-amber-700/40"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: 5.5, times: [0, 0.2, 0.8, 1], delay: 0.2 }}
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-amber-700/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
