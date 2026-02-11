"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";

export default function NotFound() {
  const { mood } = usePresence();

  return (
    <div
      className={`min-h-screen ${getMoodGradient(mood)} flex items-center justify-center transition-all duration-3000`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Poem Not Found
          </h2>
          <p className="text-stone-400 text-lg max-w-md mx-auto mb-8">
            The verse you're looking for has drifted away into the silence. Let's
            return you to familiar words.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-amber-700 to-yellow-700 mx-auto mb-12"
        />

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all"
          >
            Return Home
          </Link>
          <Link
            href="/experience"
            className="px-8 py-3 border border-amber-700/50 text-amber-100 font-semibold rounded-lg hover:border-amber-600 hover:text-amber-50 transition-all"
          >
            Explore Verses
          </Link>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-20 text-6xl opacity-20"
        >
          ✨
        </motion.div>
      </motion.div>
    </div>
  );
}
