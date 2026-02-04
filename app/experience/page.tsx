"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const allPoems = {
  "Love & Admiration": [
    {
      id: 1,
      title: "She Shines",
      content: `She shines like the moon, so bright and fair,
her voice is like a melody, floating in the air,
her fragrance is like flowers in full bloom,
every smile of hers lights up the room,
without her, my world feels tight and small,
with her presence, I feel I have it all,
her laughter, so sweet, fills my heart with cheer,
In her smile, my happiness is always near.

She is a beauty like none before,
a symphony of grace, forevermore,
her voice, a melody, soft and true,
echoes in my heart, a love that grew,
each sorrow she carries, a whisper of pain,
yet in her embrace, I find peace again.

Her smile, a beacon and a guiding light,
gives purpose to my days, and makes them bright,
her energy flows, a wave so serene,
her presence, a calm like I've never seen,
her eyes, like stars, in the darkest night,
sparkle with love, a radiant light,
her gaze, a caress, tender and sweet,
a touch that makes my world complete,
her love fills my heart with endless grace,
a unique tenderness, none can replace.`,
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
But fierce like a tiger, with elegant grace.
Her kindness ran deep, her strength so true,
Every moment with her felt like a dream come through.

I thought she was the one, but destiny had other plans,
Our paths diverged, as life slipped through my hands.
Though the love was deep, fate chose a different way,
I'll cherish her always, though she couldn't stay.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
    {
      id: 5,
      title: "She Stood Like The Sun",
      content: `She stood like the sun, steady and bright,
While I, a dreamer, lost in my night.
Her words were simple, her heart was kind,
But I wove stories within my mind.

She offered friendship, a bond so pure,
Yet I dreamed of a life, of something more.
Her laughter, her presence, a gentle breeze,
But I chased horizons she'd never tease.

She is greatness, a light untamed,
While I'm the fool who wrongly framed.
For in her kindness, no fault to find,
It was my overthinking that blurred the line.

So here I stand, humbled, wishing her joy, her path alight.
For though I stumbled, I now see clear,
Her friendship's gift is what I hold dear.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
    {
      id: 6,
      title: "I Count the Stars",
      content: `I count the stars, one by one,
The night is long, but sleep won't come.
I close my eyes, but all I see,
Are memories of you and me.

I miss your voice, I miss your smile,
I wish you'd stay, just for a while.
My heart feels lost, my world is blue,
I don't know how to live without you.

The night goes on, but time stands still,
I miss you more, I always will.
I hope one day, you will miss me too,
And find your way back, like I want you to.

In the darkness, you're my guiding star,
No matter how close or how far.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
  ],
  "Inner Darkness & Healing": [
    {
      id: 7,
      title: "I Was in Darkness",
      content: `I was in darkness, wanted to be alone,
But by your light, a warmth was shown.
You're the glow that broke my endless night,
In your embrace, the world felt right.

If it's meant to be, let it drift with the stream,
But I'll not leave you to chase a dream.
You're a melody sweet, that the silence restores,
I'm the broken tune that everyone ignores.

You're the warmth that shatters the winter's chill,
And I'm the shadow that hides and stays still.

Yet in your presence, I find my way,
You give me courage to face the day.
In the shadows where I dwelled so long,
You've made me believe I can be strong.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
    {
      id: 8,
      title: "Rain or Sky",
      content: `Rain or sky, don't let a day slip by,
Keep moving forward, reach for what's high.
Through every challenge, through every fight,
Push ahead—chase and embrace the light.

When clouds hang low and the world feels slow,
Rise above, let your spirit glow.
No day is wasted, no time stands still,
Keep climbing higher and trust your will.

When shadows linger and winds grow strong,
Stand your ground for you've been brave all along.
No time is lost, no dream will fade,
Rise with courage and be unafraid.

The rain will pass and the sun will shine,
Your strength is greater than you realize, it's fine.
So keep on going, reach for the height,
For rain or sky, never let a day slip by.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
  ],
  "Hindi Poetry - प्यार और भावनाएं": [
    {
      id: 9,
      title: "Dilkashi Se Hui Shuruaat",
      content: `Dilkashi se hui shuruaat, ek nazar mein kho gaye,
Unss ki baarish mein bheege, har lamha Mohabbat ho gaye.
Mohabbat ne rukh badla, ab Aqeedat ki raah chali,
Har pal unke sath bitana, ab mera acha waqt ban gali.

Unke sath rahe khatir se, har din aaj ban gaya,
Unka sath mere dil se, kabhi dur na ho paya.
Har baat unki ek khushi hai, mere dil ko sukoon deti,
Unka hansa mera jeewan, unka pyar meri beti.`,
      author: "Sai Pranay Tadakamalla",
      language: "Hindi",
    },
    {
      id: 10,
      title: "Zamana Chod Diya",
      content: `Zamana chod diya mera saath,
Shaam-e-ghum ne diya mujhe haath.
Qismat yun badal gayi meri,
Jab dekhi maine chehra teri.

Zindagi badal gai har pal,
Unka pyar mera final.
Duniya bhool gayi main ab,
Bas unka hi kaam mere nab.

Khushi ne mujhe pakda hath se,
Dard bhi aa kabhi saath se.
Lekin unke bin dar se na main,
Unhe chod nahi sakta main.`,
      author: "Sai Pranay Tadakamalla",
      language: "Hindi",
    },
    {
      id: 11,
      title: "Woh Chaandni Thi",
      content: `Woh chaandni thi, jo mere zindagi mai roshni laayi,
Aur main ek tha jo unke khwab lekar reh gaya.
Usne dosti ke armaan lekar dil mein bas gayi,
Aur maine uska mohabbat ka jahan khudme basaya.

Har pal unka saath sukhad, har pal khush tha main,
Unke liye hi jee raha tha, unka hi pyar tha meri jaan.
Lekin qismat ko kuch aur hi rukh bade the,
Unka jaana mere dil mein ek daag bade the.

Ab bhi unhe dekh kar mera dil tez dharkta hai,
Unke bin zindagi meri bas ek udesi baat hai.`,
      author: "Sai Pranay Tadakamalla",
      language: "Hindi",
    },
  ],
  "Reflection & Philosophy": [
    {
      id: 12,
      title: "The Pursuit",
      content: `We chase the horizon, forever seeking the new,
Never satisfied with the beauty we're viewing.
The grass always greens on the other side,
Though we've never truly looked where we reside.

What if the answer was never far away?
What if the treasure was here, come what may?
We run through life with our eyes fixed high,
Missing the miracles that quietly pass by.

In the search for something grand and great,
We miss the small moments that seal our fate.
A kind word spoken, a hand held true,
These are the riches that see us through.

So pause and reflect on what truly matters,
Before all your moments scatter like shatters.`,
      author: "Sai Pranay Tadakamalla",
      language: "English",
    },
  ],
};

export default function Experience() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Love & Admiration"
  );

  const categories = Object.keys(allPoems);
  const poems = allPoems[selectedCategory as keyof typeof allPoems] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black">
      {/* Hero Section */}
      <section className="relative w-full px-4 md:px-8 py-20 text-center border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800">
            Experience the Poetry
          </h1>
          <p className="text-xl text-stone-400 mb-2">
            Dive deep into verses that touch the soul
          </p>
          <p className="text-stone-500">
            Every poem a journey, every word a heartbeat
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-b border-amber-900/20 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-800 to-yellow-800 text-stone-100 shadow-lg shadow-amber-700/50"
                    : "bg-stone-900 text-stone-400 hover:bg-stone-800 border border-amber-900/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Poems Grid */}
      <section className="relative w-full px-4 md:px-8 py-24 bg-gradient-to-b from-black via-stone-950 to-black overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {poems.map((poem, idx) => (
              <motion.div
                key={poem.id}
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 2) * 0.2,
                  ease: "easeOut",
                }}
              >
                {/* Card */}
                <div className="relative w-full h-full bg-gradient-to-br from-stone-900 to-black rounded-xl p-8 overflow-hidden border border-amber-900/30 hover:border-amber-700/60 transition-all duration-300 shadow-2xl hover:shadow-amber-700/20">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-amber-700 mb-2 group-hover:text-amber-600 transition-colors">
                        {poem.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-amber-700 to-yellow-700 group-hover:w-20 transition-all duration-300"></div>
                    </div>

                    {/* Poem Content */}
                    <div className="flex-1 overflow-y-auto pr-2 mb-4">
                      <p className="text-stone-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                        {poem.content}
                      </p>
                    </div>

                    {/* Author Info - Always visible */}
                    <div className="border-t border-amber-900/20 pt-4 mt-4">
                      <p className="text-amber-600 font-semibold text-lg">
                        {poem.author}
                      </p>
                      <p className="text-stone-500 text-sm">
                        {poem.language}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
