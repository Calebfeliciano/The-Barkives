import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import { User } from '../models/index.js';
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
    }
  },
  Mutation: {
    addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
            
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
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
  },
};

export default resolvers;