
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
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
      <header className= "header">
        
          <Navbar.Brand className='logo' as={Link} to='/'>
            The Barkives <IoPawOutline />
          </Navbar.Brand>
          
            <Nav className='navbar'>
              {/* Only show these links if the user is logged in */} 
              {Auth.loggedIn() ? (
                <>
                  <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
                  <NavLink to='/healthcare' className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Healthcare</NavLink>
                  <NavLink to='/services' className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Services</NavLink>
                  <NavLink to='/calendar' className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Calendar</NavLink>
                  <Nav.Link onClick={Auth.logout} className='nav-link'>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          
        
      </header>

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