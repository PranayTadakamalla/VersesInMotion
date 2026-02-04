"use client";

import { useState, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative h-full cursor-pointer"
      whileHover={{ y: -4 }}
    >
      {/* Cursor-following light reflection */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-amber-700/20 to-yellow-700/10 blur-2xl pointer-events-none"
        animate={{
          x: isHovered ? mousePosition.x - 40 : -50,
          y: isHovered ? mousePosition.y - 40 : -50,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      />

      {/* Glassmorphic background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-stone-800/40 via-black/40 to-stone-900/40 backdrop-blur-xl rounded-2xl border border-amber-900/20 transition-all duration-500"
        animate={{
          borderColor: isHovered ? "rgb(180, 140, 100, 0.8)" : "rgb(180, 140, 100, 0.2)",
          background: isHovered
            ? "linear-gradient(135deg, rgba(120, 85, 50, 0.6), rgba(20, 20, 25, 0.7))"
            : "linear-gradient(135deg, rgba(41, 37, 36, 0.3), rgba(20, 20, 25, 0.4))",
        }}
      />

      {/* Ambient glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-amber-900/0 via-amber-700/0 to-yellow-900/0 rounded-2xl blur pointer-events-none"
        animate={{
          opacity: isHovered ? 0.25 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative p-6 md:p-8 h-full flex flex-col justify-between z-10">
        {/* Header with micro-interaction */}
        <div>
          <motion.p
            className="text-xs text-amber-700/60 mb-3 italic font-light tracking-wider"
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            A moment captured
          </motion.p>

          <motion.h3
            className="text-2xl md:text-xl font-bold text-amber-700 mb-3"
            animate={{
              scale: isHovered ? 1.03 : 1,
              color: isHovered ? "rgb(217, 119, 6)" : "rgb(180, 140, 100)",
            }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>

          <motion.div
            className="h-1 bg-gradient-to-r from-amber-700 to-yellow-700 rounded-full"
            animate={{
              width: isHovered ? 60 : 40,
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Poem content with emotional reveal */}
        <motion.div
          animate={{
            maxHeight: isHovered ? "500px" : "150px",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden my-4"
        >
          <motion.p
            className="text-stone-400 text-sm leading-relaxed whitespace-pre-wrap"
            animate={{
              color: isHovered ? "rgb(217, 119, 6)" : "rgb(168, 162, 158)",
            }}
            transition={{ duration: 0.4 }}
          >
            {content}
          </motion.p>
        </motion.div>

        {/* Author and metadata reveal */}
        <motion.div
          className="pt-6 border-t border-amber-900/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.p
            className="text-amber-600 font-semibold text-sm md:text-base"
            animate={{
              letterSpacing: isHovered ? "0.05em" : "0em",
            }}
            transition={{ duration: 0.4 }}
          >
            {author}
          </motion.p>
          {language && (
            <p className="text-stone-500 text-xs mt-1.5 italic">
              {language === "English" ? "In English" : "हिंदी में"}
            </p>
          )}
        </motion.div>

        {/* Subtle accessibility hint */}
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-stone-600 text-xs italic">
            {isHovered ? "Take your time..." : ""}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
