//import "../styles/PetsPage.css";
//import { useState } from "react";
import { GET_PET } from "../utils/queries";
import { useQuery } from "@apollo/client";

const PetInfo = ({ petId }: { petId: string }) => {
//    const [showDetails, setShowDetails] = useState(false);
    
    const { loading, error, data } = useQuery(GET_PET, {
        variables: { petId },
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const pet = data.pet;
    
    return (
        <div className="pet-card">
          <h2>{pet.name}</h2>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Color: {pet.color}</p>
          <p>Weight: {pet.weight} lbs</p>
          <p>Special Markings: {pet.specialMarkings}</p>
          <p>Special Needs: {pet.specialNeeds}</p>
        </div>
      );
    }
    
export default PetInfo;