"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    author: "J.K. Rowling",
  },
  {
    text: "Poetry is the art of creating imaginary gardens with real toads in them.",
    author: "Marianne Moore",
  },
  {
    text: "A word is dead when it is said, some say. I say it just begins to live that day.",
    author: "Emily Dickinson",
  },
  {
    text: "Poetry is the breath and finer spirit of all knowledge.",
    author: "William Wordsworth",
  },
  {
    text: "A poem is never finished, only abandoned.",
    author: "Paul Valéry",
  },
  {
    text: "Words like loaded pistols fall from her lips.",
    author: "W.H. Auden",
  },
  {
    text: "Poetry is when an emotion has found its thought and the thought has found words.",
    author: "Robert Frost",
  },
];

export default function LoadingRitual() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("versesLoaded");

    if (!hasSeenLoading) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsVisible(true);

      // Start exit animation after 5.5 seconds
      const exitAnimTimer = setTimeout(() => {
        setIsExiting(true);
      }, 5500);

      // Fully hide after animation completes
      const fullExitTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("versesLoaded", "true");
      }, 6800);

      return () => {
        clearTimeout(exitAnimTimer);
        clearTimeout(fullExitTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: isExiting ? 0 : 0 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-black via-stone-950 to-black overflow-hidden flex items-center justify-center pointer-events-auto"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              background: isExiting
                ? "radial-gradient(ellipse at 50% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 50%)"
                : [
                    "radial-gradient(ellipse at 20% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 50%)",
                    "radial-gradient(ellipse at 80% 50%, rgba(217, 119, 6, 0.2) 0%, transparent 50%)",
                    "radial-gradient(ellipse at 50% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 50%)",
                  ],
            }}
            transition={{
              duration: isExiting ? 1.3 : 5.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          />

          {/* Large flowing orbs */}
          <motion.div
            animate={{
              opacity: isExiting ? 0 : [0.08, 0.18, 0.08],
              scale: isExiting ? 1 : [0.95, 1.25, 0.95],
              x: isExiting ? 0 : [0, 50, 0],
            }}
            transition={{
              duration: isExiting ? 1.3 : 5.5,
              ease: "easeInOut",
            }}
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-amber-700/40 to-transparent blur-3xl"
          />

          <motion.div
            animate={{
              opacity: isExiting ? 0 : [0.06, 0.15, 0.06],
              scale: isExiting ? 1 : [0.9, 1.15, 0.9],
              x: isExiting ? 0 : [0, -50, 0],
            }}
            transition={{
              duration: isExiting ? 1.3 : 6,
              ease: "easeInOut",
              delay: isExiting ? 0 : 0.5,
            }}
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-yellow-800/30 to-transparent blur-3xl"
          />

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-8 text-center">
            {/* Top decorative element */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isExiting ? 0 : 80,
                opacity: isExiting ? 0 : 1,
              }}
              transition={{ duration: isExiting ? 0.8 : 1, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-16"
            />

            {/* Opening sparkle dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isExiting ? 0 : [0, 1, 1, 0],
              }}
              transition={{
                duration: isExiting ? 0.5 : 0.8,
                times: [0, 0.2, 0.8, 1],
              }}
              className="flex gap-3 mb-12"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-amber-600/60"
                />
              ))}
            </motion.div>

            {/* Quote text with character-by-character reveal effect */}
            <motion.blockquote
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? 20 : 0,
              }}
              transition={{ duration: isExiting ? 0.8 : 1.2, delay: isExiting ? 0 : 0.3, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.p
                className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-200 leading-snug tracking-tight"
                animate={{
                  opacity: [0.85, 1, 0.9],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-amber-600/70"
                >
                  "
                </motion.span>
                {quote.text}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  className="text-amber-600/70"
                >
                  "
                </motion.span>
              </motion.p>
            </motion.blockquote>

            {/* Author with subtle animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? 5 : 0,
              }}
              transition={{ duration: isExiting ? 0.6 : 0.8, delay: isExiting ? 0 : 1 }}
              className="flex items-center gap-4 justify-center mb-16"
            >
              <motion.div
                animate={{
                  width: isExiting ? 0 : [0, 24, 24, 0],
                  opacity: isExiting ? 0 : 1,
                }}
                transition={{
                  duration: isExiting ? 0.6 : 4,
                  times: [0, 0.3, 0.7, 1],
                  delay: isExiting ? 0 : 1.2,
                }}
                className="h-px bg-gradient-to-r from-amber-700 to-transparent"
              />
              <cite className="text-sm md:text-base text-amber-700/80 italic font-light">
                — {quote.author}
              </cite>
              <motion.div
                animate={{
                  width: isExiting ? 0 : [0, 24, 24, 0],
                  opacity: isExiting ? 0 : 1,
                }}
                transition={{
                  duration: isExiting ? 0.6 : 4,
                  times: [0, 0.3, 0.7, 1],
                  delay: isExiting ? 0 : 1.2,
                }}
                className="h-px bg-gradient-to-l from-amber-700 to-transparent"
              />
            </motion.div>

            {/* Bottom decorative element */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isExiting ? 0 : 80,
                opacity: isExiting ? 0 : 1,
              }}
              transition={{ duration: isExiting ? 0.8 : 1, delay: isExiting ? 0 : 0.8, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-12"
            />

            {/* Elegant loading indicator */}
            <motion.div
              animate={{
                opacity: isExiting ? 0 : 1,
              }}
              transition={{
                duration: isExiting ? 0.6 : 1,
              }}
              className="flex gap-1.5"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isExiting ? "0.375rem" : ["0.375rem", "1rem", "0.375rem"],
                    opacity: isExiting ? 0.3 : [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: isExiting ? 0.6 : 1.2,
                    delay: isExiting ? 0 : i * 0.15,
                    repeat: isExiting ? 0 : Infinity,
                    repeatType: isExiting ? undefined : "loop",
                  }}
                  className="w-0.5 bg-gradient-to-t from-amber-700 to-amber-600 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
