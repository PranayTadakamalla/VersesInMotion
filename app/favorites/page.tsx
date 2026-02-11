"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PoemCardEnhanced from "@/components/PoemCardEnhanced";
import { useFavorites } from "@/components/FavoritesProvider";
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";
import Link from "next/link";

const allPoems = [
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

export default function Favorites() {
  const { favorites } = useFavorites();
  const { mood, setLastVisitedPage } = usePresence();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setLastVisitedPage("/favorites");
  }, [setLastVisitedPage]);

  const favoritePoems = allPoems.filter((poem) => favorites.includes(poem.id));

  return (
    <div className={`min-h-screen ${getMoodGradient(mood)} transition-all duration-3000`}>
      {/* Header */}
      <section className="relative w-full pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700">
              Your Favorites
            </h1>
            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto">
              Poems that speak to your heart, saved for moments when you need them
            </p>
          </motion.div>

          {favoritePoems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-24"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                ♡
              </motion.div>
              <h2 className="text-2xl text-amber-300 mb-4">No favorites yet</h2>
              <p className="text-stone-400 mb-8 max-w-md mx-auto">
                Explore our collection and mark poems that resonate with you.
                They'll appear here, ready to inspire whenever you return.
              </p>
              <Link
                href="/experience"
                className="inline-block px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all"
              >
                Explore Poems
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {favoritePoems.map((poem, idx) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <PoemCardEnhanced
                    id={poem.id}
                    title={poem.title}
                    content={poem.content}
                    author={poem.author}
                    language={poem.language}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          {favoritePoems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-20 text-center"
            >
              <p className="text-amber-700/70 text-sm">
                You have {favoritePoems.length} favorite poem
                {favoritePoems.length !== 1 ? "s" : ""} saved
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
