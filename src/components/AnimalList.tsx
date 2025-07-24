import { type JSX } from 'react';
import type { Animal } from '../store/animalStore';

type AnimalListProps = {
  animals: Animal[];
  onEdit: (animal: Animal) => void;
  onDelete: (id: number) => void;
};

const AnimalList = ({ animals, onEdit, onDelete }: AnimalListProps): JSX.Element => (
  <ul className="animal-list">
    {animals.map((animal) => (
      <li key={animal.id} className="animal-list-item">
        <span>{animal.name} ({animal.species})</span>
        <div>
          <button className="edit-btn" onClick={() => onEdit(animal)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(animal.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default AnimalList;
