import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
];

// Deterministic particles to avoid purity issues in render
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: `${(i % 4) + 2}px`,
  height: `${(i % 4) + 2}px`,
  left: `${((i * 17) % 96) + 2}%`,
  top: `${((i * 23) % 96) + 2}%`,
  duration: `${10 + (i % 7) * 2}s`,
  delay: `${(i % 5) * 0.7}s`,
}));

export default function Hero({ onStart, onNavigate }) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background images */}
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: bgIndex === i ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[var(--color-surface)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-12 transition-all duration-1000 opacity-100 translate-y-0">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img 
            src="/logo.png" 
            alt="Suggest A Car Logo" 
            className="h-28 md:h-36 w-auto rounded-2xl bg-white p-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]" 
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Unbiased Lifestyle-First Recommendations
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6">
          Can&apos;t Pick a{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary-light)] via-purple-300 to-[var(--color-accent)] bg-clip-text text-transparent">
            Car?
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
          Answer a few quick questions about your lifestyle, commute, and budget. We&apos;ll match you with the
          <span className="text-white font-semibold"> perfect ride</span> in 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="start-quiz-btn"
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white text-lg font-bold rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
          >
            Find My Car
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="inline-flex items-center gap-2 px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 text-base font-semibold border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            >
              How It Works
            </button>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/50 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            100% Free to use
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Takes 60 seconds
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No email required
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Unbiased results
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
