"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full py-24 px-4 md:px-8 bg-gradient-to-b from-black via-stone-950 to-black border-b border-amber-900/20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-sm text-amber-700/60 mb-4 italic tracking-widest uppercase"
          >
            The Story Within
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800"
          >
            About Verses In Motion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-stone-400 max-w-2xl mx-auto italic leading-relaxed"
          >
            Not just poetry. A place where hearts learn their own language.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative w-full px-4 md:px-8 py-24 bg-gradient-to-b from-black via-stone-950 to-black overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-10">
              {[
                {
                  title: "Our Vision",
                  content:
                    "Verses In Motion is a sanctuary for modern romantic poetry, where words dance and emotions flow like a gentle stream under a starlit sky. We create an immersive experience that transports readers to a world where poetry comes alive, touching hearts and igniting imaginations.",
                  color: "from-amber-700 to-yellow-700",
                },
                {
                  title: "Our Philosophy",
                  content:
                    "Poetry is not just words on a page, but a living, breathing art form that moves and evolves with each reader's interpretation. Our collection captures the essence of modern romance, blending traditional poetic techniques with contemporary themes and imagery that resonate with the soul.",
                  color: "from-amber-600 to-yellow-600",
                },
                {
                  title: "Join the Journey",
                  content:
                    "Whether you're a seasoned poetry enthusiast or new to the world of verse, we invite you to explore, feel, and lose yourself in the rhythm of words. Let our poems be the soundtrack to your emotions, the voice to your unspoken feelings, and the companion to your romantic journey.",
                  color: "from-yellow-700 to-amber-700",
                },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="group"
                >
                  <motion.h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${section.color} mb-4 group-hover:scale-105 transition-transform`}>
                    {section.title}
                  </motion.h2>
                  <p className="text-lg text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors duration-300">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-full">
                {/* Glassmorphic glow background */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -inset-4 bg-gradient-to-r from-amber-900/30 via-yellow-900/20 to-amber-900/30 rounded-3xl blur-2xl"
                />

                <motion.div className="relative bg-gradient-to-br from-stone-900/40 via-black/50 to-stone-950/40 backdrop-blur-xl rounded-3xl p-8 border border-amber-900/30 hover:border-amber-700/50 transition-all duration-500 shadow-2xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8 overflow-hidden rounded-2xl h-64 md:h-80"
                  >
                    <Image
                      src="/profile.jpg"
                      alt="Sai Pranay Tadakamalla"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 mb-2">
                      Sai Pranay Tadakamalla
                    </h3>
                    <p className="text-stone-400 mb-4 text-sm">Poet & Creator</p>
                    <p className="text-stone-400 mb-8 leading-relaxed text-sm">
                      Welcome to Verses In Motion, where romantic poetry comes alive.
                      Every verse here is crafted with passion, exploring the depths of
                      emotion and the beauty of human connection.
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="https://linkedin.com/in/sai-pranay-tadakamalla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-800 to-yellow-800 hover:from-amber-700 hover:to-yellow-700 text-stone-100 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-700/50"
                      >
                        Connect on LinkedIn
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full px-4 md:px-8 py-24 bg-gradient-to-b from-stone-950 via-black to-black overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "50+", label: "Poems" },
              { number: "2", label: "Languages" },
              { number: "∞", label: "Emotions" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-center p-8 bg-gradient-to-br from-stone-900/30 via-black/40 to-stone-950/30 backdrop-blur-sm rounded-2xl border border-amber-900/30 group-hover:border-amber-700/50 transition-all duration-300">
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 mb-3">
                    {stat.number}
                  </p>
                  <p className="text-xl text-stone-400 group-hover:text-stone-300 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
