import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import AddPetForm from '../components/AddPet';
import RemovePet from '../components/RemovePet';
import '../styles/HomePage.css'
import { useOutletContext } from 'react-router-dom';
import { FaPaw } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';

type ContextType = { 
  showModal: boolean; 
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};


const Home: React.FC = () => {
  const { showModal, setShowModal } = useOutletContext<ContextType>();
  const loggedIn = Auth.loggedIn();
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);


  const handleButtonClick = (action: () => void) => {
    setHideButtons(true);
    action();
  };

  return (
    <div className="home-container" style={{ padding: '2rem', textAlign: 'center' }}>
      {loggedIn ? (
        <>
          <h2>Manage your pets</h2>
          {!hideButtons && (
            <div className="home-buttons">
            <Link to="/savedpets">
              <button className="icon-button">
                <FaPaw {...({ className: "paw-icon" } as IconBaseProps)} />
                <span className="icon-label">Select</span>
              </button>
            </Link>
            <button onClick={() => handleButtonClick(() => setShowAdd(true))} className="icon-button">
              <FaPaw {...({ className: "paw-icon" } as IconBaseProps)} />
              <span className="icon-label">Add</span>
            </button>
            <button onClick={() => handleButtonClick(() => setShowRemove(true))} className="icon-button">
              <FaPaw {...({ className: "paw-icon" } as IconBaseProps)} />
              <span className="icon-label">Remove</span>
            </button>
          </div>
          )}
          <div className="mt-4">
            {showAdd && <AddPetForm onClose={() => { setShowAdd(false); setHideButtons(false); }} />}
            {showRemove && <RemovePet onClose={() => { setShowRemove(false); setHideButtons(false); }} />}
          </div>
        </>
      ) : null}
  
      {!loggedIn && !showModal && (
        <>
          <div className="access">
            <h2>Access the Barkives!</h2>
            <div className="login">           
              <p>Log in to manage pets</p>
              <button onClick={() => setShowModal(true)}>Login</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;