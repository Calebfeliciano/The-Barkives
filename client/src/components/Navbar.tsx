
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { IoPawOutline } from "react-icons/io5";
import '../styles/index.css';


import Auth from '../utils/auth';

type NavbarProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppNavbar: React.FC<NavbarProps> = ({ showModal, setShowModal }) => {

  return (
    <>
      <Navbar className= "navbar">
        <Container fluid>
          <Navbar.Brand className='logo' as={Link} to='/'>
            The Barkives <IoPawOutline />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ms-auto'>
              {/* Only show these links if the user is logged in */} 
              {Auth.loggedIn() ? (
                <>
                  <div className='nav-links'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/healthcare'>Healthcare</Nav.Link>
                    <Nav.Link as={Link} to='/services'>Services</Nav.Link>
                    <Nav.Link as={Link} to='/calendar'>Calendar</Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </div>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;