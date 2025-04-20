import React, { useState } from 'react';
import '../styles/HealthcarePage.css';

const Healthcare: React.FC = () => {
  const selectedPetData = localStorage.getItem('selectedPet');
  const [isFlipped, setIsFlipped] = useState(false);

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
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Front: General healthcare info */}
          <div className="flip-card-front">
            <h2>Healthcare Info for {pet.name}</h2>
            <p><strong>Allergies:</strong> {pet.allergies || 'None'}</p>
            <p><strong>Conditions:</strong> {pet.conditions || 'None'}</p>
            <p><strong>Medications:</strong> {pet.medications || 'None'}</p>
            <button onClick={() => setIsFlipped(true)}>View Vet Info</button>
          </div>

          {/* Back: Vet Info */}
          <div className="flip-card-back">
            <h2>Veterinarian Info</h2>
            {pet.vetInfo ? (
              <>
                <p><strong>Name:</strong> {pet.vetInfo.name}</p>
                <p><strong>Phone:</strong> {pet.vetInfo.phoneNumber}</p>
                <p><strong>Address:</strong> {pet.vetInfo.address}</p>
              </>
            ) : (
              <p>No veterinarian info available.</p>
            )}
            <button onClick={() => setIsFlipped(false)}>Back to Health Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
