import { Store } from '@tanstack/react-store';

// Initial species list
const initialSpecies = ['Dog', 'Cat'];

export const speciesStore = new Store({
  species: initialSpecies,
});

export const addSpecies = (newSpecies: string) => {
  speciesStore.setState((state) => {
    if (!state.species.includes(newSpecies)) {
      return { species: [...state.species, newSpecies] };
    }
    return state;
  });
};

export const removeSpecies = (speciesToRemove: string) => {
  speciesStore.setState((state) => ({
    species: state.species.filter((sp) => sp !== speciesToRemove),
  }));
};
