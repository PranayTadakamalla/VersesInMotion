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
  const [phase, setPhase] = useState("quote"); // quote -> crescendo -> fade
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("versesLoaded");

    if (!hasSeenLoading) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsVisible(true);

      // Phase 1: Quote displays for 4 seconds
      const phaseTimer = setTimeout(() => {
        setPhase("crescendo");
      }, 4000);

      // Phase 2: Crescendo animations for 4 seconds
      const fadeTimer = setTimeout(() => {
        setPhase("fade");
      }, 8000);

      // Exit after 9 seconds total
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("versesLoaded", "true");
      }, 9000);

      return () => {
        clearTimeout(phaseTimer);
        clearTimeout(fadeTimer);
        clearTimeout(exitTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center"
          style={{ pointerEvents: "auto" }}
        >
          {/* PHASE 1: Quote Display */}
          {phase === "quote" && (
            <>
              {/* Subtle ambient orbs during quote phase */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    opacity: [0, 0.15, 0.1],
                    scale: [0.8, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-amber-900/40 to-transparent blur-3xl"
                />
                <motion.div
                  animate={{
                    opacity: [0, 0.12, 0.08],
                    scale: [0.7, 0.95, 0.85],
                  }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-yellow-900/30 to-transparent blur-3xl"
                />
              </div>

              {/* Quote content */}
              <div className="relative z-20 flex flex-col items-center justify-center max-w-5xl px-8 text-center">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-16 origin-center"
                />

                <motion.blockquote
                  initial={{ opacity: 0, y: 50, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mb-16"
                >
                  <motion.p
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 leading-tight"
                    animate={{
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  >
                    "{quote.text}"
                  </motion.p>
                </motion.blockquote>

                <motion.cite
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-xl md:text-3xl text-amber-600/80 italic not-italic"
                >
                  — {quote.author}
                </motion.cite>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.5] }}
                  transition={{ duration: 3.8, times: [0, 0.15, 1] }}
                  className="mt-20 w-2 h-2 rounded-full bg-amber-700/60"
                />
              </div>
            </>
          )}

          {/* PHASE 2: Crescendo - Massive romantic animations */}
          {phase === "crescendo" && (
            <>
              {/* Massive expanding orbs - layer 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.6], scale: [0, 1.5, 2.5] }}
                transition={{ duration: 4, ease: "easeOut" }}
                className="absolute -top-64 -left-64 w-screen h-screen rounded-full bg-gradient-to-br from-amber-800/50 via-amber-900/30 to-transparent blur-3xl"
              />

              {/* Massive expanding orbs - layer 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.25, 0.4, 0.5], scale: [0, 1.3, 2.2] }}
                transition={{ duration: 4.2, ease: "easeOut", delay: 0.3 }}
                className="absolute -bottom-96 -right-96 w-screen h-screen rounded-full bg-gradient-to-tl from-yellow-800/40 via-amber-900/20 to-transparent blur-3xl"
              />

              {/* Massive expanding orbs - layer 3 - center */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.2, 0.35, 0.45], scale: [0, 1.2, 2] }}
                transition={{ duration: 4.5, ease: "easeOut", delay: 0.6 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen rounded-full bg-gradient-to-r from-amber-800/30 to-yellow-800/20 blur-3xl"
              />

              {/* Massive cascading rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 8], opacity: [0.6, 0] }}
                    transition={{
                      duration: 3.5,
                      ease: "easeOut",
                      delay: i * 0.35,
                    }}
                    className="absolute w-32 h-32 border-2 border-amber-600/50 rounded-full"
                  />
                ))}
              </div>

              {/* Romantic particles burst outward */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.cos((i / 12) * Math.PI * 2) * 600,
                    y: Math.sin((i / 12) * Math.PI * 2) * 600,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeOut",
                    delay: 0.2 + i * 0.1,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600"
                />
              ))}

              {/* Ascending light rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`ray-${i}`}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 0.4, 0], scaleY: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    ease: "easeOut",
                    delay: 0.5 + i * 0.15,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-96 bg-gradient-to-t from-amber-700/50 to-transparent origin-bottom"
                  style={{
                    transform: `translateX(-50%) translateY(-50%) rotate(${(i / 8) * 360}deg)`,
                  }}
                />
              ))}

              {/* Central pulsing heart */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 2, 2.5], opacity: [1, 0.8, 0.5, 0] }}
                transition={{ duration: 4, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"
              />
            </>
          )}

          {/* PHASE 3: Fade to reveal site */}
          {phase === "fade" && (
            <motion.div
              animate={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-black"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
