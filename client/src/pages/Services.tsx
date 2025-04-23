import { useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_APPOINTMENT } from '../utils/mutations';
import { GET_APPOINTMENTS } from '../utils/queries';
import Auth from '../utils/auth';
import IJwtPayload from '../types/JwtPayload';
import '../styles/ServicesPage.css';

type ServiceItem = {
  _id: string;
  name: string;
  date: string;
  time: string;
};

const Services = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const profile = Auth.getProfile() as IJwtPayload;
  const userId = profile?.data?._id;

  const { data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: { userId },
    skip: !userId,
  });

  const [addAppointment] = useMutation(ADD_APPOINTMENT, {
    onCompleted: () => {
      refetch();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    },
  });

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service.trim() || !date || !time || !userId) return;

    await addAppointment({
      variables: {
        userId,
        input: {
          title: `Service: ${service}`,
          description: description || `Scheduled service - ${service}`,
          date,
          time,
        },
      },
    });

    setService('');
    setDate('');
    setTime('');
    setDescription('');
  };

  const today = new Date().toLocaleDateString('en-CA');

  const services: ServiceItem[] = (data?.appointmentsByUser || [])
    .filter((appt: any) => appt.title?.startsWith('Service:'))
    .map((appt: any) => ({
      _id: appt._id,
      name: appt.title.replace('Service: ', ''),
      date: appt.date,
      time: appt.time,
    }))
    .filter((s: ServiceItem) => s.date >= today)
    .sort((a: ServiceItem, b: ServiceItem) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="services-page">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Front of the card */}
          <div className="flip-card-front" id="service-card">
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

              <Form.Group className="mb-3">
                <Form.Label>Service Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Service Time</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <div className="button-group">
                <Button type="submit">Add Service</Button>
                <Button variant="secondary" onClick={() => setIsFlipped(true)}>
                  View Services
                </Button>
              </div>
            </Form>

            {showAlert && (
              <Alert variant="success" className="alert-floating">
                Service added!
              </Alert>
            )}
          </div>

          {/* Back of the card */}
          <div className="flip-card-back">
            <h2>Scheduled Services</h2>
            {services.length > 0 ? (
              <div className="scroll-box">
                <ListGroup>
                  {services.map((s, index) => (
                    <ListGroup.Item key={index}>
                      <Link
                        to={`/calendar?date=${s.date}&id=${s._id}`}
                        className="text-decoration-none"
                      >
                        {s.name} on {new Date(s.date).toLocaleDateString()} at{' '}
                        {new Date(`1970-01-01T${s.time}`).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            ) : (
              <p>No services added yet.</p>
            )}
            <Button variant="secondary" className="mt-3" onClick={() => setIsFlipped(false)}>
              Back to Add Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
