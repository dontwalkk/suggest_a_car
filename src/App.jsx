import { useState, useCallback, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import HomeContent from "./components/HomeContent";
import QuizStep from "./components/QuizStep";
import LoadingScreen from "./components/LoadingScreen";
import Results from "./components/Results";
import AboutPage from "./components/AboutPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import ContactUsPage from "./components/ContactUsPage";
import ListingSearch from "./components/ListingSearch";
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

function parseInitialRoute() {
  if (typeof window === "undefined") {
    return { phase: PHASES.HERO, answers: {}, recommendations: [] };
  }
  const rawHash = window.location.hash.replace(/^#\/?/, "");
  const [route, queryString] = rawHash.split("?");
  const cleanRoute = (route || "").toLowerCase();

  if (cleanRoute === "results") {
    if (queryString) {
      const params = new URLSearchParams(queryString);
      const parsedAnswers = {};
      if (params.get("budget")) parsedAnswers.budget = Number(params.get("budget"));
      if (params.get("usage")) parsedAnswers.usage = params.get("usage");
      if (params.get("terrain")) parsedAnswers.terrain = params.get("terrain");
      if (params.get("fuelType") || params.get("fueltype")) {
        parsedAnswers.fuelType = params.get("fuelType") || params.get("fueltype");
      }
      if (params.get("priority")) parsedAnswers.priority = params.get("priority");
      if (params.get("seats")) parsedAnswers.seats = params.get("seats");

      if (Object.keys(parsedAnswers).length > 0) {
        const recs = getRecommendations(parsedAnswers);
        return { phase: PHASES.RESULTS, answers: parsedAnswers, recommendations: recs };
      }
    }
    // #/results without query parameters (user finished quiz or navigated here)
    return { phase: PHASES.RESULTS, answers: null, recommendations: null };
  }

  if (cleanRoute === "about") return { phase: PHASES.ABOUT, answers: {}, recommendations: [] };
  if (cleanRoute === "privacy" || cleanRoute === "privacy-policy" || cleanRoute === "privacypolicy") {
    return { phase: PHASES.PRIVACY, answers: {}, recommendations: [] };
  }
  if (cleanRoute === "contact" || cleanRoute === "contact-us" || cleanRoute === "contactus") {
    return { phase: PHASES.CONTACT, answers: {}, recommendations: [] };
  }
  if (cleanRoute === "quiz") return { phase: PHASES.QUIZ, answers: {}, recommendations: [] };

  return { phase: PHASES.HERO, answers: {}, recommendations: [] };
}

export default function App() {
  const [initial] = useState(() => parseInitialRoute());
  const [phase, setPhase] = useState(() => {
    // If opened directly at #/results with no query parameters, go to hero
    if (
      initial.phase === PHASES.RESULTS &&
      (!initial.recommendations || initial.recommendations.length === 0)
    ) {
      return PHASES.HERO;
    }
    return initial.phase;
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(initial.answers || {});
  const [recommendations, setRecommendations] = useState(initial.recommendations || []);
  const [homeListingCar, setHomeListingCar] = useState(null);

  const recommendationsRef = useRef(recommendations);

  useEffect(() => {
    recommendationsRef.current = recommendations;
  }, [recommendations]);

  // Sync hash changes from browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const { phase: nextPhase, answers: nextAnswers, recommendations: nextRecs } = parseInitialRoute();

      if (nextPhase === PHASES.RESULTS) {
        if (nextRecs && nextRecs.length > 0) {
          // Came from a link with parameters (or share link)
          setAnswers(nextAnswers);
          setRecommendations(nextRecs);
          recommendationsRef.current = nextRecs;
          setPhase(PHASES.RESULTS);
        } else if (recommendationsRef.current && recommendationsRef.current.length > 0) {
          // Just completed the quiz — keep existing results
          setPhase(PHASES.RESULTS);
        } else {
          // No recommendations available, fallback to hero
          setPhase(PHASES.HERO);
        }
      } else {
        setPhase(nextPhase);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
        // All questions answered — show loading screen, then results
        setPhase(PHASES.LOADING);
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          const results = getRecommendations(newAnswers);
          recommendationsRef.current = results;
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
    recommendationsRef.current = [];
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
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col justify-between overflow-x-hidden w-full">
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
      <main className={`flex-1 w-full overflow-x-hidden ${phase === PHASES.HERO ? "" : "pt-16"}`}>
        {phase === PHASES.HERO && (
          <>
            <Hero onStart={handleStart} onNavigate={handleNavigate} />
            <div id="explore-catalog">
              <HomeContent
                onStartQuiz={handleStart}
                onFindListings={(car) => setHomeListingCar(car)}
              />
            </div>
          </>
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
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Home listing modal if opened from catalog */}
      {homeListingCar && (
        <ListingSearch car={homeListingCar} onClose={() => setHomeListingCar(null)} />
      )}

      {/* Footer */}
      {showFooter && (
        <Footer onNavigate={handleNavigate} onStartQuiz={handleStart} />
      )}
    </div>
  );
}
