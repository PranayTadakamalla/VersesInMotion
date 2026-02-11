"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresence } from "./PresenceProvider";
import { getMoodGradient, getMoodAccent, getMoodText } from "@/lib/moodColors";

const poems = [
  {
    title: "She Shines",
    micro: "A light you didn't know you needed.",
    lines: [
      "She shines like the moon, so bright and fair,",
      "Her voice is like a melody, floating in the air,",
      "Her fragrance is like flowers in full bloom,",
      "Every smile of hers lights up the room.",
    ],
  },
  {
    title: "Thousands See Her",
    micro: "Seen by many. Felt by one.",
    lines: [
      "Thousands see her, yet none perceive,",
      "The way her presence makes me believe.",
      "To them, she's just a fleeting sight,",
      "To me, she's the sun, the stars, the night.",
    ],
  },
  {
    title: "It Began with a Glance",
    micro: "Destiny arrived without announcement.",
    lines: [
      "It began with a glance so rare,",
      "A spark of charm hung in the air.",
      "In whispers soft, the rains did fall,",
      "And love embraced us—heart and all.",
    ],
  },
];

export default function DynamicHero() {
  const { mood } = usePresence();
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Idle state detection
  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 8000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 8000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Line progression with adaptive timing
  useEffect(() => {
    const interval = isIdle ? 6000 : 5000;
    const lineInterval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => {
        if (prevIndex < poems[currentPoemIndex].lines.length - 1) {
          return prevIndex + 1;
        } else {
          setCurrentPoemIndex(
            (prevPoemIndex) => (prevPoemIndex + 1) % poems.length
          );
          return 0;
        }
      });
    }, interval);

    return () => clearInterval(lineInterval);
  }, [currentPoemIndex, isIdle]);

  const currentPoem = poems[currentPoemIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${getMoodGradient(mood)} flex items-center justify-center transition-all duration-3000`}
    >
      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary glow - responsive to idle state */}
        <motion.div
          animate={{
            opacity: isIdle ? [0.15, 0.25, 0.15] : [0.2, 0.4, 0.2],
            scale: isIdle ? [1, 1.1, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: isIdle ? 12 : 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl"
        />

        {/* Secondary glow - slower when idle */}
        <motion.div
          animate={{
            opacity: isIdle ? [0.08, 0.15, 0.08] : [0.1, 0.3, 0.1],
            scale: isIdle ? [1, 1.05, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: isIdle ? 15 : 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-900/15 rounded-full blur-3xl"
        />
      </div>

      {/* Cursor-following ambient light */}
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-amber-900/10 to-yellow-900/5 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
          opacity: isIdle ? 0.1 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
        {/* Micro-poetry subtitle */}
        <motion.p
          key={`micro-${currentPoemIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-amber-700/60 mb-8 italic tracking-widest uppercase"
        >
          {currentPoem.micro}
        </motion.p>

        {/* Main title */}
        <motion.h1
          key={`title-${currentPoemIndex}`}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`text-6xl md:text-7xl font-bold mb-12 text-transparent bg-clip-text ${getMoodAccent(mood)}`}
        >
          {currentPoem.title}
        </motion.h1>

        {/* Line display area */}
        <div className="h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`line-${currentLineIndex}`}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 0.9,
              }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="text-2xl md:text-3xl italic text-stone-300 leading-relaxed font-light px-4"
            >
              {currentPoem.lines[currentLineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress indicator with visual feedback */}
        <motion.div
          className="mt-16 md:mt-20 flex justify-center gap-3"
          animate={{ opacity: isIdle ? 0.4 : 1 }}
          transition={{ duration: 0.6 }}
        >
          {poems.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentPoemIndex(idx);
                setCurrentLineIndex(0);
              }}
              className="h-1.5 rounded-full cursor-pointer transition-all"
              animate={{
                width: idx === currentPoemIndex ? 40 : 32,
                background:
                  idx === currentPoemIndex
                    ? "linear-gradient(90deg, rgb(180, 140, 100), rgb(217, 119, 6))"
                    : "rgb(41, 37, 36)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </motion.div>

        {/* Ambient guidance text - appears on idle */}
        <motion.p
          animate={{
            opacity: isIdle ? 1 : 0,
          }}
          transition={{ duration: 1.5 }}
          className="mt-12 text-stone-600 text-sm italic"
        >
          Breathe. Let each word settle.
        </motion.p>
      </div>
    </div>
  );
}
