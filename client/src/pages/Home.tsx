import { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Row,
  Col,
  Modal,
  Form,
  ListGroup,
} from 'react-bootstrap';
=======
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManagePets = () => {
  const [pets, setPets] = useState<{ name: string; type: string }[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petToRemove, setPetToRemove] = useState('');
  const [selectedPet, setSelectedPet] = useState<{ name: string; type: string } | null>(null);

  // Load pets from localStorage on component mount
  useEffect(() => {
    const storedPets = JSON.parse(localStorage.getItem('pets') || '[]') as { name: string; type: string }[];
    setPets(storedPets);
  }, []);

  // Save pets to localStorage when pets list changes
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  const handleAddPet = () => setShowAddModal(true);
  const handleCloseAdd = () => {
    setShowAddModal(false);
    setPetName('');
    setPetType('');
  };

  const handleSavePet = () => {
    if (!petName || !petType) return;
    const newPet = { name: petName.trim(), type: petType.trim() };
    setPets([...pets, newPet]);
    handleCloseAdd();
  };

  const handleRemovePet = () => setShowRemoveModal(true);
  const handleCloseRemove = () => {
    setShowRemoveModal(false);
    setPetToRemove('');
  };

  const handleConfirmRemove = () => {
    setPets(pets.filter((pet) => pet.name !== petToRemove));
    handleCloseRemove();
  };

  const handleSelectPet = () => setShowSelectModal(true);
  const handleCloseSelect = () => {
    setShowSelectModal(false);
    setSelectedPet(null);
  };

  return (
    <div className="text-light bg-dark p-5 min-vh-100">
      <Container className="text-center">
        <h1 className="mb-5">Manage Your Pets</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="d-grid gap-3">
              <Button variant="primary" size="lg" onClick={handleSelectPet}>
                Select a Pet
              </Button>
              <Button variant="primary" size="lg" onClick={handleAddPet}>
            <Link to="/savedPets">
                <Button variant="primary" size="lg">
                  Select a Pet
                </Button>
              </Link>
              <Button variant="primary" size="lg">
                Add a New Pet
              </Button>
              <Button variant="primary" size="lg" onClick={handleRemovePet}>
                Remove a Pet
              </Button>
            </div>
          </Col>
        </Row>

        {/* Pet List */}
        {pets.length > 0 && (
          <div className="mt-5">
            <h3>Your Pets</h3>
            <ListGroup className="mt-3">
              {pets.map((pet, idx) => (
                <ListGroup.Item key={idx}>
                  {pet.name} ({pet.type})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Container>

      {/* Add Pet Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter pet name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pet Type</Form.Label>
              <Form.Control
                type="text"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                placeholder="e.g., Dog, Cat"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePet}>
            Save Pet
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove Pet Modal */}
      <Modal show={showRemoveModal} onHide={handleCloseRemove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove a Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={petToRemove}
            onChange={(e) => setPetToRemove(e.target.value)}
          >
            <option value="">Select a pet to remove</option>
            {pets.map((pet, idx) => (
              <option key={idx} value={pet.name}>
                {pet.name} ({pet.type})
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemove}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmRemove}
            disabled={!petToRemove}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Select Pet Modal */}
      <Modal show={showSelectModal} onHide={handleCloseSelect} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            onChange={(e) =>
              setSelectedPet(
                pets.find((pet) => pet.name === e.target.value) || null
              )
            }
          >
            <option value="">Select a pet</option>
            {pets.map((pet, idx) => (
              <option key={idx} value={pet.name}>
                {pet.name} ({pet.type})
              </option>
            ))}
          </Form.Select>
          {selectedPet && (
            <div className="mt-3">
              <h5>Selected Pet</h5>
              <p>
                <strong>Name:</strong> {selectedPet.name}
              </p>
              <p>
                <strong>Type:</strong> {selectedPet.type}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSelect}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePets;
