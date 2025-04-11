import { useState } from 'react';
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

// Component for managing and displaying pet services
const Services = () => {
  // State to track current input in the form
  const [service, setService] = useState('');
  // State to track the list of added services
  const [servicesList, setServicesList] = useState<string[]>([]);

  // Function to handle form submission and add service to the list
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.trim()) {
      setServicesList([...servicesList, service.trim()]);
      setService('');
    }
  };

  return (
    // Main container for spacing and layout
    <Container className="mt-4">
      <Row>
        {/* Left column: Form to add a new service */}
        <Col md={6}>
          <h2>Add a Service</h2>
          <Form onSubmit={handleAddService}>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Walking, Grooming"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Service
            </Button>
          </Form>
        </Col>

        {/* Right column: List of services already added */}
        <Col md={6}>
          <h2>Services Provided</h2>
          {servicesList.length > 0 ? (
            <ListGroup>
              {servicesList.map((s, index) => (
                <ListGroup.Item key={index}>{s}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No services added yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
