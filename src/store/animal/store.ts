import { Store } from "@tanstack/react-store";
import { initialAnimals } from "./initial-state";
import type { State } from "./types";

export const animalStore = new Store<State>({
  animals: initialAnimals,
  nextId: 3,
});
