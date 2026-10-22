import { useState, useCallback, useEffect } from "react";
import Hero from "./components/Hero";
import QuizStep from "./components/QuizStep";
import LoadingScreen from "./components/LoadingScreen";
import Results from "./components/Results";
import AboutPage from "./components/AboutPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import ContactUsPage from "./components/ContactUsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import questions from "./data/questions";
import { getRecommendations } from "./utils/recommend";

const PHASES = {
  HERO: "hero",
  QUIZ: "quiz",
  LOADING: "loading",
  RESULTS: "results",
  ABOUT: "about",
  PRIVACY: "privacy",
  CONTACT: "contact",
};

function getPhaseFromHash() {
  if (typeof window === "undefined") return PHASES.HERO;
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, "");
  if (hash === "about") return PHASES.ABOUT;
  if (hash === "privacy" || hash === "privacy-policy" || hash === "privacypolicy") return PHASES.PRIVACY;
  if (hash === "contact" || hash === "contact-us" || hash === "contactus") return PHASES.CONTACT;
  if (hash === "quiz") return PHASES.QUIZ;
  return PHASES.HERO;
}

export default function App() {
  const [phase, setPhase] = useState(() => getPhaseFromHash());
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // Sync hash changes from browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const next = getPhaseFromHash();
      // If user presses back/forward to about/privacy/contact/hero
      if (
        next === PHASES.ABOUT ||
        next === PHASES.PRIVACY ||
        next === PHASES.CONTACT
      ) {
        setPhase(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (next === PHASES.HERO && phase !== PHASES.QUIZ && phase !== PHASES.LOADING) {
        setPhase(PHASES.HERO);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [phase]);

  const handleNavigate = useCallback((targetPhase) => {
    setPhase(targetPhase);
    if (targetPhase === PHASES.HERO) {
      if (window.location.hash) {
        history.pushState(null, "", window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = `#/${targetPhase}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStart = useCallback(() => {
    setPhase(PHASES.QUIZ);
    setCurrentStep(0);
    setAnswers({});
    window.location.hash = "#/quiz";
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
          window.location.hash = "#/results";
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
      handleNavigate(PHASES.HERO);
    }
  }, [currentStep, handleNavigate]);

  const handleRestart = useCallback(() => {
    setPhase(PHASES.HERO);
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    if (window.location.hash) {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showFooter =
    phase === PHASES.HERO ||
    phase === PHASES.RESULTS ||
    phase === PHASES.ABOUT ||
    phase === PHASES.PRIVACY ||
    phase === PHASES.CONTACT;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        phase={phase}
        currentStep={currentStep}
        totalSteps={questions.length}
        onNavigate={handleNavigate}
        onStartQuiz={handleStart}
        onRestart={handleRestart}
      />

      {/* Main content */}
      <main className={`flex-1 ${phase === PHASES.HERO ? "" : "pt-16"}`}>
        {phase === PHASES.HERO && (
          <Hero onStart={handleStart} onNavigate={handleNavigate} />
        )}

        {phase === PHASES.ABOUT && (
          <AboutPage onStartQuiz={handleStart} />
        )}

        {phase === PHASES.PRIVACY && (
          <PrivacyPolicyPage />
        )}

        {phase === PHASES.CONTACT && (
          <ContactUsPage onStartQuiz={handleStart} />
        )}

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
          <Results
            recommendations={recommendations}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer onNavigate={handleNavigate} onStartQuiz={handleStart} />
      )}
    </div>
  );
}
