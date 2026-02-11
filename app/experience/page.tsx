"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PoemCardEnhanced from "@/components/PoemCardEnhanced";
import PoemCard from "@/components/PoemCard"; // Import PoemCard
import { usePresence } from "@/components/PresenceProvider";
import { getMoodGradient } from "@/lib/moodColors";

const categorizedPoems = {
  English: {
    "Love & Admiration": [
      {
        id: 1,
        title: "She Shines",
        content: `She shines like the moon, so bright and fair,
her voice is like a melody, floating in the air,
her fragrance is like flowers in full bloom,
every smile of hers lights up the room.

Without her, my world feels tight and small,
With her presence, I feel I have it all.
Her laughter, so sweet, fills my heart with cheer,
In her smile, my happiness is always near.

She is a beauty like none before,
A symphony of grace, forevermore.
Her voice, a melody, soft and true,
Echoes in my heart, a love that grew.

Each sorrow she carries, a whisper of pain,
Yet in her embrace, I find peace again.
Her smile, a beacon and a guiding light,
Gives purpose to my days, and makes them bright.

Her energy flows, a wave so serene,
Her presence, a calm like I've never seen.
Her eyes, like stars, in the darkest night,
Sparkle with love, a radiant light.

Her gaze, a caress, tender and sweet,
A touch that makes my world complete.
Her love fills my heart with endless grace,
A unique tenderness, none can replace.`,
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
      {
        id: 2,
        title: "Thousands See Her",
        content: `Thousands see her, yet none perceive,
The way her presence makes me believe.
To them, she's just a fleeting sight,
To me, she's the sun, the stars, the night.

In crowds, she walks with effortless grace,
Yet I alone know what lies beneath that face.
The depth of kindness in her eyes so deep,
The gentle promises she makes and keeps.

She lights the world with her mere presence,
Yet remains humble, a quiet essence.
While others chase what glitters and gleams,
She fills the silence with whispered dreams.

A thousand hearts may see her beauty true,
But none will ever feel what I feel for you.`,
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
      {
        id: 3,
        title: "It Began with a Glance",
        content: `It began with a glance so rare,
A spark of charm hung in the air.
In whispers soft, the rains did fall,
And love embraced us—heart and all.

A moment froze, a breath suspended,
Where two souls perfectly blended.
Your eyes held stories yet untold,
A warmth that put away the cold.

In that instant, time stood still,
Your presence bent my very will.
A glance transformed into a flame,
Nothing would ever be the same.

What started as a fleeting sight,
Became my guiding star, my light.`,
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
    ],
    "Longing & Separation": [
      {
        id: 4,
        title: "In Her Eyes",
        content: `In her eyes, I saw the sky so bright,
Her voice was soft, a sweet delight.
Her hair flowed gently, dark as night,
A smile so warm, it felt just right.

Every time her name came up, I'd blush and turn red,
Thinking of her, the warmth in me spread.
Every time she spoke, my heart would explode,
I wished it never ended, in that moment, I glowed.

She was sweet, caring, like a soft embrace,
Though the love I felt, she never could trace.
For unspoken feelings, deep and true,
Were the things I wished she only knew.`,
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
      {
        id: 5,
        title: "Alone I Stand",
        content: `Alone I stand, with heart in hand,
Hoping someone will understand.
A quiet soul, a silent plea,
To see the real side of me.

In crowds of many, I feel so lost,
The price of solitude, that I paid the cost.
Looking for a soul who cares so deep,
Someone to hold me, to make me weep.

With joy, not sorrow, but from the core,
Someone who will love me forevermore.
A companion, a friend, a soulmate true,
Someone to turn my grey skies blue.

Until that day, I'll wait and see,
If someone's out there meant for me.`,
        author: "Sai Pranay Tadakamalla",
        language: "English",
      },
    ],
  },
  Hindi: {
    "उत्सर्ग और प्रेम (Devotion & Love)": [
      {
        id: 6,
        title: "Dilkashi Se Hui Shuruaat",
        content: `दिलकशी से हुई शुरुआत, एक नज़र में खो गए,
उनकी बारिश में भीगे, हर लम्हा मोहब्बत हो गए।
मोहब्बत ने रुख बदला, अब अकीदत की राह चली।
जो रिश्ता कल का सपना था, आज हकीकत हो गई।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
      {
        id: 7,
        title: "Zamana Chod Diya",
        content: `ज़माना छोड़ दिया मेरा साथ,
शाम-ए-ग़म ने दिया मुझे हाथ।
क़िस्मत यूँ बदल गई मेरी,
जब देखी मैंने चेहरा तेरी।

तेरी मुस्कुराहट ने सदा सुनाई,
तेरे प्यार में हर रात लगाई।
तेरी याद में रातें हों बिताई,
तेरी ख़ुशी ही मेरी ख़ुशी आई।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
      {
        id: 8,
        title: "Woh Chaandni Thi",
        content: `वह चाँदनी थी, जो मेरी ज़िंदगी में रोशनी लाई,
और मैं एक था जो उनके ख्वाब लेकर रह गया।
उसने दोस्ती के अरमान लेकर दिल में बस गई,
और मैंने उसका मोहब्बत का जहान खुद में बसाया।

हर पल उसके साथ एक ख्वाब था,
हर बात उसकी ज़िंदगी का खिताब था।
पर क़िस्मत ने कुछ और ही सोचा था,
और वह दूर चली गई, पर दिल में रह गई।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
    ],
    "मिलन और मनोकामना (Longing & Dreams)": [
      {
        id: 9,
        title: "Milo Ya Na Milo",
        content: `मिलो या न मिलो तुम मेरे दिल में हमेशा बस जाओगे,
मेरी हर ख़ुशी और हर गम में तुम्ही रहोगे।
तुम्हारी यादों में मैं रात भर जागता हूँ,
और तुम्हारी ख़ुशी की ख़ातिर सब कुछ भूल जाता हूँ।

तुम्हारी मुस्कुराहट ही मेरी ज़िंदगी है,
तुम्हारी गर्मा गर्मी में ही मेरी क़िस्मत है।
मिलो या न मिलो, पर मेरे साथ हमेशा रहना,
क्योंकि तुम मेरी साँसों में, मेरी हर धड़कन में हो।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
      {
        id: 10,
        title: "Jo Socha Tha",
        content: `जो सोचा था, वो बन न सका,
जो चाहा था, वो पास न रहा।
हर राह में बस अँधेरा मिला,
धड़कन में एक तन्हा सवेरा मिला।

तुम्हारी राह में सब कुछ खोया,
पर तुम्हारी यादों में सब कुछ पाया।
तुम्हारे बिना ज़िंदगी सूनी है,
पर तुम्हारे साथ ज़िंदगी पूरी है।

इस साहिल पर अकेले खड़े हैं,
तुम्हारी आहट का इंतेज़ार हैं।
जब तक तुम न आओ, यह दिल न रुकेगा,
तुम्हारे आने का ख़्वाब न टूटेगा।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
      {
        id: 11,
        title: "Mere Intezaar Ka Diya",
        content: `न चाँद का छाँव मिला, न सूरज की धूप मिली,
मैं तो बस सँझ की हल्की रोशनी में तेरा इंतेज़ार किए बैठा हूँ।
मैंने तेरा इंतेज़ार किया है, कर रहा हूँ और कर्ता रहूँगा,
चाहे तू आए या न आए, मेरे इंतेज़ार का दिया यूँही जलता रहेगा।

तेरे आने की बाट जोहता हूँ हर पल,
तेरी यादों में बिताता हूँ हर लम्हा, हर पल।
हज़ार बार हार मान लेता हूँ, पर फिर से उठ जाता हूँ,
क्योंकि तुम ही मेरी ज़िंदगी हो, तुम ही मेरी मुराद हो।`,
        author: "Sai Pranay Tadakamalla",
        language: "Hindi",
      },
    ],
  },
};

export default function Experience() {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentLanguagePoems = categorizedPoems[activeLanguage];
  const categoryKeys = Object.keys(currentLanguagePoems);

  // Filter poems by search query
  const filteredPoems = useMemo(() => {
    const filtered = {};
    Object.keys(currentLanguagePoems).forEach((category) => {
      const categoryPoems = currentLanguagePoems[category];
      const matches = categoryPoems.filter((poem) => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
          poem.title.toLowerCase().includes(lowerQuery) ||
          poem.content.toLowerCase().includes(lowerQuery) ||
          poem.author.toLowerCase().includes(lowerQuery)
        );
      });
      if (matches.length > 0) {
        filtered[category] = matches;
      }
    });
    return filtered;
  }, [currentLanguagePoems, searchQuery]);

  const poemsToDisplay = searchQuery ? filteredPoems : currentLanguagePoems;

  const microcopyPhrases = {
    English: {
      intro: "Drift through moments of love, written and whispered.",
      expandHint: "Pause here to discover what awaits within...",
      categoryTitle: "A collection breathing with",
    },
    Hindi: {
      intro: "प्रेम के पल जो लिखे गए और फुसफुसाए गए।",
      expandHint: "यहाँ ठहरो, जो अंदर सोया है उसे जानो।",
      categoryTitle: "एक संग्रह जो धड़कती है",
    },
  };

  const currentMicrocopy = microcopyPhrases[activeLanguage];

  const { mood, setLastVisitedPage } = usePresence();

  useEffect(() => {
    setLastVisitedPage("/experience");
  }, [setLastVisitedPage]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen ${getMoodGradient(mood)} overflow-hidden transition-all duration-3000`}
    >
      {/* Animated ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.08],
            scale: [1, 1.15, 1.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.03, 0.12, 0.06],
            scale: [1, 1.1, 1.02],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-900/10 rounded-full blur-3xl"
        />
      </div>

      {/* Cursor-following light effect */}
      <motion.div
        className="fixed w-48 h-48 rounded-full bg-gradient-to-r from-amber-900/5 to-yellow-900/5 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800">
            Experience
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-stone-400 italic max-w-2xl mx-auto leading-relaxed"
          >
            {currentMicrocopy.intro}
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search poems, authors, words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-black/50 border border-amber-900/30 rounded-full text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors shadow-lg"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-500">
              🔍
            </span>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center gap-4 md:gap-8 mb-16"
        >
          {["English", "Hindi"].map((lang) => (
            <motion.button
              key={lang}
              onClick={() => {
                setActiveLanguage(lang);
                setExpandedCategory(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-3 rounded-full font-semibold transition-all duration-500 ${
                activeLanguage === lang
                  ? "text-stone-100"
                  : "text-stone-500 hover:text-stone-400"
              }`}
            >
              {activeLanguage === lang && (
                <motion.div
                  layoutId="activeLanguage"
                  className="absolute inset-0 bg-gradient-to-r from-amber-800 to-yellow-800 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 40 }}
                />
              )}
              <span className="relative z-10">{lang}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Search Results Info */}
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-amber-700/70 mb-12 text-center"
          >
            Found{" "}
            {Object.values(filteredPoems).reduce(
              (sum, poems) => sum + poems.length,
              0
            )}{" "}
            poem{Object.values(filteredPoems).reduce((sum, poems) => sum + poems.length, 0) !== 1 ? "s" : ""}
          </motion.p>
        )}

        {/* Categories Section */}
        <div className="space-y-8">
          {Object.keys(poemsToDisplay).map((category, idx) => {
            const isExpanded = expandedCategory === category;
            const poemsInCategory = poemsToDisplay[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                {/* Category Header - Interactive */}
                <motion.button
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : category)
                  }
                  className="w-full relative group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl blur opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative bg-gradient-to-r from-stone-900/30 via-black/50 to-stone-950/30 backdrop-blur-sm border border-amber-900/30 group-hover:border-amber-700/50 rounded-2xl p-6 md:p-8 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-stone-500 mb-2 italic">
                          {currentMicrocopy.categoryTitle}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 group-hover:from-amber-600 group-hover:to-yellow-600 transition-all">
                          {category}
                        </h2>
                        <p className="text-sm text-stone-500 mt-2">
                          {poemsInCategory.length} verse
                          {poemsInCategory.length !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex-shrink-0"
                      >
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 text-amber-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {!isExpanded && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-stone-600 mt-4 italic"
                      >
                        {currentMicrocopy.expandHint}
                      </motion.p>
                    )}
                  </div>
                </motion.button>

                {/* Expanded Poems */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {poemsInCategory.map((poem, poemIdx) => (
                          <motion.div
                            key={poem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: poemIdx * 0.1,
                            }}
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Ambient guidance text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-stone-600 italic text-sm md:text-base">
            Each verse breathes with intention. Move slowly through them.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
