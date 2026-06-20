import { Store } from "@tanstack/react-store";
import { initialAnimals } from "./initial-state";
import type { State } from "./types";

const getNextId = () =>
  initialAnimals.reduce((maxId, animal) => Math.max(maxId, animal.id), 0) + 1;

export const animalStore = new Store<State>({
  animals: initialAnimals,
  nextId: getNextId(),
});
