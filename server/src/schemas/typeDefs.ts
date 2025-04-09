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
    name: String
    birthdate: String
    age: String
    adopted: Boolean
    adoptionDate: String
    species: String
    breed: String
    color: String
    weight: String
    specialMarkings: String
    specialNeeds: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input PetInput {
    petId: ID!
    name: String
    birthdate: String
    age: String
    adopted: Boolean
    adoptionDate: String
    species: String
    breed: String
    color: String
    weight: String
    specialMarkings: String
    specialNeeds: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePet(petData: PetInput!): User
    removePet(petId: ID!): User
  }
`;

export default typeDefs;
