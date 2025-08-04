// src/TestGrid.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const TestGrid = () => {
  const testCards = [
    { id: 1, title: 'Card 1', text: 'This is the first card' },
    { id: 2, title: 'Card 2', text: 'This is the second card' },
    { id: 3, title: 'Card 3', text: 'This is the third card' },
    { id: 4, title: 'Card 4', text: 'This is the fourth card' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">2 x 2 Grid Test</h2>
      <Row xs={1} sm={2} md={2} className="g-4">
        {testCards.map((card) => (
          <Col key={card.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestGrid;
