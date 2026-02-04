"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PoemCardProps {
  title: string;
  content: string;
  author: string;
  language?: string;
}

export default function PoemCard({
  title,
  content,
  author,
  language,
}: PoemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full cursor-pointer"
    >
      {/* Glassmorphic background with glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-stone-800/40 via-black/40 to-stone-900/40 backdrop-blur-xl rounded-2xl border border-amber-900/20 group-hover:border-amber-700/50 transition-all duration-500"
        animate={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(120, 85, 50, 0.5), rgba(20, 20, 25, 0.6))"
            : "linear-gradient(135deg, rgba(41, 37, 36, 0.3), rgba(20, 20, 25, 0.4))",
        }}
      />

      {/* Decorative glow on hover */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-amber-900/0 via-amber-700/0 to-yellow-900/0 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
      />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        {/* Header */}
        <div>
          <motion.h3
            className="text-2xl md:text-xl font-bold text-amber-700 mb-3 group-hover:text-amber-600 transition-colors"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="w-10 h-1 bg-gradient-to-r from-amber-700 to-yellow-700 mb-6"
            animate={{ width: isHovered ? 50 : 40 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Poem content */}
        <motion.p
          className="text-stone-400 text-sm leading-relaxed line-clamp-6 group-hover:line-clamp-none transition-all duration-500"
          animate={{
            color: isHovered ? "rgb(217, 119, 6)" : "rgb(168, 162, 158)",
          }}
        >
          {content}
        </motion.p>

        {/* Author reveal on hover */}
        <motion.div
          className="mt-6 pt-6 border-t border-amber-900/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-amber-600 font-semibold text-lg">{author}</p>
          {language && <p className="text-stone-500 text-xs mt-1">{language}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}
