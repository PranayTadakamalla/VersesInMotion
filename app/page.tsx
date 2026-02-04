"use client";
import Link from "next/link";
import DynamicHero from "@/components/DynamicHero";
import PoemCard from "@/components/PoemCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DynamicHero />

      {/* Featured Poems Section */}
      <section className="relative w-full py-32 px-4 md:px-8 bg-gradient-to-b from-black via-stone-950 to-black overflow-hidden">
        {/* Ambient background animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-0 right-1/3 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 3 }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-900/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
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
                className="relative px-10 py-4 text-lg font-semibold text-stone-100 overflow-hidden group rounded-full"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-800 to-yellow-800 rounded-full"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative flex items-center gap-3">
                  <span>Wander Through Verses</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
