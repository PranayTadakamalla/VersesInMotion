"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PoemCard from "@/components/PoemCard";
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";

const collections = [
  {
    id: "love-admiration",
    name: "Love & Admiration",
    description: "Poems celebrating the beauty and wonder of love",
    language: "English",
    poems: [
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
    ],
  },
  {
    id: "longing-separation",
    name: "Longing & Separation",
    description: "The bittersweet ache of distance and desire",
    language: "English",
    poems: [
      {
        id: 3,
        title: "It Began with a Glance",
        content:
          "It began with a glance so rare,\nA spark of charm hung in the air.\nIn whispers soft, the rains did fall,\nAnd love embraced us—heart and all.",
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
    ],
  },
  {
    id: "hindi-devotion",
    name: "Devotion & Dreams",
    description: "Hindi poems of deep emotion and commitment",
    language: "Hindi",
    poems: [
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
    ],
  },
];

export default function Collections() {
  const { mood, setLastVisitedPage } = usePresence();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setLastVisitedPage("/collections");
  }, [setLastVisitedPage]);

  const activeCollection = selectedCollection
    ? collections.find((c) => c.id === selectedCollection)
    : null;

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
              Collections
            </h1>
            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto">
              Curated moments organized by theme and emotion
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, idx) => (
              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() =>
                  setSelectedCollection(
                    selectedCollection === collection.id ? null : collection.id
                  )
                }
                className={`group relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  selectedCollection === collection.id
                    ? "border-amber-600 bg-amber-900/20"
                    : "border-amber-900/30 bg-black/40 hover:border-amber-700 hover:bg-amber-900/10"
                }`}
              >
                <motion.div
                  animate={{
                    opacity: selectedCollection === collection.id ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-amber-600 mb-3 group-hover:text-amber-500 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-stone-400 text-sm mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-700/70 italic">
                      {collection.poems.length} poem
                      {collection.poems.length !== 1 ? "s" : ""}
                    </span>
                    <motion.span
                      animate={{
                        rotate: selectedCollection === collection.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-amber-600"
                    >
                      ↓
                    </motion.span>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Collection Content */}
      {activeCollection && (
        <motion.section
          key={activeCollection.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full pb-32 px-4 md:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-amber-100 mb-3">
                {activeCollection.name}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-yellow-700" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCollection.poems.map((poem, idx) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <PoemCard
                    title={poem.title}
                    content={poem.content}
                    author={poem.author}
                    language={poem.language}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
