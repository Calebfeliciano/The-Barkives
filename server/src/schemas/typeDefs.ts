import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedPets: [Pet]
  }

  type Pet {
    petId: ID!
    name: String!
    birthdate: String
    adoptionDate: String
    species: String
    breed: String
    color: String
    weight: String
    specialMarkings: String
    specialNeeds: String
    allergies: String
    conditions: String
    medications: String
    vetInfo: VetInfo
  }

  type VetInfo {
    name: String
    phoneNumber: String
    address: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input PetInput {
    name: String!
    birthdate: String
    adoptionDate: String
    species: String!
    breed: String
    color: String
    weight: String
    specialMarkings: String
    specialNeeds: String
    allergies: String
    conditions: String
    medications: String
    vetInfo: VetInfoInput
  }

  input VetInfoInput {
    name: String
    phoneNumber: String
    address: String
  }

  type Query {
    me: User
    pets: [Pet] #Query to get all pets
    pet(petId: ID!): Pet #Query to get a single pet by ID
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePet(petData: PetInput!): User
    removePet(petId: ID!): User
  }
`;

export default typeDefs;
