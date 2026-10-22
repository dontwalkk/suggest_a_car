import { useState } from "react";

export default function Navbar({
  phase,
  currentStep,
  totalSteps,
  onNavigate,
  onStartQuiz,
  onRestart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetPhase) => {
    setMobileMenuOpen(false);
    onNavigate(targetPhase);
  };

  const handleStartQuizClick = () => {
    setMobileMenuOpen(false);
    onStartQuiz();
  };

  const isQuiz = phase === "quiz";
  const isLoading = phase === "loading";

  // During loading screen, we can keep the header minimal or hidden
  if (isLoading) return null;

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 group"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="CarSuggest Logo"
            className="h-9 w-auto rounded-lg bg-white p-1 transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-black text-white tracking-tight hidden sm:inline">
            Car<span className="text-indigo-400">Suggest</span>
          </span>
        </button>

        {/* If in Quiz phase: Progress indicator */}
        {isQuiz && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50 font-medium mr-1 hidden sm:inline">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx < currentStep
                      ? "w-2 bg-indigo-500"
                      : idx === currentStep
                      ? "w-6 bg-gradient-to-r from-indigo-400 to-amber-400"
                      : "w-2 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Nav Links (Desktop) when not in Quiz */}
        {!isQuiz && (
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavClick("hero")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none ${
                phase === "hero" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none ${
                phase === "about" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none ${
                phase === "contact" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick("privacy")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none ${
                phase === "privacy" ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              Privacy Policy
            </button>
          </div>
        )}

        {/* Action Button: Start Quiz / Start Over */}
        <div className="flex items-center gap-3">
          {isQuiz ? (
            <button
              id="nav-restart-btn"
              onClick={onRestart}
              className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none font-medium px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Exit Quiz
            </button>
          ) : phase === "results" ? (
            <button
              id="nav-quiz-again-btn"
              onClick={handleStartQuizClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 cursor-pointer transition-all"
            >
              Take Quiz Again
            </button>
          ) : (
            <button
              id="nav-start-quiz-btn"
              onClick={handleStartQuizClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 cursor-pointer transition-all hover:scale-105"
            >
              Find My Car
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          {!isQuiz && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer bg-transparent border-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {!isQuiz && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0b0f19]/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick("hero")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              phase === "hero" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              phase === "about" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              phase === "contact" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => handleNavClick("privacy")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              phase === "privacy" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Privacy Policy
          </button>

          <div className="pt-2">
            <button
              onClick={handleStartQuizClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-sm shadow-md"
            >
              Find My Car (Start Quiz)
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
