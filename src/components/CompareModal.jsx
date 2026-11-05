import { useEffect, useState } from "react";
import { placeholderImage, resolveCarImage } from "../data/cars";

function ModalCarImage({ car }) {
  const [src, setSrc] = useState(car.image || placeholderImage(car));

  useEffect(() => {
    let alive = true;
    resolveCarImage(car).then((res) => {
      if (alive && res?.src) setSrc(res.src);
    });
    return () => { alive = false; };
  }, [car]);

  return (
    <img
      src={src}
      alt={car.name}
      className="w-full h-32 sm:h-40 object-cover rounded-xl mb-3"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = placeholderImage(car);
      }}
    />
  );
}

export default function CompareModal({ cars, onClose, onFindListings }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 200);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!cars || cars.length === 0) return null;

  return (
    <div
      onClick={handleBackdrop}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md transition-opacity duration-200 ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#0f172a] border border-white/15 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl transition-all duration-200 overflow-hidden ${
          entered ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
              Side-by-Side Comparison
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Compare Your Top Matches
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
            aria-label="Close comparison modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Car Columns */}
          <div className={`grid gap-4 ${cars.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
            {cars.map((car, idx) => (
              <div
                key={car.id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs text-white/50">{car.type}</span>
                  </div>

                  <ModalCarImage car={car} />

                  <h3 className="text-lg font-bold text-white mb-1">{car.name}</h3>
                  <p className="text-indigo-400 font-extrabold text-xl mb-4">
                    ${car.price.toLocaleString()}
                  </p>

                  {/* Quick specs */}
                  <div className="space-y-2 text-xs divide-y divide-white/5">
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">Powertrain</span>
                      <span className="text-white font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">Horsepower</span>
                      <span className="text-white font-medium">{car.specs.hp} HP</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">Efficiency</span>
                      <span className="text-white font-medium">{car.specs.mpg}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">0–60 MPH</span>
                      <span className="text-white font-medium">{car.specs.accel}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">Seating</span>
                      <span className="text-white font-medium">{car.seats} Passengers</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-white/40">Primary Focus</span>
                      <span className="text-white font-medium capitalize">{car.priority}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-white/60 leading-relaxed italic border-t border-white/5 pt-3">
                    "{car.description}"
                  </p>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onFindListings(car);
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Local Listings
                </button>
              </div>
            ))}
          </div>

          {/* Quick takeaway summary table */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-amber-400">⚡</span> Quick Verdict
            </h4>
            <div className="grid gap-3 sm:grid-cols-3 text-xs">
              {cars.map((car, idx) => (
                <div key={car.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="font-semibold text-white mb-1">
                    #{idx + 1} {car.name}
                  </p>
                  <p className="text-white/60">
                    Best for drivers prioritizing{" "}
                    <span className="text-indigo-300 font-medium">{car.priority}</span> and{" "}
                    <span className="text-amber-300 font-medium">{car.usage.join(" & ")}</span>.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

