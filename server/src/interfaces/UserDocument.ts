import type { IPet } from '../models/Pet.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  savedPets: IPet[];
  isCorrectPassword(password: string): Promise<boolean>;
}
