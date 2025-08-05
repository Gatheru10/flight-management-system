import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightDealsCarousel.css";

const deals = [
  {
    id: 1,
    route: "Nairobi → Mombasa",
    airline: "Kenya Airways",
    time: "08:00 → 09:30",
    duration: "1h 30m",
    price: "KSh 9,900",
    oldPrice: "KSh 15,000",
    discount: "34% OFF",
    validUntil: "8/15/2025",
    image: "/Images/Des1.jpg",
  },
  {
    id: 2,
    route: "Nairobi → Kisumu",
    airline: "Jambojet",
    time: "14:00 → 15:10",
    duration: "1h",
    price: "KSh 7,500",
    oldPrice: "KSh 12,000",
    discount: "38% OFF",
    validUntil: "8/20/2025",
    image: "/Images/Des6.jpg",
  },
  {
    id: 3,
    route: "Nairobi → Eldoret",
    airline: "Safarilink",
    time: "11:00 → 12:15",
    duration: "1h 15m",
    price: "KSh 6,800",
    oldPrice: "KSh 10,500",
    discount: "35% OFF",
    validUntil: "8/18/2025",
    image: "/Images/Des5.jpg",
  },
  {
    id: 4,
    route: "Nairobi → Malindi",
    airline: "Fly540",
    time: "13:30 → 15:00",
    duration: "1h 30m",
    price: "KSh 8,200",
    oldPrice: "KSh 13,000",
    discount: "37% OFF",
    validUntil: "8/25/2025",
    image: "/Images/Des3.jpg",
  },
];

export default function FlightDealsCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 2) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleDeals = [
    deals[index % deals.length],
    deals[(index + 1) % deals.length],
  ];

  const handleBookClick = (deal) => {
    navigate(`/flight-details/${deal.id}`, { state: { deal } });
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="fw-bold fs-4">Limited Time Offers</h2>
          <p className="text-muted small mb-0">Don't miss out on these amazing flight deals across Kenya!</p>
        </div>
      </div>

      <div className="row g-3">
        {visibleDeals.map((deal) => (
          <div className="col-md-6" key={deal.id}>
            <div className="card h-100 border-0 shadow-sm">
              <div
                className="card-img-top position-relative"
                style={{
                  height: "120px",
                  backgroundImage: `url(${deal.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded small">
                  {deal.discount}
                </span>
                <h6 className="position-absolute bottom-0 start-0 text-white bg-dark bg-opacity-50 px-2 py-1 m-2 mb-2 rounded">
                  {deal.route}
                </h6>
              </div>
              <div className="card-body p-3">
                <p className="text-muted small mb-1">{deal.airline}</p>
                <p className="fw-semibold small mb-2">{deal.time}</p>
                <div className="d-flex align-items-center mb-2">
                  <span className="text-primary fw-bold me-2">{deal.price}</span>
                  <del className="text-muted small">{deal.oldPrice}</del>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-3">
                  <span>🕒 {deal.duration}</span>
                  <span>Valid: {deal.validUntil}</span>
                </div>
                <button
                  className="btn btn-sm btn-primary w-100"
                  onClick={() => handleBookClick(deal)}
                >
                  Book This Deal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
