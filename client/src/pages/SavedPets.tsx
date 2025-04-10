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
      */
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
