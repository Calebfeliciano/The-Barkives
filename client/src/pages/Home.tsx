import { Container, Button, Row, Col } from 'react-bootstrap';

const ManagePets = () => {
  return (
    <div className="text-light bg-dark p-5 min-vh-100">
      <Container className="text-center">
        <h1 className="mb-5">Manage Your Pets</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="d-grid gap-3">
              <Button variant="primary" size="lg">
                Select a Pet
              </Button>
              <Button variant="primary" size="lg">
                Add a New Pet
              </Button>
              <Button variant="primary" size="lg">
                Remove a Pet
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManagePets;
