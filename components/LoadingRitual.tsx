"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingRitual() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("versesLoaded");

    if (!hasSeenLoading) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setHasLoaded(true);
        sessionStorage.setItem("versesLoaded", "true");
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setHasLoaded(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 rounded-full bg-amber-900/10 blur-3xl"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Central breathing element */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-700 to-yellow-700"
            />

            {/* Micro-poetry message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{
                duration: 3.5,
                times: [0, 0.3, 0.7, 1],
              }}
              className="text-center text-stone-400 text-sm italic font-light max-w-xs"
            >
              Welcome back. Let's begin where we left off.
            </motion.p>
          </div>

          {/* Expanding rings - optional visual depth */}
          <motion.div
            animate={{
              scale: [0, 3],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
            className="absolute w-8 h-8 border border-amber-700/30 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
