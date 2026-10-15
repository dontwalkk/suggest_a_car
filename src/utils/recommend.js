import cars from "../data/cars";

/**
 * Score each car against the user's answers and return them sorted best → worst.
 * 
 * Key design decisions:
 * - Fuel type is treated as a HARD FILTER when the user picks a specific type.
 *   Non-matching cars receive a heavy penalty (-50), ensuring they never
 *   appear above matching cars regardless of other criteria.
 * - Budget and usage are the next strongest signals (30 and 25 pts).
 * - Terrain, priority, and seats provide further refinement.
 *
 * @param {Object} answers - { budget, usage, terrain, fuelType, priority, seats }
 * @returns {Array} sorted cars with a `score` property
 */
export function getRecommendations(answers) {
  const scored = cars.map((car) => {
    let score = 0;

    // ── Fuel type (hard filter when user has a preference) ──
    if (answers.fuelType === "any") {
      // No preference — all fuel types are fine, small bonus for everyone
      score += 10;
    } else if (car.fuelType === answers.fuelType) {
      // Exact fuel match — big reward
      score += 30;
    } else {
      // User wanted a specific fuel type and this car doesn't match — heavy penalty
      score -= 50;
    }

    // ── Budget match (heavy weight) ──
    if (typeof answers.budget === 'number') {
      const diff = car.price - answers.budget;
      
      if (diff <= 0) {
        // Under or exactly on budget
        score += 30;
      } else if (diff <= 5000) {
        // Slightly over budget (up to $5k)
        score += 20;
      } else if (diff <= 10000) {
        // Moderately over budget (up to $10k)
        score += 10;
      } else {
        // Way over budget, heavy penalty
        score -= 40;
      }
    } else {
      // Fallback for old string-based budget
      if (car.priceRange === answers.budget) {
        score += 30;
      } else {
        // Adjacent budget ranges get partial credit
        const order = ["budget", "mid", "luxury"];
        const diff = Math.abs(order.indexOf(car.priceRange) - order.indexOf(answers.budget));
        if (diff === 1) score += 10;
      }
    }

    // ── Usage match ──
    if (car.usage.includes(answers.usage)) {
      score += 25;
    }
    // Partial credit if car is versatile (multiple usages) but doesn't directly match
    if (car.usage.length > 1 && !car.usage.includes(answers.usage)) {
      score += 5;
    }

    // ── Terrain match ──
    if (car.terrain === answers.terrain) {
      score += 20;
    } else if (car.terrain === "mixed" || answers.terrain === "mixed") {
      score += 10;
    }

    // ── Priority match ──
    if (car.priority === answers.priority) {
      score += 20;
    }

    // ── Seat requirement ──
    const seatsNeeded = parseInt(answers.seats, 10);
    if (car.seats >= seatsNeeded) {
      score += 10;
    }
    // Exact match bonus
    if (car.seats === seatsNeeded) {
      score += 5;
    }

    return { ...car, score };
  });

  // Sort by score descending, break ties by price ascending
  scored.sort((a, b) => b.score - a.score || a.price - b.price);

  return scored;
}
