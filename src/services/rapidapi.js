export async function fetchListings({ make, model, zip, radius = 50 }) {
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  
  if (!apiKey) {
    console.warn("VITE_RAPIDAPI_KEY not found. Using mock listings data.");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockListings(make, model, zip));
      }, 1500);
    });
  }

  // Example real API call to MarketCheck via RapidAPI
  const url = `https://marketcheck-prod.p.rapidapi.com/search/car/active?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&zip=${zip}&radius=${radius}&car_type=used&start=0&rows=10`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'marketcheck-prod.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();
    return data.listings || [];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch listings from RapidAPI");
  }
}

function generateMockListings(make, model, zip) {
  // Generate a few visually appealing mock listings
  const basePrice = 25000;
  const mockImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
    "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&q=80",
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&q=80"
  ];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `mock-${i}`,
    heading: `2023 ${make} ${model}`.trim(),
    price: basePrice + Math.floor(Math.random() * 15000),
    miles: Math.floor(Math.random() * 40000) + 5000,
    vdp_url: `https://www.carmax.com/cars?searchQuery=${encodeURIComponent(make + ' ' + model)}`,
    dealer: {
      name: `Premium Auto Motors - ${zip}`,
      city: "Local City",
      state: "CA"
    },
    media: {
      photo_links: [mockImages[i % mockImages.length]]
    }
  }));
}
