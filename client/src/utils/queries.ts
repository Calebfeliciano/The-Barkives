import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedPets {
        petId
        name
        birthdate
        adoptionDate
        species
        breed
        color
        weight
        specialMarkings
        specialNeeds
        allergies
        conditions
        medications
        vetInfo {
          name
          phoneNumber
          address
        }
      }
    }
  }
`;

export const GET_PETS = gql`
  query GetPets {
    pets {
      petId
      name
      birthdate
      adoptionDate
      species
      breed
      color
      weight
      specialMarkings
      specialNeeds
      allergies
      conditions
      medications
      vetInfo {
        name
        phoneNumber
        address
      }
    }
  }
`;

export const GET_PET = gql`
  query GetPet($petId: ID!) {
    pet(petId: $petId) {
      petId
      name
      birthdate
      adoptionDate
      species
      breed
      color
      weight
      specialMarkings
      specialNeeds
      allergies
      conditions
      medications
      vetInfo {
        name
        phoneNumber
        address
      }
    }
  }
`;