"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface PoemCardProps {
  title: string
  content: string
  author: string
}

export default function PoemCard({ title, content, author }: PoemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg p-6 shadow-lg cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-semibold mb-4 text-pink-300">{title}</h3>
      <p className="text-gray-200 whitespace-pre-line">{content}</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="mt-4 text-pink-400 font-semibold"
      >
        By {author}
      </motion.div>
    </motion.div>
  )
}
