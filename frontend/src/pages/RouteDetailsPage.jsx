import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Button, Card, Tab, Tabs, Image,
  ListGroup, Table, Badge, Form, Alert
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routeDetailsByDeal } from "../routes/routesData";

const RouteDetailPage = () => {
  const { dealId } = useParams(); // "dealId" must match the param used in App.js
  const navigate = useNavigate();

  const routeDetails = routeDetailsByDeal(dealId);

  const [mainImage, setMainImage] = useState('');
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    departureDate: '',
    travelers: '',
    class: ''
  });

  useEffect(() => {
    if (routeDetails) {
      setMainImage(routeDetails.image);
    }
  }, [routeDetails]);

  if (!routeDetails) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          Deal not found. Please select a valid deal.
        </Alert>
        <Button onClick={() => navigate(-1)} variant="secondary">
          &larr; Back
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form submitted:', formData);
      setShowSuccess(true);
    }

    setValidated(true);
  };

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back to Deals
      </Button>

      <h1 className="mb-4">
        {routeDetails.title} <small className="text-muted">({routeDetails.code})</small>
      </h1>

      <Row>
        <Col lg={8}>
          {/* Image Gallery */}
          <div className="mb-4">
            <Image
              src={mainImage}
              fluid
              rounded
              className="mb-3"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            />
            <Row className="g-2">
              {[routeDetails.image, ...routeDetails.gallery].map((img, index) => (
                <Col xs={3} key={index}>
                  <Image
                    src={img}
                    thumbnail
                    onClick={() => setMainImage(img)}
                    style={{ cursor: 'pointer', height: '80px', objectFit: 'cover' }}
                  />
                </Col>
              ))}
            </Row>
          </div>

          {/* Route Info */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Text>{routeDetails.description}</Card.Text>
              <div className="d-flex flex-wrap justify-content-between gap-2">
                <div><strong>Duration:</strong> {routeDetails.duration}</div>
                <div><strong>Departure:</strong> {routeDetails.departure}</div>
                <div><strong>Aircraft:</strong> {routeDetails.aircraft}</div>
              </div>
            </Card.Body>
          </Card>

          {/* Tabs */}
          <Tabs defaultActiveKey="highlights" className="mb-4">
            <Tab eventKey="highlights" title="Highlights">
              <ListGroup variant="flush">
                {routeDetails.highlights.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>

            <Tab eventKey="pricing" title="Pricing">
              <div>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Base Fare</td>
                      <td>{routeDetails.currency} {routeDetails.price.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Taxes & Fees</td>
                      <td>{routeDetails.currency} 3,200</td>
                    </tr>
                    <tr className="table-active">
                      <th>Total</th>
                      <th>{routeDetails.currency} {(routeDetails.price + 3200).toLocaleString()}</th>
                    </tr>
                  </tbody>
                </Table>

                <h5 className="mt-4">Special Deals</h5>
                <div className="d-flex flex-wrap gap-2">
                  {routeDetails.deals.map((deal, index) => (
                    <Badge bg="info" key={index} className="fs-6 p-2">
                      {deal.type}: {deal.discount}
                    </Badge>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab eventKey="reviews" title="Reviews">
              <div className="p-3">Customer reviews will appear here.</div>
            </Tab>
          </Tabs>
        </Col>

        {/* Booking Form */}
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Book This Flight
              </Card.Title>

              <div className="text-center mb-4">
                <h3 className="text-danger">{routeDetails.currency} {routeDetails.price.toLocaleString()}</h3>
                <small className="text-muted">+ taxes and fees</small>
              </div>

              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  Booking request submitted!
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Travelers</Form.Label>
                  <Form.Select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business Class</option>
                    <option value="first">First Class</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Book Now
                  </Button>
                  <Button variant="outline-secondary">
                    Save for Later
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RouteDetailPage;
