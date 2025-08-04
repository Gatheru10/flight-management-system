import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <div className="py-5 text-light" style={{ backgroundColor: '#2C3E50' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="fw-bold">Stay Updated</h2>
            <p className="mb-0">
              Subscribe to our newsletter and never miss out on the best travel deals, tips, and offers!
            </p>
          </Col>
          <Col md={6}>
            {submitted ? (
              <Alert variant="success">Thank you for subscribing!</Alert>
            ) : (
              <Form onSubmit={handleSubscribe} className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="me-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="warning" className="fw-bold">
                  Subscribe
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsletterSection;
