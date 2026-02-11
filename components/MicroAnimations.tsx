'use client';

import { motion } from "framer-motion";

// Micro-poetry labels for different emotional contexts
export const micropoetry = {
  discover: "Pause here to discover what awaits within...",
  expand: "A collection breathing with",
  idle: "Breathe. Let each word settle.",
  error: "The words seem shy today. Refresh to try again.",
  empty: "A silence waiting to be filled.",
  success: "There it is. Right where it needed to be.",
  loading: "The verses are preparing themselves...",
};

// Reusable container animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Entrance animations that feel like invitations
export const entranceVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Exit animations that feel like gentle goodbyes
export const exitVariants = {
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

// Hover interactions that communicate curiosity
export const hoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Tap interactions that communicate commitment
export const tapVariants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Success state animations
export const successVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.6,
    },
  },
};

// Error state animations - soft and non-shocking
export const errorVariants = {
  initial: { x: 0 },
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Loading animation that feels calming
export const loadingVariants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Ambient particle animation
export const ambientVariants = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.2, 0.5, 0.2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Component for emotional micro-interactions
interface EmotionalDividerProps {
  micropoetry?: string;
  className?: string;
}

export function EmotionalDivider({
  micropoetry: text,
  className = "",
}: EmotionalDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8 }}
      className={`border-t border-amber-900/20 pt-8 origin-left ${className}`}
    >
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-stone-600 italic text-center"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

// Component for ambient background effects
interface AmbientGlowProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  intensity?: "low" | "medium" | "high";
  color?: "amber" | "yellow" | "orange";
  duration?: number;
}

export function AmbientGlow({
  position = "center",
  intensity = "medium",
  color = "amber",
  duration = 8,
}: AmbientGlowProps) {
  const positionClasses = {
    "top-left": "top-1/4 left-1/4",
    "top-right": "top-1/4 right-1/4",
    "bottom-left": "bottom-1/4 left-1/4",
    "bottom-right": "bottom-1/4 right-1/4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const intensityOpacity = {
    low: { min: 0.05, max: 0.15 },
    medium: { min: 0.1, max: 0.3 },
    high: { min: 0.15, max: 0.4 },
  };

  const colorClasses = {
    amber: "bg-amber-900",
    yellow: "bg-yellow-900",
    orange: "bg-orange-900",
  };

  const opacityRange = intensityOpacity[intensity];

  return (
    <motion.div
      animate={{
        opacity: [opacityRange.min, opacityRange.max, opacityRange.min],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute w-96 h-96 ${colorClasses[color]}/20 rounded-full blur-3xl pointer-events-none ${positionClasses[position]}`}
    />
  );
}

// Component for interactive progress indicators
interface EmotionalProgressProps {
  current: number;
  total: number;
  onSelect?: (index: number) => void;
}

export function EmotionalProgress({
  current,
  total,
  onSelect,
}: EmotionalProgressProps) {
  return (
    <motion.div
      className="flex justify-center gap-3"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <motion.button
          key={idx}
          onClick={() => onSelect?.(idx)}
          className="h-1.5 rounded-full cursor-pointer transition-all"
          animate={{
            width: idx === current ? 40 : 32,
            background:
              idx === current
                ? "linear-gradient(90deg, rgb(180, 140, 100), rgb(217, 119, 6))"
                : "rgb(41, 37, 36)",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </motion.div>
  );
}
