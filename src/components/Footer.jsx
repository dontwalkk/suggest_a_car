export default function Footer({ onNavigate, onStartQuiz }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#090d16] text-white/70 py-14 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 group"
            >
              <img
                src="/logo.png"
                alt="CarSuggest Logo"
                className="h-10 w-auto rounded-lg bg-white p-1 transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-black text-white tracking-tight">
                Car<span className="text-indigo-400">Suggest</span>
              </span>
            </button>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              An intelligent, lifestyle-first car discovery engine. We cut through confusing dealership spec sheets and sponsored rankings to connect you with the car you will actually love driving.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Free • Unbiased Recommendations
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("hero")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-indigo-400 font-semibold"
                >
                  Take Car Quiz →
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("about")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("about")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Feedback & Support
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/dontwalkk/suggest_a_car"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  GitHub Project
                  <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Privacy</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("privacy")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <span className="text-xs text-white/40">Cookie-less Tracking</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {currentYear} CarSuggest. Built to help every driver find their ideal ride with clarity and confidence.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              About Us
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate("privacy")}
              className="hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
