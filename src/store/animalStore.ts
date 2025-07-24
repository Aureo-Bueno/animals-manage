import { Store } from '@tanstack/react-store';

export type Animal = {
  id: number;
  name: string;
  species: string;
};

const initialAnimals: Animal[] = [
  { id: 1, name: 'Rex', species: 'Dog' },
  { id: 2, name: 'Mimi', species: 'Cat' },
];

export const animalStore = new Store({
  animals: initialAnimals,
  nextId: 3,
});

export const addAnimal = (name: string, species: string) => {
  animalStore.setState((state) => ({
    animals: [
      ...state.animals,
      { id: state.nextId, name, species },
    ],
    nextId: state.nextId + 1,
  }));
};

export const deleteAnimal = (id: number) => {
  animalStore.setState((state) => ({
    ...state,
    animals: state.animals.filter((a) => a.id !== id),
  }));
};

export const updateAnimal = (id: number, name: string, species: string) => {
  animalStore.setState((state) => ({
    ...state,
    animals: state.animals.map((a) =>
      a.id === id ? { ...a, name, species } : a
    ),
  }));
};
