import React from 'react';
import '../styles/index.css';

const Healthcare: React.FC = () => {
  const selectedPetData = localStorage.getItem('selectedPet');

  if (!selectedPetData) {
    return (
      <div>
        <p>No pet selected.</p>
        <button onClick={() => (window.location.href = '/')}>Go Back</button>
      </div>
    );
  }

  const pet = JSON.parse(selectedPetData);

  return (
    <div className="healthcare-container">
      <div className="card" id="healthcare" style={{ padding: '1rem' }}>
        <h2>Healthcare Info for {pet.name}</h2>
        <p><strong>Allergies:</strong> {pet.allergies || 'None'}</p>
        <p><strong>Conditions:</strong> {pet.conditions || 'None'}</p>
        <p><strong>Medications:</strong> {pet.medications || 'None'}</p>
        {pet.vetInfo && (
          <div>
            <h4>Veterinarian Info:</h4>
            <p><strong>Name:</strong> {pet.vetInfo.name}</p>
            <p><strong>Phone:</strong> {pet.vetInfo.phoneNumber}</p>
            <p><strong>Address:</strong> {pet.vetInfo.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Healthcare;
