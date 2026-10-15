import { useState, useCallback } from "react";
import Hero from "./components/Hero";
import QuizStep from "./components/QuizStep";
import LoadingScreen from "./components/LoadingScreen";
import Results from "./components/Results";
import questions from "./data/questions";
import { getRecommendations } from "./utils/recommend";

const PHASES = {
  HERO: "hero",
  QUIZ: "quiz",
  LOADING: "loading",
  RESULTS: "results",
};

export default function App() {
  const [phase, setPhase] = useState(PHASES.HERO);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const handleStart = useCallback(() => {
    setPhase(PHASES.QUIZ);
    setCurrentStep(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnswer = useCallback(
    (questionId, value) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);

      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // All questions answered — show loading then results
        setPhase(PHASES.LOADING);
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          const results = getRecommendations(newAnswers);
          setRecommendations(results);
          setPhase(PHASES.RESULTS);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2200);
      }
    },
    [answers, currentStep]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setPhase(PHASES.HERO);
    }
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    setPhase(PHASES.HERO);
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Navbar */}
      {phase !== PHASES.HERO && (
        <nav
          id="main-nav"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-white/5"
      >
        <button
          id="nav-logo"
          onClick={handleRestart}
          className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none"
        >
          <img 
            src="/logo.png" 
            alt="Suggest A Car Logo" 
            className="h-10 w-auto rounded bg-white p-1" 
          />
        </button>

        {phase === PHASES.QUIZ && (
          <div className="hidden md:flex items-center gap-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < currentStep
                    ? "bg-[var(--color-primary)] scale-100"
                    : idx === currentStep
                    ? "bg-[var(--color-primary-light)] scale-125"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        )}

        {phase !== PHASES.HERO && (
          <button
            id="nav-restart-btn"
            onClick={handleRestart}
            className="text-sm text-white/40 hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none font-medium"
          >
            Start Over
          </button>
        )}
      </nav>
      )}

      {/* Main content with top padding for fixed nav */}
      <main className={phase === PHASES.HERO ? "" : "pt-16"}>
        {phase === PHASES.HERO && <Hero onStart={handleStart} />}

        {phase === PHASES.QUIZ && (
          <QuizStep
            questionData={questions[currentStep]}
            stepIndex={currentStep}
            totalSteps={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {phase === PHASES.LOADING && <LoadingScreen />}

        {phase === PHASES.RESULTS && (
          <Results recommendations={recommendations} onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      {(phase === PHASES.HERO || phase === PHASES.RESULTS) && (
        <footer className="border-t border-white/5 py-8 px-6 text-center">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} CarSuggest — Built to help you find your dream ride.
          </p>
        </footer>
      )}
    </div>
  );
}
