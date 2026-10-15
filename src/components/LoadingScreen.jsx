import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Analyzing your preferences…", icon: "🧠" },
    { text: "Searching our database…", icon: "🔍" },
    { text: "Ranking the best matches…", icon: "📊" },
    { text: "Preparing your results…", icon: "✨" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setStep(0);
    else if (progress < 50) setStep(1);
    else if (progress < 75) setStep(2);
    else setStep(3);
  }, [progress]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Rotating background glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-primary))",
          opacity: 0.1,
          animation: "spin 4s linear infinite",
        }}
      />

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Animated car icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)]">
            <span className="text-4xl" style={{ animation: "bounce 1s ease-in-out infinite" }}>
              🚗
            </span>
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl border border-[var(--color-primary)]/30 animate-ping" />
          </div>
        </div>

        {/* Step text */}
        <div className="mb-8 h-16">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${
                step === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
              }`}
            >
              {step === idx && (
                <>
                  <span className="text-2xl mb-2 block">{s.icon}</span>
                  <p className="text-white/70 text-lg font-medium">{s.text}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/30 text-sm mt-3">{progress}%</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
