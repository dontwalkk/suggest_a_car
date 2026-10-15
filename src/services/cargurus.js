// Maps our car database brand names to CarGurus make IDs
// Sourced from: https://www.cargurus.com/Cars/api/1.0/carselector/listMakes.action?searchType=USED
const brandToCarGurusId = {
  Toyota: "m7",
  BMW: "m3",
  Honda: "m6",
  "Mercedes-Benz": "m43",
  Jeep: "m32",
  Porsche: "m48",
  Ford: "m2",
  Tesla: "m112",
  Mazda: "m42",
  Chevrolet: "m1",
  Hyundai: "m27",
  Kia: "m33",
  Rivian: "m319",
  Nissan: "m44",
  Audi: "m19",
  Lexus: "m37",
  Subaru: "m53",
  Volkswagen: "m55",
  RAM: "m191",
  GMC: "m26",
  Chrysler: "m23",
};

// Use direct external API URL for both fetches and redirects
const API_BASE = "https://www.cargurus.com/Cars/api/1.0/carselector";
const CARGURUS_REDIRECT = "https://www.cargurus.com/Cars/api/1.0/carselector";

/**
 * Fetch available makes from CarGurus.
 * @param {"NEW"|"USED"} searchType
 */
export async function fetchMakes(searchType = "USED") {
  const res = await fetch(
    `${API_BASE}/listMakes.action?searchType=${searchType}`,
    { headers: { 'Accept': 'application/json' } }
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.errors?.join(", ") || "Failed to fetch makes");
  return { makes: data.makes, distances: data.distances };
}

/**
 * Fetch available models for a given make from CarGurus.
 * @param {string} makeId - e.g. "m7"
 * @param {"NEW"|"USED"} searchType
 */
export async function fetchModels(makeId, searchType = "USED") {
  const res = await fetch(
    `${API_BASE}/listModels.action?searchType=${searchType}&makeId=${makeId}`,
    { headers: { 'Accept': 'application/json' } }
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.errors?.join(", ") || "Failed to fetch models");
  return data.models;
}

/**
 * Build a CarGurus listing search URL (opens in new tab, uses full URL).
 * @param {Object} params
 * @param {string} params.entityId - Make or Model entity ID
 * @param {string} params.postalCode - User's zip code
 * @param {number} params.distance - Search radius
 * @param {"NEW"|"USED"} params.searchType
 */
export function buildListingSearchUrl({ entityId, postalCode, distance, searchType = "USED" }) {
  const params = new URLSearchParams({
    searchType,
    entityId,
    postalCode,
    distance: String(distance),
  });
  return `${CARGURUS_REDIRECT}/listingSearch.action?${params.toString()}`;
}

/**
 * Look up the CarGurus make ID for one of our car brands.
 * @param {string} brand - e.g. "Toyota"
 * @returns {string|null}
 */
export function getCarGurusMakeId(brand) {
  return brandToCarGurusId[brand] || null;
}

export default {
  fetchMakes,
  fetchModels,
  buildListingSearchUrl,
  getCarGurusMakeId,
};
