import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Healthcare: React.FC = () => {
  const selectedPetId = localStorage.getItem('selectedPetId');
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading pet data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const pet = data?.me?.savedPets?.find((p: any) => p.petId === selectedPetId);

  if (!pet) {
    return (
      <div>
        <p>No pet selected.</p>
        <button onClick={() => (window.location.href = '/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
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
  );
};

export default Healthcare;
