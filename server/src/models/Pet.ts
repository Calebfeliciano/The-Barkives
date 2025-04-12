import { Schema, model, type Document } from 'mongoose';

interface IPet extends Document {
  petId: string;
  name: string;
  birthdate: string;
  adoptionDate: string;
  species: string;
  breed: string;
  color: string;
  weight: string;
  specialMarkings: string;
  specialNeeds: string;
}

const petSchema = new Schema<IPet>({
  petId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  adoptionDate: {
    type: String,
  },
  species: {
    type: String,
  },
  breed: {
    type: String,
  },
  color: {
    type: String,
  },
  weight: {
    type: String,
  },
  specialMarkings: {
    type: String,
  },
  specialNeeds: {
    type: String,
  },
});

const Pet = model<IPet>('Pet', petSchema);
export { type IPet, petSchema };
export default Pet;
