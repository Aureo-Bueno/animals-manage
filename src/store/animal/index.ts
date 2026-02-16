import { animalStore } from "./store";

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
