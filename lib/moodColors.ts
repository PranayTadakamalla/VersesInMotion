import type { EmotionalMood } from "@/components/PresenceProvider";

export const moodColorMap: Record<EmotionalMood, { bg: string; accent: string; text: string }> = {
  dawn: {
    bg: "from-black via-stone-900 to-amber-950/20",
    accent: "from-amber-600 to-yellow-600",
    text: "text-amber-700",
  },
  dusk: {
    bg: "from-black via-stone-950 to-orange-950/15",
    accent: "from-amber-700 to-orange-700",
    text: "text-amber-600",
  },
  night: {
    bg: "from-black via-stone-950 to-purple-950/10",
    accent: "from-amber-800 to-yellow-800",
    text: "text-amber-700",
  },
  calm: {
    bg: "from-black via-stone-950 to-black",
    accent: "from-amber-700 via-amber-600 to-yellow-700",
    text: "text-amber-700",
  },
  curious: {
    bg: "from-black via-stone-900 to-stone-950",
    accent: "from-amber-600 to-yellow-700",
    text: "text-amber-600",
  },
  intimate: {
    bg: "from-black via-stone-950 to-stone-950",
    accent: "from-amber-700 to-yellow-800",
    text: "text-amber-700",
  },
};

export function getMoodGradient(mood: EmotionalMood) {
  return `bg-gradient-to-b ${moodColorMap[mood].bg}`;
}

export function getMoodAccent(mood: EmotionalMood) {
  return `bg-gradient-to-r ${moodColorMap[mood].accent}`;
}

export function getMoodText(mood: EmotionalMood) {
  return moodColorMap[mood].text;
}
