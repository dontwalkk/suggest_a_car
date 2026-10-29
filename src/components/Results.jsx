import { useState, useEffect } from "react";
import ListingSearch from "./ListingSearch";
import { resolveCarImage, placeholderImage } from "../data/cars";

function CarImage({ car, className, showCredit = false }) {
  const [img, setImg] = useState({ src: car.image, credit: "", sourceUrl: "" });
  
  useEffect(() => {
    let alive = true;
    resolveCarImage(car).then((r) => {
      if (alive && r && r.src) setImg(r);
    });
    return () => { alive = false; };
  }, [car.id]);

  return (
    <>
      <img
        src={img.src}
        alt={car.name}
        className={className}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = placeholderImage(car);
        }}
      />
      {showCredit && img.credit && (
        <a href={img.sourceUrl} target="_blank" rel="noreferrer" className="absolute bottom-1 left-2 text-[10px] text-white/50 hover:text-white/80 z-20 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm max-w-[80%] truncate">
          {img.credit}
        </a>
      )}
    </>
  );
}

export default function Results({ recommendations, onRestart }) {
  const [visible, setVisible] = useState(false);
  const [listingCar, setListingCar] = useState(null); // car for the listing modal

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Top 3 results
  const top = recommendations.slice(0, 3);
  const others = recommendations.slice(3, 8);

  const matchPercent = (score) => {
    const maxScore = 125; // theoretical max
    return Math.min(Math.round((score / maxScore) * 100), 99);
  };

  const handleFindListings = (e, car) => {
    e.stopPropagation();
    setListingCar(car);
  };

  return (
    <section id="results-section" className="min-h-screen py-16 px-4 relative overflow-hidden w-full">
      {/* Background accents */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-primary)]/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--color-accent)]/8 blur-[120px] pointer-events-none" />

      <div
        className={`relative z-10 max-w-5xl mx-auto w-full transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Analysis Complete
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Your Top{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Matches
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-lg mx-auto">
            Based on your preferences, here are the cars we think you'll love most.
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {top.map((car, idx) => (
            <div
              key={car.id}
              id={`result-card-${car.id}`}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] ${
                idx === 0
                  ? "border-[var(--color-accent)]/40 bg-gradient-to-b from-[var(--color-accent)]/5 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.1)] md:col-span-3 md:grid md:grid-cols-2"
                  : "border-white/10 bg-white/5"
              }`}
              style={{ animation: `fadeUp 0.6s ease-out ${idx * 150}ms both` }}
            >
              {/* Rank badge */}
              <div
                className={`absolute top-4 left-4 z-20 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                  idx === 0
                    ? "bg-gradient-to-br from-[var(--color-accent)] to-amber-600 text-white shadow-lg"
                    : "bg-white/10 backdrop-blur-md text-white/80 border border-white/20"
                }`}
              >
                {idx + 1}
              </div>

              {/* Image */}
              <div className={`relative overflow-hidden ${idx === 0 ? "h-64 md:h-full" : "h-48"}`}>
                <CarImage
                  car={car}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  showCredit={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Match percentage on image */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-bold">{matchPercent(car.score)}% Match</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {car.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white/60 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
                <p className="text-[var(--color-primary-light)] font-semibold text-lg mb-3">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{car.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  <div className="text-center p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5 min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm truncate">{car.specs.hp} HP</p>
                    <p className="text-white/30 text-[11px] sm:text-xs">Power</p>
                  </div>
                  <div className="text-center p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5 min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm truncate" title={car.specs.mpg}>{car.specs.mpg}</p>
                    <p className="text-white/30 text-[11px] sm:text-xs">Efficiency</p>
                  </div>
                  <div className="text-center p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5 min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm truncate" title={car.specs.accel}>{car.specs.accel}</p>
                    <p className="text-white/30 text-[11px] sm:text-xs">Speed</p>
                  </div>
                </div>

                {/* Find Listings CTA */}
                <button
                  id={`find-listings-${car.id}`}
                  onClick={(e) => handleFindListings(e, car)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border ${
                    idx === 0
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white border-transparent shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Real Listings
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Other suggestions */}
        {others.length > 0 && (
          <div className="mb-16">
            <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-6 flex items-center gap-2 sm:gap-3">
              <div className="h-px flex-1 bg-white/10 min-w-3" />
              <span className="shrink-0 text-center">Also Worth Considering</span>
              <div className="h-px flex-1 bg-white/10 min-w-3" />
            </h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {others.map((car, idx) => (
                <div
                  key={car.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15 transition-all duration-300"
                  style={{ animation: `fadeUp 0.5s ease-out ${(idx + 3) * 100}ms both` }}
                >
                  <CarImage
                    car={car}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    showCredit={false}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{car.name}</h4>
                    <p className="text-[var(--color-primary-light)] text-sm font-medium">
                      ${car.price.toLocaleString()}
                    </p>
                    <p className="text-white/30 text-xs mb-2">{matchPercent(car.score)}% match · {car.type}</p>
                    <button
                      onClick={(e) => handleFindListings(e, car)}
                      className="text-xs text-[var(--color-primary-light)] hover:text-white flex items-center gap-1 transition-colors cursor-pointer bg-transparent border-none font-medium"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Listings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restart */}
        <div className="text-center">
          <button
            id="restart-quiz-btn"
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-semibold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        </div>
      </div>

      {/* Listing Search Modal */}
      {listingCar && (
        <ListingSearch car={listingCar} onClose={() => setListingCar(null)} />
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
