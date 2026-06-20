import { animalStore } from "./store";
import type { AnimalData } from "./types";

export const addAnimal = (data: AnimalData) => {
  animalStore.setState((state) => ({
    animals: [...state.animals, { ...data, id: state.nextId }],
    nextId: state.nextId + 1,
  }));
};

export const deleteAnimal = (id: number) => {
  animalStore.setState((state) => ({
    ...state,
    animals: state.animals.filter((a) => a.id !== id),
  }));
};

export const updateAnimal = (id: number, data: Partial<AnimalData>) => {
  animalStore.setState((state) => ({
    ...state,
    animals: state.animals.map((a) =>
      a.id === id ? { ...a, ...data } : a
    ),
  }));
};
