"use client";
import Link from "next/link";
import DynamicHero from "@/components/DynamicHero";
import PoemCard from "@/components/PoemCard";
import { useEffect, useState } from "react";

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
      <section
        className="relative w-full py-24 px-4 md:px-8"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(20, 20, 28, 0.98) 0%, rgba(35, 25, 40, 0.98) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700">
              Featured Verses
            </h2>
            <p className="text-stone-400 text-lg md:text-xl">
              A collection of the most passionate moments captured in verse
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {featuredPoems.map((poem, idx) => (
              <div
                key={poem.id}
                className="group relative h-96 cursor-pointer"
                style={{
                  animation: isLoaded
                    ? `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                    : "none",
                }}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-stone-900 via-stone-950 to-black rounded-2xl p-6 overflow-hidden border border-amber-900/40 hover:border-amber-700/60 transition-all duration-300 shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between z-10">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-700 mb-2 group-hover:text-amber-600 transition-colors">
                        {poem.title}
                      </h3>
                      <div className="w-10 h-1 bg-gradient-to-r from-amber-700 to-yellow-700 mb-4 group-hover:w-16 transition-all duration-300"></div>
                      <p className="text-stone-400 text-sm leading-relaxed line-clamp-6">
                        {poem.content}
                      </p>
                    </div>

                    {/* Author reveal on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-end p-6">
                      <div className="w-full">
                        <p className="text-amber-600 font-semibold text-lg">
                          {poem.author}
                        </p>
                        <p className="text-stone-500 text-sm">
                          {poem.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/experience"
              className="inline-block px-10 py-4 bg-gradient-to-r from-amber-800 to-yellow-800 hover:from-amber-700 hover:to-yellow-700 text-stone-100 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-700/50 text-lg"
            >
              Experience All Poems →
            </Link>
          </div>
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
