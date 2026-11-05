import { useState, useEffect, useMemo } from "react";
import rawCars, { placeholderImage, resolveCarImage } from "../data/cars";
import AdBanner from "./AdBanner";

function CarCard({ car, onFindListings }) {
  const [imgSrc, setImgSrc] = useState(car.image || placeholderImage(car));

  useEffect(() => {
    let alive = true;
    resolveCarImage(car).then((res) => {
      if (alive && res?.src) setImgSrc(res.src);
    });
    return () => { alive = false; };
  }, [car]);

  return (
    <div className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 p-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-black/40">
          <img
            src={imgSrc}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImage(car);
            }}
          />
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
            {car.fuelType}
          </span>
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-indigo-600/80 backdrop-blur-md text-[11px] font-semibold text-white">
            {car.type}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
            {car.name}
          </h4>
          <span className="text-sm font-extrabold text-emerald-400 shrink-0">
            ${car.price.toLocaleString()}
          </span>
        </div>

        <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">
          {car.description}
        </p>

        {/* Quick specs */}
        <div className="grid grid-cols-3 gap-1.5 py-2 px-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-center mb-3">
          <div>
            <span className="block font-bold text-white">{car.specs.hp} HP</span>
            <span className="text-[10px] text-white/40">Power</span>
          </div>
          <div>
            <span className="block font-bold text-white truncate">{car.specs.mpg}</span>
            <span className="text-[10px] text-white/40">Efficiency</span>
          </div>
          <div>
            <span className="block font-bold text-white">{car.seats} Seats</span>
            <span className="text-[10px] text-white/40">Capacity</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onFindListings(car)}
        className="w-full py-2 rounded-lg bg-white/5 hover:bg-indigo-600 text-white/80 hover:text-white text-xs font-semibold border border-white/10 hover:border-indigo-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Check Local Market
      </button>
    </div>
  );
}

export default function HomeContent({ onStartQuiz, onFindListings }) {
  const [activeCategory, setActiveCategory] = useState("commute");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedGuide, setExpandedGuide] = useState(null);

  const categories = [
    { id: "commute", label: "Commuters & Sedans", icon: "🏢" },
    { id: "family", label: "Family SUVs & Haulers", icon: "👨‍👩‍👧‍👦" },
    { id: "hybrid", label: "Hybrids & EVs", icon: "⚡" },
    { id: "budget", label: "Smart Value (< $30k)", icon: "🏷️" },
    { id: "adventure", label: "Adventure & AWD", icon: "⛰️" },
  ];

  const filteredCars = useMemo(() => {
    switch (activeCategory) {
      case "commute":
        return rawCars.filter((c) => c.usage.includes("commute") && c.type === "Sedan").slice(0, 6);
      case "family":
        return rawCars.filter((c) => c.usage.includes("family") || c.seats >= 7).slice(0, 6);
      case "hybrid":
        return rawCars.filter((c) => c.fuelType === "Hybrid" || c.fuelType === "Electric").slice(0, 6);
      case "budget":
        return rawCars.filter((c) => c.price <= 30000).slice(0, 6);
      case "adventure":
        return rawCars.filter((c) => c.usage.includes("adventure") || c.terrain === "offroad").slice(0, 6);
      default:
        return rawCars.slice(0, 6);
    }
  }, [activeCategory]);

  const faqs = [
    {
      q: "How does CarSuggest make unbiased recommendations?",
      a: "Unlike traditional automotive review portals that depend on sponsored lead generation from dealerships, our scoring algorithm evaluates vehicles strictly on user lifestyle signals: total cost of ownership, reliability ratings, real fuel economy, and passenger space. Dealerships cannot pay for preferential ranking.",
    },
    {
      q: "Is CarSuggest completely free, and is my data tracked?",
      a: "Yes, 100% free. We never ask for your email address, phone number, or social security details before showing results. You can use the quiz and explore all data anonymously with zero sales calls or dealership spam.",
    },
    {
      q: "How are the local inventory listings sourced?",
      a: "When you click 'Find Real Listings', we dynamically generate localized search links across verified nationwide auto marketplaces—including CarMax, Cars.com, Autotrader, and CarGurus—using your ZIP code and model specifics so you compare transparent real-world prices.",
    },
    {
      q: "What should I choose: Gas, Hybrid, or Electric?",
      a: "It depends heavily on your daily mileage and home charging access. If you commute under 40 miles daily and have a standard garage outlet, an EV or Plug-in Hybrid delivers the lowest cost per mile. For frequent road-trippers without home chargers, modern hybrid vehicles (45+ MPG) provide maximum convenience and fuel savings.",
    },
  ];

  const decisionGuides = [
    {
      id: "powertrain",
      tag: "Powertrain Guide",
      title: "Gas, Hybrid, or EV in 2025: The Real Total Cost Breakdown",
      readTime: "4 min read",
      summary:
        "Sticker price is only half the story. Discover how insurance brackets, charging costs, and battery degradation factor into your 5-year ownership math.",
      content: `When calculating vehicle ownership costs, sticker price accounts for less than 45% of total 5-year expenditure. 

• Hybrid Vehicles (Winner for Most Drivers): Hybrids like the Toyota Camry and Honda CR-V Hybrid recoup their $1,500–$2,500 premium over gas models in roughly 3.2 years of average driving (12,000 miles/yr). They suffer almost no range penalty in freezing winter climates and require standard maintenance.

• Full Electric Vehicles (Best for Home Chargers): EVs boast the lowest fueling cost (equivalent to $1.10–$1.50/gallon when charging overnight on residential electric rates). However, buyers must budget $600–$1,200 for Level 2 home charger installation and factor in slightly higher tire replacement wear due to battery weight.

• Conventional Gasoline: Gas engines remain the budget champion under $25,000. If you drive less than 7,000 miles annually, a fuel-efficient gas sedan (like the Civic or Corolla) is often cheaper overall than paying a premium for electrification.`,
    },
    {
      id: "winter",
      tag: "Handling & Safety",
      title: "AWD vs. FWD with Winter Tires: What Really Keeps You Safe?",
      readTime: "3 min read",
      summary:
        "Many car shoppers pay $2,000+ extra for all-wheel drive, believing it helps them stop in snow and ice. Here is what automotive physics actually proves.",
      content: `The automotive industry heavily markets All-Wheel Drive (AWD) as an essential safety feature for winter conditions. While AWD is phenomenal for forward acceleration on slippery hills, it does not assist in vehicle braking or cornering grip.

• All-Wheel Drive helps you GO, not STOP: Every car already features four-wheel braking regardless of drivetrain. When panic braking on black ice, an AWD SUV stops no faster than a standard Front-Wheel Drive sedan.

• The Power of Winter Tires: Independent tests show that a Front-Wheel Drive car fitted with dedicated winter compound tires out-brakes and out-corners an All-Wheel Drive vehicle on all-season tires by over 35 feet from 30 MPH.

• When You Actually Need AWD: Prioritize AWD if you live on steep unpaved grades, regularly experience unplowed snow depths above 6 inches, or tow boats on wet ramps. For typical suburban winter commutes, FWD with quality rubber is often safer and more economical.`,
    },
    {
      id: "used-vs-new",
      tag: "Financial Strategy",
      title: "The 3-Year CPO Sweet Spot: Where Depreciation Works For You",
      readTime: "5 min read",
      summary:
        "New cars lose 20% of their value in year one. Learn how Certified Pre-Owned (CPO) vehicles combine factory warranty protection with massive savings.",
      content: `A brand-new vehicle experiences its steepest depreciation curve between months 1 and 36, losing an average of 35% to 45% of its original MSRP. 

• Certified Pre-Owned (CPO) Advantage: Most 3-year-old CPO vehicles come directly off corporate leases. They feature low mileage (typically under 36,000 miles), comprehensive multi-point inspections, and extended manufacturer-backed bumper-to-bumper warranties that often surpass standard new car coverage.

• Insurance & Registration Savings: In addition to a lower purchase price, registration fees and comprehensive collision insurance rates are substantially lower for 3-year-old models compared to current-year showroom vehicles.

• The Rule of Thumb: If the price gap between a new vehicle and its 3-year CPO equivalent is wider than $6,000, CPO almost universally offers the superior financial return.`,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: Explore Popular Vehicles by Category
          (Direct indexable text & vehicle cards for crawlers & users)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Indexed Vehicle Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Explore Standout Vehicles by Lifestyle
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Not ready to take the full 60-second quiz? Browse verified benchmarks across popular driving categories, verified specs, and market pricing.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border-white/10 hover:bg-white/10"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Grid of Cars */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onFindListings={onFindListings} />
          ))}
        </div>

        {/* Quiz CTA Banner inside catalog */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-indigo-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Want a Tailored Match for Your Exact Budget?
            </h3>
            <p className="text-sm text-white/60 max-w-xl">
              Answer 6 quick questions on commute length, passenger needs, and winter driving to get your exact top 3 matches.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartQuiz}
            className="px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/30 shrink-0 cursor-pointer"
          >
            Take 60s Quiz →
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: Compliant AdSense Banner (Safe position)
      ───────────────────────────────────────────────────────────── */}
      <AdBanner />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: Editorial Car Buying & Decision Guides
          (Substantial original content answering user questions)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Car Buying Decision Guides
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Practical Advice Before You Step on the Lot
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Original editorial guides breaking down real-world ownership costs, powertrain trade-offs, and car shopping strategies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {decisionGuides.map((guide) => {
            const isExpanded = expandedGuide === guide.id;
            return (
              <div
                key={guide.id}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-white/40 mb-3">
                    <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                      {guide.tag}
                    </span>
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4">
                    {guide.summary}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed whitespace-pre-line space-y-2 bg-black/20 p-4 rounded-xl">
                      {guide.content}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  {isExpanded ? "Hide Full Guide ▲" : "Read Full Guide ▼"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: How Our Matching Algorithm Works (Transparency)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Algorithmic Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Engineered for Daily Utility, Not Dealer Kickbacks
          </h2>
          <p className="text-white/60 text-sm">
            Most car ranking sites sort by highest referral commission. Here is how CarSuggest evaluates your profile:
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-2xl font-black text-indigo-400">01</span>
            <h4 className="text-base font-bold text-white">Strict Budget Guardrails</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              We penalize vehicles exceeding your stated ceiling. You won't be pushed into higher trims you didn't ask for.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-2xl font-black text-purple-400">02</span>
            <h4 className="text-base font-bold text-white">Fuel & Powertrain Matching</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              If you request a Hybrid or EV, non-matching drivetrains are filtered out immediately so your time isn't wasted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-2xl font-black text-emerald-400">03</span>
            <h4 className="text-base font-bold text-white">Lifestyle Context Weights</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Terrain, seating requirements, and primary use (commute vs. towing vs. family trips) dynamically modulate the final score.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: Frequently Asked Questions (FAQ)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-sm">
            Everything you need to know about our data, privacy commitments, and vehicle suggestions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none text-white font-semibold text-sm sm:text-base hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-white/40 text-lg shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
