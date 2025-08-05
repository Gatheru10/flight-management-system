import React from "react";
import { FaWifi, FaDumbbell, FaCoffee } from "react-icons/fa";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    name: "Atlantis The Palm",
    type: "Luxury",
    location: "Palm Jumeirah, Dubai",
    rating: 4.9,
    pricePerNight: 18000,
    imageUrl: "/Images/atlantis.jpg",
    website: "https://www.atlantis.com/dubai",
    amenities: ["wifi", "gym", "breakfast"],
    description:
      "Atlantis The Palm is an iconic luxury resort with stunning sea views and unmatched hospitality.",
  },
  {
    id: 2,
    name: "Rove Downtown",
    type: "Budget",
    location: "Downtown Dubai",
    rating: 4.3,
    pricePerNight: 8000,
    imageUrl: "/Images/rove.jpg",
    website: "https://www.rovehotels.com",
    amenities: ["wifi", "gym", "breakfast"],
    description:
      "Rove Downtown is a stylish and affordable hotel close to the Burj Khalifa and Dubai Mall.",
  },
  {
    id: 3,
    name: "Jumeirah Beach Hotel",
    type: "Resort",
    location: "Jumeirah Road, Dubai",
    rating: 4.7,
    pricePerNight: 15000,
    imageUrl: "/Images/jumeirah.jpg",
    website: "https://www.jumeirah.com",
    amenities: ["wifi", "gym"],
    description:
      "Jumeirah Beach Hotel offers a luxurious beachfront experience with world-class amenities.",
  },
  {
    id: 4,
    name: "Premier Inn Dubai International Airport",
    type: "Economy",
    location: "Dubai Airport",
    rating: 4.1,
    pricePerNight: 6000,
    imageUrl: "/Images/premierinn.jpg",
    website: "https://mena.premierinn.com",
    amenities: ["wifi", "breakfast"],
    description:
      "Ideal for short stays, Premier Inn near Dubai Airport offers comfort, convenience, and free shuttle service.",
  },
];

const renderAmenityIcon = (amenity) => {
  switch (amenity) {
    case "wifi":
      return <FaWifi className="me-2 text-primary" title="WiFi" />;
    case "gym":
      return <FaDumbbell className="me-2 text-success" title="Gym" />;
    case "breakfast":
      return <FaCoffee className="me-2 text-warning" title="Breakfast" />;
    default:
      return null;
  }
};

const HotelTeaser = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold">🏨 Recommended Hotels</h3>
      <Row xs={1} sm={2} md={2} lg={2} className="g-3">
        {hotels.map((hotel) => (
          <Col key={hotel.id}>
            <Card className="h-100 shadow-sm border-0" style={{ fontSize: "0.9rem" }}>
              <Card.Img
                variant="top"
                src={hotel.imageUrl}
                alt={hotel.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: "1rem" }}>
                  {hotel.name}
                  <Badge bg="info" className="text-dark">{hotel.type}</Badge>
                </Card.Title>
                <Card.Text className="mb-2">
                  <strong>📍</strong> {hotel.location} <br />
                  <strong>⭐</strong> {hotel.rating} / 5 <br />
                  <strong>💰</strong> KSH {hotel.pricePerNight.toLocaleString()} / night
                </Card.Text>

                <div className="text-muted small mb-2">
                  {hotel.description.slice(0, 90)}...
                </div>

                <div className="mb-3 d-flex align-items-center">
                  {hotel.amenities.map((amenity) => (
                    <span key={amenity}>{renderAmenityIcon(amenity)}</span>
                  ))}
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/hotel-teaser/${hotel.id}`)}
                  >
                    Details
                  </Button>
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Visit Site
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HotelTeaser;
