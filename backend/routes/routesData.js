// src/data/routesData.js
const routeDetails = {
  "nbo-dxb": {
    route: "Nairobi to Dubai",
    image: "/images/nairobi-dubai.jpg",
    quickFacts: {
      duration: "5h 10m",
      distance: "3,520 km",
      averageCost: "KSH 40,000"
    },
    flightOptions: [
      {
        airline: "Emirates",
        departureTime: "08:00 AM",
        arrivalTime: "01:10 PM",
        price: "KSH 45,000"
      },
      {
        airline: "Kenya Airways",
        departureTime: "10:00 AM",
        arrivalTime: "03:10 PM",
        price: "KSH 42,000"
      }
    ],
    specialDeals: [
      {
        title: "Summer Offer",
        description: "10% off on round-trip bookings"
      },
      {
        title: "Family Pack",
        description: "Kids travel free with 2 adults"
      }
    ],
    destinationHighlights: {
      weather: "Sunny, 38°C",
      attractions: ["Burj Khalifa", "Dubai Mall", "Desert Safari"]
    },
    hotels: [
      {
        id: "atlantis-the-palm",
        name: "Atlantis The Palm",
        description: "Luxury resort on the Palm Jumeirah",
        location: "Palm Jumeirah, Dubai",
        price: "KSH 18,000/night",
        rating: 4.9,
        imageUrl: "/images/hotel1.jpg",
        images: ["/images/hotel1.jpg", "/images/hotel1b.jpg", "/images/hotel1c.jpg"],
        badge: "Luxury",
        amenities: {
          wifi: true,
          pool: true,
          restaurant: true,
          gym: true
        },
        packageTags: ["Free Spa Access", "Complimentary Breakfast", "Airport Transfer Included"],
        website: "https://www.atlantis.com/dubai/atlantis-the-palm",
        reviews: [
          {
            name: "Aisha Mohamed",
            rating: 5,
            comment: "The resort was breathtaking. Worth every cent!"
          },
          {
            name: "Kevin Mburu",
            rating: 4,
            comment: "Excellent service and amenities. The pool was amazing!"
          }
        ]
      },
      {
        id: "rove-downtown",
        name: "Rove Downtown",
        description: "Affordable comfort in downtown Dubai",
        location: "Downtown Dubai",
        price: "KSH 8,000/night",
        rating: 4.3,
        imageUrl: "/images/hotel2.jpg",
        images: ["/images/hotel2.jpg", "/images/hotel2b.jpg"],
        badge: "Budget",
        amenities: {
          wifi: true,
          pool: false,
          restaurant: true,
          gym: true
        },
        packageTags: ["Free Late Checkout", "City View Rooms"],
        website: "https://www.rovehotels.com/en/hotels/rove-downtown/",
        reviews: [
          {
            name: "Lucy Wanjiku",
            rating: 4,
            comment: "Great value and location. The breakfast was decent too."
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Jane Doe",
        rating: 5,
        comment: "Amazing experience, smooth flight and great service!"
      },
      {
        name: "John Smith",
        rating: 4,
        comment: "Good value for money. Enjoyed the Dubai trip."
      }
    ]
  },

  "nbo-ams": {
    route: "Nairobi to Amsterdam",
    image: "/images/nairobi-amsterdam.jpg",
    quickFacts: {
      duration: "8h 30m",
      distance: "6,540 km",
      averageCost: "KSH 55,000"
    },
    flightOptions: [
      {
        airline: "KLM Royal Dutch Airlines",
        departureTime: "06:45 PM",
        arrivalTime: "04:15 AM",
        price: "KSH 57,500"
      },
      {
        airline: "Kenya Airways",
        departureTime: "09:20 PM",
        arrivalTime: "06:00 AM",
        price: "KSH 54,800"
      }
    ],
    specialDeals: [
      {
        title: "Autumn Getaway",
        description: "Save up to 20% when booking for October travels"
      },
      {
        title: "Weekend Saver",
        description: "Free seat selection for weekend flights"
      }
    ],
    destinationHighlights: {
      weather: "Cool, 17°C",
      attractions: ["Rijksmuseum", "Tulip Fields", "Vondelpark"]
    },
    hotels: [
      {
        id: "ink-hotel-amsterdam",
        name: "INK Hotel Amsterdam",
        description: "Chic design in the heart of the city",
        location: "Nieuwezijds Voorburgwal, Amsterdam",
        price: "KSH 19,500/night",
        rating: 4.7,
        imageUrl: "/images/hotel5.jpg",
        images: ["/images/hotel5.jpg", "/images/hotel5b.jpg"],
        badge: "Luxury",
        amenities: {
          wifi: true,
          pool: false,
          restaurant: true,
          gym: false
        },
        packageTags: ["Art Tour Access", "Couples Getaway"],
        website: "https://www.inkhotels.com/amsterdam/",
        reviews: [
          {
            name: "Fatma Noor",
            rating: 5,
            comment: "The KLM flight was on time and super comfortable. Loved Amsterdam!"
          },
          {
            name: "David Otieno",
            rating: 4,
            comment: "Booked the weekend deal—totally worth it. The tulip fields were breathtaking."
          }
        ]
      },
      {
        id: "clinknoord-hostel",
        name: "ClinkNOORD Hostel",
        description: "Modern budget stay with a vibrant vibe",
        location: "Overhoeksplein, Amsterdam",
        price: "KSH 7,500/night",
        rating: 4.2,
        imageUrl: "/images/hotel6.jpg",
        images: ["/images/hotel6.jpg", "/images/hotel6b.jpg"],
        badge: "Budget",
        amenities: {
          wifi: true,
          pool: false,
          restaurant: false,
          gym: false
        },
        packageTags: ["Solo Travel Pack"],
        website: "https://www.clinkhostels.com/amsterdam/clinknoord/",
        reviews: [
          {
            name: "Joy Wangui",
            rating: 4,
            comment: "Very friendly staff and excellent public transport connections."
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Fatma Noor",
        rating: 5,
        comment: "The KLM flight was on time and super comfortable. Loved Amsterdam!"
      },
      {
        name: "David Otieno",
        rating: 4,
        comment: "Booked the weekend deal—totally worth it. The tulip fields were breathtaking."
      }
    ]
  }
};

export default routeDetails;
