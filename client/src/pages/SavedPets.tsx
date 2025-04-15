/*
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
//import { removePetId } from '../utils/localStorage';
import type { User } from '../models/User';
import type { Pet } from '../models/Pets';

import Auth from '../utils/auth';

const SavedPets = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet] = useMutation(REMOVE_PET);

  const userData: User = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeletePet = async (PetId: string) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removePet({
        variables: { PetId },
      });

      // upon success, remove book's id from localStorage
      /*
      removePetId(petId);
      
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
    </>
  );
};

export default SavedPets;
*/

import PetCarousel from '../components/PetCarousel';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import PetInfo from '../components/PetInfo';
//import type { Pet } from '../models/Pets'

const SavedPets = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [selectedPet, setSelectedPet] = useState<string | null>(null); // Store petId as a string


  const pets = data?.me.savedPets || [];

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return <h2>Please log in to view your saved pets.</h2>;
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    console.error("Error fetching saved pets:", error);
    return <h2>Error fetching saved pets. Please try again later.</h2>;
  }
  if (!pets.length) {
    return <h2>No saved pets found.</h2>;
  }

  // Display selected pet details
  if (selectedPet) {
    return (
      <div className="saved-pets-page">
        <button onClick={() => setSelectedPet(null)}>Back to Saved Pets</button>
        <PetInfo petId={selectedPet} /> {/* Render PetInfo with the selected petId */}
      </div>
    );
  }

  // Render the PetCarousel if no pet is selected
  return (
    <div className="saved-pets-page">
      <h1>Your Saved Pets</h1>
      <PetCarousel
        pets={pets}
        onSelect={(petId: string) => setSelectedPet(petId)} // Handle pet selection
      />
    </div>
  );
};

export default SavedPets;
