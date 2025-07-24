import { useStore } from '@tanstack/react-store';
import { animalStore, addAnimal, deleteAnimal, updateAnimal } from '../store/animalStore';
import { speciesStore, addSpecies } from '../store/speciesStore';
import type { Animal } from '../store/animalStore';
import React, { useState, type JSX } from 'react';
import AnimalForm from './AnimalForm';
import AnimalList from './AnimalList';
import './AnimalManager.css';

function AnimalManager(): JSX.Element {
  const animals = useStore(animalStore, (s) => s.animals);
  const speciesList = useStore(speciesStore, (s) => s.species);
  const [form, setForm] = useState<{ name: string; species: string }>({ name: '', species: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [addingSpecies, setAddingSpecies] = useState(false);
  const [newSpecies, setNewSpecies] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      updateAnimal(editId, form.name, form.species);
      setEditId(null);
    } else {
      addAnimal(form.name, form.species);
    }
    setForm({ name: '', species: '' });
  };

  const handleEdit = (animal: Animal) => {
    setEditId(animal.id);
    setForm({ name: animal.name, species: animal.species });
  };

  const handleAddSpecies = () => {
    if (newSpecies && !speciesList.includes(newSpecies)) {
      addSpecies(newSpecies);
      setForm(f => ({ ...f, species: newSpecies }));
    }
    setNewSpecies('');
    setAddingSpecies(false);
  };

  return (
    <div className="animal-manager-container">
      <h2>Animal Management</h2>
      <AnimalForm
        form={form}
        speciesList={speciesList}
        editId={editId}
        addingSpecies={addingSpecies}
        newSpecies={newSpecies}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onAddSpeciesClick={() => setAddingSpecies(true)}
        onAddSpecies={handleAddSpecies}
        onCancelAddSpecies={() => { setAddingSpecies(false); setNewSpecies(''); }}
        onNewSpeciesChange={e => setNewSpecies(e.target.value)}
      />
      <AnimalList
        animals={animals}
        onEdit={handleEdit}
        onDelete={deleteAnimal}
      />
    </div>
  );
}

export default AnimalManager;
