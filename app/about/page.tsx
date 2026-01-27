import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-stone-950 via-black to-black border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800">
            About Verses In Motion
          </h1>
          <p className="text-xl text-stone-400">
            A sanctuary of romantic poetry where emotions bloom and hearts connect
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative w-full px-4 md:px-8 py-20 bg-gradient-to-b from-black via-stone-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="group">
                <h2 className="text-3xl font-bold text-pink-300 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Verses In Motion is a sanctuary for modern romantic poetry, where words dance and emotions flow like a
                  gentle stream under a starlit sky. We create an immersive experience that transports readers to a world
                  where poetry comes alive, touching hearts and igniting imaginations.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold text-rose-300 mb-4">
                  Our Philosophy
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Poetry is not just words on a page, but a living, breathing art form that moves and evolves with each
                  reader's interpretation. Our collection captures the essence of modern romance, blending traditional
                  poetic techniques with contemporary themes and imagery that resonate with the soul.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold text-red-300 mb-4">
                  Join the Journey
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Whether you're a seasoned poetry enthusiast or new to the world of verse, we invite you to explore,
                  feel, and lose yourself in the rhythm of words. Let our poems be the soundtrack to your emotions, the
                  voice to your unspoken feelings, and the companion to your romantic journey.
                </p>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl">
                  <div className="mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src="/profile.jpg"
                      alt="Sai Pranay Tadakamalla"
                      width={300}
                      height={400}
                      className="w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-pink-300 mb-2">
                      Sai Pranay Tadakamalla
                    </h3>
                    <p className="text-slate-400 mb-4">Poet & Creator</p>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Welcome to Verses In Motion, where romantic poetry comes alive. Every verse here is crafted with
                      passion, exploring the depths of emotion and the beauty of human connection.
                    </p>

                    <Link
                      href="https://linkedin.com/in/sai-pranay-tadakamalla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                    >
                      Connect on LinkedIn →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full px-4 md:px-8 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Poems" },
              { number: "2", label: "Languages" },
              { number: "∞", label: "Emotions" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-pink-500 transition-all duration-300"
              >
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-xl text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
