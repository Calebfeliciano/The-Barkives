import { useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import "../styles/ServicesPage.css";

const Services = () => {
  const [service, setService] = useState('');
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.trim()) {
      setServicesList([...servicesList, service.trim()]);
      setService('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="services-page">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Front of the card */}
          <div className="flip-card-front">
            <h2>Add a Service</h2>
            <Form className="service-form" onSubmit={handleAddService}>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Walking, Grooming"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </Form.Group>
              <div className="button-group">
                <Button  type="submit">
                  Add Service
                </Button>
                <Button
                variant="secondary"
                onClick={() => setIsFlipped(true)}
                >
                View Services
                </Button>
              </div>
            </Form>
            {showAlert && <Alert variant="success" className="mt-3">Service added!</Alert>}
          </div>

          {/* Back of the card */}
          <div className="flip-card-back">
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
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => setIsFlipped(false)}
            >
              Back to Add Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
