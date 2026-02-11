"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface SearchAndFilterProps {
  poems: any[];
  onFilter: (filtered: any[]) => void;
}

export default function SearchAndFilter({
  poems,
  onFilter,
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredPoems = useMemo(() => {
    return poems.filter((poem) => {
      const matchesSearch =
        searchQuery === "" ||
        poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poem.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poem.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage =
        !selectedLanguage || poem.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [searchQuery, selectedLanguage, poems]);

  const languages = Array.from(
    new Set(poems.map((p: any) => p.language))
  ) as string[];

  return (
    <div className="w-full">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search poems, authors, words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-black/50 border border-amber-900/30 rounded-full text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
          />
          <motion.span className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-500">
            🔍
          </motion.span>
        </div>
      </motion.div>

      {/* Filter Toggle */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-500 transition-colors"
      >
        <span className="text-sm font-semibold">Filters</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.span>
      </motion.button>

      {/* Filter Options */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-6">
          {["All Languages", ...languages].map((lang) => (
            <motion.button
              key={lang}
              onClick={() =>
                setSelectedLanguage(lang === "All Languages" ? null : lang)
              }
              className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm ${
                lang === "All Languages"
                  ? selectedLanguage === null
                    ? "border-amber-600 bg-amber-900/40 text-amber-300"
                    : "border-amber-900/30 bg-black/40 text-stone-400"
                  : selectedLanguage === lang
                    ? "border-amber-600 bg-amber-900/40 text-amber-300"
                    : "border-amber-900/30 bg-black/40 text-stone-400 hover:border-amber-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      {(searchQuery || selectedLanguage) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-amber-700/70 mb-6"
        >
          Found {filteredPoems.length} poem{filteredPoems.length !== 1 ? "s" : ""}
        </motion.p>
      )}
    </div>
  );
}
