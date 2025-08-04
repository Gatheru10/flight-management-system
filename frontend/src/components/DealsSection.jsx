import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DealsSection = () => {
  const navigate = useNavigate();

  const allDeals = [
    {
      id: 1,
      dealType: "luxury",
      route: "Nairobi (NBO) to Eldoret (EDL)",
      price: "KSH 7,000",
      offer: "Fly Business Class: Pay Economy (limited availability)",
      image: "/images/Des1.jpg"
    },
    {
      id: 2,
      dealType: "honeymoon",
      route: "Nairobi (NBO) to Dubai (DXB)",
      price: "KSH 20,000",
      offer: "Honeymoon Special: Book now and get a free room upgrade!",
      image: "/images/Des2.jpg"
    },
    {
      id: 3,
      dealType: "family",
      route: "Nairobi (NBO) to Mombasa (MBA)",
      price: "KSH 5,500",
      offer: "Early Bird Special: 15% off for bookings made before noon",
      image: "/images/Des3.jpg"
    },
    {
      id: 4,
      dealType: "adventure",
      route: "Nairobi (NBO) to London (LHR)",
      price: "KSH 45,000",
      offer: "Student Discount: 20% off with valid student ID",
      image: "/images/Des4.jpg"
    }
  ];

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Trending Destinations & Deals</h2>
      <Row className="g-3">
        {allDeals.map((deal) => (
          <Col key={deal.id} xs={12} md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={deal.image}
                alt={deal.route}
                style={{ height: '160px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column justify-content-between p-3">
                <div>
                  <Card.Title className="fs-5">{deal.route}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted fs-6">
                    Price: <strong>{deal.price}</strong>
                  </Card.Subtitle>
                  <Card.Text className="bg-light p-2 rounded small">
                    {deal.offer}
                  </Card.Text>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/route-details/${deal.dealType}`)}
                  className="mt-2 btn-sm align-self-start"
                >
                  Explore Route
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DealsSection;
