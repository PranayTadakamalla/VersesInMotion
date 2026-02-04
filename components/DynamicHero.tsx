"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const poems = [
  {
    title: "She Shines",
    lines: [
      "She shines like the moon, so bright and fair,",
      "Her voice is like a melody, floating in the air,",
      "Her fragrance is like flowers in full bloom,",
      "Every smile of hers lights up the room.",
    ],
  },
  {
    title: "Thousands See Her",
    lines: [
      "Thousands see her, yet none perceive,",
      "The way her presence makes me believe.",
      "To them, she's just a fleeting sight,",
      "To me, she's the sun, the stars, the night.",
    ],
  },
  {
    title: "It Began with a Glance",
    lines: [
      "It began with a glance so rare,",
      "A spark of charm hung in the air.",
      "In whispers soft, the rains did fall,",
      "And love embraced us—heart and all.",
    ],
  },
];

export default function DynamicHero() {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => {
        if (prevIndex < poems[currentPoemIndex].lines.length - 1) {
          return prevIndex + 1;
        } else {
          setCurrentPoemIndex((prevPoemIndex) => (prevPoemIndex + 1) % poems.length);
          return 0;
        }
      });
    }, 5000);

    return () => clearInterval(lineInterval);
  }, [currentPoemIndex]);

  const currentPoem = poems[currentPoemIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-stone-950 to-black flex items-center justify-center">
      {/* Ambient background particles/glow */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-900/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
        <motion.h1
          key={`title-${currentPoemIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800"
        >
          {currentPoem.title}
        </motion.h1>

        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`line-${currentLineIndex}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-2xl md:text-3xl italic text-stone-300 leading-relaxed font-light"
            >
              {currentPoem.lines[currentLineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="mt-16 flex justify-center gap-2">
          {poems.map((_, idx) => (
            <motion.div
              key={idx}
              className="h-1.5 w-8 rounded-full bg-stone-800"
              animate={{
                background:
                  idx === currentPoemIndex
                    ? "linear-gradient(90deg, rgb(180, 140, 100), rgb(217, 119, 6))"
                    : "rgb(41, 37, 36)",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
