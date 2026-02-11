"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useFavorites } from "@/components/FavoritesProvider";
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";

const allPoems = [
  {
    id: 1,
    title: "She Shines",
    content:
      "She shines like the moon, so bright and fair,\nher voice is like a melody, floating in the air,\nher fragrance is like flowers in full bloom,\nevery smile of hers lights up the room.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
    category: "Love & Admiration",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Thousands See Her",
    content:
      "Thousands see her, yet none perceive,\nThe way her presence makes me believe.\nTo them, she's just a fleeting sight,\nTo me, she's the sun, the stars, the night.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
    category: "Love & Admiration",
    date: "2024-01-16",
  },
  {
    id: 3,
    title: "It Began with a Glance",
    content:
      "It began with a glance so rare,\nA spark of charm hung in the air.\nIn whispers soft, the rains did fall,\nAnd love embraced us—heart and all.",
    author: "Sai Pranay Tadakamalla",
    language: "English",
    category: "Longing & Separation",
    date: "2024-01-17",
  },
  {
    id: 4,
    title: "Dilkashi Se Hui Shuruaat",
    content:
      "Dilkashi se hui shuruaat, ek nazar mein kho gaye,\nUnss ki baarish mein bheege, har lamha Mohabbat ho gaye.\nMohabbat ne rukh badla, ab Aqeedat ki raah chali.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
    category: "Devotion & Dreams",
    date: "2024-01-18",
  },
  {
    id: 5,
    title: "Zamana Chod Diya",
    content:
      "Zamana chod diya mera saath,\nShaam-e-ghum ne diya mujhe haath.\nQismat yun badal gayi meri,\nJab dekhi maine chehra teri.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
    category: "Devotion & Dreams",
    date: "2024-01-19",
  },
  {
    id: 6,
    title: "Woh Chaandni Thi",
    content:
      "Woh chaandni thi, jo mere zindagi mai roshni laayi,\nAur main ek tha jo unke khwab lekar reh gaya.\nUsne dosti ke armaan lekar dil mein bas gayi.",
    author: "Sai Pranay Tadakamalla",
    language: "Hindi",
    category: "Devotion & Dreams",
    date: "2024-01-20",
  },
];

export default function PoemReader() {
  const params = useParams();
  const poemId = parseInt(params.id as string);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { mood } = usePresence();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const poem = allPoems.find((p) => p.id === poemId);
  const relatedPoems = allPoems.filter(
    (p) => p.category === poem?.category && p.id !== poemId
  );
  const currentIndex = allPoems.findIndex((p) => p.id === poemId);
  const prevPoem = currentIndex > 0 ? allPoems[currentIndex - 1] : null;
  const nextPoem = currentIndex < allPoems.length - 1 ? allPoems[currentIndex + 1] : null;

  if (!poem) {
    return (
      <div className={`min-h-screen ${getMoodGradient(mood)} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-amber-300 mb-4">
            Poem Not Found
          </h1>
          <Link href="/experience" className="text-amber-600 hover:text-amber-500">
            ← Return to Experience
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getMoodGradient(mood)} transition-all duration-3000`}>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-32 left-8 z-20"
      >
        <Link
          href="/experience"
          className="flex items-center gap-2 text-amber-600 hover:text-amber-500 transition-colors"
        >
          ← Back
        </Link>
      </motion.div>

      {/* Main Content */}
      <section className="relative w-full min-h-screen py-32 px-4 md:px-8 flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* Poem Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-amber-700 to-yellow-700 mx-auto mb-12"
            />

            <h1 className="text-6xl md:text-7xl font-bold text-amber-50 mb-8 leading-tight">
              {poem.title}
            </h1>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-2xl md:text-3xl text-stone-300 leading-relaxed whitespace-pre-wrap font-light italic">
                {poem.content}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-12 mb-16"
            >
              <div className="text-left">
                <p className="text-amber-700/70 text-sm mb-1">Author</p>
                <p className="text-amber-100 font-semibold">{poem.author}</p>
              </div>
              <div className="w-px h-8 bg-amber-900/30" />
              <div className="text-left">
                <p className="text-amber-700/70 text-sm mb-1">Language</p>
                <p className="text-amber-100 font-semibold">
                  {poem.language === "English" ? "In English" : "हिंदी में"}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <button
                onClick={() => toggleFavorite(poem.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                  isFavorite(poem.id)
                    ? "bg-amber-900/40 border-amber-600 text-amber-300"
                    : "bg-black/40 border-amber-900/30 text-stone-400 hover:border-amber-600"
                }`}
              >
                <span className="text-xl">
                  {isFavorite(poem.id) ? "♥" : "♡"}
                </span>
                {isFavorite(poem.id) ? "Favorited" : "Add to Favorites"}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(poem.content);
                }}
                className="px-6 py-3 rounded-full border border-amber-900/30 text-stone-400 hover:border-amber-600 transition-all duration-300"
              >
                📋 Copy
              </button>

              <button
                onClick={() => {
                  const text = `"${poem.content}"\n\n— ${poem.author}`;
                  if (navigator.share) {
                    navigator.share({ text });
                  }
                }}
                className="px-6 py-3 rounded-full border border-amber-900/30 text-stone-400 hover:border-amber-600 transition-all duration-300"
              >
                🔗 Share
              </button>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-amber-700 to-yellow-700 mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="relative w-full py-16 px-4 md:px-8 border-t border-amber-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prevPoem ? (
              <Link href={`/poem/${prevPoem.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg border border-amber-900/30 hover:border-amber-600 transition-colors cursor-pointer"
                >
                  <p className="text-amber-700/70 text-sm mb-2">← Previous</p>
                  <p className="text-amber-100 font-semibold">{prevPoem.title}</p>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}

            <Link href="/experience">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg border border-amber-900/30 hover:border-amber-600 transition-colors cursor-pointer text-center"
              >
                <p className="text-amber-100 font-semibold">All Poems</p>
              </motion.div>
            </Link>

            {nextPoem ? (
              <Link href={`/poem/${nextPoem.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg border border-amber-900/30 hover:border-amber-600 transition-colors cursor-pointer text-right"
                >
                  <p className="text-amber-700/70 text-sm mb-2">Next →</p>
                  <p className="text-amber-100 font-semibold">{nextPoem.title}</p>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Related Poems */}
      {relatedPoems.length > 0 && (
        <section className="relative w-full py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-amber-100 mb-12"
            >
              From the same collection
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPoems.map((relatedPoem, idx) => (
                <Link key={relatedPoem.id} href={`/poem/${relatedPoem.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-6 rounded-lg border border-amber-900/30 hover:border-amber-600 hover:bg-amber-900/10 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-amber-300 mb-3 group-hover:text-amber-200">
                      {relatedPoem.title}
                    </h3>
                    <p className="text-stone-400 text-sm line-clamp-3">
                      {relatedPoem.content.split("\n")[0]}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
