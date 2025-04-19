import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';

const AddPetForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    adoptionDate: '',
    species: '',
    breed: '',
    color: '',
    weight: '',
    specialMarkings: '',
    specialNeeds: '',
    allergies: '',
    conditions: '',
    medications: '',
    vetInfo: {
      name: '',
      phoneNumber: '',
      address: '',
    },
  });

  const [savePet] = useMutation(SAVE_PET);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' && (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await savePet({
        variables: { petData: formData },
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const renderInputRow = (
    label: string,
    name: string,
    type: string = 'text',
    isTextArea: boolean = false,
    required: boolean = false
  ) => (
    <div className="row mb-3 align-items-center">
      <label htmlFor={name} className="col-sm-3 col-form-label">
        {label}
      </label>
      <div className="col-sm-9">
        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            onChange={handleChange}
            className="form-control"
            required={required}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            onChange={handleChange}
            className="form-control"
            required={required}
          />
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h3 className="mb-4">Add a New Pet</h3>

      {renderInputRow('Name', 'name', 'text', false, true)}
      {renderInputRow('Birthdate', 'birthdate', 'date', false, true)}
      {renderInputRow('Adoption Date', 'adoptionDate', 'date')}
      {renderInputRow('Species', 'species', 'text', false, true)}
      {renderInputRow('Breed', 'breed', 'text', false, true)}
      {renderInputRow('Color', 'color')}
      {renderInputRow('Weight', 'weight')}
      {renderInputRow('Special Markings', 'specialMarkings', 'text', true)}
      {renderInputRow('Special Needs', 'specialNeeds', 'text', true)}
      {renderInputRow('Allergies', 'allergies', 'text', true)}
      {renderInputRow('Conditions', 'conditions', 'text', true)}
      {renderInputRow('Medications', 'medications', 'text', true)}
      <div className="row mb-3 align-items-center">
        <label htmlFor="vetInfo" className="col-sm-3 col-form-label">
          Vet Info
        </label>
        <div className="col-sm-9">
          <div className="row mb-3">
            <label htmlFor="vetName" className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                id="vetName"
                name="vetName"
                type="text"
                onChange={(e) => setFormData({ ...formData, vetInfo: { ...formData.vetInfo, name: e.target.value } })}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="vetPhoneNumber" className="col-sm-3 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-9">
              <input
                id="vetPhoneNumber"
                name="vetPhoneNumber"
                type="text"
                onChange={(e) => setFormData({ ...formData, vetInfo: { ...formData.vetInfo, phoneNumber: e.target.value } })}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="vetAddress" className="col-sm-3 col-form-label">
              Address
            </label>
            <div className="col-sm-9">
              <input
                id="vetAddress"
                name="vetAddress"
                type="text"
                onChange={(e) => setFormData({ ...formData, vetInfo: { ...formData.vetInfo, address: e.target.value } })}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center" id="pet-form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AddPetForm;
