import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import { User, Appointment } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';
import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
    pets: async (_parent: any, { userId }: any) => {
      return await User.findById(userId);
    },
    pet: async (_parent: any, { petId }: { petId: string }) => {
      const users = await User.find();
      for (const user of users) {
        const foundPet = user.savedPets.find(pet => pet.petId === petId);
        if (foundPet) {
          return foundPet;
        }
      }
      return null;
    },
    appointmentsByUser: async (_parent: any, { userId }: any) => {
      return await Appointment.find({ userId: userId });
    },
  },
    Mutation: {
    addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUserDocument }> => {
      // Check if the username already exists
      const existingUser = await User.findOne({ username: args.username });
      if (existingUser) {
      throw new AuthenticationError('Username already exists');
      }

      // Check if the email already exists
      const existingEmail = await User.findOne({ email: args.email });
      if (existingEmail) {
      throw new AuthenticationError('Email already exists');
      }

      // Check if the email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
      throw new AuthenticationError('Invalid email format');
      }
      
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
        
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      // Check if the email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AuthenticationError('Invalid email format');
      }

      // Find the user by email and validate the password
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    savePet: async (_parent: any, { petData }: any, context: { user: { _id: any; }; }) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const newPet = { ...petData, petId: uuidv4() };

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedPets: newPet } },
        { new: true }
      );

      return updatedUser;
    },
    removePet: async (_parent: any, { petId }: any, context: { user: { _id: any; }; }) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedPets: { petId } } },
        { new: true }
      );

      return updatedUser;
    },
    addAppointment: async (_parent: any, { userId, input }: any) => {
      return await Appointment.create({ ...input, userId });
    },
    deleteAppointment: async (_parent: any, { appointmentId }: any) => {
      const deleted = await Appointment.findByIdAndDelete(appointmentId);
      return !!deleted;
    },
  },
};

export default resolvers;