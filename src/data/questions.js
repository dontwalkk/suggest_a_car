// Quiz questions for the car suggestion flow
const questions = [
  {
    id: "budget",
    question: "What's your budget range?",
    subtitle: "Let's find something that fits your wallet",
    icon: "💰",
    inputType: "range",
    min: 1000,
    max: 100000,
    step: 1000,
    formatLabel: (val) => val >= 100000 ? "$100,000+" : `$${val.toLocaleString()}`,
  },
  {
    id: "usage",
    question: "What will you mainly use it for?",
    subtitle: "Your lifestyle shapes the perfect pick",
    icon: "🎯",
    options: [
      { value: "commute", label: "Daily Commute", description: "Getting to work & back", icon: "🏢" },
      { value: "family", label: "Family Life", description: "Kids, groceries, road trips", icon: "👨‍👩‍👧‍👦" },
      { value: "adventure", label: "Adventure", description: "Off-road, camping, exploring", icon: "⛰️" },
      { value: "fun", label: "Pure Fun", description: "Thrills & weekend drives", icon: "🏎️" },
      { value: "work", label: "Work & Hauling", description: "Towing, cargo, job sites", icon: "🔧" },
    ],
  },
  {
    id: "terrain",
    question: "Where do you drive most?",
    subtitle: "The road shapes the ride",
    icon: "🛣️",
    options: [
      { value: "city", label: "City Streets", description: "Urban driving & highways", icon: "🌆" },
      { value: "mixed", label: "Mix of Everything", description: "City, suburbs, some trails", icon: "🔀" },
      { value: "offroad", label: "Off-Road / Rural", description: "Dirt, gravel, trails", icon: "🌲" },
    ],
  },
  {
    id: "fuelType",
    question: "Any fuel preference?",
    subtitle: "Gasoline, electric, or a bit of both",
    icon: "⛽",
    options: [
      { value: "Gas", label: "Gasoline", description: "Classic & widely available", icon: "⛽" },
      { value: "Electric", label: "Electric", description: "Zero emissions, instant torque", icon: "⚡" },
      { value: "Hybrid", label: "Hybrid", description: "Best of both worlds", icon: "🔋" },
      { value: "any", label: "No Preference", description: "I'm open to anything", icon: "🤷" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    subtitle: "Pick the one thing you won't compromise on",
    icon: "⭐",
    options: [
      { value: "reliability", label: "Reliability", description: "Runs forever, low maintenance", icon: "🛡️" },
      { value: "performance", label: "Performance", description: "Speed, power, handling", icon: "🚀" },
      { value: "comfort", label: "Comfort", description: "Smooth ride, quiet cabin", icon: "🛋️" },
      { value: "technology", label: "Technology", description: "Latest features & gadgets", icon: "📱" },
      { value: "fun", label: "Fun Factor", description: "Driving excitement", icon: "🎉" },
      { value: "practicality", label: "Practicality", description: "Space, towing, cargo", icon: "📦" },
    ],
  },
  {
    id: "seats",
    question: "How many seats do you need?",
    subtitle: "Just you, or the whole crew?",
    icon: "💺",
    options: [
      { value: "2", label: "2 Seats", description: "Just me (and maybe a +1)", icon: "🧑" },
      { value: "5", label: "4–5 Seats", description: "Standard for most needs", icon: "👥" },
      { value: "7", label: "6+ Seats", description: "Big family or carpool", icon: "👨‍👩‍👧‍👦" },
    ],
  },
];

export default questions;
