import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import AddPetForm from '../components/AddPet';
import RemovePet from '../components/RemovePet';

const Home: React.FC = () => {
  const loggedIn = Auth.loggedIn();
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
//  const [showSelect, setShowSelect] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);

  const handleButtonClick = (action: () => void) => {
    setHideButtons(true);
    action();
  };

  return (
    <div className="home-container" style={{ padding: '2rem', textAlign: 'center' }}>
      {loggedIn ? (
        <>
          <h2>Manage your pets:</h2>
          {!hideButtons && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <Link to="/savedpets"><button>Select Pet</button></Link>              
              <button onClick={() => handleButtonClick(() => setShowAdd(true))}>Add Pet</button>
              <button onClick={() => handleButtonClick(() => setShowRemove(true))}>Remove Pet</button>
            </div>
          )}
          <div className="mt-4">
            {showAdd && <AddPetForm onClose={() => { setShowAdd(false); setHideButtons(false); }} />}
            {showRemove && <RemovePet onClose={() => { setShowRemove(false); setHideButtons(false); }} />}
          </div>
        </>
      ) : (
        <><h2>Access the Barkives!</h2><p>Log in to manage pets</p></>
      )}
    </div>
  );
};

export default Home;
