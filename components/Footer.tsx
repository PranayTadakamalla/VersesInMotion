import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-2">
              Verses In Motion
            </h3>
            <p className="text-slate-400 text-sm">
              A sanctuary of romantic poetry where emotions bloom and hearts connect.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-pink-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/experience", label: "Experience" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-pink-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-rose-300 mb-4">
              Connect
            </h4>
            <Link
              href="https://linkedin.com/in/sai-pranay-tadakamalla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-slate-400 hover:text-pink-300 transition-colors text-sm"
            >
              LinkedIn →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-8">
          <p className="text-center text-slate-400 text-sm">
            Created with ♡ by{" "}
            <span className="text-pink-400 font-semibold">
              Sai Pranay Tadakamalla
            </span>
          </p>
          <p className="text-center text-slate-500 text-xs mt-2">
            © 2024 Verses In Motion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
