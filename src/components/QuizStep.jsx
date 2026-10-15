import { useState, useEffect } from "react";

export default function QuizStep({ questionData, stepIndex, totalSteps, onAnswer, onBack }) {
  const [selected, setSelected] = useState(null);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    setSelected(null);
    setEntering(true);
    const timer = setTimeout(() => setEntering(false), 50);
    return () => clearTimeout(timer);
  }, [questionData.id]);

  const handleSelect = (value) => {
    setSelected(value);
    // Short delay for the selection animation before moving on
    setTimeout(() => onAnswer(questionData.id, value), 400);
  };

  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <section
      id={`quiz-step-${questionData.id}`}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)]/8 blur-[120px] pointer-events-none" />

      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-500 ${
          entering ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <button
              id="quiz-back-btn"
              onClick={onBack}
              disabled={stepIndex === 0}
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span className="text-sm text-white/40 font-medium">
              {stepIndex + 1} / {totalSteps}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">{questionData.icon}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {questionData.question}
          </h2>
          <p className="text-white/50 text-lg">{questionData.subtitle}</p>
        </div>

        {/* Options grid or Range input */}
        {questionData.inputType === "range" ? (
          <div 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            style={{
              animation: entering ? "none" : `fadeUp 0.5s ease-out both`,
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-white/40 font-medium">Budget</span>
              <span className="text-4xl font-bold text-white">
                {questionData.formatLabel ? questionData.formatLabel(selected ?? (questionData.max / 2)) : selected ?? (questionData.max / 2)}
              </span>
            </div>
            
            <input
              type="range"
              min={questionData.min}
              max={questionData.max}
              step={questionData.step}
              value={selected ?? (questionData.max / 2)}
              onChange={(e) => setSelected(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
              style={{
                background: `linear-gradient(to right, var(--color-primary) ${((selected ?? (questionData.max / 2)) - questionData.min) / (questionData.max - questionData.min) * 100}%, rgba(255,255,255,0.1) ${((selected ?? (questionData.max / 2)) - questionData.min) / (questionData.max - questionData.min) * 100}%)`
              }}
            />
            
            <div className="flex justify-between mt-3 text-white/30 text-sm font-medium">
              <span>{questionData.formatLabel ? questionData.formatLabel(questionData.min) : questionData.min}</span>
              <span>{questionData.formatLabel ? questionData.formatLabel(questionData.max) : questionData.max}</span>
            </div>

            <button
              onClick={() => handleSelect(selected ?? (questionData.max / 2))}
              className="mt-10 w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[#4f46e5] transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer"
            >
              Confirm
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 ${questionData.options?.length > 4 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
            {questionData.options?.map((option, idx) => {
              const isSelected = selected === option.value;
              return (
                <button
                  key={option.value}
                  id={`option-${questionData.id}-${option.value}`}
                  onClick={() => handleSelect(option.value)}
                  className={`group relative flex flex-col items-center gap-2 p-6 rounded-2xl border text-center transition-all duration-300 cursor-pointer
                    ${
                      isSelected
                        ? "bg-[var(--color-primary)]/20 border-[var(--color-primary)] shadow-[0_0_30px_rgba(99,102,241,0.3)] scale-[1.02]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]"
                    }
                  `}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animation: entering ? "none" : `fadeUp 0.5s ease-out ${idx * 80}ms both`,
                  }}
                >
                  {/* Selection check */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  <span className="text-3xl mb-1">{option.icon}</span>
                  <span className="text-white font-semibold text-lg">{option.label}</span>
                  <span className="text-white/40 text-sm">{option.description}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
