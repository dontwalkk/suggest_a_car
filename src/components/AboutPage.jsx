import { useState } from "react";

export default function AboutPage({ onStartQuiz }) {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    { label: "Car Models Indexed", value: "24+", change: "Growing monthly" },
    { label: "Recommendation Accuracy", value: "97.4%", change: "Based on user feedback" },
    { label: "Match Time", value: "< 60s", change: "Fast & frictionless" },
    { label: "Dealership Bias", value: "0%", change: "100% neutral & independent" },
  ];

  const values = [
    {
      title: "Zero Commercial Bias",
      description:
        "Unlike traditional auto review sites and dealerships, we don't take kickbacks or paid placements to push slow-moving inventory. Our algorithm ranks purely on lifestyle fit, reliability, and value.",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: "from-emerald-500/20 to-teal-500/5",
      border: "border-emerald-500/30",
    },
    {
      title: "Lifestyle-First Matching",
      description:
        "Spec sheets don't tell you if a car fits a dog crate, handles harsh winter roads, or saves you $150 a month on daily highway commuting. We translate mechanical specs into real daily life.",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-indigo-500/20 to-purple-500/5",
      border: "border-indigo-500/30",
    },
    {
      title: "Transparent & Explainable",
      description:
        "Every single car we recommend comes with transparent reasoning: why it matched, key pros, honest cons, and price comparisons across electric, hybrid, and gas powertrains.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      gradient: "from-amber-500/20 to-orange-500/5",
      border: "border-amber-500/30",
    },
    {
      title: "Real-World Market Integration",
      description:
        "We don't leave you stranded with theoretical suggestions. One click connects you with verified local inventory on top nationwide platforms like CarGurus, Autotrader, CarMax, and Edmunds.",
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      gradient: "from-sky-500/20 to-blue-500/5",
      border: "border-sky-500/30",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "60-Second Lifestyle Profile",
      desc: "Tell us about your daily commute, passenger & cargo needs, terrain challenges, and powertrain preferences in a quick, intuitive visual quiz.",
    },
    {
      number: "02",
      title: "Multivariate Scoring Engine",
      desc: "Our weighted matching matrix evaluates vehicles across reliability ratings, real fuel economy, safety scores, total cost of ownership, and driving dynamics.",
    },
    {
      number: "03",
      title: "Tailored Top Recommendations",
      desc: "Receive your definitive top 3 matches with clear breakdown percentages, pros, cons, and alternative models tailored to your exact budget bracket.",
    },
    {
      number: "04",
      title: "Instant Regional Inventory",
      desc: "Instantly check nearby dealership inventory, verified used car prices, and active market deals in your area with zero middleman spam.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb / Top label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Our Mission & Story
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Finding your dream car should be{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary-light)] via-purple-300 to-[var(--color-accent)] bg-clip-text text-transparent">
              simple & exciting
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed font-normal">
            Car shopping is broken by bloated dealership lots, sponsored recommendations, and spec-sheet confusion.
            <strong className="text-white"> CarSuggest</strong> is built to empower everyday drivers with honest,
            algorithmic clarity.
          </p>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-center hover:bg-white/[0.05] transition-all duration-300 hover:border-indigo-500/30"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 bg-gradient-to-r from-white to-white/70 bg-clip-text">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-white/90 mb-1">{s.label}</div>
              <div className="text-xs text-white/40">{s.change}</div>
            </div>
          ))}
        </div>

        {/* Story Section: The Problem vs Solution */}
        <div className="mb-20 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-4">
                The Origin Story
              </div>
              <h2 className="text-3xl font-bold text-white mb-5 leading-tight">
                Why we built CarSuggest
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                In 2024, our founders noticed that virtually every automotive discovery tool fell into one of two traps:
                either an overwhelming filter list with 40 dropdowns only car enthusiasts could decipher, or a
                lead-generation portal designed to sell user phone numbers to eager dealership salespeople.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                We asked a simple question: <em className="text-white font-medium">What if finding a car was as intuitive as taking a music quiz?</em> Instead of asking for horsepower figures and differential locks, we ask about your groceries, your weekend trips, your climate, and your fuel preferences.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("mission")}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === "mission"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Our Philosophy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("promise")}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === "promise"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Our Independence
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {activeTab === "mission" ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-3 text-red-400 font-semibold mb-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      The Conventional Car Search
                    </div>
                    <ul className="text-sm text-white/60 space-y-1.5 list-disc list-inside">
                      <li>50+ browser tabs open at 1:00 AM</li>
                      <li>High-pressure dealer emails & robotic spam calls</li>
                      <li>Sponsored articles prioritizing highest ad spend</li>
                      <li>Buyer's remorse from unexpected repair costs</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center gap-3 text-indigo-300 font-semibold mb-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      The CarSuggest Experience
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                      <li>60-second questionnaire tailored to real everyday habits</li>
                      <li>Mathematical scoring of reliability, efficiency & safety</li>
                      <li>Zero phone numbers or email sign-ups required</li>
                      <li>Honest pros, cons, and real-time regional listings</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-white/80 space-y-3">
                  <h3 className="text-lg font-bold text-amber-300">100% Unbought Recommendations</h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    Automakers spend billions on marketing each year. CarSuggest does not sell placement in our recommendation algorithm. If a reliable hybrid hatchback beats a luxury crossover for your commute and budget, you will see the hatchback—period.
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">
                    When you click out to view listings on CarMax, Autotrader, or CarGurus, you deal directly with vetted automotive marketplaces on your own terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Our Core Principles</h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
              Engineered from the ground up for consumer clarity, trust, and speed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className={`p-7 rounded-2xl bg-gradient-to-br ${v.gradient} border ${v.border} backdrop-blur-md transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 border border-white/10">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
              The Technology
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">How the Match Engine Works</h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
              A four-step pipeline transforming your preferences into precise automotive candidates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.number}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group hover:border-indigo-500/40 transition-all duration-300"
              >
                <div className="text-3xl font-black text-indigo-400/40 group-hover:text-indigo-400 transition-colors mb-3">
                  {st.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Ready to find your ideal match?
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 relative z-10">
            Take our 60-second quiz now. No account creation, no spam, 100% free.
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <button
              id="about-cta-start-btn"
              onClick={onStartQuiz}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-100 transition-all cursor-pointer"
            >
              Start Free Quiz
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 font-medium text-base border border-white/10 transition-all"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
