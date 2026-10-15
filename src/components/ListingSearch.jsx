import { useState, useEffect } from "react";
import { getCarGurusMakeId } from "../services/cargurus";
import { resolveCarImage, placeholderImage } from "../data/cars";

export default function ListingSearch({ car, onClose }) {
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState(50);
  const [entered, setEntered] = useState(false);
  const [imgSrc, setImgSrc] = useState(car?.image || placeholderImage(car));

  useEffect(() => {
    let alive = true;
    resolveCarImage(car).then((res) => {
      if (alive && res && res.src) {
        setImgSrc(res.src);
      }
    });
    return () => { alive = false; };
  }, [car]);

  // Animate entrance
  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      setEntered(false);
      setTimeout(onClose, 200);
    }
  };

  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 200);
  };

  if (!car) return null;

  const make = car.brand;
  // Extract model: strip brand prefix, then remove punctuation/dots for slugs
  const model = car.name.startsWith(car.brand)
    ? car.name.slice(car.brand.length).trim()
    : car.name.trim();

  // Slugify: lowercase, strip special chars except hyphens, collapse spaces→hyphens
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[.\u2019']/g, "")          // strip dots, apostrophes
      .replace(/[^a-z0-9\s-]/g, " ")       // replace anything else weird with space
      .trim()
      .replace(/\s+/g, "-");               // spaces → hyphens

  const makeSlug  = slugify(make);
  const modelSlug = slugify(model);

  // Cars.com uses underscore-separated model slugs within a hyphenated make-model key
  // e.g. toyota-camry, bmw-3_series, chevrolet-silverado_1500
  const modelSlugCars = modelSlug.replace(/-/g, "_");

  // Full name slug for CarGurus human-readable link
  const fullNameSlug = `${makeSlug}-${modelSlug}`;

  // Helper to generate dynamic URLs based on the car and user's location
  const getLinks = () => {
    const zip = encodeURIComponent(postalCode);

    return [
      {
        id: "carmax",
        name: "CarMax",
        desc: "No-haggle pricing & huge inventory",
        icon: "🚙",
        url: postalCode
          ? `https://www.carmax.com/cars/${makeSlug}/${modelSlug}?zipCode=${zip}`
          : `https://www.carmax.com/cars/${makeSlug}/${modelSlug}`
      },
      {
        id: "carscom",
        name: "Cars.com",
        desc: "Compare local dealer inventory",
        icon: "🏢",
        url: postalCode
          ? `https://www.cars.com/shopping/results/?makes[]=${makeSlug}&models[]=${makeSlug}-${modelSlugCars}&zip=${zip}&maximum_distance=${distance}&stock_type=all`
          : `https://www.cars.com/shopping/results/?makes[]=${makeSlug}&models[]=${makeSlug}-${modelSlugCars}&stock_type=all`
      },
      {
        id: "autotrader",
        name: "Autotrader",
        desc: "Find new and used cars near you",
        icon: "🔍",
        url: postalCode
          ? `https://www.autotrader.com/cars-for-sale/all-cars/${makeSlug}/${modelSlug}?zip=${zip}&searchRadius=${distance}`
          : `https://www.autotrader.com/cars-for-sale/all-cars/${makeSlug}/${modelSlug}`
      },
      {
        id: "cargurus",
        name: "CarGurus",
        desc: "Find great deals and dealer reviews",
        icon: "🦉",
        // CarGurus search with make + model as text query — reliably filters to the right model
        url: postalCode
          ? `https://www.cargurus.com/Cars/inventorylist.action?zip=${zip}&distance=${distance}&entitySelectingHelper.selectedEntity=${getCarGurusMakeId(car.brand) || ""}&q=${encodeURIComponent(car.name)}`
          : `https://www.cargurus.com/Cars/inventorylist.action?entitySelectingHelper.selectedEntity=${getCarGurusMakeId(car.brand) || ""}&q=${encodeURIComponent(car.name)}`
      }
    ];
  };

  const links = getLinks();

  return (
    <div
      id="listing-search-modal"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        entered ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleBackdrop}
    >
      <div
        className={`relative w-full max-w-lg rounded-3xl border border-white/10 bg-[var(--color-surface-light)] shadow-2xl transition-all duration-300 ${
          entered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer border-none"
        >
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-xl">
              🌐
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Find Real Listings
              </h3>
              <p className="text-white/40 text-sm">
                Choose a site to search for this car
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <img
              src={imgSrc}
              alt={car.name}
              className="w-14 h-14 rounded-lg object-cover bg-white/5 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholderImage(car);
              }}
            />
            <div>
              <p className="text-white font-semibold">{car.name}</p>
              <p className="text-white/40 text-sm">Select a marketplace below</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Zip & Distance row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="zip-input" className="block text-white/50 text-sm font-medium mb-2">
                Zip Code (Optional)
              </label>
              <input
                id="zip-input"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="e.g. 90210"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="distance-select" className="block text-white/50 text-sm font-medium mb-2">
                Search Radius
              </label>
              <select
                id="distance-select"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff60' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value={25} className="bg-[var(--color-surface-light)]">25 miles</option>
                <option value={50} className="bg-[var(--color-surface-light)]">50 miles</option>
                <option value={100} className="bg-[var(--color-surface-light)]">100 miles</option>
                <option value={250} className="bg-[var(--color-surface-light)]">250 miles</option>
                <option value={500} className="bg-[var(--color-surface-light)]">500+ miles</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white/60 text-sm font-semibold mb-2 uppercase tracking-wider">Recommended Sites</h4>
            {links.map((link, idx) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/50 transition-all group no-underline"
                style={{ animation: `fadeUp 0.4s ease-out ${idx * 100}ms both` }}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">{link.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white group-hover:text-[var(--color-primary-light)] transition-colors">{link.name}</h4>
                  <p className="text-white/50 text-sm">{link.desc}</p>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-[var(--color-primary-light)] transition-colors group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
