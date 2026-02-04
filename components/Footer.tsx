"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative w-full bg-gradient-to-t from-black via-stone-950 to-stone-950 border-t border-amber-900/20 py-16 px-4 md:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 mb-3">
              Verses In Motion
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              A sanctuary of romantic poetry where emotions bloom and hearts
              connect.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-amber-700 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/experience", label: "Experience" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-amber-700 transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-amber-700 mb-4">
              Connect
            </h4>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="https://linkedin.com/in/sai-pranay-tadakamalla"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-stone-400 hover:text-amber-700 transition-colors text-sm font-medium gap-2"
              >
                LinkedIn
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-amber-900/20 pt-8 origin-left"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-stone-400 text-sm"
          >
            Created with passion by{" "}
            <span className="text-amber-700 font-semibold">
              Sai Pranay Tadakamalla
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-stone-500 text-xs mt-3"
          >
            © 2024 Verses In Motion. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
