import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PET } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const RemovePet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet] = useMutation(REMOVE_PET);

  if (loading) return <p>Loading...</p>;

  const pets = data?.me?.savedPets || [];

  const handleRemove = async (petId: string) => {
    try {
      await removePet({ 
        variables: { petId }, 
        refetchQueries: [{ query: QUERY_ME }]
      });
      onClose(); // Refresh or close on success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-4">
      <h3>Select a Pet to Remove</h3>
      <ul className="list-group">
        {pets.map((pet: any) => (
          <li key={pet.petId} className="list-group-item d-flex justify-content-between align-items-center">
            {pet.name}
            <button className="remove" onClick={() => handleRemove(pet.petId)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RemovePet;
