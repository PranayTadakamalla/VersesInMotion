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
  {
    text: "Where there is great love, there are always miracles.",
    author: "Willa Cather",
  },
];

export default function LoadingRitual() {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);
  const [phase, setPhase] = useState("quote"); // Declare the phase variable

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("versesLoaded");

    if (!hasSeenLoading) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsVisible(true);

      // Exit after 5 seconds
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("versesLoaded", "true");
      }, 5000);

      return () => clearTimeout(exitTimer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center"
        >
          {/* Subtle floating orbs background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-amber-900/30 to-transparent blur-3xl"
            />
            <motion.div
              animate={{
                opacity: [0.08, 0.15, 0.08],
                scale: [0.9, 1.1, 0.95],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-yellow-900/20 to-transparent blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-6 text-center">
            {/* Top line decoration */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-12 origin-center"
            />

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <motion.p
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-50 leading-tight"
                animate={{
                  opacity: [0.9, 1, 0.95],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                "{quote.text}"
              </motion.p>
            </motion.blockquote>

            {/* Author */}
            <motion.cite
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-base md:text-lg text-amber-700/70 italic font-light"
            >
              — {quote.author}
            </motion.cite>

            {/* Bottom line decoration */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mt-12 origin-center"
            />

            {/* Breathing indicator dots */}
            <div className="flex gap-2 mt-12">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-amber-600"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
