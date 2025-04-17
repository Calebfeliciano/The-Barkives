import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PET } from "../utils/queries";
import { useEffect } from "react";

const SelectPet = () => {
  const { petId } = useParams<{ petId: string }>();

  const { loading, error, data } = useQuery(GET_PET, {
    variables: { petId }, // ✅ This must match the variable name in your query
    skip: !petId, // In case petId is undefined briefly
  });

  useEffect(() => {
    if (data?.pet) {
      localStorage.setItem("selectedPet", JSON.stringify(data.pet));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading pet: {error.message}</p>;

  const pet = data?.pet;
  if (!pet) return <p>Pet not found!</p>;


  return (
    <div className="select-pet">
      <h2>{pet.name}</h2>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Color: {pet.color}</p>
      <p>Weight: {pet.weight}</p>
      <p>Birthdate: {pet.birthdate}</p>
      <p>Adoption Date: {pet.adoptionDate}</p>
      <p>Special Markings: {pet.specialMarkings}</p>
      <p>Special Needs: {pet.specialNeeds}</p>
    </div>
  );
};

export default SelectPet;