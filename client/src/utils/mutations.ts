import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_PET = gql`
  mutation savePet($petData: PetInput!) {
    savePet(petData: $petData) {
      _id
      username
      email
      savedPets {
        name
        birthdate
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

export const REMOVE_PET = gql`
  mutation removePet($petId: ID!) {
    removePet(petId: $petId) {
      _id
      username
      savedPets {
        petId
        name
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment($userId: ID!, $input: AppointmentInput!) {
    addAppointment(userId: $userId, input: $input) {
      _id
      title
      description
      date
      time
      userId
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($appointmentId: ID!) {
    deleteAppointment(appointmentId: $appointmentId)
  }
`;