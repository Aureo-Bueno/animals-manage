import React, { type JSX } from 'react';

type AnimalFormProps = {
  form: { name: string; species: string };
  speciesList: string[];
  editId: number | null;
  addingSpecies: boolean;
  newSpecies: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAddSpeciesClick: () => void;
  onAddSpecies: () => void;
  onCancelAddSpecies: () => void;
  onNewSpeciesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnimalForm = ({
  form,
  speciesList,
  editId,
  addingSpecies,
  newSpecies,
  onChange,
  onSubmit,
  onAddSpeciesClick,
  onAddSpecies,
  onCancelAddSpecies,
  onNewSpeciesChange,
}: AnimalFormProps): JSX.Element => (
  <form onSubmit={onSubmit} className="animal-form">
    <div>
      <label htmlFor="name">Animal Name</label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <label htmlFor="species">Species</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select
          id="species"
          name="species"
          value={form.species}
          onChange={onChange}
          required
        >
          <option value="" disabled>Select species</option>
          {speciesList.map((sp) => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
        {!addingSpecies && (
          <button type="button" onClick={onAddSpeciesClick}>+ Add species</button>
        )}
      </div>
      {addingSpecies && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <input
            type="text"
            placeholder="New species"
            value={newSpecies}
            onChange={onNewSpeciesChange}
          />
          <button type="button" onClick={onAddSpecies}>Add</button>
          <button type="button" onClick={onCancelAddSpecies}>Cancel</button>
        </div>
      )}
    </div>
    <button type="submit">{editId !== null ? 'Update' : 'Add'}</button>
  </form>
);

export default AnimalForm;
