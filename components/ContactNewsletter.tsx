"use client";

import React from "react"

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactNewsletter() {
  const [activeTab, setActiveTab] = useState<"newsletter" | "contact">(
    "newsletter"
  );
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setEmail("");
    setIsLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setEmail("");
    setMessage("");
    setIsLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative w-full py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-amber-900/20">
          {(["newsletter", "contact"] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? "text-amber-300 border-b-2 border-amber-600"
                  : "text-stone-500 hover:text-stone-400"
              }`}
            >
              {tab === "newsletter" ? "📬 Newsletter" : "✉️ Contact"}
            </motion.button>
          ))}
        </div>

        {/* Newsletter Tab */}
        {activeTab === "newsletter" && (
          <motion.form
            key="newsletter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleNewsletter}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-amber-700/70 mb-3">
                Join our community of poetry lovers
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-6 py-3 bg-black/50 border border-amber-900/30 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Get weekly curated poems and exclusive content
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⌛
                  </motion.span>
                  Subscribing...
                </span>
              ) : submitted ? (
                "✓ Subscribed!"
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </motion.form>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <motion.form
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleContact}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-amber-700/70 mb-3">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-6 py-3 bg-black/50 border border-amber-900/30 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-amber-700/70 mb-3">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, feedback, or inquiries..."
                required
                rows={5}
                className="w-full px-6 py-3 bg-black/50 border border-amber-900/30 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⌛
                  </motion.span>
                  Sending...
                </span>
              ) : submitted ? (
                "✓ Message sent!"
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
