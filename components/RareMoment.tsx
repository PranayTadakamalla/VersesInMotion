"use client";

import { usePresence } from "./PresenceProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const rareMoments = [
  {
    text: "Some moments are worth returning to.",
    emoji: "✨",
  },
  {
    text: "Patience rewards the gentle heart.",
    emoji: "🌙",
  },
  {
    text: "You are exactly where you need to be.",
    emoji: "💫",
  },
  {
    text: "Every word carries the weight of a heartbeat.",
    emoji: "🕯",
  },
  {
    text: "This moment belongs only to you.",
    emoji: "🌹",
  },
];

export default function RareMoment() {
  const { rareEventTriggered, sessionTime } = usePresence();
  const [showRareMoment, setShowRareMoment] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(0);

  useEffect(() => {
    if (rareEventTriggered && sessionTime === 300) {
      setSelectedMoment(Math.floor(Math.random() * rareMoments.length));
      setShowRareMoment(true);

      const timer = setTimeout(() => {
        setShowRareMoment(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [rareEventTriggered, sessionTime]);

  return (
    <AnimatePresence>
      {showRareMoment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-40 pointer-events-none"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(180, 140, 100, 0.1)",
                "0 0 40px rgba(180, 140, 100, 0.2)",
                "0 0 20px rgba(180, 140, 100, 0.1)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="bg-gradient-to-br from-stone-900/80 to-black/80 backdrop-blur-xl border border-amber-900/30 rounded-2xl p-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center text-stone-300 italic text-sm leading-relaxed"
            >
              {rareMoments[selectedMoment].text}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
