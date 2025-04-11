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

export const GET_PETS = gql`
  query GetPets {
    pets {
      petId
      name
      species
      breed
      color
      weight
    }
  }
`;

export const GET_PET = gql`
  query GetPet($petId: ID!) {
    pet(petId: $petId) {
      petId
      name
      species
      breed
      color
      weight
    }
  }
`;