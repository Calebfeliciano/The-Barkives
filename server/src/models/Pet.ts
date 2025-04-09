import { Schema, model, type Document } from 'mongoose';

interface IPet extends Document {
//  petId: ID
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

const petSchema = new Schema<IPet>({
  name: {
    type: String,
  },
  birthdate: [
    {
      type: String,
    },
  ],
  age: {
    type: String,
  },
  adopted: {
    type: Boolean,
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
