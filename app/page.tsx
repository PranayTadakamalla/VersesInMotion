"use client";
import Link from "next/link";
import DynamicHero from "@/components/DynamicHero";
import PoemCard from "@/components/PoemCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";

const featuredPoems = [
  {
    id: 1,
    title: "She Shines",
    content:
      "She shines like the moon, so bright and fair,\nher voice is like a melody, floating in the air,\nher fragrance is like flowers in full bloom,\nevery smile of hers lights up the room.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
  },
  {
    id: 2,
    title: "Thousands See Her",
    content:
      "Thousands see her, yet none perceive,\nThe way her presence makes me believe.\nTo them, she's just a fleeting sight,\nTo me, she's the sun, the stars, the night.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
  },
  {
    id: 3,
    title: "It Began with a Glance",
    content:
      "It began with a glance so rare,\nA spark of charm hung in the air.\nIn whispers soft, the rains did fall,\nAnd love embraced us—heart and all.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
  },
  {
    id: 4,
    title: "Dilkashi Se Hui Shuruaat",
    content:
      "Dilkashi se hui shuruaat, ek nazar mein kho gaye,\nUnss ki baarish mein bheege, har lamha Mohabbat ho gaye.\nMohabbat ne rukh badla, ab Aqeedat ki raah chali.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
  },
  {
    id: 5,
    title: "Zamana Chod Diya",
    content:
      "Zamana chod diya mera saath,\nShaam-e-ghum ne diya mujhe haath.\nQismat yun badal gayi meri,\nJab dekhi maine chehra teri.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
  },
  {
    id: 6,
    title: "Woh Chaandni Thi",
    content:
      "Woh chaandni thi, jo mere zindagi mai roshni laayi,\nAur main ek tha jo unke khwab lekar reh gaya.\nUsne dosti ke armaan lekar dil mein bas gayi.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
  },
];

export default function Home() {
  const { mood, hasVisited, setLastVisitedPage } = usePresence();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setLastVisitedPage("/");
  }, [setLastVisitedPage]);

  return (
    <div className="min-h-screen bg-background">
      <DynamicHero />

      {/* Featured Poems Section */}
      <section
        className={`relative w-full py-32 px-4 md:px-8 ${getMoodGradient(mood)} overflow-hidden transition-all duration-3000`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm text-amber-700/60 mb-4 italic tracking-widest uppercase"
          >
            A selection to breathe into your day
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700">
            Featured Verses
          </h2>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Moments of love, captured in words that refuse to fade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPoems.map((poem, idx) => (
            <PoemCard key={poem.id} {...poem} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20"
        >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/experience"
                className="px-8 py-3 text-base font-semibold text-amber-100 border border-amber-700/50 rounded-lg hover:border-amber-600 hover:text-amber-50 transition-all duration-300 flex items-center gap-2"
              >
                <span>Wander Through Verses</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
