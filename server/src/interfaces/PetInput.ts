export default interface IPetInput {
//  petId: ID
  name: String | null
  birthdate: String | null
  adoptionDate: String | null
  species: String  | null
  breed: String | null
  color: String | null
  weight: String | null
  specialMarkings: String | null
  specialNeeds: String | null
  allergies: String | null
  conditions: String | null
  medications: String | null
  vetInfo: {
    name: String | null
    phoneNumber: String | null
    address: String | null
  } | null
}
