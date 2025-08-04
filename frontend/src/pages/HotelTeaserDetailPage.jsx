import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Button, 
  Card, 
  Row, 
  Col, 
  Carousel,
  ListGroup,
  Form,
  Alert,
  Badge
} from "react-bootstrap";
import { FaWifi, FaDumbbell, FaCoffee, FaSwimmingPool, FaParking, FaTv, FaUtensils } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const HotelTeaserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [bookingDates, setBookingDates] = React.useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1
  });

  // Sample data - in a real app you would fetch this based on the ID
  const hotels = [
    {
      id: 1,
      name: "Atlantis The Palm",
      type: "Luxury",
      location: "Palm Jumeirah, Dubai",
      rating: 4.9,
      pricePerNight: 18000,
      images: [
        "/images/atlantis.jpg",
        "/images/atlantis-pool.jpg",
        "/images/atlantis-room.jpg",
        "/images/atlantis-lobby.jpg"
      ],
      amenities: ["wifi", "gym", "breakfast", "pool", "parking", "restaurant"],
      description: "Experience ultimate luxury at Atlantis The Palm, featuring underwater suites, world-class dining, and the largest waterpark in the region.",
      facilities: [
        "Free WiFi throughout the property",
        "24-hour fitness center",
        "Multiple swimming pools",
        "10 restaurants and bars",
        "Full-service spa",
        "Kids club"
      ],
      policies: [
        "Check-in: 3:00 PM | Check-out: 12:00 PM",
        "Cancellation policy: Free cancellation up to 48 hours before arrival",
        "Pets not allowed",
        "Credit cards accepted"
      ]
    },
    {
  id: 2,
  name: "Rove Downtown",
  type: "Budget",
  location: "Downtown Dubai",
  rating: 4.5,
  pricePerNight: 6000,
  images: [
    "/images/rove.jpg",
    "/images/rove-room.jpg",
    "/images/rove-lobby.jpg",
    "/images/rove-rooftop.jpg"
  ],
  amenities: ["wifi", "gym", "parking", "restaurant"],
  description: "A stylish and affordable hotel in the heart of the city, just a short walk from the Burj Khalifa and Dubai Mall.",
  facilities: [
    "Free WiFi in all rooms and public areas",
    "24-hour self-service laundry",
    "Outdoor pool with skyline view",
    "Grab-and-go food options",
    "Game zone with arcade machines",
    "Co-working spaces"
  ],
  policies: [
    "Check-in: 2:00 PM | Check-out: 12:00 PM",
    "Cancellation policy: Free cancellation up to 24 hours before arrival",
    "Pets not allowed",
    "Credit cards and contactless payments accepted"
  ]
},
{
  id: 3,
  name: "Jumeirah Beach Hotel",
  type: "Resort",
  location: "Jumeirah Beach, Dubai",
  rating: 4.8,
  pricePerNight: 15000,
  images: [
    "/images/jumeirah.jpg",
    "/images/jumeirah-beach.jpg",
    "/images/jumeirah-room.jpg",
    "/images/jumeirah-spa.jpg"
  ],
  amenities: ["wifi", "gym", "breakfast", "pool", "parking", "beachfront", "spa"],
  description: "A family-friendly beachfront resort offering iconic views of the Burj Al Arab and direct beach access.",
  facilities: [
    "Private beach access",
    "6 swimming pools including kids’ pool",
    "Waterpark access at Wild Wadi",
    "Premium spa and wellness center",
    "Multiple dining options",
    "Kids play area and babysitting service"
  ],
  policies: [
    "Check-in: 3:00 PM | Check-out: 12:00 PM",
    "Cancellation policy: Free cancellation up to 72 hours before arrival",
    "Pets not allowed",
    "Major credit cards accepted"
  ]
},
{
  id: 4,
  name: "Premier Inn Dubai Airport",
  type: "Budget",
  location: "Dubai International Airport",
  rating: 4.2,
  pricePerNight: 4500,
  images: [
    "/images/premierinn.jpg",
    "/images/premierinn-room.jpg",
    "/images/premierinn-lobby.jpg",
    "/images/premierinn-rooftop.jpg"
  ],
  amenities: ["wifi", "parking", "airportShuttle", "restaurant"],
  description: "Conveniently located near DXB, Premier Inn offers comfort and value for business and transit travelers.",
  facilities: [
    "Free airport shuttle service",
    "Rooftop swimming pool",
    "24-hour restaurant and bar",
    "Business center and meeting rooms",
    "Free parking for guests",
    "Self-check-in kiosks"
  ],
  policies: [
    "Check-in: 2:00 PM | Check-out: 12:00 PM",
    "Cancellation policy: Free cancellation up to 24 hours before arrival",
    "Service animals only",
    "All major credit cards accepted"
  ]
}
  ];

  const hotel = hotels.find(h => h.id === parseInt(id)) || hotels[0];

  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi": return <FaWifi className="me-2" title="WiFi" />;
      case "gym": return <FaDumbbell className="me-2" title="Gym" />;
      case "breakfast": return <FaCoffee className="me-2" title="Breakfast" />;
      case "pool": return <FaSwimmingPool className="me-2" title="Pool" />;
      case "parking": return <FaParking className="me-2" title="Parking" />;
      case "tv": return <FaTv className="me-2" title="TV" />;
      case "restaurant": return <FaUtensils className="me-2" title="Restaurant" />;
      default: return null;
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    // In a real app, you would handle the booking submission here
    console.log("Booking submitted:", bookingDates);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="my-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center"
      >
        <IoIosArrowBack className="me-1" /> Back to Hotels
      </Button>

      <h1 className="mb-4">{hotel.name}</h1>
      <p className="text-muted mb-4">{hotel.location} • ⭐ {hotel.rating}/5</p>

      <Row>
        <Col lg={8}>
          {/* Image Carousel */}
          <Carousel className="mb-4 rounded overflow-hidden">
            {hotel.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`${hotel.name} view ${index + 1}`}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Hotel Description */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>About {hotel.name}</Card.Title>
              <Card.Text>{hotel.description}</Card.Text>
            </Card.Body>
          </Card>

          {/* Amenities */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Amenities</Card.Title>
              <div className="d-flex flex-wrap gap-3">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="d-flex align-items-center">
                    {renderAmenityIcon(amenity)}
                    <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Facilities & Policies */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Facilities</Card.Title>
                  <ListGroup variant="flush">
                    {hotel.facilities.map((facility, index) => (
                      <ListGroup.Item key={index}>{facility}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Policies</Card.Title>
                  <ListGroup variant="flush">
                    {hotel.policies.map((policy, index) => (
                      <ListGroup.Item key={index}>{policy}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Booking Card */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <Card.Title className="text-center mb-3">Book Your Stay</Card.Title>
              
              {showSuccess && (
                <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                  Booking request received! We'll contact you shortly.
                </Alert>
              )}

              <div className="text-center mb-4">
                <h3 className="text-primary">KSH {hotel.pricePerNight.toLocaleString()}</h3>
                <small className="text-muted">per night (excl. taxes)</small>
                <Badge bg="success" className="ms-2">Free Cancellation</Badge>
              </div>

              <Form onSubmit={handleBooking}>
                <Form.Group className="mb-3">
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkIn"
                    value={bookingDates.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOut"
                    value={bookingDates.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Guests</Form.Label>
                      <Form.Select
                        name="guests"
                        value={bookingDates.guests}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Rooms</Form.Label>
                      <Form.Select
                        name="rooms"
                        value={bookingDates.rooms}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" size="lg" className="w-100 mb-2" type="submit">
                  Book Now
                </Button>

                <Button variant="outline-secondary" className="w-100">
                  Contact Hotel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelTeaserDetailPage;