import type { Pet } from './Pets';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedPet: Pet[];
}
