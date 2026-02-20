import { animalStore } from "../store/animal/store";
import { initialAnimals } from "../store/animal/initial-state";
import { speciesStore } from "../store/species/store";
import { initialSpecies } from "../store/species/initial-state";

const getNextId = () =>
  initialAnimals.reduce((maxId, animal) => Math.max(maxId, animal.id), 0) + 1;

export const resetStores = () => {
  animalStore.setState(() => ({
    animals: initialAnimals.map((animal) => ({ ...animal })),
    nextId: getNextId(),
  }));

  speciesStore.setState(() => ({
    species: [...initialSpecies],
  }));
};
