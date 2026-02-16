import { Store } from "@tanstack/react-store";
import { initialSpecies } from "./initial-state";

export const speciesStore = new Store({
  species: initialSpecies,
});