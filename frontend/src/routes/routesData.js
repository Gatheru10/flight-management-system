const routesData = {
  honeymoon: {
    id: 1,
    title: "Nairobi to Dubai",
    code: "NBO-DXB",
    description: "Enjoy romantic Dubai escapes with exclusive perks.",
    image: "/images/dxb.jpg",
    gallery: ["/images/dxb1.jpg", "/images/dxb2.jpg", "/images/dxb3.jpg"],
    price: 20000,
    currency: "KSH",
    duration: "4h 30m",
    departure: "Daily at 10:00 AM and 8:00 PM",
    airline: "Kenya Airways",
    aircraft: "Boeing 787 Dreamliner",
    highlights: [
      "Free hotel transfer", "35kg baggage allowance", "In-flight entertainment", "Meal included"
    ],
    deals: [
      { type: "Honeymoon", discount: "Free room upgrade" },
      { type: "Family", discount: "Kids under 12 fly free" }
    ]
  },
  family: {
    id: 2,
    title: "Nairobi to Mombasa",
    code: "NBO-MBA",
    description: "Perfect for families: sun, sand, and fun in Mombasa!",
    image: "/images/mombasa.jpg",
    gallery: ["/images/mba1.jpg", "/images/mba2.jpg", "/images/mba3.jpg"],
    price: 5000,
    currency: "KSH",
    duration: "1h 10m",
    departure: "Hourly flights",
    airline: "Jambojet",
    aircraft: "Bombardier Dash 8 Q400",
    highlights: [
      "Free snacks for kids", "Extra legroom", "Window seats", "Friendly staff"
    ],
    deals: [
      { type: "Family", discount: "Kids under 12 fly free" }
    ]
  },
  luxury: {
    id: 3,
    title: "Nairobi to Paris",
    code: "NBO-CDG",
    description: "Luxury European getaway to the city of lights.",
    image: "/images/paris.jpg",
    gallery: ["/images/Des4.jpg", "/images/Des5.jpg", "/images/Des6.jpg", "/images/Des1.jpg"],
    price: 85000,
    currency: "KSH",
    duration: "9h 15m",
    departure: "Mon, Wed, Fri",
    airline: "Air France",
    aircraft: "Airbus A350",
    highlights: [
      "Champagne on board", "Flatbed seats", "Priority boarding", "Lounges access"
    ],
    deals: [
      { type: "Luxury", discount: "Complimentary limo transfer" }
    ]
  },
  adventure: {
    id: 4,
    title: "Nairobi to Victoria Falls",
    code: "NBO-VFA",
    description: "Thrill seekers — explore one of the 7 wonders of the world!",
    image: "/images/vicfalls.jpg",
    gallery: ["/images/Des1.jpg", "/images/Des2.jpg", "/images/Des3.jpg", "/images/Des4.jpg"],
    price: 30000,
    currency: "KSH",
    duration: "3h 50m",
    departure: "Tue, Thu, Sat",
    airline: "Fastjet",
    aircraft: "Embraer E190",
    highlights: [
      "Adventure tours included", "Wildlife excursions", "Discounted park entry", "Travel insurance"
    ],
    deals: [
      { type: "Adventure", discount: "Free bungee jump"
    }]
  }
};

export default routesData;

// Utility to find route details based on deal type
export const routeDetailsByDeal = (dealType) => {
  const match = Object.values(routesData).find(route =>
    route.deals.some(deal => deal.type.toLowerCase() === dealType.toLowerCase())
  );
  return match || null;
};