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

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AddPetForm;
