import { GET_PET } from "../utils/queries";
import { useQuery } from "@apollo/client";
import PetCard from "./PetCard";

const PetInfo = ({ petId }: { petId: string }) => {
  const { loading, error, data } = useQuery(GET_PET, {
    variables: { petId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <PetCard pet={data.pet} />;
};

export default PetInfo;
