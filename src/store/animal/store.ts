import { Store } from "@tanstack/react-store";
import { initialAnimals } from "./initial-state";

export const animalStore = new Store({
  animals: initialAnimals,
  nextId: 3,
});
