/*
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PET } from "../utils/queries";
import { useEffect } from "react";

import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        marginTop: "20px",
      }}
     className="select-pet">
      <h2>{pet.name}</h2>
      <p>Species: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Color: {pet.color}</p>
      <p>Weight: {pet.weight}</p>
      <p>Birthdate: {pet.birthdate}</p>
      <p>Adoption Date: {pet.adoptionDate}</p>
      <p>Special Markings: {pet.specialMarkings}</p>
      <p>Special Needs: {pet.specialNeeds}</p>
    </motion.div>
  );
};

export default SelectPet;
*/

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PET } from "../utils/queries";
import { useEffect } from "react";
import PetCard from "./PetCard";

const SelectPet = () => {
  const { petId } = useParams<{ petId: string }>();

  const { loading, error, data } = useQuery(GET_PET, {
    variables: { petId },
    skip: !petId,
  });

  useEffect(() => {
    if (data?.pet) {
      localStorage.setItem("selectedPet", JSON.stringify(data.pet));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading pet: {error.message}</p>;
  if (!data?.pet) return <p>Pet not found!</p>;

  return <PetCard pet={data.pet} />;
};

export default SelectPet;
