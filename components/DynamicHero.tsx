"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const poems = [
  {
    title: "Whispers of the Heart",
    lines: [
      "In the silence of night, your whispers echo",
      "A melody of love, soft and slow",
      "Hearts entwined, souls align",
      "In this moment, you are mine",
    ],
  },
  {
    title: "Bewafa Se Wafa Ka Khwab",
    lines: [
      "Main duniya ko samajh chuka hoon",
      "Har raaz, har kahani jaan chuka hoon",
      "Phir bhi dhoke kakar har gaya hoon",
      "Apne dard se waqif hoon phir bhi",
      "Bewafa ko ehle-wafa bana raha hoon",
    ],
  },
  {
    title: "Moonlit Serenade",
    lines: [
      "Under the silver glow, our love blooms",
      "A dance of shadows, dispelling gloom",
      "Hand in hand, we sway and spin",
      "A moonlit serenade, our hearts within",
    ],
  },
  {
    title: "Padte Padte Kitaab Khatam Ho Gaya",
    lines: [
      "Padte padte kitaab khatam ho gaya,",
      "Aur tujhe dekhte dekhte mujhe pyaar ho gaya.",
      "Woh lamhe bhi khoobsurat the, woh pal aaj bhi haseen hain,",
      "Kahaniyon mein kho gaya tha pehle, ab teri aankhon mein chah gaya.",
    ],
  },
  {
    title: "Mere Intezaar Ka Diya",
    lines: [
      "Na chand ka chaav mila, na suraj ki dhoop mili,",
      "Main toh bas sanjh ki halki roshni mein tera intezaar kiye baitha hoon.",
      "Maine tera intezaar kiya hai, kar raha hoon aur karta rahunga,",
      "Chahe tu aaye ya na aaye, mere intezaar ka diya yunhi jalta rahega.",
    ],
  },
  {
    title: "She Shines Like the Moon",
    lines: [
      "She shines like the moon, so bright and fair,",
      "Her voice is like a melody, floating in the air,",
      "Her fragrance is like flowers in full bloom,",
      "Every smile of hers lights up the room.",
      "Without her, my world feels tight and small,",
      "With her presence, I feel I have it all.",
      "Her laughter, so sweet, fills my heart with cheer,",
      "In her smile, my happiness is always near.",
      "She is a beauty like none before,",
      "A symphony of grace, forevermore.",
      "Her voice, a melody, soft and true,",
      "Echoes in my heart, a love that grew.",
      "Each sorrow she carries, a whisper of pain,",
      "Yet in her embrace, I find peace again.",
      "Her smile, a beacon and a guiding light,",
      "Gives purpose to my days, and makes them bright.",
      "Her energy flows, a wave so serene,",
      "Her presence, a calm like I've never seen.",
      "Her eyes, like stars, in the darkest night,",
      "Sparkle with love, a radiant light.",
      "Her gaze, a caress, tender and sweet,",
      "A touch that makes my world complete.",
      "Her love fills my heart with endless grace,",
      "A unique tenderness, none can replace.",
    ],
  },
]

export default function DynamicHero() {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => {
        if (prevIndex < poems[currentPoemIndex].lines.length - 1) {
          return prevIndex + 1
        } else {
          setCurrentPoemIndex((prevPoemIndex) => (prevPoemIndex + 1) % poems.length)
          return 0
        }
      })
    }, 4000)

    return () => clearInterval(lineInterval)
  }, [currentPoemIndex])

  const currentPoem = poems[currentPoemIndex]

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] bg-gradient-to-b from-gray-900 to-blue-900 text-center px-4">
      <h1 className="text-5xl font-bold mb-8 text-pink-400">{currentPoem.title}</h1>
      <div className="h-32">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl italic text-gray-200"
          >
            {currentPoem.lines[currentLineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
