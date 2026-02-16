import { useStore } from "@tanstack/react-store";
import { speciesStore } from "../../store/species/store";
import { addSpecies } from "../../store/species";

export const useSpecies = () => {
  const species = useStore(speciesStore, (s) => s.species);

  return {
    species,
    addSpecie: addSpecies,
  };
}
