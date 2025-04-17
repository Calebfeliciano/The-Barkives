import PetCarousel from '../components/PetCarousel';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import PetInfo from '../components/PetInfo';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <div className="saved-pets-page">
      <h1>Your Saved Pets</h1>

      <AnimatePresence mode="wait">
        {selectedPet ? (
          <motion.div
            key={selectedPet}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <button onClick={() => setSelectedPet(null)}>Back to Saved Pets</button>
            <PetInfo petId={selectedPet} />
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <PetCarousel pets={pets} onSelect={(petId: string) => setSelectedPet(petId)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SavedPets;
