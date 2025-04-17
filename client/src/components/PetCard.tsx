// src/components/PetCard.tsx
import { motion } from "framer-motion";
import "../styles/PetCard.css"; // Optional: for your CSS styles

type Pet = {
  name: string;
  species: string;
  breed: string;
  color: string;
  weight: number;
  birthdate?: string;
  adoptionDate?: string;
  specialMarkings?: string;
  specialNeeds?: string;
};

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <motion.div
      className="pet-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>{pet.name}</h2>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Color: {pet.color}</p>
      <p>Weight: {pet.weight} lbs</p>
      {pet.birthdate && <p>Birthdate: {pet.birthdate}</p>}
      {pet.adoptionDate && <p>Adoption Date: {pet.adoptionDate}</p>}
      {pet.specialMarkings && <p>Special Markings: {pet.specialMarkings}</p>}
      {pet.specialNeeds && <p>Special Needs: {pet.specialNeeds}</p>}
    </motion.div>
  );
};

export default PetCard;
