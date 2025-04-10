import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedPets {
        petId
        name
        birthdate
        age
        adopted
        adoptionDate
        species
        breed
        color
        weight
        specialMarkings
        specialNeeds
      }
    }
  }
`;
